enyo.kind({name:"amhd.SearchResultList",kind:"amhd.ArticleListBase",published:{searchTerm:null,sortOrder:null,},_isSearching:false,create:function(){
if(!this.sortOrder){
this.sortOrder=EBayConstants.SortOrder.BEST_MATCH;
}
this.inherited(arguments);
this.$.listEmptyMessage.setContent($L("No articles were found for your search."));
this.$.toolbar.createComponent({kind:"ToolButton",caption:$L("Sort By"),onclick:"openSortOrderMenu",owner:this});
var _1=[{caption:$L("Time: ending soonest"),sortOrder:EBayConstants.SortOrder.END_TIME_SOONEST},{caption:$L("Time: newly listed"),sortOrder:EBayConstants.SortOrder.START_TIME_NEWEST},{caption:$L("Price + shipping: lowest first"),sortOrder:EBayConstants.SortOrder.PRICE_PLUS_SHIPPING_LOWEST},{caption:$L("Price + shipping: highest first"),sortOrder:EBayConstants.SortOrder.PRICE_PLUS_SHIPPING_HIGHEST},{caption:$L("Price: highest first"),sortOrder:EBayConstants.SortOrder.CURRENT_PRICE_HIGHEST},{caption:$L("Distance: nearest first"),sortOrder:EBayConstants.SortOrder.DISTANCE_NEAREST},{caption:$L("Best match"),sortOrder:EBayConstants.SortOrder.BEST_MATCH},];
for(var i in _1){
var _2=_1[i];
if(_2.sortOrder==this.sortOrder){
_2.checked=true;
}
}
this.createComponent({name:"sortOrderMenu",kind:"PopupSelect",defaultKind:"MenuCheckItem",onSelect:"sortOrderSelected",owner:this,items:_1});
this._appDataList=enyo.application.appdata.searchList;
this._auctionList=enyo.application.ebaydata.data.searchResult;
},openSortOrderMenu:function(_3){
this.$.sortOrderMenu.openAtControl(_3,{left:15,top:-28});
},sortOrderSelected:function(_4,_5){
for(var i in _4.controls){
var _6=_4.controls[i];
if(_6.checked){
_6.setChecked(false);
}
}
_5.setChecked(true);
if(this.sortOrder!=_5.sortOrder){
this.sortOrder=_5.sortOrder;
this.reload();
}
},searchStarted:function(){
this.log("searchStarted");
this._isSearching=true;
this.refresh();
},searchCompleted:function(){
this.log("searchCompleted");
this._isSearching=false;
this.refresh();
},acquirePage:function(_7,_8){
this.log("acquiring page no "+_8);
if(!this.searchTerm){
return false;
}
if(_8>=0){
var _9=_8*this.PAGESIZE;
if(_9>this._auctionList.count){
return true;
}
if(this._auctionList.items[_9]&&this._auctionList.items[_9+this.PAGESIZE]){
return true;
}
enyo.application.ebaydata.findItemsAdvanced(this.searchTerm,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,_9,this.PAGESIZE,this.sortOrder,enyo.bind(this,function(_a,_b){
if(_a){
this.log("page no "+_8+"loaded, current list length: "+this._auctionList.items.length);
this.$.articleList.refresh();
}else{
this.$.errorDialog.showError(_b);
}
}));
return true;
}
return false;
},refresh:function(){
this.$.headerTitle.setContent($L("Search results for <strong>#{v}</strong>").interpolate({v:this.searchTerm}));
this.$.headerIcon.setSrc("enyo/images/mainlist/"+this._appDataList.icon+".png");
this._selectedRow=-1;
if(this._isSearching){
this.doArticleSelected(null);
this.hideListShowSpinner();
}else{
this.showListHideSpinner();
}
},reload:function(){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
enyo.application.ebaydata.invalidateSearchResult();
enyo.application.ebaydata.findItemsAdvanced(this.searchTerm,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,0,50,this.sortOrder,enyo.bind(this,function(_c,_d){
this.searchCompleted();
if(_c){
this.$.articleList.refresh();
}else{
this.$.errorDialog.showError(_d);
}
}));
this.searchStarted();
}else{
var _e={errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION};
this.$.errorDialog.showError(_e);
}
},});

