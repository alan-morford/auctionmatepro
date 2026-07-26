enyo.kind({name:"amhd.Article",kind:"enyo.VFlexBox",published:{article:null,},events:{onOpenImageView:"",onOpenSellerInfo:"",},components:[{name:"articlePane",kind:"Pane",flex:1,transitionKind:"enyo.transitions.Simple",className:"article-main",components:[{name:"articleEmptyView",kind:"VFlexBox",components:[{kind:"VFlexBox",flex:1,align:"center",pack:"center",className:"article-empty",components:[{kind:"Image",src:"enyo/images/emptyarticle.png",className:"article-emptyimage"},{content:$L("Select an Article to View"),className:"common-nocontenttext"}]},{kind:"Toolbar",components:[{kind:"GrabButton"},]},]},{name:"articleAvailableView",lazy:true,kind:"VFlexBox",className:"article-background common-anchor",components:[{name:"header",kind:"Header",content:"",className:"article-userArticleStatus article-userArticleStatus-high"},{kind:"HFlexBox",pack:"center",className:"article-detailsdescriptionswitch",components:[{name:"detailDescriptionSwitch",kind:"RadioGroup",onChange:"showDetailsOrDescription",components:[{caption:$L("Details")},{caption:$L("Description")},]},]},{name:"articleDetails",kind:"Scroller",flex:1,autoVertical:false,vertical:true,autoHorizontal:false,horizontal:false,components:[{kind:"HFlexBox",components:[{flex:2,components:[{className:"article-titlearea",components:[{name:"title",content:"",className:"article-largetext"},]},{kind:"HFlexBox",className:"article-textarea",align:"start",components:[{flex:1,components:[{name:"timeLeft",kind:"amhd.KeyValuePair",key:$L("Time left:"),value:"",className:"article-smalltext"},{name:"condition",kind:"amhd.KeyValuePair",key:$L("Condition:"),value:"",className:"article-smalltext"},{name:"category",kind:"amhd.KeyValuePair",key:$L("Category:"),value:"",className:"article-smalltext"},]},{name:"addToCalendarButton",showing:false,kind:"IconButton",icon:"enyo/images/icons/calendar.png",onclick:"openPopup",popup:"addToCalendarPopup"},]},{name:"biddingArea",kind:"HFlexBox",className:"common-topline article-textarea",flex:1,align:"center",components:[{flex:1,components:[{kind:"HFlexBox",align:"end",pack:"start",components:[{name:"currentPriceLabel",content:$L("Current bid"),className:"article-smalltext"},{name:"currentPrice",allowHtml:true,className:"article-largetext"},]},{kind:"HFlexBox",name:"maxBidBox",align:"end",pack:"start",components:[{content:$L("Your maximum bid"),className:"article-smalltext"},{name:"maxBidPrice",allowHtml:true,className:"article-smalltext"},]},{name:"reserveNotMet",content:$L("Reserve not met"),className:"article-smalltext-light"},]},{name:"bidButton",kind:"Button",caption:$L("Place Bid"),className:"article-bidbuybutton",onclick:"openPopup",popup:"placeBidPopup"},]},{name:"buyingArea",kind:"HFlexBox",className:"common-topline article-textarea",flex:1,align:"center",components:[{flex:1,components:[{kind:"HFlexBox",align:"end",pack:"start",components:[{content:$L("Buy It Now"),className:"article-smalltext"},{name:"buyPrice",allowHtml:true,className:"article-largetext"},]},{kind:"HFlexBox",align:"end",pack:"start",components:[{content:$L("Quantity available"),className:"article-smalltext-light"},{name:"numAvailable",className:"article-smalltext"},]},{name:"buyingAdditionalInformation",className:"article-smalltext-red"},]},{name:"buyButton",kind:"Button",caption:$L("Buy Now"),className:"article-bidbuybutton",onclick:"openPopup",popup:"buyNowPopup"},]},]},{name:"sellerAndItemDetailsTwoCol",className:"article-backbox-group",flex:1,components:[{className:"article-backbox",components:[{name:"sellerName1",kind:"amhd.KeyValuePair",key:$L("Seller:"),value:"",className:"article-smalltext",stacked:true},{kind:"HFlexBox",align:"center",pack:"start",components:[{name:"sellerRating1",content:"",className:"article-smalltext"},]},{name:"openSellerInfoButton1",kind:"Button",caption:$L("Seller Info"),onclick:"openSellerInfo"},]},{className:"article-backbox",components:[{name:"itemNumber1",kind:"amhd.KeyValuePair",key:$L("Item number:"),value:"",className:"article-smalltext",stacked:true},{name:"itemLocation1",kind:"amhd.KeyValuePair",key:$L("Item location:"),value:"",className:"article-smalltext",stacked:true},{name:"itemShipsTo1",kind:"amhd.KeyValuePair",key:$L("Ships to:"),value:"",className:"article-smalltext",stacked:true},{name:"itemPaymentMethods1",kind:"amhd.KeyValuePair",key:$L("Payments:"),value:"",className:"article-smalltext",stacked:true},]},]},]},{name:"imageScroller",kind:"Scroller",className:"common-topline article-imagescroller",layoutKind:"HFlexLayout",autoVertical:false,vertical:false,autoHorizontal:true,horizontal:true,onclick:"openImageViewer",components:[{kind:"Image",className:"article-imagescroller-image",showing:false,index:0},{kind:"Image",className:"article-imagescroller-image",showing:false,index:1},{kind:"Image",className:"article-imagescroller-image",showing:false,index:2},{kind:"Image",className:"article-imagescroller-image",showing:false,index:3},{kind:"Image",className:"article-imagescroller-image",showing:false,index:4},{kind:"Image",className:"article-imagescroller-image",showing:false,index:5},{kind:"Image",className:"article-imagescroller-image",showing:false,index:6},{kind:"Image",className:"article-imagescroller-image",showing:false,index:7},{kind:"Image",className:"article-imagescroller-image",showing:false,index:8},{kind:"Image",className:"article-imagescroller-image",showing:false,index:9},]},{name:"sellerAndItemDetailsOneCol",flex:1,components:[{kind:"HFlexBox",className:"common-topline article-textarea",align:"center",components:[{flex:1,components:[{name:"sellerName2",kind:"amhd.KeyValuePair",key:$L("Seller:"),value:"",className:"article-smalltext",stacked:true},{kind:"HFlexBox",align:"center",pack:"start",components:[{name:"sellerRating2",content:"",className:"article-smalltext"},]},]},{name:"openSellerInfoButton2",kind:"Button",caption:$L("Seller Info"),className:"article-bidbuybutton",onclick:"openSellerInfo"},]},{className:"common-topline article-textarea",components:[{name:"itemNumber2",kind:"amhd.KeyValuePair",key:$L("Item number:"),value:"",className:"article-smalltext"},{name:"itemLocation2",kind:"amhd.KeyValuePair",key:$L("Item location:"),value:"",className:"article-smalltext"},{name:"itemShipsTo2",kind:"amhd.KeyValuePair",key:$L("Ships to:"),value:"",className:"article-smalltext"},{name:"itemPaymentMethods2",kind:"amhd.KeyValuePair",key:$L("Payments:"),value:"",className:"article-smalltext"},]},]},{kind:"HFlexBox",pack:"center",components:[{kind:"Image",src:"enyo/images/ebayrightnow-en.png"},]},]},{name:"articleDescription",kind:"VFlexBox",flex:1,showing:false,className:"common-anchor",components:[{name:"descriptionWebView",kind:"WebView",flex:1,enableJavascript:false,blockPopups:true,acceptCookies:false,onLoadStarted:"descriptionLoadStarted",onLoadStopped:"descriptionLoadStopped",onLoadComplete:"descriptionLoadStopped",},{name:"descriptionSpinner",kind:"Spinner",className:"article-descriptionspinner"},]},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",className:"common-lightscrim common-partialscrim",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{kind:"Toolbar",components:[{name:"toolbarGrabButton",kind:"GrabButton"},{name:"toolbarAddToWatchListButton",icon:"enyo/images/toolbar/addtowatchlist.png",className:"common-hidden",onclick:"addToWatchList"},{icon:"enyo/images/toolbar/web.png",onclick:"openArticleWebsite"},{name:"toolbarOpenCardButton",icon:"enyo/images/toolbar/card.png",onclick:"openArticleNewCard"},{icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"reload"},{name:"lastUpdate",kind:"Control",allowHtml:true,className:"article-lastupdate",content:""}]},{name:"placeBidPopup",kind:"Popup",showHideMode:"transition",openClassName:"popup-scaleFadeIn",scrim:true,modal:true,className:"popup-transitioner popup-general",lazy:false,components:[{name:"placeBidPopupContent",kind:"amhd.PlaceBidPopup",onCancel:"closePopup",onPlaceBidSuccessful:"placeBidSuccessful"}]},{name:"buyNowPopup",kind:"Popup",showHideMode:"transition",openClassName:"popup-scaleFadeIn",scrim:true,modal:true,className:"popup-transitioner popup-general",lazy:false,components:[{name:"buyNowPopupContent",kind:"amhd.BuyNowPopup",onCancel:"closePopup",onPlaceBidSuccessful:"placeBidSuccessful"}]},{name:"addToCalendarPopup",kind:"Popup",showHideMode:"transition",openClassName:"popup-scaleFadeIn",scrim:true,modal:true,className:"popup-transitioner popup-general",lazy:false,components:[{name:"addToCalendarPopupContent",kind:"amhd.AddToCalendarPopup",onClose:"closePopup"}]},]},]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],_articleFacade:null,_viewSize:"small",_descriptionLoading:false,_previousArticle:null,_isLoading:false,create:function(){
this.inherited(arguments);
enyo.application.appdata.registerAppEvent("Orientation",enyo.bind(this,this.updateOrientation));
this._articleFacade=new amhd.Facades.ArticleFacade(),this.articleChanged();
},articleChanged:function(){
this.log("setArticle called");
if(this.article!=null){
this.log("showing article "+this.article.itemId);
this._isLoading=true;
this.$.articlePane.selectViewByName("articleAvailableView");
this.$.articleDetails.setScrollTop(0);
this.updateLayout();
this._articleFacade=new amhd.Facades.ArticleFacade({article:this.article});
this.updateView();
this.$.spinnerContainer.show();
this.$.spinner.show();
this._descriptionLoading=false;
if(!enyo.application.runInBrowser){
this.$.descriptionWebView.stopLoad();
this.$.descriptionWebView.setUrl("about:blank");
this.$.descriptionWebView.render();
}
this.$.detailDescriptionSwitch.setValue(0);
this.showDetailsOrDescription();
enyo.application.ebaydata.getItem(this.article.itemId,this.article.transaction,enyo.bind(this,function(_1,_2){
this.log("loadArticleCallback called");
if(_1){
if(this.article&&this.article.itemId==_2.itemId){
this._isLoading=false;
this.article=_2;
this._articleFacade=new amhd.Facades.ArticleFacade({article:this.article});
this.updateView();
this.$.spinner.hide();
}
}else{
this.$.errorDialog.showError(_2);
}
this.$.spinnerContainer.hide();
}));
}else{
if(this._previousArticle!=null){
this.$.articlePane.selectViewByName("articleAvailableView");
this.$.spinnerContainer.show();
this.$.spinner.show();
}else{
this.$.articlePane.selectViewByName("articleEmptyView");
}
}
this._previousArticle=this.article;
},emptyArticle:function(){
this.$.articlePane.selectViewByName("articleEmptyView");
this._previousArticle=null;
this.article=null;
},reload:function(_3){
this.log("reload called(inTriggerModelUpdate="+_3+")");
this.setArticle(this.article);
},showDetailsOrDescription:function(){
var _4=this.$.detailDescriptionSwitch.getValue();
if(_4==0){
this.$.articleDetails.show();
this.$.articleDescription.hide();
}else{
if(!this._descriptionLoading){
this._descriptionLoading=true;
this.$.descriptionWebView.setUrl(this._articleFacade.getDescriptionUrl());
this.$.descriptionWebView.render();
}
this.$.articleDetails.hide();
this.$.articleDescription.show();
}
},updateView:function(){
this.log("updateView called");
var _5=this._articleFacade.getUserArticleStatus();
this.$.header.setShowing(_5);
this.$.header.setContent(_5);
this.$.title.setContent(this._articleFacade.article.title);
this.$.timeLeft.setKey(this._articleFacade.getTimeLeftLabel());
this.$.timeLeft.setValue(this._articleFacade.getTimeLeft());
this.$.addToCalendarButton.setShowing(this._articleFacade.hasTimeLeft());
this.$.condition.setValue(this._articleFacade.getCondition());
this.$.category.setValue(this._articleFacade.getCategories());
if(this._articleFacade.isBiddingAvailable()){
this.$.biddingArea.show();
this.$.currentPriceLabel.setContent(this._articleFacade.getCurrentPriceLabel());
this.$.currentPrice.setContent(this._articleFacade.getCurrentPrice(true));
this.$.maxBidBox.setShowing(this.article.maxBid);
this.$.maxBidPrice.setContent(this._articleFacade.getMaximumBidPrice());
this.$.reserveNotMet.setContent(this._articleFacade.getReserveMet());
if(this._articleFacade.isBiddingButtonAvailable()&&!this._isLoading){
this.$.bidButton.show();
}else{
this.$.bidButton.hide();
}
}else{
this.$.biddingArea.hide();
}
if(this._articleFacade.isBuyingAvailable()){
this.$.buyingArea.show();
this.$.buyPrice.setContent(this._articleFacade.getPrice(true));
this.$.numAvailable.setContent(this._articleFacade.getQuantityAvailable());
this.$.buyingAdditionalInformation.setContent(this._articleFacade.getBuyingAdditionalInformation());
if(this._articleFacade.isBuyingButtonAvailable()&&!this._isLoading){
this.$.buyButton.show();
}else{
this.$.buyButton.hide();
}
}else{
this.$.buyingArea.hide();
}
this.$.itemNumber1.setValue(this._articleFacade.article.itemId);
this.$.itemNumber2.setValue(this._articleFacade.article.itemId);
this.$.itemLocation1.setValue(this._articleFacade.getLocation());
this.$.itemLocation2.setValue(this._articleFacade.getLocation());
this.$.itemShipsTo1.setValue(this._articleFacade.getShipToLocations());
this.$.itemShipsTo2.setValue(this._articleFacade.getShipToLocations());
this.$.itemPaymentMethods1.setValue(this._articleFacade.getPaymentMethods());
this.$.itemPaymentMethods2.setValue(this._articleFacade.getPaymentMethods());
this.$.openSellerInfoButton1.setShowing(!this._isLoading);
this.$.openSellerInfoButton2.setShowing(!this._isLoading);
this.$.sellerName1.setValue(this._articleFacade.getSellerID());
this.$.sellerName2.setValue(this._articleFacade.getSellerID());
this.$.sellerRating1.setContent(this._articleFacade.getSellerRating());
this.$.sellerRating2.setContent(this._articleFacade.getSellerRating());
this.updateImageList(this._articleFacade.getImageUrls());
this.log("this._articleFacade.article.isWatching="+this._articleFacade.article.isWatching);
if(enyo.application.preferences.getUserConnected()){
if(this._articleFacade.article.isWatching==undefined){
this.$.toolbarAddToWatchListButton.addClass("common-hidden");
}else{
this.$.toolbarAddToWatchListButton.addRemoveClass("common-hidden",this._articleFacade.article.isWatching);
}
}else{
this.$.toolbarAddToWatchListButton.addClass("common-hidden");
}
if(this._articleFacade.article.lastUpdate){
this.$.lastUpdate.setContent($L("Last Update")+"<br/>"+this._articleFacade.getLastUpdate());
this.$.lastUpdate.removeClass("common-hidden");
}else{
this.$.lastUpdate.setContent($L("Last Update"));
this.$.lastUpdate.addClass("common-hidden");
}
this.log("updateView finished");
},updateImageList:function(_6){
this.$.imageScroller.setScrollLeft(0);
var _7=this.$.imageScroller.getControls();
for(var i=0;i<_7.length;i++){
if(_6[i]){
_7[i].setSrc(_6[i]);
_7[i].show();
}else{
_7[i].setSrc("");
_7[i].hide();
}
}
},placeBidSuccessful:function(_8){
enyo.application.ebaydata.updateBuyingLists(enyo.bind(this,function(_9,_a){
}));
_8.parent.close();
},openPopup:function(_b){
var _c=this.$[_b.popup];
var _d=this.$[_b.popup+"Content"];
if(_c&&_d){
_d.setArticleFacade(this._articleFacade);
_c.openAtCenter();
}
},closePopup:function(_e,_f){
if(_f=="error"){
this.reload(true);
}
_e.parent.close();
},setViewSize:function(_10){
var _11=(this._viewSize=="small"||this._viewSize=="medium")?"narrow":"wide";
var _12=(_10=="small"||_10=="medium")?"narrow":"wide";
var _13=_11!=_12;
this._viewSize=_10;
if(this.$.articleAvailableView){
this.$.imageScroller.setScrollLeft(0);
if(_13){
this.updateLayout();
}
}
},updateOrientation:function(_14){
this.resizeWebView();
},updateLayout:function(){
var _15=(this._viewSize=="small"||this._viewSize=="medium")?"narrow":"wide";
this.log("setting layout to "+_15);
if(_15=="wide"){
this.$.sellerAndItemDetailsTwoCol.show();
this.$.sellerAndItemDetailsOneCol.hide();
}else{
this.$.sellerAndItemDetailsTwoCol.hide();
this.$.sellerAndItemDetailsOneCol.show();
}
this.resizeWebView();
},resizeWebView:function(){
if(!enyo.application.runInBrowser&&this.$.descriptionWebView&&this.$.descriptionWebView.url){
this.log("current URL: "+this.$.descriptionWebView.url);
enyo.job("resizeWebView",enyo.bind(this,function(){
this.$.descriptionWebView.render();
enyo.asyncMethod(this,function(){
this.$.descriptionWebView.resize();
});
}),1000);
}
},descriptionLoadStarted:function(){
this.$.descriptionSpinner.show();
},descriptionLoadStopped:function(){
this.$.descriptionSpinner.hide();
},openImageViewer:function(_16,_17){
var _18=_17.dispatchTarget.index;
if(_18!==undefined){
var _19=this._articleFacade.getImageUrls();
this.log("opening image "+_18);
this.doOpenImageView(_19,_18);
}
},openSellerInfo:function(){
this.doOpenSellerInfo(this._articleFacade.article);
},addToWatchList:function(){
this.log("adding item to watchlist");
this.$.toolbarAddToWatchListButton.addClass("common-hidden");
this.$.spinnerContainer.show();
this.$.spinner.show();
var _1a=$L("Now watching #{title}.").interpolate({title:this.article.title});
var _1b=this.article;
enyo.application.ebaydata.addItemToWatchList(this.article.itemId,enyo.bind(this,function(_1c,_1d){
if(_1c){
this.log("adding item successful");
enyo.windows.addBannerMessage(_1a,"{}","enyo/images/icons/dashboard-24-color.png");
if(_1b){
_1b.isWatching=true;
}
enyo.nextTick(enyo.bind(this,this.reload));
}else{
this.log("adding item not successful");
this.$.spinnerContainer.hide();
this.$.spinner.hide();
this.$.toolbarAddToWatchListButton.removeClass("common-hidden");
this.$.errorDialog.showError(_1d);
}
}));
},openArticleWebsite:function(){
enyo.application.services.openWebsite(this.article.detailPageUrl,enyo.bind(this,function(_1e){
this.log("openArticleWebsite callback: "+_1e);
if(!_1e){
this.$.errorDialog.showError();
}
}));
},openArticleNewCard:function(){
enyo.application.launcher.openArticleNewCard(this.article.itemId);
},errorDialogOk:function(){
this.$.errorDialog.close();
},});

