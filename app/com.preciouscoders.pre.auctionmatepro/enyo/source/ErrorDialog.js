enyo.kind({name:"amhd.ErrorDialog",kind:"DialogPrompt",title:$L("An error occured"),message:$L("An error occured. Please try again later."),acceptButtonCaption:$L("Close"),onAccept:"errorDialogAccept",cancelButtonCaption:null,DEFAULTTITLE:$L("An error occured"),DEFAULTMESSAGE:$L("Please contact the support to get this error fixed."),_callbackAfterAccept:null,create:function(){
this.inherited(arguments);
},showError:function(_1){
this.error("An error occured, error details follow");
this.error(_1);
var _2=null;
var _3=null;
if(_1&&_1.errorCode){
switch(_1.errorCode){
case EBayConstants.ErrorCodes.COMMON_ERROR:
case EBayConstants.ErrorCodes.TIMEOUT:
case EBayConstants.ErrorCodes.REQUEST_ERROR:
case EBayConstants.ErrorCodes.EBAY_ERROR:
case EBayConstants.ErrorCodes.INVALID_KEYWORD:
case EBayConstants.ErrorCodes.CALL_LIMIT_REACHED:
case EBayConstants.ErrorCodes.DAILY_LIMIT_REACHED:
case EBayConstants.ErrorCodes.USER_LIMIT_REACHED:
case EBayConstants.ErrorCodes.USER_AGREEMENT_CHANGED:
case EBayConstants.ErrorCodes.USER_ACCOUNT_SUSPENDED:
case EBayConstants.ErrorCodes.USER_ACCOUNT_CLOSED:
_3=_1.errorShortMessage;
break;
case EBayConstants.ErrorCodes.SESSION_ID_EXPIRED:
case EBayConstants.ErrorCodes.TOKEN_EXPIRED:
case EBayConstants.ErrorCodes.TOKEN_REVOKED:
case EBayConstants.ErrorCodes.TOKEN_INVALID:
case EBayConstants.ErrorCodes.TOKEN_RETRIEVAL_WINDOW_EXPIRED:
enyo.application.preferences.deletePreferences();
_2=$L("eBay account");
_3:
_1.errorShortMessage;
this._callbackAfterAccept=enyo.bind(this,function(){
enyo.application.appdata.raiseAppEvent("Restart",null);
});
break;
case enyo.application.appdata.ErrorCodes.NO_CONNECTION:
_2=$L("No internet connection");
_3=$L("This application requires you to be connected to the internet. Please make sure you have internet connection and try again.");
break;
}
}
if(!_2){
_2=this.DEFAULTTITLE;
}
if(!_3){
if(_1.errorShortMessage){
_3=_1.errorShortMessage;
}else{
_3=this.DEFAULTMESSAGE;
}
}
this.open(_2,_3);
},errorDialogAccept:function(){
this.close();
if(this._callbackAfterAccept){
this._callbackAfterAccept();
}
this._callbackAfterAccept=null;
},});

