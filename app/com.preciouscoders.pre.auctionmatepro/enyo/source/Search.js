enyo.kind({name:"amhd.Search",kind:"enyo.VFlexBox",style:"position: relative",events:{onOpenImageView:"",onOpenSellerInfo:"",},published:{searchTerm:null,},components:[{kind:"VFlexBox",className:"enyo-fit",components:[{kind:"Spacer"},{className:"footer-shadow"},{kind:"Toolbar"}]},{name:"slidingPane",kind:"SlidingPane",flex:1,onSelectView:"slidingSelected",onSlideComplete:"slidingComplete",components:[{name:"left",width:"400px",components:[{name:"articleList",kind:"amhd.SearchResultList",flex:1,onArticleSelected:"articleSelected",onEmptyArticle:"emptyArticle"}]},{name:"right",flex:1,peekWidth:85,components:[{name:"article",kind:"amhd.Article",flex:1,onOpenImageView:"doOpenImageView",onOpenSellerInfo:"doOpenSellerInfo"}]}]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],create:function(){
this.inherited(arguments);
if(this.searchTerm){
this.searchTermChanged();
}
},searchTermChanged:function(){
this.log("searching for "+this.searchTerm);
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
enyo.application.ebaydata.invalidateSearchResult();
enyo.application.ebaydata.findItemsAdvanced(this.searchTerm,this.$.articleList.filters,0,50,this.$.articleList.sortOrder,enyo.bind(this,function(_1,_2){
this.log("search completed, success: "+_1);
this.log(_2);
this.$.articleList.searchCompleted();
if(!_1){
this.$.errorDialog.showError(_2);
}
}));
this.$.articleList.setSearchTerm(this.searchTerm);
this.$.articleList.searchStarted();
}else{
var _3={errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION};
this.$.errorDialog.showError(_3);
}
},articleSelected:function(_4,_5){
this.$.article.setArticle(_5);
},emptyArticle:function(){
this.$.article.emptyArticle();
},});

