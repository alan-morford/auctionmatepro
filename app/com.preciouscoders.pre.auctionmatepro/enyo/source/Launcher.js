enyo.kind({name:"amhd.Launcher",kind:"enyo.Object",_newCardNumber:0,_windows:[],_tokenRefreshTimer:null,constructor:function(){
this.inherited(arguments);
},startup:function(_1){
this.log("Startup called");
var _2=this;
var _3=window.PalmSystem&&PalmSystem.launchParams||"{}";
var _4=JSON.parse(_3);
var _5=function(_6){
if(_6){
enyo.application.preferences=new amhd.PreferencesManager();
enyo.application.preferences.getPreferences();
_2._maybeRefreshToken(function(){
_2.eBayInit();
enyo.application.services=new amhd.Services();
enyo.application.dashboard=new amhd.Dashboard();
enyo.application.notificationManager=new amhd.NotificationManager();
enyo.application.appdata.loadUpdateInformation();
enyo.application.appdata.checkForAppMuseumUpdate();
_2.startPeriodicTokenRefresh();
if(!enyo.application.runInBrowser){
_2.relaunch(_4);
}else{
_1();
}
});
}else{
_2.log("No connection launch");
if(_4&&_4.wakeup){
enyo.application.preferences=new amhd.PreferencesManager();
enyo.application.preferences.getPreferences();
_2.eBayInit();
enyo.application.services=new amhd.Services();
enyo.application.dashboard=new amhd.Dashboard();
enyo.application.notificationManager=new amhd.NotificationManager();
if(!enyo.application.runInBrowser){
_2.relaunch(_4);
}else{
_1();
}
}else{
_2.openNoConnectionMessage();
}
}
};
enyo.application.ebaydata=EBayData;
enyo.application.appdata=new amhd.AppData(_5);
},relaunch:function(_7){
this.log("relaunch called with param keys "+JSON.stringify(_7));
if(false){
}else{
if(_7.wakeup){
this.log("Wakeup call");
enyo.application.notificationManager.wakeupCall(_7.wakeup);
}else{
if(_7.notification){
this.log("Showing notification dashboard");
enyo.application.dashboard.showNotification(_7.alert);
}else{
if(_7.articleId){
this.log("Opening arcitle in new card, ID: "+_7.articleId);
this.openArticleNewCard(_7.articleId);
}else{
if(_7.search){
this.log("Launching into search, term: "+_7.searchterm);
this.openCard("main","enyo.indexmain.html",_7,true);
}else{
this.openCard("main","enyo.indexmain.html");
}
}
}
}
}
},openNewMainCard:function(){
this.openCard("main","enyo.indexmain.html",null,true);
},openArticleNewCard:function(_8){
var _9="article_"+_8;
this.openCard(_9,"enyo.indexarticle.html",{articleId:_8});
},openNotificationNewCard:function(_a){
this.openCard("notificationslist","enyo.indexmain.html",_a);
},openCard:function(_b,_c,_d,_e){
if(_e){
_b+="_"+this._newCardNumber;
this._newCardNumber++;
}
this.log("Launching card "+_b);
var _f=enyo.fetchAppRootPath()+"/";
var _10=_f+_c;
var _11=enyo.windows.activate(_10,_b,_d);
this._windows.push(_11);
},openNoConnectionMessage:function(){
this.log("Launching no connection message card");
var _12=enyo.fetchAppRootPath()+"/";
var _13="enyo.indexnoconnection.html";
var _14=_12+_13;
var _15=enyo.windows.activate(_14,"main",{});
this._windows.push(_15);
},openExpiredMessage:function(){
this.log("Launching expired message card");
var _16=enyo.fetchAppRootPath()+"/";
var _17="enyo.indexexpired.html";
var _18=_16+_17;
var _19=enyo.windows.activate(_18,"main",{});
this._windows.push(_19);
},closeAllButThis:function(){
if(!enyo.application.runInBrowser){
this.log("closing all other cards");
var _1a=enyo.windows.getActiveWindow();
for(var i=this._windows.length-1;i>=0;i--){
if(this._windows[i]!=_1a){
try{
this._windows[i].close();
}
catch(ex){
this.log("Window could not be closed.");
}
this._windows.splice(i,1);
}
}
}
},eBayInit:function(){
var _1b=enyo.application.preferences.getLocale();
if(enyo.application.preferences.getUserConnected()){
var _1c=enyo.application.preferences.data.user.access_token;
var _1d=enyo.application.preferences.data.user.userId;
enyo.application.ebaydata.init(_1b,_1c,_1d,enyo.bind(this,this.userLoadedCallback));
}else{
enyo.application.ebaydata.init(_1b);
}
},
// Ported from box/app/com.box.webos/source/views/splash.js's create()/
// refreshTokenCallback: proactively refresh a near-expired access token
// before eBayInit() runs, so a launch doesn't silently drop the user back
// to the Connect screen just because the token happened to lapse between
// sessions. Distinguishes a genuine dead refresh token (real logout) from a
// transient broker/network failure (keep going, don't log out).
_maybeRefreshToken:function(_proceed){
var _user=enyo.application.preferences.data.user;
if(!_user.access_token||!_user.tokenExpiry||!_user.refresh_token){
_proceed();
return;
}
var _now=(new Date()).getTime();
// Margin needs to be comfortably wider than startPeriodicTokenRefresh's
// 15 minute poll interval below, not just wide enough for the old
// cold-launch-only race (a 60 second margin is fine for a single
// check-then-use at launch, but on a 15 minute polling cadence a 60
// second window can fall between ticks and let the token expire
// before any tick ever lands inside it). Refreshing this early costs
// nothing - eBay doesn't penalize refreshing before it's strictly
// necessary.
if(_now<=_user.tokenExpiry-(20*60*1000)){
_proceed();
return;
}
EBayBroker.refreshAccessToken(_user.refresh_token,enyo.bind(this,function(_json){
if(_json&&_json.status=="ready"&&_json.access_token){
_user.access_token=_json.access_token;
_user.refresh_token=_json.refresh_token||_user.refresh_token;
_user.tokenExpiry=(new Date()).getTime()+((_json.expires_in||3600)*1000);
enyo.application.preferences.setPreferences();
}else{
if(_json&&_json.status=="invalid_grant"){
this.log("token refresh: genuine refresh rejection, logging out");
enyo.application.preferences.deletePreferences();
}else{
this.log("token refresh: inconclusive response, NOT logging out");
}
}
_proceed();
}),enyo.bind(this,function(_err){
this.log("token refresh: request failed (network/broker), NOT logging out: "+(_err&&_err.errorCodeNumerical));
_proceed();
}));
},
// _maybeRefreshToken above only ever ran once, at cold launch - a session
// left open (or backgrounded without being killed) for longer than the
// ~2 hour eBay access token lifetime would silently go stale until the
// next relaunch, surfacing as a real token-expired error mid-session even
// though the refresh token itself (eBay issues these valid ~18 months) was
// still perfectly good. Re-running the same check on a timer for the life
// of the app process means the access token gets renewed well before it
// goes stale regardless of how long the app stays open - the user should
// only ever see the login screen again if the refresh token itself
// actually dies (18 months unused, or access revoked from their eBay
// account), not from ordinary long-running use. 15 minutes comfortably
// beats the 2 hour window without polling the broker unnecessarily often.
startPeriodicTokenRefresh:function(){
if(this._tokenRefreshTimer){
clearInterval(this._tokenRefreshTimer);
}
this._tokenRefreshTimer=setInterval(enyo.bind(this,function(){
this._maybeRefreshToken(function(){});
}),15*60*1000);
},userLoadedCallback:function(_1e,_1f){
if(_1e){
enyo.application.preferences.data.user.userId=_1f.userId;
enyo.application.preferences.setPreferences();
enyo.application.appdata.raiseAppEvent("UserId",_1f.userId);
}
},});

