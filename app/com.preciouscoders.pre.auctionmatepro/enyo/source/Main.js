enyo.kind({name:"amhd.Main",kind:"enyo.VFlexBox",components:[{name:"mainPane",kind:"Pane",transitionKind:"enyo.transitions.Simple",flex:1,components:[{name:"mainView",kind:"VFlexBox",lazy:true,components:[{kind:"PageHeader",className:"main-header",components:[{name:"headerButtonPane",kind:"Pane",transitionKind:"enyo.transitions.Simple",layoutKind:"",components:[{name:"headerTabs",kind:"TabGroup",className:"common-radiogroup",value:"articles",onChange:"tabSelected",components:[{kind:"TabButton",content:$L("Articles"),icon:"enyo/images/toolbar/article.png",value:"articles"},{kind:"TabButton",content:$L("Messages"),icon:"enyo/images/toolbar/message.png",value:"messages"},{kind:"TabButton",content:$L("Notifications"),icon:"enyo/images/toolbar/notification.png",value:"notifications"},]},{name:"headerSearchBack",kind:"ToolButton",showing:false,content:$L("Close Search Result"),onclick:"closeSearch"},{name:"headerSellerInfoBack",kind:"ToolButton",showing:false,content:$L("Back"),onclick:"closeSellerInfo"},]},{kind:"HFlexBox",align:"end",flex:1,className:"main-username",components:[{content:$L("User"),className:"main-username-label"},{name:"userName",className:"main-username-name"},]},{name:"searchInput",kind:"SearchInput",hint:$L("Enter Search Term"),onkeypress:"startSearch",selectAllOnFocus:true,changeOnInput:false}]},{className:"main-header-shadow"},{name:"contentPane",kind:"Pane",transitionKind:"enyo.transitions.Simple",flex:1,components:[{name:"tabContentPane",kind:"Pane",lazy:true,transitionKind:"enyo.transitions.Simple",flex:1,components:[{name:"articleView",kind:"amhd.ArticleView",lazy:true,onOpenImageView:"openImageView",onOpenSellerInfo:"openSellerInfo"},{name:"messagesView",kind:"amhd.MessagesView",lazy:true},{name:"notificationView",kind:"amhd.Notification",lazy:true},]},{name:"searchResultView",kind:"amhd.Search",lazy:true,onOpenImageView:"openImageView",onOpenSellerInfo:"openSellerInfo"},{name:"sellerInfoView",kind:"amhd.SellerInfo",lazy:true},]},]},{name:"unconnectedView",kind:"amhd.UnconnectedView",lazy:true,onOpenConnect:"openConnect",onOpenImageView:"openImageView"},{name:"imageView",kind:"amhd.ImageViewer",lazy:true,onClose:"closeImageView"},{name:"connectView",kind:"amhd.Connect",lazy:true,onConnected:"restart"},{name:"preferencesView",kind:"amhd.Preferences",lazy:true,onChanged:"restart"},]},{name:"aboutModal",kind:"ModalDialog",components:[{kind:"amhd.About",onClose:"aboutModalClose"},]},{name:"updatePopup",kind:"ModalDialog",lazy:false,components:[{name:"updatePopupContent",kind:"amhd.UpdatePopup",onDismiss:"updateDismissed",onInstall:"updateInstallTapped"},]},{kind:"AppMenu",scrim:true,components:[{kind:"EditMenu"},{caption:$L("Preferences & Accounts"),onclick:"openPreferences"},{caption:$L("Open New Card"),onclick:"openNewCard"},{caption:$L("About AuctionMate"),onclick:"aboutModalOpen"},]},{kind:"ApplicationEvents",onWindowRotated:"windowRotatedHandler",onWindowParamsChange:"windowParamsChangeHandler"},],create:function(){
this.inherited(arguments);
},launch:function(){
enyo.application.appdata.raiseAppEvent("Orientation",enyo.getWindowOrientation());
enyo.application.appdata.registerAppEvent("UserId",enyo.bind(this,function(){
this.$.userName.setContent(enyo.application.preferences.data.user.userId);
}));
enyo.application.appdata.registerAppEvent("Restart",enyo.bind(this,this.restart));
enyo.application.appdata.registerAppEvent("AppMuseumUpdateAvailable",enyo.bind(this,this.updateAvailable));
this.restartAfterInit();
},windowParamsChangeHandler:function(){
this.log("windowParamsChangeHandler called");
if(enyo.application.preferences){
if(enyo.application.preferences.getUserConnected()){
if(enyo.windowParams.search){
var _1=decodeURIComponent(enyo.windowParams.searchterm);
this.$.searchInput.setValue(_1);
this.startSearch(null,"start");
}else{
if(enyo.windowParams.openNotifications){
this.$.headerTabs.setValue("notifications");
this.tabSelected();
}
}
}else{
if(enyo.windowParams.search){
var _1=decodeURIComponent(enyo.windowParams.searchterm);
this.openUnconnected();
this.$.unconnectedView.startSearch(_1);
}
}
}
},restart:function(){
enyo.application.launcher.closeAllButThis();
enyo.application.launcher.eBayInit();
this.restartAfterInit();
},restartAfterInit:function(){
if(enyo.application.preferences.getUserConnected()){
this.$.mainPane.selectViewByName("mainView",true);
this.$.contentPane.selectViewByName("tabContentPane",true);
this.$.headerTabs.setValue("articles");
this.$.tabContentPane.selectViewByName("articleView",true);
this.$.userName.setContent(enyo.application.preferences.data.user.userId);
this.$.articleView.reload();
}else{
this.$.mainPane.selectViewByName("connectView",true);
}
},openNewCard:function(){
enyo.application.launcher.openNewMainCard();
},openUnconnected:function(){
this.$.mainPane.selectViewByName("unconnectedView",true);
},openConnect:function(){
this.$.mainPane.back();
this.$.mainPane.getView().resized();
},_isImageViewOpen:false,openImageView:function(_2,_3,_4){
this.$.mainPane.selectViewByName("imageView",true);
this._isImageViewOpen=true;
this.$.imageView.setImagesAndIndex(_3,_4);
},closeImageView:function(){
if(this._isImageViewOpen){
this.$.mainPane.back();
this._isImageViewOpen=false;
this.$.mainPane.getView().resized();
}
},startSearch:function(_5,_6){
var _7=this.prepareSearch(_6,this.$.searchInput);
if(_7){
this.mainViewStateGoto("search");
this.$.searchInput.forceBlur();
this.$.searchResultView.setSearchTerm(_7);
}
},prepareSearch:function(_8,_9){
if(_8=="start"||_8.charCode==13){
var _a=_9.getValue();
if(_a.length>1){
this.log("searching for "+_a);
return _a;
}
}
return false;
},closeSearch:function(){
this.mainViewStateBack();
},openSellerInfo:function(_b,_c){
this.log("opening seller info for "+_c.sellerID);
this.mainViewStateGoto("sellerinfo");
this.$.sellerInfoView.setArticle(_c);
},closeSellerInfo:function(){
this.mainViewStateBack();
},openAppMenuHandler:function(){
this.$.appMenu.open();
},closeAppMenuHandler:function(){
this.$.appMenu.close();
},aboutModalOpen:function(){
this.$.aboutModal.openAtCenter();
},aboutModalClose:function(){
this.$.aboutModal.close();
},updateAvailable:function(_updateInfo){
this.$.updatePopupContent.configure(_updateInfo);
this.$.updatePopup.openAtCenter();
},updateDismissed:function(){
this.$.updatePopup.close();
enyo.application.appdata.dismissUpdate();
},updateInstallTapped:function(_sender,_event){
this.$.updatePopup.close();
enyo.application.appdata.dismissUpdate();
// Per update.MD's flow: hand the download off to Preware, then get out
// of the way. Unlike EMU7800 (a native process that has to unlock its
// own .ipk before Preware can overwrite it), there's no file-lock reason
// for this JS card to close itself - it's done here anyway because
// that's what was asked for: launch Preware, give it a couple seconds to
// actually come up, then close this card via window.close() (the
// standard webOS-app self-close, not a normal browser tab close - webOS
// permits an app's own top-level document to close itself this way).
enyo.application.services.installViaPreware(_event.downloadUri,enyo.bind(this,function(_success){
if(_success){
setTimeout(function(){
window.close();
},2000);
}
}));
},openPreferences:function(){
this.$.mainPane.selectViewByName("preferencesView",true);
this.$.preferencesView.update();
},windowRotatedHandler:function(_d,_e){
console.log("windowRotated event: "+_e.orientation);
enyo.application.appdata.raiseAppEvent("Orientation",_e.orientation);
},tabSelected:function(){
var _f=this.$.headerTabs.getValue();
this.log("Tab selected: "+_f);
switch(_f){
case "articles":
this.$.tabContentPane.selectViewByName("articleView",true);
break;
case "messages":
this.$.tabContentPane.selectViewByName("messagesView",true);
this.$.messagesView.reload();
break;
case "reminders":
break;
case "notifications":
this.$.tabContentPane.selectViewByName("notificationView",true);
this.$.notificationView.reload();
break;
}
},_mainViewStates:[],mainViewStateGoto:function(_10){
this._mainViewStates.push(enyo.bind(this,this.mainViewStateBackFunction,this.$.searchInput.showing));
switch(_10){
case "article":
this.$.contentPane.selectViewByName("tabContentPane");
this.$.headerButtonPane.selectViewByName("headerTabs");
this.$.searchInput.show();
break;
case "search":
this.$.contentPane.selectViewByName("searchResultView");
this.$.headerButtonPane.selectViewByName("headerSearchBack");
this.$.searchInput.show();
break;
case "sellerinfo":
this.$.contentPane.selectViewByName("sellerInfoView");
this.$.headerButtonPane.selectViewByName("headerSellerInfoBack");
this.$.searchInput.hide();
break;
}
},mainViewStateBack:function(){
if(this._mainViewStates.length>0){
var _11=this._mainViewStates.pop();
_11();
}
},mainViewStateBackFunction:function(_12){
this.$.contentPane.back();
this.$.headerButtonPane.back();
this.$.searchInput.setShowing(_12);
this.$.contentPane.getView().resized();
},});

