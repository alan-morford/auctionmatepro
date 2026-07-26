/**
 * eBayBrowse-lib.js — eBay Browse API (REST, OAuth2 Bearer) wrapper.
 *
 * Replaces:
 *   - EBayFindingLib.findItemsByKeywords / findItemsAdvanced (Finding API —
 *     decommissioned by eBay 2025-02-04)
 *   - EBayShoppingLib.getSingleItem / getItemStatus (Shopping API — also
 *     decommissioned 2025-02-04)
 *
 * Both replaced calls here produce items shaped as closely as possible to
 * what those two libs used to return (see their _parseItem for the target
 * shape), so ebaydata.js's downstream consumers (list/article views) need
 * minimal changes.
 *
 * Auth: plain "Authorization: Bearer <access_token>" — NOT the
 * X-EBAY-API-IAF-TOKEN header eBayTrading-lib.js uses for the Trading API;
 * that header is specific to the traditional-API OAuth bridge. REST APIs use
 * standard OAuth Bearer auth. Marketplace is selected via the
 * X-EBAY-C-MARKETPLACE-ID header (Browse API's equivalent of Finding's
 * GLOBAL-ID / Trading's SITEID), derived from EBayConfig.SITE_CONFIG's
 * existing GLOBAL_ID (format "EBAY-US") by swapping "-" for "_".
 *
 * NOTE: exact Browse API item_summary/item field names below are written
 * from eBay's documented schema but have not been exercised against a live
 * response yet (blocked on eBay dev keys) — verify field names once real
 * testing starts, particularly the auction-specific fields
 * (currentBidPrice/bidCount/itemEndDate), which are less commonly exercised
 * than the fixed-price fields.
 */
EBayBrowseLib={};
EBayBrowseLib.API_BASE="https://api.ebay.com/buy/browse/v1";
EBayBrowseLib.search=function(locale,keywords,categoryId,filters,page,pageSize,sortOrder,callback){
pc.Log.info("EBayBrowseLib.search called[locale="+locale+", keywords="+keywords+", categoryId="+categoryId+", page="+page+", pageSize="+pageSize+"]");
var url=this.API_BASE+"/item_summary/search?limit="+pageSize+"&offset="+((page-1)*pageSize);
if(keywords!=undefined&&keywords!=""){
url+="&q="+encodeURIComponent(keywords);
}
if(categoryId!=undefined&&categoryId!=EBayConstants.DEFAULT_ALL){
url+="&category_ids="+encodeURIComponent(categoryId);
}
var filterParts=this._buildFilterParam(filters);
if(filterParts.length>0){
url+="&filter="+encodeURIComponent(filterParts.join(","));
}
var sort=this._mapSortOrder(sortOrder);
if(sort!=undefined){
url+="&sort="+sort;
}
this._ajaxRequest(locale,url,this._handleSearchResponseSuccess.bind(this,callback),this._handleResponseFailure.bind(this,callback));
};
// filters: {listingType, minPrice, minPriceCurrency, maxPrice, maxPriceCurrency,
//   paymentMethodPayPal, condition, sellers:[], sellerBusinessType} — same
// shape findItemsAdvanced's caller (advancedSearch) already builds; mapped
// here to Browse API's filter= aspect syntax instead of Finding's
// itemFilter(n).name/value pairs.
EBayBrowseLib._buildFilterParam=function(filters){
var parts=[];
if(!filters){
return parts;
}
if(filters.listingType!=undefined&&filters.listingType!=EBayConstants.DEFAULT_ALL){
var buyingOption=undefined;
switch(filters.listingType){
case EBayConstants.ListingTypes.CHINESE:
buyingOption="AUCTION";
break;
case EBayConstants.ListingTypes.FIXED_PRICE_ITEM:
case EBayConstants.ListingTypes.STORES_FIXED_PRICE:
buyingOption="FIXED_PRICE";
break;
}
if(buyingOption!=undefined){
parts.push("buyingOptions:{"+buyingOption+"}");
}
}
if(filters.minPrice!=undefined||filters.maxPrice!=undefined){
var lo=filters.minPrice!=undefined?filters.minPrice:"";
var hi=filters.maxPrice!=undefined?filters.maxPrice:"";
parts.push("price:["+lo+".."+hi+"]");
if(filters.minPriceCurrency||filters.maxPriceCurrency){
parts.push("priceCurrency:"+(filters.minPriceCurrency||filters.maxPriceCurrency));
}
}
if(filters.paymentMethodPayPal){
parts.push("paymentMethods:{PAYPAL}");
}
if(filters.condition!=undefined&&filters.condition!=EBayConstants.DEFAULT_ALL){
parts.push("conditionIds:{"+filters.condition+"}");
}
if(filters.sellers!=undefined&&filters.sellers.length>0){
parts.push("sellers:{"+filters.sellers.join("|")+"}");
}
return parts;
};
EBayBrowseLib._mapSortOrder=function(sortOrder){
if(sortOrder==undefined){
return undefined;
}
switch(sortOrder){
case EBayConstants.SortOrder.END_TIME_SOONEST:
return "endingSoonest";
case EBayConstants.SortOrder.START_TIME_NEWEST:
return "newlyListed";
case EBayConstants.SortOrder.DISTANCE_NEAREST:
return "distance";
case EBayConstants.SortOrder.PRICE_PLUS_SHIPPING_LOWEST:
return "price";
case EBayConstants.SortOrder.PRICE_PLUS_SHIPPING_HIGHEST:
case EBayConstants.SortOrder.CURRENT_PRICE_HIGHEST:
return "-price";
case EBayConstants.SortOrder.BEST_MATCH:
default:
return undefined;
}
};
// itemId may be either a Browse-native compound id ("v1|123456789|0", as
// returned by search() above) or a classic legacy numeric id (as used
// throughout the Trading-API-backed My eBay lists/watchlist) — routed to
// the matching Browse endpoint accordingly.
EBayBrowseLib.getItem=function(locale,itemId,callback){
pc.Log.info("EBayBrowseLib.getItem called[locale="+locale+", itemId="+itemId+"]");
var url;
if((""+itemId).indexOf("|")>=0){
url=this.API_BASE+"/item/"+encodeURIComponent(itemId);
}else{
url=this.API_BASE+"/item/get_item_by_legacy_id?legacy_item_id="+encodeURIComponent(itemId);
}
this._ajaxRequest(locale,url,this._handleGetItemResponseSuccess.bind(this,callback),this._handleResponseFailure.bind(this,callback));
};
EBayBrowseLib._marketplaceId=function(locale){
var country=Helpers.Locale.getCountry(locale);
var globalId=EBayConfig.SITE_CONFIG[country]!=undefined?EBayConfig.SITE_CONFIG[country].GLOBAL_ID:EBayConfig.SITE_CONFIG["US"].GLOBAL_ID;
return globalId.replace("-","_");
};
EBayBrowseLib._ajaxRequest=function(locale,url,onSuccess,onFailure){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
try{
var params={method:"get",requestHeaders:["Authorization","Bearer "+enyo.application.preferences.data.user.access_token,"X-EBAY-C-MARKETPLACE-ID",this._marketplaceId(locale)],onSuccess:this._handleEbayResponse.bind(this,true,onSuccess,onFailure),onFailure:this._handleEbayResponse.bind(this,false,onSuccess,onFailure)};
pc.Log.info("_ajaxRequest: ",url);
pc.Ajax.request(url,params);
}
catch(e){
pc.Log.logException(e);
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"EBL-01"});
}
}else{
onFailure({errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION});
}
};
EBayBrowseLib._handleEbayResponse=function(isSuccess,onSuccess,onFailure,response){
try{
if(response.status==200){
var json=eval("("+response.responseText+")");
onSuccess(json);
}else{
var json=undefined;
try{
json=eval("("+response.responseText+")");
}
catch(e2){
}
var errorId=json&&json.errors&&json.errors[0]?json.errors[0].errorId:undefined;
var message=json&&json.errors&&json.errors[0]?json.errors[0].message:undefined;
pc.Log.error("status code"+response.status+(message?(" "+message):""));
onFailure({errorCode:EBayConstants.ErrorCodes.REQUEST_ERROR,errorCodeNumerical:errorId||("EBL-HTTP-"+response.status),errorShortMessage:message,errorLongMessage:message});
}
}
catch(e){
pc.Log.logException(e);
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"EBL-02"});
}
};
EBayBrowseLib._handleResponseFailure=function(callback,errorObj){
callback(false,errorObj);
};
EBayBrowseLib._handleSearchResponseSuccess=function(callback,json){
var items=[];
if(json.itemSummaries!=undefined){
for(var i=0;i<json.itemSummaries.length;i++){
items.push(this._parseItemSummary(json.itemSummaries[i]));
}
}
var result={count:json.total||items.length,items:items,categories:[],lastUpdate:undefined};
callback(true,result);
};
EBayBrowseLib._handleGetItemResponseSuccess=function(callback,json){
callback(true,this._parseItemDetail(json));
};
// Target shape matches the old (now removed) EBayFindingLib._parseItem's
// output: {itemId,title,imageUrl,bidCount,price,currency,buyItNowPrice,
// buyItNowCurrency,buyItNowAvailable,shippingCost,shippingCurrency,timeLeft,
// endTime,listingType}.
EBayBrowseLib._parseItemSummary=function(item){
var bidCount=item.bidCount;
var price=item.price?Number(item.price.value):undefined;
var currency=item.price?item.price.currency:undefined;
var buyItNowPrice=undefined;
var buyItNowCurrency=undefined;
var buyItNowAvailable=false;
var listingType=EBayConstants.ListingTypes.FIXED_PRICE_ITEM;
if(item.buyingOptions!=undefined){
if(item.buyingOptions.indexOf("AUCTION")>=0){
listingType=EBayConstants.ListingTypes.CHINESE;
if(item.currentBidPrice!=undefined){
price=Number(item.currentBidPrice.value);
currency=item.currentBidPrice.currency;
}
if(bidCount==undefined){
bidCount=0;
}
}
if(item.buyingOptions.indexOf("FIXED_PRICE")>=0){
if(listingType==EBayConstants.ListingTypes.CHINESE){
buyItNowAvailable=true;
buyItNowPrice=item.price?Number(item.price.value):undefined;
buyItNowCurrency=item.price?item.price.currency:undefined;
}else{
listingType=EBayConstants.ListingTypes.FIXED_PRICE_ITEM;
}
}
}
var shippingCost=undefined;
var shippingCurrency=undefined;
if(item.shippingOptions!=undefined&&item.shippingOptions.length>0&&item.shippingOptions[0].shippingCost!=undefined){
shippingCost=Number(item.shippingOptions[0].shippingCost.value);
shippingCurrency=item.shippingOptions[0].shippingCost.currency;
}
return{itemId:item.itemId,title:item.title,imageUrl:item.image?item.image.imageUrl:undefined,bidCount:bidCount,price:price,currency:currency,buyItNowPrice:buyItNowPrice,buyItNowCurrency:buyItNowCurrency,buyItNowAvailable:buyItNowAvailable,shippingCost:shippingCost,shippingCurrency:shippingCurrency,timeLeft:undefined,endTime:item.itemEndDate?Helpers.parseISO8601Date(item.itemEndDate.toString()):undefined,listingType:listingType};
};
// Target shape matches the old (now removed) EBayShoppingLib._parseItem as
// closely as Browse API's richer/differently-shaped item detail response
// allows.
EBayBrowseLib._parseItemDetail=function(item){
var summary=this._parseItemSummary(item);
var sellerID=item.seller?item.seller.username:undefined;
var sellerFeedbackScore=item.seller?item.seller.feedbackScore:undefined;
var sellerPositiveFeedbackPercent=item.seller?item.seller.feedbackPercentage:undefined;
var pictureUrls=[];
if(item.image!=undefined){
pictureUrls.push(item.image.imageUrl);
}
if(item.additionalImages!=undefined){
for(var i=0;i<item.additionalImages.length;i++){
pictureUrls.push(item.additionalImages[i].imageUrl);
}
}
return{itemId:item.itemId,title:item.title,descriptionUrl:item.itemWebUrl,imageUrl:summary.imageUrl,detailPageUrl:item.itemWebUrl,bidCount:summary.bidCount,price:summary.price,currency:summary.currency,timeLeft:summary.timeLeft,endTime:summary.endTime,buyItNowPrice:summary.buyItNowPrice,buyItNowCurrency:summary.buyItNowCurrency,buyItNowAvailable:summary.buyItNowAvailable,isReserveMet:item.reservePriceMet,hitCount:undefined,shippingCost:summary.shippingCost,shippingCurrency:summary.shippingCurrency,sellerID:sellerID,sellerFeedbackScore:sellerFeedbackScore,sellerRatingStar:undefined,sellerPositiveFeedbackPercent:sellerPositiveFeedbackPercent,listingType:summary.listingType,quantity:item.estimatedAvailabilities?item.estimatedAvailabilities[0].estimatedAvailableQuantity:undefined,quantitySold:item.estimatedAvailabilities?item.estimatedAvailabilities[0].estimatedSoldQuantity:undefined,minimumToBid:undefined,minimumToBidCurrency:undefined,location:item.itemLocation?(item.itemLocation.city||item.itemLocation.country):undefined,shipToLocations:[],insuranceOption:undefined,paymentMethods:[],primaryCategoryName:item.categoryPath,pictureUrls:pictureUrls,condition:item.condition,returnPolicyReturnsAccepted:item.returnTerms?item.returnTerms.returnsAccepted:undefined,returnPolicyRefund:item.returnTerms?item.returnTerms.refundMethod:undefined,returnPolicyReturnsWithin:item.returnTerms?item.returnTerms.returnPeriod&&item.returnTerms.returnPeriod.value:undefined,returnPolicyShippingCostPaidBy:item.returnTerms?item.returnTerms.returnShippingCostPayer:undefined,highestBidderID:undefined,highestBidderFeedbackScore:undefined,highestBidderRatingStar:undefined};
};
