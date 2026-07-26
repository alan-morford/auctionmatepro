enyo.kind({name:"amhd.ArticleList",kind:"amhd.ArticleListBase",published:{list:null,},_modelCallbackHandle:undefined,create:function(){
this.inherited(arguments);
this.$.listEmptyMessage.setContent($L("This list is empty."));
if(this.list!=null){
this.listChanged();
}
enyo.nextTick(enyo.bind(this,this.resized));
},listChanged:function(){
this._appDataList=this.list;
this._auctionList=enyo.application.ebaydata.data.auctionlists[this._appDataList.listName];
if(this._appDataList.listName==EBayData.lists.WATCH){
this.$.listItem.setSwipeable(true);
}else{
this.$.listItem.setSwipeable(false);
}
if(this._modelCallbackHandle){
enyo.application.ebaydata.unregisterUpdateModelCallback(this._modelCallbackHandle);
}
this._modelCallbackHandle=enyo.application.ebaydata.registerUpdateModelCallback(enyo.application.ebaydata.registerUpdateModelCallbackType.ALL,enyo.bind(this,function(_1){
this.refresh();
}));
this._lastSelectedArticleId=null;
this.refresh();
},acquirePage:function(_2,_3){
if(_3>=0){
var _4=_3*this.PAGESIZE;
if(_4>this._auctionList.count){
return true;
}
if(this._auctionList.items[_4]&&this._auctionList.items[_4+this.PAGESIZE]){
return true;
}
enyo.application.ebaydata.updateList(this.list.listName,_4,this.PAGESIZE,false,enyo.bind(this,function(_5,_6){
enyo.nextTick(enyo.bind(this,function(){
this.$.articleList.refresh();
}));
}));
return true;
}
return false;
},refresh:function(){
this.$.headerTitle.setContent(this._appDataList.listText);
this.$.headerIcon.setSrc("enyo/images/mainlist/"+this._appDataList.icon+".png");
this._selectedRow=-1;
if(this._auctionList.isLoading){
this.$.lastUpdate.setContent("");
this.doArticleSelected(null);
this.hideListShowSpinner();
}else{
this.updateLastUpdate();
this.showListHideSpinner();
}
},reload:function(){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
enyo.application.ebaydata.invalidateAuctionList(this._appDataList.listName);
enyo.application.ebaydata.updateList(this._appDataList.listName,0,50,true,enyo.bind(this,function(_7,_8){
if(!_7){
this.$.errorDialog.showError(_8);
}
}));
}else{
var _9={errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION};
this.$.errorDialog.showError(_9);
}
},itemSwipedConfirm:function(_a,_b){
if(this._appDataList.listName==EBayData.lists.WATCH){
this.log("removing item from watchlist, index: "+_b);
var _c=this._auctionList.items[_b];
this.showSpinner();
enyo.application.ebaydata.removeItemFromWatchList(_c.itemId,enyo.bind(this,function(_d,_e){
this.updateLastUpdate();
this.showListHideSpinner();
if(!_d){
this.$.errorDialog.showError(_e);
}
}));
}
},updateLastUpdate:function(){
if(this._auctionList.lastUpdate){
this.$.lastUpdate.setContent($L("Last Update")+": "+Formatters.formatDateLastUpdate(this._auctionList.lastUpdate));
}else{
this.$.lastUpdate.setContent("");
}
},});

