/**
 * Connect.js — brokered OAuth2 login for AuctionMate Pro.
 *
 * Replaces the old Auth'n'Auth in-WebView flow (getSignInUrl -> WebView ->
 * getToken). This device can't reliably render eBay's modern OAuth consent
 * screen (same class of problem the box app hit with Box's consent screen),
 * so login is delegated to the shared oauth.wosa.link broker via its
 * code-based hand-off — see lib/ebay/eBayBroker-lib.js for the three broker
 * calls this view drives. Guest/no-login browsing (the old "Use AuctionMate
 * Without Account" path, backed by the now-decommissioned Finding API) has
 * been dropped — every feature requires a connected account now.
 *
 * codeView is NOT lazy, unlike most other panes in this app: this old Enyo's
 * lazy components don't instantiate their children until first shown, so
 * gotAuthCode()'s setContent() calls on codeUrl/codeValue (which run before
 * the pane switches to codeView) would throw on undefined — silently
 * killing the rest of gotAuthCode() before selectViewByName() ever ran, so
 * the code screen never appeared even though the broker call succeeded. Same
 * bug, same fix, already hit and documented in ../box's login.js.
 */
enyo.kind({name:"amhd.Connect",kind:"VFlexBox",events:{onConnected:"",},components:[{name:"pane",kind:"Pane",flex:1,components:[{name:"connectMainView",kind:"VFlexBox",components:[{kind:"PageHeader",pack:"center",components:[{content:$L("Connect with eBay"),flex:1,className:"common-headercentered"}]},{kind:"VFlexBox",flex:1,className:"common-anchor",components:[{kind:"Scroller",flex:1,components:[{kind:"HFlexBox",components:[{kind:"Spacer"},{kind:"VFlexBox",className:"preferences-content",components:[{kind:"RowGroup",caption:$L("Connect directly"),components:[{content:$L("Tap here to connect this app with your eBay account to access your eBay data in a safe and secure manner."),className:"preferences-smalltext"},{kind:"Button",content:$L("Log In"),className:"enyo-button-affirmative",onclick:"startConnect"}]},{kind:"Button",content:$L("Show License Agreement"),className:"preferences-spacebottom",onclick:"showLicenseAgreement"},{content:$L("This app does not store your eBay password. You'll be shown a short code and a web address — visit that address on any modern browser to sign in and approve access."),className:"preferences-smalltext preferences-spacebottom"},{kind:"HFlexBox",pack:"center",components:[{kind:"Image",src:"enyo/images/ebaycompatible-en.png"},]},]},{kind:"Spacer"},]},]},{name:"mainViewScrim",kind:"Scrim",className:"common-partialscrim"},]},]},{name:"codeView",kind:"VFlexBox",components:[{kind:"PageHeader",pack:"center",components:[{kind:"Button",content:$L("Cancel"),onclick:"cancelConnect",className:"common-headerbutton"},{content:$L("Sign in to eBay"),flex:1,className:"common-headercentered"},]},{kind:"VFlexBox",flex:1,className:"common-anchor preferences-content",align:"center",pack:"center",components:[{content:$L("On a phone or computer, go to this address:"),className:"preferences-smalltext"},{name:"codeUrl",content:"",className:"connect-code-url"},{content:$L("Then enter this code:"),className:"preferences-smalltext"},{name:"codeValue",content:"",className:"connect-code-value"},{name:"codeSpinner",kind:"Spinner"},{name:"codeStatus",content:$L("Waiting for you to finish signing in…"),className:"preferences-smalltext"},{kind:"HFlexBox",pack:"center",components:[{kind:"Button",content:$L("I've signed in"),onclick:"checkNowTapped",className:"preferences-spacebottom"},]},]},]},]},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",align:"center",showing:false,className:"enyo-fit",components:[{name:"spinner",kind:"SpinnerLarge"},]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],_code:null,_pollTimer:null,_codeHandled:false,create:function(){
this.inherited(arguments);
},showConnectMainView:function(){
this._stopPolling();
this.hideSpinner();
this.$.pane.selectViewByName("connectMainView");
},showLicenseAgreement:function(){
var _1=enyo.fetchAppInfo();
var _2=_1.licenseurl;
enyo.application.services.openWebsite(_2,enyo.bind(this,function(_3){
if(!_3){
this.$.errorDialog.showError();
}
}));
},startConnect:function(){
this.showSpinner();
this._codeHandled=false;
pc.Log.info("requesting broker code");
EBayBroker.getAuthCode(enyo.bind(this,this.gotAuthCode),enyo.bind(this,this.authCodeFailed));
},gotAuthCode:function(_json){
this.hideSpinner();
pc.Log.info("getAuthCode reply:",JSON.stringify(_json));
try{
if(!_json||!_json.code||!_json.useUrl){
this.authCodeFailed();
return;
}
this._code=_json.code;
this._pollMs=(_json.pollSeconds?_json.pollSeconds:3)*1000;
this.$.codeUrl.setContent(_json.useUrl);
this.$.codeValue.setContent(_json.code);
this.$.codeStatus.setContent($L("Waiting for you to finish signing in…"));
this.$.pane.selectViewByName("codeView");
this._startPolling();
}
catch(e){
pc.Log.logException(e);
this.authCodeFailed();
}
},authCodeFailed:function(_err){
this.hideSpinner();
this.$.errorDialog.showError({errorShortMessage:$L("Could not start sign-in. Please check your connection and try again.")});
},_startPolling:function(){
this._stopPolling();
this._pollTimer=setInterval(enyo.bind(this,this._poll),this._pollMs||3000);
},_stopPolling:function(){
if(this._pollTimer){
clearInterval(this._pollTimer);
this._pollTimer=null;
}
},_poll:function(){
if(this._codeHandled||!this._code){
return;
}
EBayBroker.checkAuthCode(this._code,enyo.bind(this,this.checkedCode),enyo.bind(this,this.checkFailed));
},checkNowTapped:function(){
this.$.codeStatus.setContent($L("Checking…"));
this._poll();
},checkedCode:function(_json){
if(this._codeHandled){
return;
}
if(_json&&_json.status=="ready"&&_json.access_token){
pc.Log.info("tokens received, finishing login");
this._captureTokens(_json);
return;
}
this.$.codeStatus.setContent($L("Waiting for you to finish signing in…"));
},checkFailed:function(_err){
if(this._codeHandled){
return;
}
if(_err&&_err.httpStatus==404){
this._stopPolling();
this.$.codeStatus.setContent($L("That code expired. Tap Cancel, then Log In again."));
return;
}
this.$.codeStatus.setContent($L("Waiting for you to finish signing in…"));
},_captureTokens:function(_json){
this._codeHandled=true;
this._stopPolling();
enyo.application.preferences.data.user.access_token=_json.access_token;
enyo.application.preferences.data.user.refresh_token=_json.refresh_token||"";
enyo.application.preferences.data.user.tokenExpiry=(new Date()).getTime()+((_json.expires_in||3600)*1000);
enyo.application.preferences.setPreferences();
this.showConnectMainView();
enyo.nextTick(enyo.bind(this,this.doConnected));
},cancelConnect:function(){
this._stopPolling();
this._code=null;
this.showConnectMainView();
},showSpinner:function(){
this.$.mainViewScrim.show();
this.$.spinnerContainer.show();
this.$.spinner.show();
},hideSpinner:function(){
this.$.mainViewScrim.hide();
this.$.spinnerContainer.hide();
this.$.spinner.hide();
}});
