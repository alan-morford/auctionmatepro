enyo.kind({name:"amhd.AppData",kind:"enyo.Component",ACCEPTURL:"https://signin.ebay.com/ws/eBayISAPI.dll?ThirdPartyAuthSucessFailure&isAuthSuccessful=true",REJECTURL:"https://signin.ebay.com/ws/eBayISAPI.dll?ThirdPartyAuthSucessFailure",LOCALE:"en_US",ErrorCodes:{NO_CONNECTION:"no connection"},lists:[{listName:EBayData.lists.WATCH,listText:$L("Watching"),icon:"watching",category:$L("Buying")},{listName:EBayData.lists.BID,listText:$L("Bidding"),icon:"bidding",category:$L("Buying")},{listName:EBayData.lists.WON,listText:$L("Won"),icon:"won",category:$L("Buying")},{listName:EBayData.lists.LOST,listText:$L("Lost"),icon:"lost",category:$L("Buying")},{listName:EBayData.lists.ACTIVE,listText:$L("Selling"),icon:"selling",category:$L("Selling")},{listName:EBayData.lists.SOLD,listText:$L("Sold"),icon:"sold",category:$L("Selling")},{listName:EBayData.lists.UNSOLD,listText:$L("Not sold"),icon:"unsold",category:$L("Selling")}],searchList:{listName:EBayData.searchList,icon:"searching"},sellerList:{listName:EBayData.sellerList,icon:"seller"},noList:{listName:EBayData.noList,icon:"none"},connectionInformation:{isInternetConnectionAvailable:false,ipAddress:undefined,},deviceId:undefined,components:[{name:"connectionStatusService",kind:"PalmService",service:"palm://com.palm.connectionmanager/",method:"getstatus",subscribe:true,onSuccess:"getStatusSuccess",onFailure:"serviceFailure"},{name:"idService",kind:"PalmService",service:"palm://com.palm.preferences/systemProperties",method:"Get",onSuccess:"idServiceSuccess",onFailure:"idServiceFailure"},{name:"updateInfoService",kind:"WebService",handleAs:"json",onSuccess:"loadUpdateInformationSuccess",onFailure:"loadUpdateInformationFailure"}],updateAndBannerInformation:undefined,_updateDismissed:false,_appMuseumUpdateInfo:undefined,_appMuseumCurrentVersion:undefined,_createCallback:null,create:function(_1){
this.inherited(arguments);
this._createCallback=_1;
this.$.connectionStatusService.call();
this.$.idService.call({"key":"com.palm.properties.nduid"});
},getStatusSuccess:function(_2,_3){
this.log("connection service success"),this.log(_3);
if(_3.isInternetConnectionAvailable){
this.log("Internet connection available");
if(_3.wifi&&_3.wifi.ipAddress){
this.connectionInformation.isInternetConnectionAvailable=true;
this.connectionInformation.ipAddress=_3.wifi.ipAddress;
}else{
if(_3.wan&&_3.wan.ipAddress){
this.connectionInformation.isInternetConnectionAvailable=true;
this.connectionInformation.ipAddress=_3.wan.ipAddress;
}
}
}else{
this.log("Internet connection NOT available");
this.connectionInformation.isInternetConnectionAvailable=false;
this.connectionInformation.ipAddress=undefined;
}
if(this._createCallback){
this._createCallback(this.connectionInformation.isInternetConnectionAvailable);
this._createCallback=null;
}
},serviceFailure:function(_4,_5){
this.log("connection service error"),this.log(_5);
if(this._createCallback){
this._createCallback(false);
this._createCallback=null;
}
},idServiceSuccess:function(_6,_7){
this.log("idServiceSuccess called");
this.deviceId=_7["com.palm.properties.nduid"];
},idServiceFailure:function(_8,_9){
this.log("idServiceFailure called");
},loadUpdateInformation:function(){
var _a=enyo.fetchAppInfo();
var _b=_a.checkUpdateUrlEnyo.interpolate({lang:$L("en")});
this.$.updateInfoService.setUrl(_b);
this.$.updateInfoService.call();
},loadUpdateInformationSuccess:function(_c,_d){
this.log("loadUpdateInformationSuccess called");
this.updateAndBannerInformation=_d;
this.raiseAppEvent("UpdateInformation",null);
},loadUpdateInformationFailure:function(_e,_f){
this.log("loadUpdateInformationFailure called");
},
// App Museum II update check (see update.MD in the repo root for the
// original blueprint, ported from com.emu7800.touchpad's native
// updater.c/updater.h). Separate from loadUpdateInformation above - that's
// the original 2011 company's own (long-dead) banner-promo service that
// Banner.js still depends on, this is the new App-Museum-hosted "a newer
// version exists, want to install it" check. appMuseumId (this app's
// numeric museum listing id, 3038) lives in appinfo.json alongside the
// legacy checkUpdateUrl fields, not hardcoded here, matching that existing
// config-in-appinfo.json convention.
//
// Uses pc.Ajax directly rather than the WebService kind (unlike
// loadUpdateInformation above, which predates this session) - confirmed
// on-device that WebService throws framework-level "setTimeout is not
// defined"/"Illegal invocation" errors from deep inside enyo-build.js on
// this device/build the moment it's actually exercised (the old
// updateInfoService above never surfaced this because it's always pointed
// at a dead server and nobody was watching the log for it). pc.Ajax is
// the same request mechanism already proven reliable all through this
// session's eBay REST API work (eBayBrowse-lib.js/eBayTaxonomy-lib.js/
// eBayBroker-lib.js), so it's used here too instead of guessing further
// at WebService's specific quirk.
checkForAppMuseumUpdate:function(){
var _appInfo=enyo.fetchAppInfo();
var _museumId=_appInfo.appMuseumId;
if(!_museumId){
this.log("checkForAppMuseumUpdate: no appMuseumId configured, skipping");
return;
}
this._appMuseumCurrentVersion=_appInfo.version;
var _url="https://appcatalog.webosarchive.org/WebService/getLatestVersionInfo.php?app="+encodeURIComponent(_museumId)+"/"+encodeURIComponent(_appInfo.version);
this.log("checkForAppMuseumUpdate: "+_url);
pc.Ajax.request(_url,{method:"get",onSuccess:enyo.bind(this,this._appMuseumVersionResponse),onFailure:enyo.bind(this,this._appMuseumVersionResponse)});
},_appMuseumVersionResponse:function(_response){
this.log("_appMuseumVersionResponse called, status "+(_response&&_response.status));
if(!_response||_response.status!=200){
return;
}
var _json;
try{
_json=eval("("+_response.responseText+")");
}
catch(e){
this.log("_appMuseumVersionResponse: unparseable response");
return;
}
if(!_json||!_json.version||_json.error){
return;
}
if(!this.isVersionNewer(_json.version,this._appMuseumCurrentVersion)){
this.log("_appMuseumVersionResponse: no newer version available");
return;
}
this._appMuseumUpdateInfo={version:_json.version,versionNote:_json.versionNote,downloadUri:_json.downloadURI};
// Second request for the fuller release notes, same two-step pattern
// update.MD describes - falls back to the (possibly truncated) note
// already captured above if this second call fails.
var _detailsUrl="https://appcatalog.webosarchive.org/WebService/getMuseumDetails.php?id="+encodeURIComponent(enyo.fetchAppInfo().appMuseumId);
pc.Ajax.request(_detailsUrl,{method:"get",onSuccess:enyo.bind(this,this._appMuseumDetailsResponse),onFailure:enyo.bind(this,this._appMuseumDetailsResponse)});
},_appMuseumDetailsResponse:function(_response){
this.log("_appMuseumDetailsResponse called, status "+(_response&&_response.status));
if(_response&&_response.status==200){
try{
var _json=eval("("+_response.responseText+")");
if(_json&&_json.versionNote){
this._appMuseumUpdateInfo.versionNote=_json.versionNote;
}
}
catch(e){
this.log("_appMuseumDetailsResponse: unparseable response, falling back to short note");
}
}
this._announceUpdateAvailable();
},_announceUpdateAvailable:function(){
if(this._updateDismissed||!this._appMuseumUpdateInfo){
return;
}
this.raiseAppEvent("AppMuseumUpdateAvailable",this._appMuseumUpdateInfo);
},dismissUpdate:function(){
// Session-only, matching update.MD's g_update_dismissed - resets on next
// launch rather than being persisted to preferences.
this._updateDismissed=true;
},isVersionNewer:function(_remote,_local){
var _r=(_remote||"").split(".");
var _l=(_local||"").split(".");
for(var i=0;i<3;i++){
var _rn=parseInt(_r[i]||"0",10);
var _ln=parseInt(_l[i]||"0",10);
if(isNaN(_rn)){
_rn=0;
}
if(isNaN(_ln)){
_ln=0;
}
if(_rn>_ln){
return true;
}
if(_rn<_ln){
return false;
}
}
return false;
},_appEventCallbacks:[],registerAppEvent:function(_10,_11){
for(var i=0;i<this._appEventCallbacks.length;i++){
var _12=this._appEventCallbacks[i];
if(_12.name==_10&&_12.callback===_11){
this.log("app event callback already registered");
return;
}
}
this.log("registering new app event callback");
var _13={callback:_11,name:_10};
this._appEventCallbacks.push(_13);
},raiseAppEvent:function(_14,_15){
this.log("calling all app event callbacks for "+_14);
for(var i=0;i<this._appEventCallbacks.length;i++){
if(this._appEventCallbacks[i].name==_14){
enyo.nextTick(this,this._appEventCallbacks[i].callback,_15);
}
}
},});

