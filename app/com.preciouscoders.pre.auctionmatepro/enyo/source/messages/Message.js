enyo.kind({name:"amhd.Message",kind:"VFlexBox",published:{folder:null,message:null,},events:{onMessageStatusChanged:"",onMessageDeleted:"",},components:[{name:"messagePane",kind:"Pane",flex:1,transitionKind:"enyo.transitions.Simple",className:"message-main",components:[{name:"messageEmptyView",kind:"VFlexBox",components:[{kind:"VFlexBox",flex:1,align:"center",pack:"center",className:"message-empty",components:[{kind:"Image",src:"enyo/images/emptymessage.png",className:"message-emptyimage"},{content:$L("Select a Message to View"),className:"common-nocontenttext"}]},{kind:"Toolbar",components:[{kind:"GrabButton"},]},]},{name:"messageAvailableView",kind:"VFlexBox",components:[{kind:"Header",layoutKind:"VFlexLayout",align:"stretch",className:"message-header",components:[{kind:"HFlexBox",className:"message-headeritem",components:[{name:"messageFrom",flex:1,content:"",className:"message-from"},{name:"messageDate",content:"",className:"message-date"},]},{name:"subject",className:"message-subject message-headeritem"},{kind:"HFlexBox",pack:"center",components:[{name:"articleButton",kind:"Button",caption:$L("Show Article"),className:"message-articlebutton",onclick:"openArticle"},]},]},{className:"header-shadow"},{name:"messageDetails",kind:"Scroller",flex:1,className:"message-scroller",autoVertical:false,vertical:true,autoHorizontal:false,horizontal:false,components:[{name:"messageText",allowHtml:true,className:"message-text"},]},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",className:"common-lightscrim common-partialscrim",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{kind:"Toolbar",components:[{name:"toolbarGrabButton",kind:"GrabButton"},{name:"deleteButton",icon:"enyo/images/icons/menu-icon-delete.png",onclick:"deleteMessage"},{name:"markUnreadButton",content:$L("Mark As Unread"),onclick:"markMessageUnread"},]},]},]}],create:function(){
this.inherited(arguments);
this.messageChanged();
},messageChanged:function(){
if(this.message!=null){
this.$.messagePane.selectViewByName("messageAvailableView");
this.$.messageDetails.setScrollTop(0);
this.updateView();
this.$.spinnerContainer.show();
this.$.spinner.show();
var _1=this.message.read;
enyo.application.ebaydata.getMessage(this.message.messageId,this.message.isAlert,enyo.bind(this,function(_2,_3){
this.log("getMessage Callback called");
if(_2){
this.message=_3;
this.message.isAlert=this.isAlert;
this.message.read=_1;
this.updateView();
this.$.spinnerContainer.hide();
}else{
}
this.$.spinner.hide();
}));
}else{
this.$.messagePane.selectViewByName("messageEmptyView");
}
},updateView:function(){
this.$.subject.setContent(this.message.subject);
this.$.messageFrom.setContent(this.message.sender);
this.$.messageDate.setContent(Formatters.formatDate(this.message.receiveDate));
this.$.messageText.setContent(this.message.text);
this.log("this.message.read="+this.message.read);
if(this.message.read){
this.$.markUnreadButton.show();
}else{
this.$.markUnreadButton.hide();
}
if(this.message.itemId){
this.$.articleButton.show();
}else{
this.$.articleButton.hide();
}
},deleteMessage:function(){
this.log("deleteMessage");
enyo.application.ebaydata.deleteMessage(this.message.messageId,false,enyo.bind(this,function(_4){
this.log("delete message callback[success="+_4+"]");
if(_4){
this.doMessageDeleted(this.message);
}else{
}
}));
},markMessageUnread:function(){
this.log("markMessageUnread called");
enyo.application.ebaydata.markMessage(this.message.messageId,false,false,this.message.flagged,enyo.bind(this,function(_5){
this.log("mark message callback[success="+_5+"]");
if(_5){
this.message.read=false;
this.$.markUnreadButton.hide();
this.doMessageStatusChanged(this.message);
}else{
}
}));
},emptyMessage:function(){
this.$.messagePane.selectViewByName("messageEmptyView");
this.message=null;
this.folder=null;
},openArticle:function(){
if(this.message.itemId){
enyo.application.launcher.openArticleNewCard(this.message.itemId);
}
}});

