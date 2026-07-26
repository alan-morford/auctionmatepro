enyo.kind({name:"amhd.MainList",kind:"VFlexBox",flex:1,published:{selectedList:null},events:{onListSelected:"",onReloadTap:"",},components:[{kind:"Scroller",flex:1,components:[{name:"mainItemList",kind:"VirtualList",flex:1,onSetupRow:"setupMainItem",components:[{kind:"amhd.Divider"},{name:"mainItem",kind:"Item",tapHighlight:true,layoutKind:"HFlexLayout",align:"center",className:"mainlist-item",onclick:"itemClick",components:[{name:"image",kind:"Image",src:"enyo/images/mainlist/sold.png",className:"mainlist-icon"},{name:"caption",flex:1,className:"mainlist-listname"},{name:"count",className:"mainlist-numarticles"}]}]}]},{kind:"Toolbar",pack:"start",components:[{icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"doReloadTap"},]}],_selectedRow:-1,create:function(){
this.inherited(arguments);
enyo.application.ebaydata.registerUpdateModelCallback(enyo.application.ebaydata.registerUpdateModelCallbackType.ALL,enyo.bind(this,function(_1){
this.refresh();
}));
},setupMainItem:function(_2,_3){
var _4=enyo.application.appdata.lists[_3];
if(_4){
var _5=enyo.application.ebaydata.data.auctionlists[_4.listName];
var _6="";
if(_3>0){
_6=enyo.application.appdata.lists[_3-1].category;
}
if(_6!=_4.category){
this.$.divider.setCaption(_4.category);
this.$.divider.canGenerate=true;
}else{
this.$.divider.canGenerate=false;
}
this.$.image.setSrc("enyo/images/mainlist/"+_4.icon+".png");
this.$.caption.setContent(_4.listText);
if(_5.isLoading){
this.$.count.setContent("...");
}else{
this.$.count.setContent(_5.count);
}
this.$.mainItem.addRemoveClass("common-list-activeitem",this._selectedRow==_3);
return true;
}
},itemClick:function(_7,_8){
this._selectedRow=_8.rowIndex;
this.$.mainItemList.refresh();
this.doListSelected(enyo.application.appdata.lists[_8.rowIndex]);
},slideToPeek:function(_9){
this.$.mainItemList.addRemoveClass("mainlist-peek",_9);
},selectedListChanged:function(){
for(var i=0;i<enyo.application.appdata.lists.length;i++){
if(enyo.application.appdata.lists[i]==this.selectedList){
this._selectedRow=i;
this.$.mainItemList.refresh();
this.doListSelected(enyo.application.appdata.lists[i]);
break;
}
}
},refresh:function(){
this.$.mainItemList.refresh();
},});

