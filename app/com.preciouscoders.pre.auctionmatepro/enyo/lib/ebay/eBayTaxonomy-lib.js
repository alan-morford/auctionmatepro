/**
 * eBayTaxonomy-lib.js — eBay Taxonomy API (REST, OAuth2 Bearer) wrapper.
 *
 * Replaces EBayShoppingLib.getCategories (Shopping API's GetCategoryInfo —
 * decommissioned by eBay 2025-02-04), feeding the same flat top-level
 * {categories:[{categoryId,categoryName}]} shape the advanced-search category
 * picker already consumes.
 *
 * Taxonomy is a two-step, per-marketplace lookup: first resolve which
 * category tree a marketplace uses (get_default_category_tree_id), then fetch
 * that tree (category_tree/{id}) and take the root's immediate children as
 * the flat top-level list — the old Shopping call's CategoryLevel==1 filter
 * did the same flattening. The tree id is cached per marketplace since it
 * rarely if ever changes.
 *
 * NOTE: like eBayBrowse-lib.js, field names here are written from eBay's
 * documented schema and not yet exercised against a live response (blocked
 * on eBay dev keys) — verify once real testing starts.
 */
EBayTaxonomyLib={};
EBayTaxonomyLib.API_BASE="https://api.ebay.com/commerce/taxonomy/v1";
EBayTaxonomyLib._treeIdCache={};
EBayTaxonomyLib.getCategories=function(locale,callback){
pc.Log.info("EBayTaxonomyLib.getCategories called[locale="+locale+"]");
var marketplaceId=EBayBrowseLib._marketplaceId(locale);
var cachedTreeId=this._treeIdCache[marketplaceId];
if(cachedTreeId!=undefined){
this._fetchCategoryTree(locale,cachedTreeId,callback);
return;
}
this._ajaxRequest(locale,this.API_BASE+"/get_default_category_tree_id?marketplace_id="+encodeURIComponent(marketplaceId),enyo.bind(this,function(json){
this._treeIdCache[marketplaceId]=json.categoryTreeId;
this._fetchCategoryTree(locale,json.categoryTreeId,callback);
}),enyo.bind(this,function(errorObj){
callback(false,errorObj);
}));
};
EBayTaxonomyLib._fetchCategoryTree=function(locale,treeId,callback){
this._ajaxRequest(locale,this.API_BASE+"/category_tree/"+encodeURIComponent(treeId),enyo.bind(this,function(json){
callback(true,this._parseCategoryTree(json));
}),enyo.bind(this,function(errorObj){
callback(false,errorObj);
}));
};
EBayTaxonomyLib._parseCategoryTree=function(json){
var categories=[];
var children=json.rootCategoryNode&&json.rootCategoryNode.childCategoryTreeNodes;
if(children!=undefined){
for(var i=0;i<children.length;i++){
var node=children[i].category;
if(node!=undefined){
categories.push({categoryId:node.categoryId,categoryName:node.categoryName});
}
}
}
return{categories:categories};
};
EBayTaxonomyLib._ajaxRequest=function(locale,url,onSuccess,onFailure){
if(!enyo.application.preferences.data.user.access_token){
// Called unconditionally at every launch via EBayData.init(), including
// before login — skip the call rather than send "Bearer undefined" and
// get a 401 from eBay every time.
onFailure({errorCode:EBayConstants.ErrorCodes.REQUEST_ERROR,errorCodeNumerical:"ETX-NOTOKEN"});
return;
}
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
try{
var params={method:"get",requestHeaders:["Authorization","Bearer "+enyo.application.preferences.data.user.access_token],onSuccess:this._handleEbayResponse.bind(this,onSuccess,onFailure),onFailure:this._handleEbayResponse.bind(this,onSuccess,onFailure)};
pc.Log.info("_ajaxRequest: ",url);
pc.Ajax.request(url,params);
}
catch(e){
pc.Log.logException(e);
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETX-01"});
}
}else{
onFailure({errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION});
}
};
EBayTaxonomyLib._handleEbayResponse=function(onSuccess,onFailure,response){
try{
if(response.status==200){
onSuccess(eval("("+response.responseText+")"));
}else{
pc.Log.error("status code"+response.status);
onFailure({errorCode:EBayConstants.ErrorCodes.REQUEST_ERROR,errorCodeNumerical:"ETX-HTTP-"+response.status});
}
}
catch(e){
pc.Log.logException(e);
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETX-02"});
}
};
