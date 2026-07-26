/**
 * eBayBroker-lib.js — brokered OAuth2 login for AuctionMate Pro on webOS.
 *
 * This device can't do OAuth itself: the consent screen at auth.ebay.com won't
 * reliably render in this WebKit (same problem the box app hit with Box's
 * consent screen), so login is delegated to the shared webOS OAuth broker
 * (oauth.wosa.link, the same one box uses) via its code-based hand-off:
 *
 *   1. device  -> GET  /ebay/get-code           (mint a short code)
 *   2. user    -> opens oauth.wosa.link/ebay in a real browser, enters the
 *                 code, approves access on eBay's consent screen there
 *   3. broker  -> exchanges the auth code for tokens SERVER-SIDE (eBay's
 *                 Cert ID lives only on the broker, never in this app)
 *   4. device  -> polls GET /ebay/check-code?code=...  until tokens come back
 *   5. device  -> GET  /ebay/refresh?refresh_token=... when the access token expires
 *
 * The resulting OAuth access token is used two ways elsewhere in this app:
 *   - as a plain "Authorization: Bearer <token>" header against eBay's REST
 *     APIs (Browse, Order, Taxonomy) — see eBayBrowse-lib.js / eBayOrder-lib.js
 *     / eBayTaxonomy-lib.js.
 *   - as an "X-EBAY-API-IAF-TOKEN" header against the Trading API (My eBay,
 *     watchlist, bidding, messaging, feedback) — see eBayTrading-lib.js. eBay's
 *     traditional APIs accept an OAuth token this way instead of the old
 *     Auth'n'Auth RequesterCredentials, and don't scope-check it.
 *
 * Config (BROKER_BASE_URL / APP_NAME) comes from eBayApiConfig.js, which is
 * git-ignored and seeded from eBayApiConfig.js.example by build.sh — no eBay
 * secret is ever needed in this file or that config: the secret lives only on
 * the broker.
 *
 * Uses pc.Ajax (this tree's Prototype.js-based request wrapper — same one
 * eBayTrading-lib.js/eBayFinding-lib.js already use) rather than enyo.xhr, to
 * match this codebase's existing convention.
 */
EBayBroker={};
EBayBroker._brokerUrl=function(endpoint,extraQuery){
var url=EBayApiConfig.BROKER_BASE_URL+"/"+endpoint+".php"+"?app="+encodeURIComponent(EBayApiConfig.APP_NAME);
return extraQuery?(url+extraQuery):url;
};
EBayBroker.getAuthCode=function(onSuccess,onFailure){
EBayBroker._request(EBayBroker._brokerUrl("get-code"),onSuccess,onFailure);
};
EBayBroker.checkAuthCode=function(code,onSuccess,onFailure){
EBayBroker._request(EBayBroker._brokerUrl("check-code","&code="+encodeURIComponent(code)),onSuccess,onFailure);
};
EBayBroker.refreshAccessToken=function(refreshToken,onSuccess,onFailure){
EBayBroker._request(EBayBroker._brokerUrl("refresh","&refresh_token="+encodeURIComponent(refreshToken)),onSuccess,onFailure);
};
EBayBroker._request=function(url,onSuccess,onFailure){
try{
pc.Log.info("EBayBroker._request:",url);
var params={method:"get",onSuccess:function(response){
var json=EBayBroker._parse(response);
if(json){
onSuccess(json,response);
}else{
pc.Log.error("EBayBroker._request: unparseable response, status"+(response?response.status:"?"));
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"EBK-02"});
}
},onFailure:function(response){
pc.Log.error("EBayBroker._request: status code"+(response?response.status:"?"));
onFailure({errorCode:EBayConstants.ErrorCodes.REQUEST_ERROR,errorCodeNumerical:"EBK-03",httpStatus:response?response.status:undefined});
}};
pc.Ajax.request(url,params);
}
catch(e){
pc.Log.logException(e);
onFailure({errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"EBK-01"});
}
};
EBayBroker._parse=function(response){
try{
var raw=response&&response.responseText;
return raw?JSON.parse(raw):null;
}
catch(e){
return null;
}
};
