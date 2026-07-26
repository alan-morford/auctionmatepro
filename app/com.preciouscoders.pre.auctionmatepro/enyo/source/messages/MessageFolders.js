enyo.kind({name:"amhd.MessageFolders",kind:"VFlexBox",events:{onFolderSelected:"",},components:[{kind:"VFlexBox",flex:1,className:"common-anchor",components:[{kind:"Header",content:$L("Folders")},{className:"header-shadow"},{name:"list",kind:"VirtualList",flex:1,onSetupRow:"setupListItem",components:[{name:"listItem",kind:"Item",tapHighlight:true,align:"center",layoutKind:"HFlexLayout",onclick:"itemClick",components:[{kind:"Image",src:"enyo/images/messages-folder.png",className:"messagefolder-icon"},{kind:"VFlexBox",flex:1,components:[{name:"folderTitle"},{name:"totalCount",className:"messagefolder-totalcount"},]},{name:"unreadCount",className:"messagefolder-badge"}]},]},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",showing:false,className:"common-lightscrim common-partialscrim",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{name:"toolbar",kind:"Toolbar",components:[{name:"reloadButton",icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"reload"},]},]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],_selectedRow:-1,_selectedItem:null,_items:null,create:function(){
this.inherited(arguments);
},reload:function(){
this.$.spinnerContainer.show();
this.$.spinner.show();
enyo.application.ebaydata.getMessageFolders(true,enyo.bind(this,function(_1,_2){
this.$.spinnerContainer.hide();
this.$.spinner.hide();
if(_1){
this._items=_2.folders;
if(!this._selectedItem&&this._items.length){
this._selectedRow=0;
this._selectedItem=this._items[this._selectedRow];
this.doFolderSelected(this._selectedItem);
}
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
this.$.folderTitle.setContent(_5.folderName);
this.$.unreadCount.setContent(_5.newMessageCount);
this.$.totalCount.setContent($L("#{totalMessageCount} messages").interpolate(_5));
this.$.listItem.addRemoveClass("common-list-activeitem",this._selectedRow==_4);
return true;
}
},itemClick:function(_6,_7){
this._selectedRow=_7.rowIndex;
this._selectedItem=this._items[this._selectedRow];
this.doFolderSelected(this._selectedItem);
this.$.list.refresh();
},updateFolder:function(_8){
this.log("updateFolder called [inFolder.folderId="+_8.folderId+"]");
for(var i=0;i<this._items.length;i++){
if(_8.folderId==this._items[i].folderId){
this._items[i]=_8;
this.$.list.refresh();
return;
}
}
}});

