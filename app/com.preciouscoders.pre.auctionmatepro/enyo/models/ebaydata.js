EBayData={};
EBayData.data={user:{userId:undefined,name:undefined,email:undefined,token:undefined,locale:undefined},auctionlists:{watch:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},bid:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},won:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},lost:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},bestOffer:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},active:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},sold:{count:undefined,items:[],lastUpdate:undefined,isLoading:true},unsold:{count:undefined,items:[],lastUpdate:undefined,isLoading:true}},messages:{flaggedMessageCount:undefined,newAlertCount:undefined,newMessageCount:undefined,totalAlertCount:undefined,totalMessageCount:undefined,unresolvedAlertCount:undefined,folders:[],},reminders:{buying:{feedbackToReceiveCount:undefined,feedbackToSendCount:undefined,outbidCount:undefined,paymentToSendCount:undefined},selling:{declinedRTERequestCount:undefined,docsForCCProcessingToSendCount:undefined,feedbackToReceiveCount:undefined,feedbackToSendCount:undefined,itemReceiptConfirmationToReceiveCount:undefined,itemReceiptToConfirmCount:undefined,paymentToReceiveCount:undefined,pendingRTERequestCount:undefined,refundCancelledCount:undefined,refundInitiatedCount:undefined,refundOnHoldCount:undefined,relistingNeededCount:undefined,RTEToProcessCount:undefined,secondChanceOfferCount:undefined,shippingDetailsToBeProvidedCount:undefined,shippingNeededCount:undefined,totalNewLeadsCount:undefined}},searchResult:{searchValue:undefined,filters:{},sortOrder:undefined,count:undefined,items:[],categories:[],aspectRefinements:[],lastUpdate:undefined,isLoading:true},sellerList:{userId:undefined,endTimeFrom:undefined,endTimeTo:undefined,count:undefined,items:[],lastUpdate:undefined},commentList:{userId:undefined,count:undefined,comments:[],lastUpdate:undefined},categories:undefined,itemsAwaitingFeedback:{count:undefined,items:[],lastUpdate:undefined,}};
EBayData.lists={WATCH:"watch",BID:"bid",WON:"won",LOST:"lost",BEST_OFFER:"bestOffer",ACTIVE:"active",SOLD:"sold",UNSOLD:"unsold"};
EBayData.searchList="search";
EBayData.sellerList="seller";
EBayData.noList="none";
EBayData.listArray=[EBayData.data.auctionlists.watch,EBayData.data.auctionlists.bid,EBayData.data.auctionlists.won,EBayData.data.auctionlists.lost,EBayData.data.auctionlists.bestOffer,EBayData.data.auctionlists.active,EBayData.data.auctionlists.sold,EBayData.data.auctionlists.unsold,];
EBayData._updateModelCallbacks=[];
EBayData.registerUpdateModelCallbackType={ALL:"all",BUYING:"buying",SELLING:"selling",};
EBayData.init=function(_1,_2,_3,_4){
pc.Log.info("EBayData.init called[token="+_2+", userId="+_3+", locale="+_1+"]");
this.invalidate();
this._initInternal(_1,_2,_4);
this.data.user.userId=_3;
this.data.user.email=undefined;
this.data.user.name=undefined;
try{
if(_2!=undefined){
EBayTradingLib.getUser(_2,_1,this._handleUser.bind(this,_4));
}
this.getCategories();
}
catch(e){
pc.Log.logException(e);
var _5={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-01b"};
pc.defer(_4.bind(this,false,_5));
}
};
EBayData.notificationInit=function(_6,_7){
pc.Log.info("EBayData.notificationInit called[token: "+_7+", locale: "+_6+"]");
this._initInternal(_6,_7,undefined);
};
EBayData._initInternal=function(_8,_9,_a){
try{
this.data.user.locale=this.getLocale(_8);
this.data.user.token=_9;
}
catch(e){
pc.Log.logException(e);
var _b={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-01"};
if(_a){
pc.defer(_a.bind(this,false,_b));
}
}
};
EBayData.getLocale=function(_c){
var _d=_c.substr(3).toUpperCase();
var _e=_c.substr(0,3);
if(EBayConfig.SITE_CONFIG[_d]!=undefined){
return _c;
}else{
return _e+"US";
}
};
EBayData.getSiteConfig=function(_f){
if(_f&&EBayConfig.SITE_CONFIG[_f]!=undefined){
return EBayConfig.SITE_CONFIG[_f];
}else{
var _10=this.data.user.locale.substr(3).toUpperCase();
if(EBayConfig.SITE_CONFIG[_10]!=undefined){
return EBayConfig.SITE_CONFIG[_10];
}else{
return EBayConfig.SITE_CONFIG["US"];
}
}
};
EBayData.registerUpdateModelCallback=function(_11,_12){
pc.Log.info("EBayData.registerUpdateModelCallback called[inChange="+_11+"]");
for(var i=0;i<this._updateModelCallbacks.length;i++){
var _13=this._updateModelCallbacks[i];
if(_13.callback===_12){
if(_13.change==_11||_13.change==this.registerUpdateModelCallbackType.ALL){
pc.Log.info("update model callback already registered");
}else{
pc.Log.info("changing model callback type to ALL");
_13.change=this.registerUpdateModelCallbackType.ALL;
}
return;
}
}
pc.Log.info("registering new update model callback");
var _14={callback:_12,change:_11};
this._updateModelCallbacks.push(_14);
return _14;
};
EBayData.unregisterUpdateModelCallback=function(_15){
pc.Log.info("EBayData.unregisterUpdateModelCallback called");
for(var i=0;i<this._updateModelCallbacks.length;i++){
var _16=this._updateModelCallbacks[i];
if(_16==_15){
this._updateModelCallbacks.pop(_16);
pc.Log.info("model callback removed");
return;
}
}
pc.Log.info("model callback not found");
};
EBayData._raiseModelUpdate=function(_17){
pc.Log.info("EBayData._raiseModelUpdate called[inChange="+_17+"]");
for(var i=0;i<this._updateModelCallbacks.length;i++){
var _18=this._updateModelCallbacks[i];
if(_18.change==_17||_18.change==this.registerUpdateModelCallbackType.ALL){
pc.defer(_18.callback.bind(this));
}
}
};
EBayData.invalidate=function(){
pc.Log.info("EBayData.invalidate called");
this.invalidateAuctionLists();
this.invalidateSearchResult();
this.invalidateCategories();
this.invalidateMessages();
this.invalidateReminders();
this.invalidateSellerList();
this.invalidateComments();
this.invalidateItemsAwaitingFeedback();
};
EBayData.invalidateAuctionLists=function(){
pc.Log.info("EBayData.invalidateAuctionLists called");
for(var i=0;i<this.listArray.length;i++){
this.listArray[i].count=undefined;
this.listArray[i].items=[];
this.listArray[i].lastUpdate=undefined;
this.listArray[i].isLoading=true;
}
};
EBayData.invalidateBuyingLists=function(){
pc.Log.info("EBayData.invalidateBuyingLists called");
this.invalidateAuctionList(this.lists.WATCH);
this.invalidateAuctionList(this.lists.BID);
this.invalidateAuctionList(this.lists.WON);
this.invalidateAuctionList(this.lists.LOST);
this.invalidateAuctionList(this.lists.BEST_OFFER);
};
EBayData.invalidateAuctionList=function(_19){
pc.Log.info("EBayData.invalidateAuctionList[list="+_19+"] called");
var _1a=undefined;
switch(_19){
case this.lists.WATCH:
_1a=this.data.auctionlists.watch;
break;
case this.lists.BID:
_1a=this.data.auctionlists.bid;
break;
case this.lists.WON:
_1a=this.data.auctionlists.won;
break;
case this.lists.LOST:
_1a=this.data.auctionlists.lost;
break;
case this.lists.BEST_OFFER:
_1a=this.data.auctionlists.bestOffer;
break;
case this.lists.ACTIVE:
_1a=this.data.auctionlists.active;
break;
case this.lists.SOLD:
_1a=this.data.auctionlists.sold;
break;
case this.lists.UNSOLD:
_1a=this.data.auctionlists.unsold;
break;
}
if(_1a){
_1a.count=undefined;
_1a.items=[];
_1a.lastUpdate=undefined;
_1a.isLoading=true;
}
};
EBayData.invalidateSearchResult=function(){
pc.Log.info("EBayData.invalidateSearchResult called");
EBayData.data.searchResult.searchValue=undefined;
EBayData.data.searchResult.filters={};
EBayData.data.searchResult.sortOrder=undefined;
EBayData.data.searchResult.count=undefined;
EBayData.data.searchResult.items=[];
EBayData.data.searchResult.categories=[];
EBayData.data.searchResult.aspectRefinements=[];
EBayData.data.searchResult.lastUpdate=undefined;
EBayData.data.searchResult.isLoading=true;
};
EBayData.invalidateCategories=function(){
pc.Log.info("EBayData.invalidateCategories called");
EBayData.data.categories=undefined;
};
EBayData.invalidateMessages=function(){
pc.Log.info("EBayData.invalidateMessages called");
EBayData.data.messages.flaggedMessageCount=undefined;
EBayData.data.messages.newAlertCount=undefined;
EBayData.data.messages.newMessageCount=undefined;
EBayData.data.messages.totalAlertCount=undefined;
EBayData.data.messages.totalMessageCount=undefined;
EBayData.data.messages.unresolvedAlertCount=undefined;
EBayData.data.messages.folders=[];
};
EBayData.invalidateReminders=function(){
pc.Log.info("EBayData.invalidateReminders called");
EBayData.data.reminders.buying.feedbackToReceiveCount=undefined;
EBayData.data.reminders.buying.feedbackToSendCount=undefined;
EBayData.data.reminders.buying.outbidCount=undefined;
EBayData.data.reminders.buying.paymentToSendCount=undefined;
EBayData.data.reminders.selling.declinedRTERequestCount=undefined;
EBayData.data.reminders.selling.docsForCCProcessingToSendCount=undefined;
EBayData.data.reminders.selling.feedbackToReceiveCount=undefined;
EBayData.data.reminders.selling.feedbackToSendCount=undefined;
EBayData.data.reminders.selling.itemReceiptConfirmationToReceiveCount=undefined;
EBayData.data.reminders.selling.itemReceiptToConfirmCount=undefined;
EBayData.data.reminders.selling.paymentToReceiveCount=undefined;
EBayData.data.reminders.selling.pendingRTERequestCount=undefined;
EBayData.data.reminders.selling.refundCancelledCount=undefined;
EBayData.data.reminders.selling.refundInitiatedCount=undefined;
EBayData.data.reminders.selling.refundOnHoldCount=undefined;
EBayData.data.reminders.selling.relistingNeededCount=undefined;
EBayData.data.reminders.selling.RTEToProcessCount=undefined;
EBayData.data.reminders.selling.secondChanceOfferCount=undefined;
EBayData.data.reminders.selling.shippingDetailsToBeProvidedCount=undefined;
EBayData.data.reminders.selling.shippingNeededCount=undefined;
EBayData.data.reminders.selling.totalNewLeadsCount=undefined;
};
EBayData.invalidateSellerList=function(){
pc.Log.info("EBayData.invalidateSellerList called");
EBayData.data.sellerList.userId=undefined;
EBayData.data.sellerList.endTimeFrom=undefined;
EBayData.data.sellerList.endTimeTo=undefined;
EBayData.data.sellerList.count=undefined;
EBayData.data.sellerList.items=[];
EBayData.data.sellerList.lastUpdate=undefined;
};
EBayData.invalidateComments=function(){
pc.Log.info("EBayData.invalidateComments called");
EBayData.data.commentList.userId=undefined;
EBayData.data.commentList.count=undefined;
EBayData.data.commentList.comments=[];
EBayData.data.commentList.lastUpdate=undefined;
};
EBayData.invalidateItemsAwaitingFeedback=function(){
pc.Log.info("EBayData.invalidateItemsAwaitingFeedback called");
EBayData.data.itemsAwaitingFeedback.count=undefined;
EBayData.data.itemsAwaitingFeedback.items=[];
EBayData.data.itemsAwaitingFeedback.lastUpdate=undefined;
};
EBayData.getLastUpdate=function(){
var lu=undefined;
for(var i=0;i<this.listArray.length;i++){
if(this.listArray[i].lastUpdate&&(this.listArray[i].lastUpdate<lu||!lu)){
lu=this.listArray[i].lastUpdate;
}
}
return lu;
};
// getSignInUrl/getToken (Auth'n'Auth) removed — login is brokered by
// oauth.wosa.link now, driven directly from Connect.js via EBayBroker (see
// eBayBroker-lib.js), so EBayData no longer needs an Auth'n'Auth wrapper.
EBayData.updateHomeScreen=function(_20,_21){
pc.Log.info("EBayData.updateHomeScreen called[forceReload: "+_20+"]");
try{
if(_20||this._isRefreshNeeded(this.data.auctionlists.watch,0,50)||this._isRefreshNeeded(this.data.auctionlists.bid,0,50)||this._isRefreshNeeded(this.data.auctionlists.won,0,50)||this._isRefreshNeeded(this.data.auctionlists.lost,0,50)||this._isRefreshNeeded(this.data.auctionlists.bestOffer,0,50)||this._isRefreshNeeded(this.data.auctionlists.active,0,50)||this._isRefreshNeeded(this.data.auctionlists.sold,0,50)||this._isRefreshNeeded(this.data.auctionlists.unsold,0,50)){
this.data.auctionlists.watch.isLoading=true;
this.data.auctionlists.bid.isLoading=true;
this.data.auctionlists.won.isLoading=true;
this.data.auctionlists.lost.isLoading=true;
this.data.auctionlists.bestOffer.isLoading=true;
this._raiseModelUpdate(this.registerUpdateModelCallbackType.BUYING);
EBayTradingLib.getMyeBayBuying(this.data.user.token,this.data.user.locale,1,50,1,50,1,50,1,50,1,50,this._handleMyeBayBuying.bind(this,_21,false,1,50,1,50,1,50,1,50,1,50));
this.data.auctionlists.active.isLoading=true;
this.data.auctionlists.sold.isLoading=true;
this.data.auctionlists.unsold.isLoading=true;
this._raiseModelUpdate(this.registerUpdateModelCallbackType.SELLING);
EBayTradingLib.getMyeBaySelling(this.data.user.token,this.data.user.locale,1,50,1,50,1,50,this._handleMyeBaySelling.bind(this,_21,false,1,50,1,50,1,50));
return true;
}else{
if(_21){
pc.defer(_21.bind(this,true));
}
return false;
}
}
catch(e){
pc.Log.logException(e);
var _22={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-04"};
if(_21){
pc.defer(_21.bind(this,false,_22));
}
return false;
}
};
EBayData.updateBuyingLists=function(_23){
pc.Log.info("EBayData.updateBuyingLists called");
try{
this.invalidateBuyingLists();
this.data.auctionlists.watch.isLoading=true;
this.data.auctionlists.bid.isLoading=true;
this.data.auctionlists.won.isLoading=true;
this.data.auctionlists.lost.isLoading=true;
this.data.auctionlists.bestOffer.isLoading=true;
this._raiseModelUpdate(this.registerUpdateModelCallbackType.BUYING);
EBayTradingLib.getMyeBayBuying(this.data.user.token,this.data.user.locale,1,50,1,50,1,50,1,50,1,50,this._handleMyeBayBuying.bind(this,_23,false,1,50,1,50,1,50,1,50,1,50));
}
catch(e){
pc.Log.logException(e);
var _24={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-99"};
if(_23){
pc.defer(_23.bind(this,false,_24));
}
return false;
}
};
EBayData.updateList=function(_25,_26,_27,_28,_29){
pc.Log.info("EBayData.updateList called[list="+_25+", offset="+_26+", count="+_27+", forceReload="+_28+"]");
try{
var _2a=false;
var _2b=false;
var _2c=undefined;
var _2d=0;
var _2e=0;
var _2f=0;
var _30=0;
var _31=0;
var _32=0;
var _33=0;
var _34=0;
var _35=0;
var _36=0;
var _37=0;
var _38=0;
var _39=0;
var _3a=0;
var _3b=0;
var _3c=0;
switch(_25){
case this.lists.WATCH:
_2a=true;
_2d=Math.ceil((_26+_27)/50);
_2e=50;
_2c=this.data.auctionlists.watch;
break;
case this.lists.BID:
_2a=true;
_2f=Math.ceil((_26+_27)/50);
_30=50;
_2c=this.data.auctionlists.bid;
break;
case this.lists.WON:
_2a=true;
_31=Math.ceil((_26+_27)/50);
_32=50;
_2c=this.data.auctionlists.won;
break;
case this.lists.LOST:
_2a=true;
_33=Math.ceil((_26+_27)/50);
_34=50;
_2c=this.data.auctionlists.lost;
break;
case this.lists.BEST_OFFER:
_2a=true;
_35=Math.ceil((_26+_27)/50);
_36=50;
_2c=this.data.auctionlists.bestOffer;
break;
case this.lists.ACTIVE:
_2b=true;
_37=Math.ceil((_26+_27)/50);
_38=50;
_2c=this.data.auctionlists.active;
break;
case this.lists.SOLD:
_2b=true;
_39=Math.ceil((_26+_27)/50);
_3a=50;
_2c=this.data.auctionlists.sold;
break;
case this.lists.UNSOLD:
_2b=true;
_3b=Math.ceil((_26+_27)/50);
_3c=50;
_2c=this.data.auctionlists.unsold;
break;
}
if(_28||this._isRefreshNeeded(_2c,_26,_27)){
if(_2a){
this._raiseModelUpdate(this.registerUpdateModelCallbackType.BUYING);
EBayTradingLib.getMyeBayBuying(this.data.user.token,this.data.user.locale,_2d,_2e,_2f,_30,_31,_32,_33,_34,_35,_36,this._handleMyeBayBuying.bind(this,_29,true,_2d,_2e,_2f,_30,_31,_32,_33,_34,_35,_36));
}else{
if(_2b){
this._raiseModelUpdate(this.registerUpdateModelCallbackType.SELLING);
EBayTradingLib.getMyeBaySelling(this.data.user.token,this.data.user.locale,_37,_38,_39,_3a,_3b,_3c,this._handleMyeBaySelling.bind(this,_29,true,_37,_38,_39,_3a,_3b,_3c));
}else{
pc.Log.error("Unknown list.");
var _3d={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-05"};
pc.defer(_29.bind(this,false,_3d));
}
}
}else{
var _3e={realOffset:0,items:_2c.items};
pc.defer(_29.bind(this,true,_3e));
}
}
catch(e){
pc.Log.logException(e);
var _3d={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-06"};
pc.defer(_29.bind(this,false,_3d));
}
};
EBayData.getReminders=function(_3f,_40,_41){
pc.Log.info("EBayData.getReminders called");
try{
EBayTradingLib.getMyeBayReminders(this.data.user.token,this.data.user.locale,_3f,_40,this._handleGetReminders.bind(this,_41));
}
catch(e){
pc.Log.logException(e);
var _42={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-19"};
pc.defer(_41.bind(this,false,_42));
}
};
EBayData.getItem=function(_43,_44,_45){
pc.Log.info("EBayData.getItem called[itemId="+_43+"]");
try{
if(this.data.user.token!=undefined){
if(_44!=undefined){
pc.Log.info("Found transaction, transactionId="+_44.transactionId);
EBayTradingLib.getTransactionItem(this.data.user.token,this.data.user.locale,_43,_44.transactionId,this._handleGetItem.bind(this,_44,_45));
}else{
EBayTradingLib.getItem(this.data.user.token,this.data.user.locale,_43,this._handleGetItem.bind(this,_44,_45));
}
}else{
// Anonymous fallback: Shopping API is decommissioned, and guest browsing
// was dropped anyway (login is required for everything now) — this branch
// is effectively unreachable in practice, but Browse API's getItem works
// fine without a user context if it's ever hit.
EBayBrowseLib.getItem(this.data.user.locale,_43,this._handleGetItem.bind(this,_44,_45));
}
}
catch(e){
pc.Log.logException(e);
var _46={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-07"};
pc.defer(_45.bind(this,false,_46));
}
};
// getItemStatus (Shopping API's cheap status-only refresh) removed — no
// callers exist anywhere in enyo/source, and Shopping API is decommissioned
// anyway. A status refresh, if ever needed, is just another getItem() call.
EBayData.addItemToWatchList=function(_4a,_4b){
pc.Log.info("EBayData.addItemToWatchList called[itemId="+_4a+"]");
try{
EBayTradingLib.addToWatchListRequest(this.data.user.token,this.data.user.locale,_4a,this._handleAddItemToWatchList.bind(this,_4a,_4b));
}
catch(e){
pc.Log.logException(e);
var _4c={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-08"};
pc.defer(_4b.bind(this,false,_4c));
}
};
EBayData.removeItemFromWatchList=function(_4d,_4e){
pc.Log.info("EBayData.removeItemFromWatchList called[itemId="+_4d+"]");
try{
EBayTradingLib.removeFromWatchListRequest(this.data.user.token,this.data.user.locale,_4d,this._handleRemoveItemFromWatchList.bind(this,_4d,_4e));
}
catch(e){
pc.Log.logException(e);
var _4f={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-13"};
pc.defer(_4e.bind(this,false,_4f));
}
};
EBayData.placeOffer=function(_50,_51,_52,_53,_54,_55,_56,_57,_58,_59){
pc.Log.info("EBayData.placeOffer called[invocationId="+_50+", endUserIP="+_51+", itemId="+_52+", action="+_53+", quantity="+_54+", maxBid="+_55+", maxBidCurrency="+_56+", botBlockToken="+_57+", botBlockUserInput="+_58+"]");
try{
EBayTradingLib.placeOffer(this.data.user.token,this.data.user.locale,_50,_51,_52,_53,_54,_55,_56,_57,_58,this._handlePlaceOffer.bind(this,_50,_59));
}
catch(e){
pc.Log.logException(e);
var _5a={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-14"};
pc.defer(_59.bind(this,false,_5a));
}
};
EBayData.testPlaceOffer=function(_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64){
pc.Log.info("EBayData.testPlaceOffer called[invocationId="+_5b+", endUserIP="+_5c+", itemId="+_5d+", action="+_5e+", quantity="+_5f+", maxBid="+_60+", maxBidCurrency="+_61+", botBlockToken="+_62+", botBlockUserInput="+_63+"]");
try{
if(_62==undefined){
EBayTradingLib.getGetChallengeToken(this.data.user.token,this.data.user.locale,this._handlePlaceOffer.bind(this,_5b,_64));
}else{
EBayTradingLib.placeOffer(this.data.user.token,this.data.user.locale,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,this._handlePlaceOffer.bind(this,_5b,_64));
}
}
catch(e){
pc.Log.logException(e);
var _65={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-15"};
pc.defer(_64.bind(this,_5b,false,_65));
}
};
EBayData.findItems=function(_66,_67,_68,_69,_6a){
pc.Log.info("EBayData.findItems called[searchValue="+_66+", offset="+_67+", count="+_68+", sortOrder="+_69+"]");
this.findItemsAdvanced(_66,{},_67,_68,_69,_6a);
};
// filters: {listingType, category, minPrice, minPriceCurrency, maxPrice,
//   maxPriceCurrency, conditions:[], sellers:[], itemLocationCountry,
//   maxDeliveryCost, freeShippingOnly, returnsAccepted, businessSellerOnly,
//   aspectFilters} - built by SearchFilterPopup.js and passed straight
// through to EBayBrowseLib.search (see eBayBrowse-lib.js's _buildFilterParam/
// _buildAspectFilterParam for how each field maps to eBay's filter=/
// aspect_filter query syntax). category is pulled back out as its own
// positional arg for EBayBrowseLib.search below since Browse API's
// category_ids is a separate query param from filter=, not part of it.
EBayData.findItemsAdvanced=function(searchValue,filters,offset,count,sortOrder,callback){
pc.Log.info("EBayData.findItemsAdvanced called[searchValue="+searchValue+", filters="+enyo.json.stringify(filters)+", offset="+offset+", count="+count+", sortOrder="+sortOrder+"]");
filters=filters||{};
if(filters.minPrice==undefined){
filters.minPriceCurrency=undefined;
}
if(filters.maxPrice==undefined){
filters.maxPriceCurrency=undefined;
}
this._findItemsInternal(searchValue,filters,offset,count,sortOrder,callback);
};
EBayData._findItemsInternal=function(searchValue,filters,offset,count,sortOrder,callback){
try{
var needsFetch=true;
if(this.data.searchResult.searchValue==searchValue&&this.data.searchResult.sortOrder==sortOrder&&enyo.json.stringify(this.data.searchResult.filters||{})==enyo.json.stringify(filters)){
if(this.data.searchResult.items.length==this.data.searchResult.count||this.data.searchResult.items.length>=offset+count){
needsFetch=false;
}
}
if(needsFetch){
var page=Math.ceil((offset+count)/50);
var pageSize=50;
this.data.searchResult.isLoading=true;
EBayBrowseLib.search(this.data.user.locale,searchValue,filters.category,filters,page,pageSize,sortOrder,this._handleFindItemsInternal.bind(this,searchValue,filters,page,pageSize,sortOrder,callback));
}else{
var cached={realOffset:0,items:this.data.searchResult.items,categories:this.data.searchResult.categories,count:this.data.searchResult.count};
pc.defer(callback.bind(this,true,cached));
}
}
catch(e){
pc.Log.logException(e);
var errorObj={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-09"};
pc.defer(callback.bind(this,false,errorObj));
}
};
EBayData.getUserProfile=function(_8a,_8b,_8c,_8d){
pc.Log.info("EBayData.getUserProfile called[userId="+_8a+", offset="+_8b+", count="+_8c+"]");
try{
if(this.data.user.token!=undefined){
var _8e=true;
if(this.data.commentList.userId==_8a&&_8b>0){
if(this.data.commentList.comments.length==this.data.commentList.count||this.data.commentList.comments.length>=_8b+_8c){
_8e=false;
}
}
if(_8e){
var _8f=Math.ceil((_8b+_8c)/50);
var _90=50;
EBayTradingLib.getFeedback(this.data.user.token,this.data.user.locale,_8a,_8f,_90,this._handleGetUserProfile.bind(this,_8f,_90,_8d));
}else{
var _91={realOffset:0,comments:this.data.commentList.comments,count:this.data.commentList.count};
pc.defer(_8d.bind(this,true,_91));
}
}else{
// Anonymous fallback removed: Shopping API is decommissioned and has no
// REST replacement for seller feedback profiles, and login is required
// app-wide now anyway — this branch is structurally unreachable.
pc.defer(_8d.bind(this,false,{errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-17"}));
}
}
catch(e){
pc.Log.logException(e);
var _92={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-17"};
pc.defer(_8d.bind(this,false,_92));
}
};
EBayData.getSellerItems=function(_93,_94,_95,_96){
pc.Log.info("EBayData.getSellerItems called[userId="+_93+", offset="+_94+", count="+_95+"]");
try{
var _97=true;
var _98=new Date();
var _99=new Date(_98.getTime()+1000*60*60*24*30);
if(this.data.sellerList.userId==_93){
if(this.data.sellerList.items.length==this.data.sellerList.count||this.data.sellerList.items.length>=_94+_95){
_97=false;
}else{
_98=this.data.sellerList.endTimeFrom;
_99=this.data.sellerList.endTimeTo;
}
}
if(_97){
var _9a=Math.ceil((_94+_95)/50);
var _9b=50;
EBayTradingLib.getSellerList(this.data.user.token,this.data.user.locale,_93,_98,_99,_9a,_9b,this._handleGetSellerItems.bind(this,_93,_98,_99,_9a,_9b,_96));
}else{
var _9c={realOffset:0,items:this.data.sellerList.items,count:this.data.sellerList.count,userId:_93};
_96(true,_9c);
pc.defer(_96.bind(this,true,_9c));
}
}
catch(e){
pc.Log.logException(e);
var _9d={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-18"};
pc.defer(_96.bind(this,false,_9d));
}
};
EBayData.getMessages=function(_9e,_9f,_a0){
pc.Log.info("EBayData.getMessages called[folderId="+_9e+", forceReload="+_9f+"]");
try{
var _a1=undefined;
if(this.data.messages.folders){
for(var i=0;i<this.data.messages.folders.length;i++){
if(this.data.messages.folders[i].folderId==_9e){
_a1=this.data.messages.folders[i];
break;
}
}
}
if(_9f||_a1==undefined||_a1.alerts==undefined||_a1.messages==undefined){
EBayTradingLib.getMyMessages(this.data.user.token,this.data.user.locale,_9e,undefined,undefined,false,this._handleGetMessages.bind(this,_9e,_a0));
}else{
var _a2={alerts:_a1.alerts,messages:_a1.messages,};
pc.defer(_a0.bind(this,true,_a2));
}
}
catch(e){
pc.Log.logException(e);
var _a3={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-20"};
pc.defer(_a0.bind(this,false,_a3));
}
};
EBayData.getMessage=function(_a4,_a5,_a6){
pc.Log.info("EBayData.getMessage called[messageId="+_a4+", isAlert="+_a5+"]");
try{
var _a7=[];
var _a8=[];
if(_a5){
_a8.push(_a4);
}else{
_a7.push(_a4);
}
EBayTradingLib.getMyMessages(this.data.user.token,this.data.user.locale,undefined,_a7,_a8,false,this._handleGetMessage.bind(this,_a6));
}
catch(e){
pc.Log.logException(e);
var _a9={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-21"};
pc.defer(_a6.bind(this,false,_a9));
}
};
EBayData.markMessage=function(_aa,_ab,_ac,_ad,_ae){
pc.Log.info("EBayData.markMessage called[messageId="+_aa+", isAlert="+_ab+", read="+_ac+", flagged="+_ad+"]");
try{
var _af=[];
var _b0=[];
if(_ab){
_b0.push(_aa);
}else{
_af.push(_aa);
}
EBayTradingLib.reviseMyMessages(this.data.user.token,this.data.user.locale,_af,_b0,_ad,_ac,this._handleMarkMessage.bind(this,_aa,_ab,_ac,_ad,_ae));
}
catch(e){
pc.Log.logException(e);
var _b1={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-29"};
pc.defer(_ae.bind(this,false,_b1));
}
};
EBayData.deleteMessage=function(_b2,_b3,_b4){
pc.Log.info("EBayData.deleteMessage called[messageId="+_b2+", isAlert="+_b3+"]");
try{
var _b5=[];
var _b6=[];
if(_b3){
_b6.push(_b2);
}else{
_b5.push(_b2);
}
EBayTradingLib.deleteMyMessages(this.data.user.token,this.data.user.locale,_b5,_b6,this._handleDeleteMessage.bind(this,_b2,_b3,_b4));
}
catch(e){
pc.Log.logException(e);
var _b7={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-30"};
pc.defer(_b4.bind(this,false,_b7));
}
};
EBayData.getMessageFolders=function(_b8,_b9){
pc.Log.info("EBayData.getMessageFolders called[forceReload="+_b8+"]");
try{
if(_b8||this.data.messages.folders.length==0){
EBayTradingLib.getMyMessages(this.data.user.token,this.data.user.locale,undefined,undefined,undefined,true,this._handleGetMessageFolders.bind(this,_b9));
}else{
pc.defer(_b9.bind(this,true,this.data.messages));
}
}
catch(e){
pc.Log.logException(e);
var _ba={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-22"};
pc.defer(_b9.bind(this,false,_ba));
}
};
EBayData.getCategories=function(_bb){
pc.Log.info("EBayData.getCategories called");
try{
EBayTaxonomyLib.getCategories(this.data.user.locale,this._handleGetCategories.bind(this,_bb));
}
catch(e){
pc.Log.logException(e);
var _bc={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-23"};
pc.defer(_bb.bind(this,false,_bc));
}
};
// findPopularSearches removed — no callers anywhere in enyo/source, no
// Browse/Taxonomy REST equivalent exists, and Shopping API is decommissioned.
// registerClientAlerts/unregisterClientAlerts/getClientAlerts removed —
// Client Alerts (clientalerts.ebay.com) is DNS-dead with no REST
// replacement; NotificationManager.js now polls Trading API lists and diffs
// them locally instead (see its diffAndNotify/wakeupCall).
EBayData.setUserNotes=function(_d1,_d2,_d3){
pc.Log.info("EBayData.setUserNotes called[itemId="+_d1+", text="+_d2+"]");
try{
EBayTradingLib.setUserNotes(this.data.user.token,this.data.user.locale,_d1,_d2,this._handleSetUserNotes.bind(this,_d1,_d2,_d3));
}
catch(e){
pc.Log.logException(e);
var _d4={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-31"};
pc.defer(_d3.bind(this,false,_d4));
}
};
EBayData.getItemsAwaitingFeedback=function(_d5,_d6,_d7){
pc.Log.info("EBayData.getItemsAwaitingFeedback called[offset="+_d5+", count="+_d6+"]");
try{
var _d8=true;
if(_d5>0){
if(this.data.itemsAwaitingFeedback.items.length==this.data.itemsAwaitingFeedback.count||this.data.itemsAwaitingFeedback.items.length>=_d5+_d6){
_d8=false;
}
}
if(_d8){
var _d9=Math.ceil((_d5+_d6)/50);
var _da=50;
EBayTradingLib.getItemsAwaitingFeedback(this.data.user.token,this.data.user.locale,_d9,_da,this._handleGetItemsAwaitingFeedback.bind(this,_d9,_da,_d7));
}else{
var _db={realOffset:0,items:this.data.itemsAwaitingFeedback.items,count:this.data.itemsAwaitingFeedback.count};
pc.defer(_d7.bind(this,true,_db));
}
}
catch(e){
pc.Log.logException(e);
var _dc={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-32"};
pc.defer(_d7.bind(this,false,_dc));
}
};
EBayData.leaveFeedback=function(_dd,_de,_df,_e0,_e1,_e2,_e3,_e4,_e5,_e6){
pc.Log.info("EBayData.leaveFeedback called[itemId="+_dd+", transactionId="+_de+", commentText="+_df+", commentType="+_e0+", sellerRatingCommunication="+_e1+", sellerRatingItemAsDescribed="+_e2+", sellerRatingShippingAndHandlingCharges="+_e3+", sellerRatingShippingTime="+_e4+", targetUser="+_e5+"]");
try{
EBayTradingLib.leaveFeedback(this.data.user.token,this.data.user.locale,_dd,_de,_df,_e0,_e1,_e2,_e3,_e4,_e5,this._handleLeaveFeedback.bind(this,_e6));
}
catch(e){
pc.Log.logException(e);
var _e7={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-33"};
pc.defer(_e6.bind(this,false,_e7));
}
};
EBayData.getBestOffers=function(_e8,_e9,_ea){
pc.Log.info("EBayData.getBestOffers called[itemId="+_e8+", onlyActive="+_e9+"]");
try{
EBayTradingLib.getBestOffers(this.data.user.token,this.data.user.locale,_e8,_e9,this._handleGetBestOffers.bind(this,_ea));
}
catch(e){
pc.Log.logException(e);
var _eb={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-35"};
pc.defer(_ea.bind(this,false,_eb));
}
};
EBayData.respondToBestOffer=function(_ec,_ed,_ee,_ef,_f0,_f1,_f2){
pc.Log.info("EBayData.respondToBestOffer called[action="+_ec+", bestOfferId="+_ed+", itemId="+_ee+", counterOfferPrice="+_ef+", counterOfferCurrency="+_f0+", counterOfferQuantity="+_f1+"]");
try{
EBayTradingLib.respondToBestOffer(this.data.user.token,this.data.user.locale,_ec,_ed,_ee,_ef,_f0,_f1,this._handleRespondToBestOffer.bind(this,_f2));
}
catch(e){
pc.Log.logException(e);
var _f3={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-34"};
pc.defer(_f2.bind(this,false,_f3));
}
};
EBayData.addItem=function(){
try{
EBayTradingLib.respondToBestOffer(this.data.user.token,this.data.user.locale,title,description,primaryCategoryId,listingType,startPrice,startPriceCurrency,buyItNowPrice,buyItNowPriceCurrency,quantity,this._handleAddItem.bind(this,callback));
}
catch(e){
pc.Log.logException(e);
var _f4={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-35"};
pc.defer(callback.bind(this,false,_f4));
}
};
EBayData._isRefreshNeeded=function(_f5,_f6,_f7){
if(_f5.lastUpdate!=undefined){
if(_f5.items.length==_f5.count||_f5.items.length>=_f6+_f7){
return false;
}
}
return true;
};
EBayData._handleMyeBayBuying=function(_f8,_f9,_fa,_fb,_fc,_fd,_fe,_ff,_100,_101,_102,_103,_104,_105){
try{
if(_104){
var _106=undefined;
var _107=undefined;
if(_fb>0){
if(_105.watch!=undefined){
this.data.auctionlists.watch.count=_105.watch.count;
if(_fa==1){
this.data.auctionlists.watch.items=_105.watch.items;
}else{
var _108=(_fa-1)*_fb;
for(var i=0;i<_105.watch.items.length;i++){
this.data.auctionlists.watch.items[_108+i]=_105.watch.items[i];
}
}
this.data.auctionlists.watch.lastUpdate=_105.watch.lastUpdate;
}else{
this.data.auctionlists.watch.count=0;
this.data.auctionlists.watch.items=[];
this.data.auctionlists.watch.lastUpdate=new Date();
}
_106=this.data.auctionlists.watch.items;
_107=0;
this.data.auctionlists.watch.isLoading=false;
}
if(_fd>0){
if(_105.bid!=undefined){
this.data.auctionlists.bid.count=_105.bid.count;
if(_fc==1){
this.data.auctionlists.bid.items=_105.bid.items;
}else{
var _108=(_fc-1)*_fd;
for(var i=0;i<_105.bid.items.length;i++){
this.data.auctionlists.bid.items[_108+i]=_105.bid.items[i];
}
}
this.data.auctionlists.bid.lastUpdate=_105.bid.lastUpdate;
}else{
this.data.auctionlists.bid.count=0;
this.data.auctionlists.bid.items=[];
this.data.auctionlists.bid.lastUpdate=new Date();
}
_106=this.data.auctionlists.bid.items;
_107=0;
this.data.auctionlists.bid.isLoading=false;
}
if(_ff>0){
if(_105.won!=undefined){
this.data.auctionlists.won.count=_105.won.count;
if(_fe==1){
this.data.auctionlists.won.items=_105.won.items;
}else{
var _108=(_fe-1)*_ff;
for(var i=0;i<_105.won.items.length;i++){
this.data.auctionlists.won.items[_108+i]=_105.won.items[i];
}
}
this.data.auctionlists.won.lastUpdate=_105.won.lastUpdate;
}else{
this.data.auctionlists.won.count=0;
this.data.auctionlists.won.items=[];
this.data.auctionlists.won.lastUpdate=new Date();
}
_106=this.data.auctionlists.won.items;
_107=0;
this.data.auctionlists.won.isLoading=false;
}
if(_101>0){
if(_105.lost!=undefined){
this.data.auctionlists.lost.count=_105.lost.count;
if(_100==1){
this.data.auctionlists.lost.items=_105.lost.items;
}else{
var _108=(_100-1)*_101;
for(var i=0;i<_105.lost.items.length;i++){
this.data.auctionlists.lost.items[_108+i]=_105.lost.items[i];
}
}
this.data.auctionlists.lost.lastUpdate=_105.lost.lastUpdate;
}else{
this.data.auctionlists.lost.count=0;
this.data.auctionlists.lost.items=[];
this.data.auctionlists.lost.lastUpdate=new Date();
}
_106=this.data.auctionlists.lost.items;
_107=0;
this.data.auctionlists.lost.isLoading=false;
}
if(_103>0){
if(_105.bestOffer!=undefined){
this.data.auctionlists.bestOffer.count=_105.bestOffer.count;
if(_102==1){
this.data.auctionlists.bestOffer.items=_105.bestOffer.items;
}else{
var _108=(_102-1)*_103;
for(var i=0;i<_105.bestOffer.items.length;i++){
this.data.auctionlists.bestOffer.items[_108+i]=_105.bestOffer.items[i];
}
}
this.data.auctionlists.bestOffer.lastUpdate=_105.bestOffer.lastUpdate;
}else{
this.data.auctionlists.bestOffer.count=0;
this.data.auctionlists.bestOffer.items=[];
this.data.auctionlists.bestOffer.lastUpdate=new Date();
}
_106=this.data.auctionlists.bestOffer.items;
_107=0;
this.data.auctionlists.bestOffer.isLoading=false;
}
this._updateMaxBidAndReserveMetInWatchList();
if(_f9){
var _105={realOffset:_107,items:_106};
if(_f8){
pc.defer(_f8.bind(this,true,_105));
}
}else{
if(_f8){
pc.defer(_f8.bind(this,true));
}
}
this._raiseModelUpdate(this.registerUpdateModelCallbackType.BUYING);
}else{
if(_f8){
pc.defer(_f8.bind(this,false,_105));
}
}
}
catch(e){
pc.Log.logException(e);
var _109={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-10"};
if(_f8){
pc.defer(_f8.bind(this,false,_109));
}
}
};
EBayData._handleMyeBaySelling=function(_10a,_10b,_10c,_10d,_10e,_10f,_110,_111,_112,_113){
try{
if(_112){
var _114=undefined;
var _115=undefined;
if(_10d>0){
if(_113.active!=undefined){
this.data.auctionlists.active.count=_113.active.count;
if(_10c==1){
this.data.auctionlists.active.items=_113.active.items;
for(var i=0;i<this.data.auctionlists.active.items.length;i++){
this.data.auctionlists.active.items[i].sellerID=this.data.user.userId;
}
}else{
var _116=(_10c-1)*_10d;
for(var i=0;i<_113.active.items.length;i++){
this.data.auctionlists.active.items[_116+i]=_113.active.items[i];
this.data.auctionlists.active.items[_116+i].sellerID=this.data.user.userId;
}
}
this.data.auctionlists.active.lastUpdate=_113.active.lastUpdate;
}else{
this.data.auctionlists.active.count=0;
this.data.auctionlists.active.items=[];
this.data.auctionlists.active.lastUpdate=new Date();
}
_114=this.data.auctionlists.active.items;
_115=0;
this.data.auctionlists.active.isLoading=false;
}
if(_10f>0){
if(_113.sold!=undefined){
this.data.auctionlists.sold.count=_113.sold.count;
if(_10e==1){
this.data.auctionlists.sold.items=_113.sold.items;
for(var i=0;i<this.data.auctionlists.sold.items.length;i++){
this.data.auctionlists.sold.items[i].sellerID=this.data.user.userId;
}
}else{
var _116=(_10e-1)*_10f;
for(var i=0;i<_113.sold.items.length;i++){
this.data.auctionlists.sold.items[_116+i]=_113.sold.items[i];
this.data.auctionlists.sold.items[_116+i].sellerID=this.data.user.userId;
}
}
this.data.auctionlists.sold.lastUpdate=_113.sold.lastUpdate;
}else{
this.data.auctionlists.sold.count=0;
this.data.auctionlists.sold.items=[];
this.data.auctionlists.sold.lastUpdate=new Date();
}
_114=this.data.auctionlists.sold.items;
_115=0;
this.data.auctionlists.sold.isLoading=false;
}
if(_111>0){
if(_113.unsold!=undefined){
this.data.auctionlists.unsold.count=_113.unsold.count;
if(_110==1){
this.data.auctionlists.unsold.items=_113.unsold.items;
for(var i=0;i<this.data.auctionlists.unsold.items.length;i++){
this.data.auctionlists.unsold.items[i].sellerID=this.data.user.userId;
}
}else{
var _116=(_110-1)*_111;
for(var i=0;i<_113.unsold.items.length;i++){
this.data.auctionlists.unsold.items[_116+i]=_113.unsold.items[i];
this.data.auctionlists.unsold.items[_116+i].sellerID=this.data.user.userId;
}
}
this.data.auctionlists.unsold.lastUpdate=_113.unsold.lastUpdate;
}else{
this.data.auctionlists.unsold.count=0;
this.data.auctionlists.unsold.items=[];
this.data.auctionlists.unsold.lastUpdate=new Date();
}
_114=this.data.auctionlists.unsold.items;
_115=0;
this.data.auctionlists.unsold.isLoading=false;
}
if(_10b){
var _113={realOffset:_115,items:_114};
if(_10a){
pc.defer(_10a.bind(this,true,_113));
}
}else{
if(_10a){
pc.defer(_10a.bind(this,true));
}
}
this._raiseModelUpdate(this.registerUpdateModelCallbackType.SELLING);
}else{
if(_10a){
pc.defer(_10a.bind(this,false,_113));
}
}
}
catch(e){
pc.Log.logException(e);
var _117={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-11"};
if(_10a){
pc.defer(_10a.bind(this,false,_117));
}
}
};
EBayData._handleGetReminders=function(_118,_119,_11a){
if(_119){
var _11b=[];
if(_11a.paymentToSendCount!=undefined&&_11a.paymentToSendCount>0){
_11b.push(this._createReminder(_11a.paymentToSendCount,"You need to pay for #{value} #{items}.",EBayConstants.ReminderTypes.PAYMENT_TO_SEND));
}
if(_11a.outbidCount!=undefined&&_11a.outbidCount>0){
_11b.push(this._createReminder(_11a.outbidCount,"You've been outbid on #{value} #{items}.",EBayConstants.ReminderTypes.OUTBID));
}
if(_11a.feedbackToSendCountBuyer!=undefined&&_11a.feedbackToSendCountBuyer>0){
_11b.push(this._createReminder(_11a.feedbackToSendCountBuyer,"You need to leave feedback for #{value} #{items} you bought.",EBayConstants.ReminderTypes.FEEDBACK_TO_SEND_BUYER));
}
if(_11a.feedbackToReceiveCountBuyer!=undefined&&_11a.feedbackToReceiveCountBuyer>0){
_11b.push(this._createReminder(_11a.feedbackToReceiveCountBuyer,"You're awaiting feedback for #{value} #{items} you bought.",EBayConstants.ReminderTypes.FEEDBACK_TO_RECEIVE_BUYER));
}
if(_11a.paymentToReceiveCount!=undefined&&_11a.paymentToReceiveCount>0){
_11b.push(this._createReminder(_11a.paymentToReceiveCount,"You're awaiting payment for #{value} #{items}.",EBayConstants.ReminderTypes.PAYMENT_TO_RECEIVE));
}
if(_11a.feedbackToSendCountSeller!=undefined&&_11a.feedbackToSendCountSeller>0){
_11b.push(this._createReminder(_11a.feedbackToSendCountSeller,"You need to leave feedback for #{value} #{items} you sold.",EBayConstants.ReminderTypes.FEEDBACK_TO_SEND_SELLER));
}
if(_11a.feedbackToReceiveCountSeller!=undefined&&_11a.feedbackToReceiveCountSeller>0){
_11b.push(this._createReminder(_11a.feedbackToReceiveCountSeller,"You're awaiting feedback for #{value} #{items} you sold.",EBayConstants.ReminderTypes.FEEDBACK_TO_RECEIVE_SELLER));
}
pc.defer(_118.bind(this,_119,_11b));
}else{
pc.defer(_118.bind(this,_119,_11a));
}
};
EBayData._createReminder=function(_11c,text,type){
var _11d=undefined;
if(_11c>1){
_11d=$L("items");
}else{
_11d=$L("item");
}
var _11e={text:$L(text).interpolate({value:_11c,items:_11d}),type:type};
return _11e;
};
EBayData._handleGetItem=function(_11f,_120,_121,_122){
if(_121){
if(this._isItemInList(this.data.auctionlists.watch.items,_122)!=undefined){
_122.isWatching=true;
}else{
_122.isWatching=false;
}
if(_11f){
_122.transaction=_11f;
_122.feedbackLeft=_11f.feedbackLeft;
_122.feedbackReceived=_11f.feedbackReceived;
}
var _123=this._isItemInList(this.data.auctionlists.bid.items,_122);
if(_123!=undefined){
_122.maxBid=_123.maxBid;
_122.maxBidCurrency=_123.maxBidCurrency;
}
var _124=this._isItemInList(this.data.auctionlists.won.items,_122);
if(_124!=undefined){
_122.maxBid=_124.maxBid;
_122.maxBidCurrency=_124.maxBidCurrency;
}
var _125=this._isItemInList(this.data.auctionlists.lost.items,_122);
if(_125!=undefined){
_122.maxBid=_125.maxBid;
_122.maxBidCurrency=_125.maxBidCurrency;
}
var _126=this._isItemInList(this.data.auctionlists.bestOffer.items,_122);
if(_126!=undefined||(_122.bestOfferCount!=undefined&&_122.bestOfferCount>0)){
EBayTradingLib.getBestOffers(this.data.user.token,this.data.user.locale,_122.itemId,false,this._handleGetBestOffersAfterGetItem.bind(this,_120,_122));
return;
}
if(_122.maxBid==undefined&&this.data.user.token!=undefined){
EBayTradingLib.getAllBidders(this.data.user.token,this.data.user.locale,_122.itemId,this._handleGetAllBiddersAfterGetItem.bind(this,_120,_122));
return;
}
}
pc.defer(_120.bind(this,_121,_122));
};
EBayData._handleGetAllBiddersAfterGetItem=function(_127,_128,_129,_12a){
if(_129){
var _12b=undefined;
var _12c=undefined;
for(var i=0;i<_12a.offers.length;i++){
var _12d=_12a.offers[i];
if(_12d.bidderId==this.data.user.userId){
if(_12b==undefined||_12d.maxBid>_12b){
_12b=_12d.maxBid;
_12c=_12d.maxBidCurrency;
}
}
}
_128.maxBid=_12b;
_128.maxBidCurrency=_12c;
}
pc.defer(_127.bind(this,true,_128));
};
EBayData._handleGetBestOffersAfterGetItem=function(_12e,_12f,_130,_131){
if(_130){
var _132=undefined;
var _133=undefined;
var _134=undefined;
var _135=undefined;
var type=undefined;
var _136=undefined;
if(_131.bestOffers.length>0){
_132=_131.bestOffers[_131.bestOffers.length-1].price;
_133=_131.bestOffers[_131.bestOffers.length-1].currency;
_134=_131.bestOffers[_131.bestOffers.length-1].status;
_135=_131.bestOffers[_131.bestOffers.length-1].quantity;
type=_131.bestOffers[_131.bestOffers.length-1].type;
_136=_131.bestOffers[_131.bestOffers.length-1].bestOfferId;
}
_12f.bestOffer=_132;
_12f.bestOfferCurrency=_133;
_12f.bestOfferStatus=_134;
_12f.bestOfferQuantity=_135;
_12f.bestOfferType=type;
_12f.bestOfferId=_136;
_12f.bestOffers=_131.bestOffers;
}
pc.defer(_12e.bind(this,true,_12f));
};
EBayData._handleAddItemToWatchList=function(_13a,_13b,_13c,_13d){
if(_13c){
for(var i=0;i<EBayData.listArray.length;i++){
var item=this._isItemInListByItemId(EBayData.listArray[i].items,_13a);
if(item){
item.isWatching=true;
}
}
var item=this._isItemInListByItemId(EBayData.data.searchResult.items,_13a);
if(item){
item.isWatching=true;
}
this.updateList(EBayData.lists.WATCH,0,50,true,_13b);
}else{
pc.defer(_13b.bind(this,false,_13d));
}
};
EBayData._handleRemoveItemFromWatchList=function(_13e,_13f,_140,_141){
if(_140){
this.data.auctionlists.watch.count=_141;
for(var i=0;i<this.data.auctionlists.watch.items.length;i++){
if(this.data.auctionlists.watch.items[i].itemId==_13e){
Helpers.Array.remove(this.data.auctionlists.watch.items,i);
break;
}
}
this._raiseModelUpdate(this.registerUpdateModelCallbackType.BUYING);
pc.defer(_13f.bind(this,true));
}else{
pc.defer(_13f.bind(this,false,_141));
}
};
EBayData._handlePlaceOffer=function(_142,_143,_144,_145){
if(_144){
if(_145.isBotBlock){
pc.defer(_143.bind(this,_142,_144,_145));
}else{
this.updateList(this.lists.BID,0,50,true,this._handleUpdateBidListAfterPlaceOffer.bind(this,_142,_143,_144,_145));
}
}else{
pc.defer(_143.bind(this,_142,_144,_145));
}
};
EBayData._handleUpdateBidListAfterPlaceOffer=function(_146,_147,_148,_149,_14a,_14b){
pc.defer(_147.bind(this,_146,_148,_149));
};
EBayData._handleFindItemsInternal=function(searchValue,filters,page,pageSize,sortOrder,callback,success,result){
if(success){
if(searchValue!=this.data.searchResult.searchValue||sortOrder!=this.data.searchResult.sortOrder||enyo.json.stringify(filters)!=enyo.json.stringify(this.data.searchResult.filters||{})){
this.data.searchResult.searchValue=searchValue;
this.data.searchResult.filters=filters;
this.data.searchResult.sortOrder=sortOrder;
this.data.searchResult.items=[];
this.data.searchResult.categories=[];
}
if(result.items!=undefined){
this.data.searchResult.count=result.count;
this.data.searchResult.aspectRefinements=result.aspectRefinements||[];
if(page==1){
this.data.searchResult.items=result.items;
this.data.searchResult.categories=result.categories;
for(var i=0;i<this.data.searchResult.items.length;i++){
if(this._isItemInList(this.data.auctionlists.watch.items,this.data.searchResult.items[i])!=undefined){
this.data.searchResult.items[i].isWatching=true;
}else{
this.data.searchResult.items[i].isWatching=false;
}
}
}else{
var offsetIntoItems=(page-1)*pageSize;
for(var i=0;i<result.items.length;i++){
this.data.searchResult.items[offsetIntoItems+i]=result.items[i];
if(this._isItemInList(this.data.auctionlists.watch.items,this.data.searchResult.items[offsetIntoItems+i])!=undefined){
this.data.searchResult.items[offsetIntoItems+i].isWatching=true;
}else{
this.data.searchResult.items[offsetIntoItems+i].isWatching=false;
}
}
}
this.data.searchResult.lastUpdate=result.lastUpdate;
}else{
this.data.searchResult.count=0;
this.data.searchResult.items=[];
this.data.searchResult.categories=[];
this.data.searchResult.lastUpdate=new Date();
}
this.data.searchResult.isLoading=false;
var returned={realOffset:0,items:this.data.searchResult.items,categories:this.data.searchResult.categories,count:this.data.searchResult.count};
pc.defer(callback.bind(this,true,returned));
}else{
pc.defer(callback.bind(this,false,result));
}
};
EBayData._handleGetUserProfile=function(_15c,_15d,_15e,_15f,_160){
if(_15f){
if(this.data.user.token!=undefined){
if(_160.userId!=this.data.commentList.userId){
this.data.commentList.userId=_160.userId;
this.data.commentList.comments=[];
}
if(_160.comments!=undefined){
this.data.commentList.count=_160.count;
if(_15c==1){
this.data.commentList.comments=_160.comments;
}else{
var _161=(_15c-1)*_15d;
for(var i=0;i<_160.comments.length;i++){
this.data.commentList.comments[_161+i]=_160.comments[i];
}
}
this.data.commentList.lastUpdate=undefined;
}else{
this.data.commentList.count=0;
this.data.commentList.comments=[];
this.data.commentList.lastUpdate=undefined;
}
_160.realOffset=0;
_160.comments=this.data.commentList.comments;
_160.count=this.data.commentList.count;
pc.defer(_15e.bind(this,true,_160));
}else{
_160.realOffset=0;
pc.defer(_15e.bind(this,true,_160));
}
}else{
_160.realOffset=0;
pc.defer(_15e.bind(this,false,_160));
}
};
EBayData._handleGetSellerItems=function(_162,_163,_164,_165,_166,_167,_168,_169){
if(_168){
if(_162!=this.data.sellerList.userId){
this.data.sellerList.userId=_162;
this.data.sellerList.endTimeFrom=_163;
this.data.sellerList.endTimeTo=_164;
this.data.sellerList.items=[];
}
if(_169.items!=undefined){
this.data.sellerList.count=_169.count;
if(_165==1){
this.data.sellerList.items=_169.items;
}else{
var _16a=(_165-1)*_166;
for(var i=0;i<_169.items.length;i++){
this.data.sellerList.items[_16a+i]=_169.items[i];
}
}
this.data.sellerList.lastUpdate=_169.lastUpdate;
}else{
this.data.sellerList.count=0;
this.data.sellerList.items=[];
this.data.sellerList.lastUpdate=new Date();
}
var _169={realOffset:0,items:this.data.sellerList.items,count:this.data.sellerList.count};
pc.defer(_167.bind(this,true,_169));
}else{
pc.defer(_167.bind(this,false,_169));
}
};
EBayData._handleGetMessages=function(_16b,_16c,_16d,_16e){
if(_16d){
if(this.data.messages.folders){
for(var i=0;i<this.data.messages.folders.length;i++){
if(this.data.messages.folders[i].folderId==_16b){
this.data.messages.folders[i].alerts=_16e.alerts;
this.data.messages.folders[i].messages=_16e.messages;
break;
}
}
}
pc.defer(_16c.bind(this,true,_16e));
}else{
pc.defer(_16c.bind(this,false,_16e));
}
};
EBayData._handleGetMessage=function(_16f,_170,_171){
if(_170){
if(_171.messages.length==1){
_171=_171.messages[0];
}else{
if(_171.alerts.length==1){
_171=_171.alerts[0];
}
}
}
pc.defer(_16f.bind(this,_170,_171));
};
EBayData._handleMarkMessage=function(_172,_173,read,_174,_175,_176,_177){
if(_176){
if(this.data.messages.folders){
var _178=undefined;
var _179=undefined;
for(var i=0;i<this.data.messages.folders.length;i++){
var _17a=undefined;
if(_173&&this.data.messages.folders[i].alerts){
_17a=this.data.messages.folders[i].alerts;
}else{
if(_173==false&&this.data.messages.folders[i].messages){
_17a=this.data.messages.folders[i].messages;
}
}
if(_17a){
for(var j=0;j<_17a.length;j++){
if(_17a[j].messageId==_172){
_178=this.data.messages.folders[i];
_179=_17a[j];
break;
}
}
}
if(_179){
break;
}
}
if(_179){
if(_179.read==false&&read){
if(_173){
if(_178.newAlertCount>0){
_178.newAlertCount--;
}
if(this.data.messages.newAlertCount>0){
this.data.messages.newAlertCount--;
}
}else{
if(_178.newMessageCount>0){
_178.newMessageCount--;
}
if(this.data.messages.newMessageCount>0){
this.data.messages.newMessageCount--;
}
}
}else{
if(_179.read&&read==false){
if(_173){
_178.newAlertCount++;
this.data.messages.newAlertCount++;
}else{
_178.newMessageCount++;
this.data.messages.newMessageCount++;
}
}
}
_179.read=read;
if(_173==false){
if(_179.flagged==false&&_174){
if(_178.flaggedMessageCount>0){
_178.flaggedMessageCount--;
}
if(this.data.messages.flaggedMessageCount>0){
this.data.messages.flaggedMessageCount--;
}
}else{
if(_179.flagged&&_174==false){
_178.flaggedMessageCount++;
this.data.messages.flaggedMessageCount++;
}
}
_179.flagged=_174;
}
}
}
pc.defer(_175.bind(this,true,_177));
}else{
pc.defer(_175.bind(this,false,_177));
}
};
EBayData._handleDeleteMessage=function(_17b,_17c,_17d,_17e,_17f){
if(_17e){
if(this.data.messages.folders){
var _180=undefined;
var _181=undefined;
var _182=-1;
for(var i=0;i<this.data.messages.folders.length;i++){
var _183=undefined;
if(_17c&&this.data.messages.folders[i].alerts){
_183=this.data.messages.folders[i].alerts;
}else{
if(_17c==false&&this.data.messages.folders[i].messages){
_183=this.data.messages.folders[i].messages;
}
}
if(_183){
for(var j=0;j<_183.length;j++){
if(_183[j].messageId==_17b){
_180=this.data.messages.folders[i];
_181=_183[j];
_182=j;
break;
}
}
}
if(_181){
break;
}
}
if(_181){
if(_17c){
if(_180.totalAlertCount>0){
_180.totalAlertCount--;
}
if(this.data.messages.totalAlertCount>0){
this.data.messages.totalAlertCount--;
}
if(_181.read==false){
if(_180.newAlertCount>0){
_180.newAlertCount--;
}
if(this.data.messages.newAlertCount>0){
this.data.messages.newAlertCount--;
}
}
if(_181.resolutionStatus==EBayConstants.AlertResolutions.UNRESOLVED){
if(_180.unresolvedAlertCount>0){
_180.unresolvedAlertCount--;
}
if(this.data.messages.unresolvedAlertCount>0){
this.data.messages.unresolvedAlertCount--;
}
}
Helpers.Array.remove(_180.alerts,_182,_182);
}else{
if(_180.totalMessageCount>0){
_180.totalMessageCount--;
}
if(this.data.messages.totalMessageCount>0){
this.data.messages.totalMessageCount--;
}
if(_181.read==false){
if(_180.newMessageCount>0){
_180.newMessageCount--;
}
if(this.data.messages.newMessageCount>0){
this.data.messages.newMessageCount--;
}
}
if(_181.flagged==true){
if(_180.flaggedMessageCount>0){
_180.flaggedMessageCount--;
}
if(this.data.messages.flaggedMessageCount>0){
this.data.messages.flaggedMessageCount--;
}
}
Helpers.Array.remove(_180.messages,_182,_182);
}
}
}
pc.defer(_17d.bind(this,true,_17f));
}else{
pc.defer(_17d.bind(this,false,_17f));
}
};
EBayData._handleGetMessageFolders=function(_184,_185,_186){
if(_185){
this.data.messages.flaggedMessageCount=_186.flaggedMessageCount;
this.data.messages.newAlertCount=_186.newAlertCount;
this.data.messages.newMessageCount=_186.newMessageCount;
this.data.messages.totalAlertCount=_186.totalAlertCount;
this.data.messages.totalMessageCount=_186.totalMessageCount;
this.data.messages.unresolvedAlertCount=_186.unresolvedAlertCount;
this.data.messages.folders=_186.folders;
pc.defer(_184.bind(this,true,_186));
}else{
pc.defer(_184.bind(this,false,_186));
}
};
EBayData._handleGetCategories=function(_187,_188,_189){
this.data.categories=_189.categories;
if(_187){
pc.defer(_187.bind(this,_188,_189));
}
};
EBayData._handleUser=function(_18d,_18e,_18f){
try{
if(_18e){
this.data.user.userId=_18f.userId;
this.data.user.name=_18f.userId;
this.data.user.email=_18f.email;
pc.defer(_18d.bind(this,true,this.data.user));
}else{
pc.defer(_18d.bind(this,false,_18f));
}
}
catch(e){
pc.Log.logException(e);
var _190={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-12"};
pc.defer(_18d.bind(this,false,_190));
}
};
EBayData._isItemInList=function(list,item){
if(item!=undefined){
return this._isItemInListByItemId(list,item.itemId);
}
return undefined;
};
EBayData._isItemInListByItemId=function(list,_197){
if(list!=undefined&&_197!=undefined){
for(var i=0;i<list.length;i++){
if(list[i]!=undefined&&list[i].itemId==_197){
return list[i];
}
}
}
return undefined;
};
EBayData._updateMaxBidAndReserveMetInWatchList=function(){
pc.Log.info("EBayData._updateMaxBidAndReserveMetInWatchList called");
for(var i=0;i<this.data.auctionlists.watch.items.length;i++){
var _198=this.data.auctionlists.watch.items[i];
var _199=this._isItemInList(this.data.auctionlists.bid.items,_198);
if(_199!=undefined){
_198.maxBid=_199.maxBid;
_198.maxBidCurrency=_199.maxBidCurrency;
_198.isReserveMet=_199.isReserveMet;
continue;
}
var _19a=this._isItemInList(this.data.auctionlists.won.items,_198);
if(_19a!=undefined){
_198.maxBid=_19a.maxBid;
_198.maxBidCurrency=_19a.maxBidCurrency;
_198.isReserveMet=_19a.isReserveMet;
continue;
}
var _19b=this._isItemInList(this.data.auctionlists.lost.items,_198);
if(_19b!=undefined){
_198.maxBid=_19b.maxBid;
_198.maxBidCurrency=_19b.maxBidCurrency;
_198.isReserveMet=_19b.isReserveMet;
_198.isLostItem=_19b.isLostItem;
continue;
}
}
};
EBayData._handleSetUserNotes=function(_1b3,text,_1b4,_1b5,_1b6){
pc.Log.info("EBayData._handleSetUserNotes called[success="+_1b5+"]");
try{
if(_1b5){
for(var i=0;i<this.listArray.length;i++){
var item=this._isItemInListByItemId(listArray[i].items,_1b3);
if(item){
item.userNotes=text;
}
}
pc.defer(_1b4.bind(this,true,_1b6));
}else{
pc.defer(_1b4.bind(this,false,_1b6));
}
}
catch(e){
pc.Log.logException(e);
var _1b7={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-240"};
pc.defer(_1b4.bind(this,false,_1b7));
}
};
EBayData._handleGetItemsAwaitingFeedback=function(_1b8,_1b9,_1ba,_1bb,_1bc){
pc.Log.info("EBayData._handleGetItemsAwaitingFeedback called[success="+_1bb+"]");
try{
if(_1bb){
if(_1bc.feedbackTransactions!=undefined){
this.data.itemsAwaitingFeedback.count=_1bc.count;
if(_1b8==1){
this.data.itemsAwaitingFeedback.items=_1bc.feedbackTransactions;
}else{
var _1bd=(_1b8-1)*_1b9;
for(var i=0;i<_1bc.feedbackTransactions.length;i++){
this.data.itemsAwaitingFeedback.items[_1bd+i]=_1bc.feedbackTransactions[i];
}
}
this.data.itemsAwaitingFeedback.lastUpdate=undefined;
}else{
this.data.itemsAwaitingFeedback.count=0;
this.data.itemsAwaitingFeedback.items=[];
this.data.itemsAwaitingFeedback.lastUpdate=undefined;
}
_1bc.realOffset=0;
_1bc.items=this.data.itemsAwaitingFeedback.items;
_1bc.count=this.data.itemsAwaitingFeedback.count;
pc.defer(_1ba.bind(this,true,_1bc));
}else{
pc.defer(_1ba.bind(this,false,_1bc));
}
}
catch(e){
pc.Log.logException(e);
var _1be={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ED-241"};
pc.defer(_1ba.bind(this,false,_1be));
}
};
EBayData._handleLeaveFeedback=function(_1bf,_1c0,_1c1){
pc.Log.info("EBayData._handleLeaveFeedback called[success="+_1c0+"]");
pc.defer(_1bf.bind(this,_1c0,_1c1));
};
EBayData._handleGetBestOffers=function(_1c2,_1c3,_1c4){
pc.Log.info("EBayData._handleGetBestOffers called[success="+_1c3+"]");
pc.defer(_1c2.bind(this,_1c3,_1c4));
};
EBayData._handleRespondToBestOffer=function(_1c5,_1c6,_1c7){
pc.Log.info("EBayData._handleRespondToBestOffer called[success="+_1c6+"]");
pc.defer(_1c5.bind(this,_1c6,_1c7));
};
EBayData._handleAddItem=function(_1c8,_1c9,_1ca){
pc.Log.info("EBayData._handleAddItem called[success="+_1c9+"]");
pc.defer(_1c8.bind(this,_1c9,_1ca));
};

