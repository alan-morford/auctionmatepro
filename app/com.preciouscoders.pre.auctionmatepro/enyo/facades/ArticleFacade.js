enyo.kind({name:"amhd.Facades.ArticleFacade",kind:enyo.Component,published:{article:null},create:function(){
this.inherited(arguments);
},getUserArticleStatus:function(){
if(enyo.application.ebaydata.data.user.userId){
if(this.article.listingType==EBayConstants.ListingTypes.FIXED_PRICE_ITEM||this.article.listingType==EBayConstants.ListingTypes.STORES_FIXED_PRICE){
if(this.article.quantityPurchased>1||(this.article.transaction&&this.article.transaction.quantityPurchased>1)){
return $L("You've purchased several of this items");
}else{
if(this.article.quantityPurchased==1||enyo.application.ebaydata.data.user.userId==this.article.highestBidderID||(this.article.transaction&&this.article.transaction.quantityPurchased==1)){
return $L("You've purchased this item");
}
}
}
if(enyo.application.ebaydata.data.user.userId==this.article.highestBidderID){
if(this.hasTimeLeft()){
if(this.article.isReserveMet){
return $L("You are the high bidder");
}else{
return $L("You are the high bidder, but the reserve isn't met");
}
}else{
if(this.article.isReserveMet){
return $L("You've won this item");
}else{
return $L("You've not met the reserve of this item");
}
}
}
if(this.article.maxBid){
if(this.article.maxBid<this.article.price){
if(this.hasTimeLeft()){
return $L("You've been outbid");
}else{
if(this.article.isReserveMet){
return $L("You've lost this item");
}else{
return $L("You've not met the reserve of this item");
}
}
}
}
if(enyo.application.ebaydata.data.user.userId==this.article.sellerID){
if(this.hasTimeLeft()){
return $L("Your item is on sale");
}else{
if(this.article.highestBidderID!=undefined&&(this.article.isReserveMet==undefined||this.article.isReserveMet)){
return $L("This item has been sold");
}else{
if(this.article.isReserveMet==false){
return $L("This item has not been sold, the reserve price was not met");
}else{
return $L("This item has not been sold");
}
}
}
}
}
return "";
},getTimeLeftLabel:function(){
if(this.hasTimeLeft()){
return $L("Time left:");
}else{
return $L("Ended:");
}
},getTimeLeft:function(){
if(this.hasTimeLeft()){
return Formatters.formatTimeLeft(this.article.timeLeft)+" ("+Formatters.formatDate(this.article.endTime)+")";
}else{
return Formatters.formatDate(this.article.endTime);
}
},getTimeLeftShort:function(){
if(this.hasTimeLeft()){
return Formatters.formatTimeLeft(this.article.timeLeft);
}else{
return $L("ended");
}
},hasTimeLeft:function(){
var _1=this.article.timeLeft;
if(!_1){
return undefined;
}else{
if(_1.y+_1.mn+_1.d+_1.m+_1.s==0){
return false;
}else{
return true;
}
}
},getEndTime:function(){
return Formatters.formatDate(this.article.endTime);
},getCondition:function(){
if(this.article.condition){
return this.article.condition;
}else{
return "--";
}
},getCategories:function(){
if(this.article.primaryCategoryName){
var _2=this.article.primaryCategoryName.split(":");
return _2.join(" &gt; ");
}else{
return "--";
}
},isBiddingAvailable:function(){
if(this.article.listingType==EBayConstants.ListingTypes.CHINESE){
return true;
}else{
return false;
}
},getCurrentPrice:function(_3){
return Formatters.formatPrice(this.article.price,this.article.currency,_3);
},getCurrentPriceLabel:function(){
if(this.article.bidCount==0){
return $L("Starting bid");
}else{
if(this.hasTimeLeft()||this.article.isReserveMet==false){
return $L("Current bid");
}else{
if(enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId==this.article.sellerID){
return $L("Sold for");
}else{
return $L("Winning bid");
}
}
}
},getCurrentPriceColorSuffix:function(){
if(enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId==this.article.highestBidderID){
if(this.article.isLostItem){
return "-red";
}else{
if(this.article.isReserveMet){
return "-green";
}else{
return "-red";
}
}
}
return "";
},getMaximumBidPrice:function(_4){
if(this.article.maxBid){
return Formatters.formatPrice(this.article.maxBid,this.article.maxBidCurrency,_4);
}else{
return "--";
}
},getReserveMet:function(){
if(this.article.isReserveMet==false){
return $L("Reserve not met");
}
return "";
},isBiddingButtonAvailable:function(){
if(enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId!=this.article.sellerID&&this.hasTimeLeft()&&this.isBiddingAvailable()){
return true;
}else{
return false;
}
},getMinimumToBid:function(_5){
return Formatters.formatPrice(this.article.minimumToBid,this.article.minimumToBidCurrency,_5);
},isUserHighBidder:function(){
return (enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId==this.article.highestBidderID);
},isBuyingAvailable:function(){
if(this.article.listingType==EBayConstants.ListingTypes.CHINESE){
if(this.article.buyItNowPrice!=undefined&&this.article.buyItNowAvailable){
return true;
}else{
return false;
}
}else{
return true;
}
},getPrice:function(_6){
if(this.article.listingType==EBayConstants.ListingTypes.CHINESE){
if(this.article.buyItNowPrice){
return Formatters.formatPrice(this.article.buyItNowPrice,this.article.buyItNowCurrency,_6);
}else{
return "--";
}
}else{
return this.getCurrentPrice(_6);
}
},getQuantityAvailable:function(){
return this.article.quantityAvailable;
},isBuyingButtonAvailable:function(){
if(enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId!=this.article.sellerID&&this.hasTimeLeft()&&this.isBuyingAvailable()&&!this.article.autoPay){
return true;
}else{
return false;
}
},getBuyingAdditionalInformation:function(){
if(enyo.application.ebaydata.data.user.userId&&this.hasTimeLeft()&&this.isBuyingAvailable()&&!(this.article.quantityPurchased>0||(this.article.transaction&&this.article.transaction.quantityPurchased>0))){
if(enyo.application.ebaydata.data.user.userId!=this.article.sellerID&&this.article.autoPay){
return $L("This item cannot be bought with AuctionMate since immediate payment is required.");
}else{
if(enyo.application.ebaydata.data.user.userId==this.article.sellerID){
return $L("You are the seller and cannot buy this item.");
}
}
}
return "";
},getQuantityAvailable:function(){
if(this.article.quantity!=undefined&&this.article.quantitySold!=undefined){
return this.article.quantity-this.article.quantitySold;
}else{
return 0;
}
},getBuyNowAmount:function(){
if(this.article.listingType==EBayConstants.ListingTypes.FIXED_PRICE_ITEM||this.article.listingType==EBayConstants.ListingTypes.STORES_FIXED_PRICE){
return this.article.price;
}else{
if(this.article.buyItNowPrice&&this.article.buyItNowAvailable){
return this.article.buyItNowPrice;
}else{
return "ERROR";
}
}
},getBuyNowCurrency:function(){
if(this.article.listingType==EBayConstants.ListingTypes.FIXED_PRICE_ITEM||this.article.listingType==EBayConstants.ListingTypes.STORES_FIXED_PRICE){
return this.article.currency;
}else{
if(this.article.buyItNowPrice&&this.article.buyItNowAvailable){
return this.article.buyItNowCurrency;
}else{
return "ERROR";
}
}
},isBestOfferAvailable:function(){
return false;
},getShippingCost:function(_7){
if(this.article.shippingCost===undefined){
return $L("see description");
}else{
if(this.article.shippingCost==0){
return $L("free");
}else{
return Formatters.formatPrice(this.article.shippingCost,this.article.shippingCurrency,_7);
}
}
},getSellerRating:function(){
if(this.article.sellerPositiveFeedbackPercent>-1){
return this.article.sellerFeedbackScore+" ("+this.article.sellerPositiveFeedbackPercent+$L("% positive")+")";
}else{
return this.article.sellerFeedbackScore;
}
},getTransactionPrice:function(_8){
if(this.article.transactionPrice){
return Formatters.formatPrice(this.article.transactionPrice,this.article.transactionPriceCurrency,_8);
}else{
return "--";
}
},getTotalTransactionPrice:function(_9){
if(this.article.transaction.totalPrice){
return Formatters.formatPrice(this.article.transaction.totalPrice,this.article.transaction.totalPriceCurrency,_9);
}else{
return "--";
}
},getTransactionTime:function(){
if(this.article.transactionTime){
return Formatters.formatDate(this.article.transactionTime);
}else{
return "--";
}
},getWatchCount:function(){
if(enyo.application.ebaydata.data.user.userId&&enyo.application.ebaydata.data.user.userId==this.article.sellerID){
if(!this.article.watchCount){
return "0";
}else{
return this.article.watchCount;
}
}else{
return "--";
}
},getTitleImageUrl:function(){
if(this.article.imageUrl&&this.article.imageUrl.length>0){
if(this.article.imageUrl[0]=="h"){
return this.article.imageUrl;
}else{
return this.article.imageUrl[0];
}
}else{
return false;
}
},getImageUrls:function(){
var _a=[];
var _b=(this.article.pictureUrls)?(this.article.pictureUrls):(this.article.imageUrls);
if(_b){
for(var i=0;i<_b.length;i++){
var _c=_b[i].replace("$","%24");
_a.push(_c);
}
}
return _a;
},getLastUpdate:function(){
if(this.article.lastUpdate){
return Formatters.formatDateLastUpdate(this.article.lastUpdate);
}else{
return "--";
}
},getDescriptionUrl:function(){
// WebView only supports setUrl(), not raw HTML content, so the seller's
// description HTML is loaded via a data: URI. Falls back to detailPageUrl
// (the real, live eBay item page) if a listing has no description text -
// there's no dead-URL fallback like the old DESC_URL pattern used to be.
if(this.article.description){
return "data:text/html;charset=utf-8,"+encodeURIComponent(this.article.description);
}
return this.article.detailPageUrl||"about:blank";
},getLocation:function(){
if(this.article.location){
return this.article.location;
}else{
return "--";
}
},getShipToLocations:function(){
if(this.article.shipToLocations){
return this.article.shipToLocations;
}else{
return "--";
}
},getPaymentMethods:function(){
if(this.article.paymentMethods){
return this.article.paymentMethods;
}else{
return "--";
}
},getSellerID:function(){
if(this.article.sellerID){
return this.article.sellerID;
}else{
return "--";
}
}});

