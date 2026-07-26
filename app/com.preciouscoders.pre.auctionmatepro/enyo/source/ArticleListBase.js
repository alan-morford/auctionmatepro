enyo.kind({name:"amhd.ArticleListBase",kind:"VFlexBox",events:{onArticleSelected:"",onEmptyArticle:"",},flex:1,components:[{kind:"Header",components:[{name:"headerIcon",kind:"Image",className:"articlelist-headericon"},{name:"headerTitle",allowHtml:true,flex:1},{name:"lastUpdate",className:"articlelist-lastupdate"}]},{className:"header-shadow"},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",className:"common-spinnercontainer",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{name:"spinnerSpacer",kind:"Spacer"},{name:"articleList",kind:"VirtualList",flex:1,onSetupRow:"setupListItem",onAcquirePage:"acquirePage",pageSize:25,lookAhead:1,components:[{name:"listItem",kind:"SwipeableItem",swipeable:false,confirmRequired:true,confirmCaption:$L("Remove"),onConfirm:"itemSwipedConfirm",tapHighlight:true,layoutKind:"HFlexLayout",align:"center",onclick:"itemClick",components:[{name:"articleListItem",kind:"amhd.ArticleListItem",flex:1}]},{name:"rightnowonebayImage",kind:"HFlexBox",pack:"center",style:"padding-top: 24px",components:[{kind:"Image",src:"enyo/images/ebayrightnow-en.png"},]},]},{name:"listEmptyMessageContainer",kind:"VFlexBox",showing:false,flex:1,pack:"center",align:"center",components:[{name:"listEmptyMessage",className:"articlelist-emptylisttext"},]},{name:"toolbar",kind:"Toolbar",components:[{kind:"GrabButton"},{name:"reloadButton",icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"reload"},]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],PAGESIZE:25,_appDataList:null,_auctionList:null,_selectedRow:-1,_lastSelectedArticleId:null,create:function(){
this.inherited(arguments);
},setupListItem:function(_1,_2){
if(!this._auctionList){
return;
}
var _3=this._auctionList.items[_2];
if(_3){
this.$.listItem.canGenerate=true;
this.$.rightnowonebayImage.canGenerate=false;
if(this._selectedRow==-1&&this._lastSelectedArticleId!=null){
var _4=typeof (this._lastSelectedArticleId)!="object"?this._lastSelectedArticleId:this._lastSelectedArticleId[0];
var _5=typeof (_3.itemId)!="object"?_3.itemId:_3.itemId[0];
if(_4==_5){
this._selectedRow=_2;
this.doArticleSelected(this._auctionList.items[this._selectedRow]);
}
}
this.$.listItem.addRemoveClass("common-list-activeitem",this._selectedRow==_2);
this.$.articleListItem.setListName(this._appDataList.listName);
this.$.articleListItem.setArticle(_3);
return true;
}else{
if(this._auctionList.count==_2){
this.$.listItem.canGenerate=false;
this.$.rightnowonebayImage.canGenerate=true;
return true;
}
}
if(this._selectedRow==-1){
this._lastSelectedArticleId=null;
this.doEmptyArticle();
}
},itemClick:function(_6,_7){
this._selectedRow=_7.rowIndex;
this._lastSelectedArticleId=this._auctionList.items[this._selectedRow].itemId;
this.doArticleSelected(this._auctionList.items[this._selectedRow]);
this.$.articleList.refresh();
},reload:function(){
this.log("reload tap");
},acquirePage:function(_8,_9){
},itemSwipedConfirm:function(_a,_b){
},hideListShowSpinner:function(){
this.$.articleList.hide();
this.$.listEmptyMessageContainer.hide();
this.$.spinnerContainer.show();
this.$.spinner.show();
this.$.spinnerSpacer.show();
},showListHideSpinner:function(){
this.$.spinnerContainer.hide();
this.$.spinner.hide();
this.$.spinnerSpacer.hide();
if(this._auctionList.count>0){
this.$.listEmptyMessageContainer.hide();
this.$.articleList.show();
this.$.articleList.refresh();
this.$.articleList.punt();
if(this._selectedRow==-1){
this._lastSelectedArticleId=null;
this.doEmptyArticle();
}
}else{
this.$.articleList.hide();
this.$.listEmptyMessageContainer.show();
}
},showSpinner:function(){
this.$.spinnerContainer.show();
this.$.spinner.show();
},hideSpinner:function(){
this.$.spinnerContainer.hide();
this.$.spinner.hide();
},});

