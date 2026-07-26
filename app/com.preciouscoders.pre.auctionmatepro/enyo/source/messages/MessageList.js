enyo.kind({name:"amhd.MessageList",kind:"VFlexBox",events:{onMessageSelected:"",},published:{folder:null,},components:[{kind:"VFlexBox",flex:1,className:"common-anchor",components:[{kind:"Header",components:[{kind:"Image"},{name:"folderName"},]},{className:"header-shadow"},{name:"list",kind:"VirtualList",flex:1,onSetupRow:"setupListItem",components:[{name:"listItem",kind:"Item",tapHighlight:true,layoutKind:"VFlexLayout",align:"stretch",onclick:"itemClick",components:[{kind:"HFlexBox",components:[{name:"messageFrom",content:"",flex:1,className:"messagelist-item-from"},{name:"messageDate",content:"",className:"messagelist-item-date"},]},{kind:"HFlexBox",components:[{name:"messageSubject",flex:1,className:"messagelist-item-subject"},{name:"messageFlag",kind:"Image",src:"enyo/images/messages-flag.png",className:"messagelist-item-flag"},]},]},]},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",showing:false,className:"common-lightscrim common-partialscrim",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{name:"toolbar",kind:"Toolbar",components:[{kind:"GrabButton"},{name:"reloadButton",icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"reload"},]},]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],_selectedRow:-1,_selectedItem:null,_items:null,create:function(){
this.inherited(arguments);
},folderChanged:function(){
this.$.folderName.setContent(this.folder.folderName);
this.reload();
},reload:function(){
this.$.spinnerContainer.show();
this.$.spinner.show();
enyo.application.ebaydata.getMessages(this.folder.folderId,true,enyo.bind(this,function(_1,_2){
this.$.spinnerContainer.hide();
this.$.spinner.hide();
if(_1){
for(var i=0;i<_2.messages.length;i++){
_2.messages[i].isAlert=false;
}
this._items=_2.messages;
this.$.list.refresh();
}else{
this.$.errorDialog.showError(_2);
}
}));
},setupListItem:function(_3,_4){
if(!this._items){
return false;
}
var _5=this._items[_4];
if(_5){
this.$.messageFrom.setContent(_5.sender);
this.$.messageDate.setContent(Formatters.formatDate(_5.receiveDate));
this.$.messageSubject.setContent(_5.subject);
this.$.listItem.addRemoveClass("common-list-activeitem",this._selectedRow==_4);
this.$.listItem.addRemoveClass("messagelist-item-unread",!_5.read);
if(_5.flag){
this.$.messageFlag.show();
}else{
this.$.messageFlag.hide();
}
return true;
}
},itemClick:function(_6,_7){
this._selectedRow=_7.rowIndex;
this._selectedItem=this._items[this._selectedRow];
if(this._items[this._selectedRow].read==false){
this.folder.newMessageCount--;
}
this._items[this._selectedRow].read=true;
enyo.application.ebaydata.markMessage(this._items[this._selectedRow].messageId,false,true,this._items[this._selectedRow].flagged,enyo.bind(this,function(_8){
this.log("mark message callback[success="+_8+"]");
}));
this.doMessageSelected(this._items[this._selectedRow],this.folder);
this.$.list.refresh();
},resetSelection:function(){
this._selectedRow=-1;
this._selectedItem=null;
}});

