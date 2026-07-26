enyo.kind({name:"amhd.AppData",kind:"enyo.Component",ACCEPTURL:"https://signin.ebay.com/ws/eBayISAPI.dll?ThirdPartyAuthSucessFailure&isAuthSuccessful=true",REJECTURL:"https://signin.ebay.com/ws/eBayISAPI.dll?ThirdPartyAuthSucessFailure",LOCALE:"en_US",ErrorCodes:{NO_CONNECTION:"no connection"},lists:[{listName:EBayData.lists.WATCH,listText:$L("Watching"),icon:"watching",category:$L("Buying")},{listName:EBayData.lists.BID,listText:$L("Bidding"),icon:"bidding",category:$L("Buying")},{listName:EBayData.lists.WON,listText:$L("Won"),icon:"won",category:$L("Buying")},{listName:EBayData.lists.LOST,listText:$L("Lost"),icon:"lost",category:$L("Buying")},{listName:EBayData.lists.ACTIVE,listText:$L("Selling"),icon:"selling",category:$L("Selling")},{listName:EBayData.lists.SOLD,listText:$L("Sold"),icon:"sold",category:$L("Selling")},{listName:EBayData.lists.UNSOLD,listText:$L("Not sold"),icon:"unsold",category:$L("Selling")}],searchList:{listName:EBayData.searchList,icon:"searching"},sellerList:{listName:EBayData.sellerList,icon:"seller"},noList:{listName:EBayData.noList,icon:"none"},connectionInformation:{isInternetConnectionAvailable:false,ipAddress:undefined,},deviceId:undefined,components:[{name:"connectionStatusService",kind:"PalmService",service:"palm://com.palm.connectionmanager/",method:"getstatus",subscribe:true,onSuccess:"getStatusSuccess",onFailure:"serviceFailure"},{name:"idService",kind:"PalmService",service:"palm://com.palm.preferences/systemProperties",method:"Get",onSuccess:"idServiceSuccess",onFailure:"idServiceFailure"},{name:"updateInfoService",kind:"WebService",handleAs:"json",onSuccess:"loadUpdateInformationSuccess",onFailure:"loadUpdateInformationFailure"}],updateAndBannerInformation:undefined,_createCallback:null,create:function(_1){
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

