EBayTradingLib={};
EBayTradingLib.getMyeBayBuying=function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
pc.Log.info("EBayTradingLib.getMyeBayBuying called[locale= "+_2+", watchListPageNumber="+_3+", watchListEntpageNumber, entriesPerPage, riesPerPage="+_4+", bidListPageNumber="+_5+", bidListEntriesPerPage="+_6+", wonListPageNumber="+_7+", wonListEntriesPerPage="+_8+", lostListPageNumber="+_9+", lostListEntriesPerPage="+_a+", bestOfferListPageNumber="+_b+", bestOfferListEntriesPerPage="+_c+"]");
var _e=Helpers.Locale.getCountry(_2);
var _f=EBayConfig.SITE_CONFIG[_e].SITE_ID;
this._ajaxRequest("GetMyeBayBuying",this._createGetMyeBayBuyingRequest(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c),_f,this._handleGetMyeBayBuyingResponseSuccess.bind(this,_2,_d),this._handleGetMyeBayBuyingResponseFailure.bind(this,_d));
};
EBayTradingLib.getMyeBaySelling=function(_10,_11,_12,_13,_14,_15,_16,_17,_18){
pc.Log.info("EBayTradingLib.getMyeBaySelling called[locale= "+_11+", activeListPageNumber="+_12+", activeListEntriesPerPage="+_13+", soldListPageNumber="+_14+", soldListEntriesPerPage="+_15+", unsoldListPageNumber="+_16+", unsoldListEntriesPerPage="+_17+"]");
var _19=Helpers.Locale.getCountry(_11);
var _1a=EBayConfig.SITE_CONFIG[_19].SITE_ID;
this._ajaxRequest("GetMyeBaySelling",this._createGetMyeBaySellingRequest(_10,_11,_12,_13,_14,_15,_16,_17),_1a,this._handleGetMyeBaySellingResponseSuccess.bind(this,_11,_18),this._handleGetMyeBaySellingResponseFailure.bind(this,_18));
};
EBayTradingLib.getMyeBayReminders=function(_1b,_1c,_1d,_1e,_1f){
pc.Log.info("EBayTradingLib.getMyeBayReminders called[locale= "+_1c+", buyingRemindersDurationInDays="+_1d+", sellingRemindersDurationInDays="+_1e+"]");
var _20=Helpers.Locale.getCountry(_1c);
var _21=EBayConfig.SITE_CONFIG[_20].SITE_ID;
this._ajaxRequest("GetMyeBayReminders",this._createGetMyeBayRemindersRequest(_1b,_1c,_1d,_1e),_21,this._handleGetMyeBayRemindersResponseSuccess.bind(this,_1c,_1f),this._handleGetMyeBayRemindersResponseFailure.bind(this,_1f));
};
EBayTradingLib.getItem=function(_22,_23,_24,_25){
pc.Log.info("EBayTradingLib.getItem called[locale= "+_23+", itemId="+_24+"]");
var _26=Helpers.Locale.getCountry(_23);
var _27=EBayConfig.SITE_CONFIG[_26].SITE_ID;
this._ajaxRequest("GetItem",this._createGetItemRequest(_22,_23,_24),_27,this._handleGetItemResponseSuccess.bind(this,_23,_25),this._handleGetItemResponseFailure.bind(this,_25));
};
EBayTradingLib.getTransactionItem=function(_28,_29,_2a,_2b,_2c){
pc.Log.info("EBayTradingLib.getTransactionItem called[locale= "+_29+", itemId="+_2a+"]");
this.getItem(_28,_29,_2a,this._handleGetTransactionItem.bind(this,_28,_29,_2b,_2c));
};
EBayTradingLib.getFeedback=function(_2d,_2e,_2f,_30,_31,_32){
pc.Log.info("EBayTradingLib.getFeedback called[locale="+_2e+", userId="+_2f+", pageNumber="+_30+", entriesPerPage="+_31+"]");
var _33=Helpers.Locale.getCountry(_2e);
var _34=EBayConfig.SITE_CONFIG[_33].SITE_ID;
this._ajaxRequest("GetFeedback",this._createGetFeedbackRequest(_2d,_2e,_2f,_30,_31),_34,this._handleGetFeedbackResponseSuccess.bind(this,_2f,_32),this._handleGetFeedbackResponseFailure.bind(this,_32));
};
EBayTradingLib.getAllBidders=function(_35,_36,_37,_38){
pc.Log.info("EBayTradingLib.getAllBidders called[locale= "+_36+", itemId="+_37+"]");
var _39=Helpers.Locale.getCountry(_36);
var _3a=EBayConfig.SITE_CONFIG[_39].SITE_ID;
this._ajaxRequest("GetAllBidders",this._createGetAllBiddersRequest(_35,_36,_37),_3a,this._handleGetAllBiddersResponseSuccess.bind(this,_38),this._handleGetAllBiddersResponseFailure.bind(this,_38));
};
EBayTradingLib.getSellerList=function(_3b,_3c,_3d,_3e,_3f,_40,_41,_42){
pc.Log.info("EBayTradingLib.getSellerList called[locale= "+_3c+", userId="+_3d+", endDateFrom="+_3e+", endDateTo="+_3f+", pageNumber="+_40+", entriesPerPage="+_41+"]");
var _43=Helpers.Locale.getCountry(_3c);
var _44=EBayConfig.SITE_CONFIG[_43].SITE_ID;
this._ajaxRequest("GetSellerList",this._createGetSellerListRequest(_3b,_3c,_3d,_3e,_3f,_40,_41),_44,this._handleGetSellerListResponseSuccess.bind(this,_3c,_42),this._handleGetSellerListResponseFailure.bind(this,_42));
};
EBayTradingLib.addToWatchListRequest=function(_45,_46,_47,_48){
pc.Log.info("EBayTradingLib.addToWatchListRequest called[locale= "+_46+", itemId="+_47+"]");
var _49=Helpers.Locale.getCountry(_46);
var _4a=EBayConfig.SITE_CONFIG[_49].SITE_ID;
this._ajaxRequest("AddToWatchList",this._createAddToWatchListRequest(_45,_46,_47),_4a,this._handleAddToWatchListResponseSuccess.bind(this,_48),this._handleAddToWatchListResponseFailure.bind(this,_48));
};
EBayTradingLib.removeFromWatchListRequest=function(_4b,_4c,_4d,_4e){
pc.Log.info("EBayTradingLib.removeFromWatchListRequest called[locale= "+_4c+", itemId="+_4d+"]");
var _4f=Helpers.Locale.getCountry(_4c);
var _50=EBayConfig.SITE_CONFIG[_4f].SITE_ID;
this._ajaxRequest("RemoveFromWatchList",this._createRemoveFromWatchListRequest(_4b,_4c,_4d),_50,this._handleRemoveFromWatchListResponseSuccess.bind(this,_4e),this._handleRemoveFromWatchListResponseFailure.bind(this,_4e));
};
EBayTradingLib.getMyMessages=function(_51,_52,_53,_54,_55,_56,_57){
pc.Log.info("EBayTradingLib.getMyMessages called[locale= "+_52+"]");
var _58=Helpers.Locale.getCountry(_52);
var _59=EBayConfig.SITE_CONFIG[_58].SITE_ID;
this._ajaxRequest("GetMyMessages",this._createGetMyMessagesRequest(_51,_52,_53,_54,_55,_56),_59,this._handleGetMyMessagesResponseSuccess.bind(this,_57),this._handleGetMyMessagesResponseFailure.bind(this,_57));
};
EBayTradingLib.reviseMyMessages=function(_5a,_5b,_5c,_5d,_5e,_5f,_60){
pc.Log.info("EBayTradingLib.reviseMyMessages called[locale="+_5b+", flagged="+_5e+", read="+_5f+"]");
var _61=Helpers.Locale.getCountry(_5b);
var _62=EBayConfig.SITE_CONFIG[_61].SITE_ID;
this._ajaxRequest("ReviseMyMessages",this._createReviseMyMessagesRequest(_5a,_5b,_5c,_5d,_5e,_5f),_62,this._handleReviseMyMessagesResponseSuccess.bind(this,_60),this._handleReviseMyMessagesResponseFailure.bind(this,_60));
};
EBayTradingLib.deleteMyMessages=function(_63,_64,_65,_66,_67){
pc.Log.info("EBayTradingLib.deleteMyMessages called[locale="+_64+"]");
var _68=Helpers.Locale.getCountry(_64);
var _69=EBayConfig.SITE_CONFIG[_68].SITE_ID;
this._ajaxRequest("DeleteMyMessages",this._createDeleteMyMessagesRequest(_63,_64,_65,_66),_69,this._handleDeleteMyMessagesResponseSuccess.bind(this,_67),this._handleDeleteMyMessagesResponseFailure.bind(this,_67));
};
EBayTradingLib.getUser=function(_6a,_6b,_6c){
pc.Log.info("EBayTradingLib.getUser called[locale= "+_6b+"]");
var _6d=Helpers.Locale.getCountry(_6b);
var _6e=EBayConfig.SITE_CONFIG[_6d].SITE_ID;
this._ajaxRequest("GetUser",this._createGetUserRequest(_6a),_6e,this._handleGetUserResponseSuccess.bind(this,_6c),this._handleGetUserResponseFailure.bind(this,_6c));
};
// getSignInUrl/fetchToken (Auth'n'Auth GetSessionID/FetchToken) removed —
// login is now brokered by oauth.wosa.link (see eBayBroker-lib.js and
// Connect.js), which hands this app an OAuth access token directly. That
// token authorizes Trading API calls via the X-EBAY-API-IAF-TOKEN header in
// _ajaxRequest above, so no per-app RuName/session-id dance is needed here
// anymore.
EBayTradingLib.placeOffer=function(_7b,_7c,_7d,_7e,_7f,_80,_81,_82,_83,_84,_85,_86){
pc.Log.info("EBayTradingLib.placeOffer called[locale= "+_7c+", invocationId="+_7d+", endUserIP="+_7e+", itemId="+_7f+", action="+_80+", quantity="+_81+", maxBid="+_82+", maxBidCurrency="+_83+", botBlockToken="+_84+", botBlockUserInput="+_85+"]");
var _87=Helpers.Locale.getCountry(_7c);
var _88=EBayConfig.SITE_CONFIG[_87].SITE_ID;
if(_7d==undefined){
_7d=Helpers.UUID.GUID();
}
this._ajaxRequest("PlaceOffer",this._createPlaceOfferRequest(_7b,_7c,_7d,_7e,_7f,_80,_81,_82,_83,_84,_85),_88,this._handlePlaceOfferResponseSuccess.bind(this,_86),this._handlePlaceOfferResponseFailure.bind(this,_86));
};
EBayTradingLib.getGetChallengeToken=function(_89,_8a,_8b){
pc.Log.info("EBayTradingLib.getChallengeToken called[locale="+_8a+"]");
var _8c=Helpers.Locale.getCountry(_8a);
var _8d=EBayConfig.SITE_CONFIG[_8c].SITE_ID;
this._ajaxRequest("GetChallengeToken",this._createGetChallengeTokenRequest(_89,_8a),_8d,this._handleGetChallengeTokenResponseSuccess.bind(this,_8b),this._handleGetChallengeTokenResponseFailure.bind(this,_8b));
};
EBayTradingLib.getClientAlertsAuthToken=function(_8e,_8f,_90){
pc.Log.info("EBayTradingLib.getClientAlertsAuthToken called[locale="+_8f+"]");
var _91=Helpers.Locale.getCountry(_8f);
var _92=EBayConfig.SITE_CONFIG[_91].SITE_ID;
this._ajaxRequest("GetClientAlertsAuthToken",this._createGetClientAlertsAuthTokenRequest(_8e,_8f),_92,this._handleGetClientAlertsAuthTokenResponseSuccess.bind(this,_90),this._handleGetClientAlertsAuthTokenResponseFailure.bind(this,_90));
};
EBayTradingLib.setNotificationPreferences=function(_93,_94,_95,_96,_97,_98,_99,_9a,_9b,_9c,_9d,_9e,_9f,_a0,_a1,_a2,_a3,_a4,_a5,_a6,_a7,_a8,_a9,_aa){
pc.Log.info("EBayTradingLib.setNotificationPreferences called[locale="+_94+"]");
var _ab=[];
var _ac=[];
_95?_ab.push(EBayConstants.ClientAlertsTypes.END_OF_AUCTION):_ab.push(EBayConstants.ClientAlertsTypes.END_OF_AUCTION);
_96?_ab.push(EBayConstants.ClientAlertsTypes.FIXED_PRICE_END_OF_TRANSACTION):_ab.push(EBayConstants.ClientAlertsTypes.FIXED_PRICE_END_OF_TRANSACTION);
_97?_ab.push(EBayConstants.ClientAlertsTypes.FIXED_PRICE_TRANSACTION):_ab.push(EBayConstants.ClientAlertsTypes.FIXED_PRICE_TRANSACTION);
_98?_ab.push(EBayConstants.ClientAlertsTypes.BID_RECEIVED):_ab.push(EBayConstants.ClientAlertsTypes.BID_RECEIVED);
_99?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_SOLD):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_SOLD);
_9a?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_UNSOLD):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_SOLD);
_9b?_ab.push(EBayConstants.ClientAlertsTypes.ASK_SELLER_QUESTION):_ab.push(EBayConstants.ClientAlertsTypes.ASK_SELLER_QUESTION);
_9c?_ab.push(EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON):_ab.push(EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON);
_9d?_ab.push(EBayConstants.ClientAlertsTypes.OUT_BID):_ab.push(EBayConstants.ClientAlertsTypes.OUT_BID);
_9e?_ab.push(EBayConstants.ClientAlertsTypes.SECOND_CHANCE_OFFER):_ab.push(EBayConstants.ClientAlertsTypes.SECOND_CHANCE_OFFER);
_9f?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_WON):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_WON);
_a0?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_LOST):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_LOST);
_a1?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_MARKED_PAID):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_MARKED_PAID);
_a2?_ab.push(EBayConstants.ClientAlertsTypes.ITEM_MARKED_SHIPPED):_ab.push(EBayConstants.ClientAlertsTypes.ITEM_MARKED_SHIPPED);
_a3?_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_STAR_CHANGED):_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_STAR_CHANGED);
_a4?_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_LEFT):_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_LEFT);
_a5?_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_RECEIVED):_ab.push(EBayConstants.ClientAlertsTypes.FEEDBACK_RECEIVED);
_a6?_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER):_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER);
_a7?_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER_DECLINED):_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER_DECLINED);
_a8?_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER_PLACED):_ab.push(EBayConstants.ClientAlertsTypes.BEST_OFFER_PLACED);
_a9?_ab.push(EBayConstants.ClientAlertsTypes.COUNTER_OFFER_RECEIVED):_ab.push(EBayConstants.ClientAlertsTypes.COUNTER_OFFER_RECEIVED);
var _ad=Helpers.Locale.getCountry(_94);
var _ae=EBayConfig.SITE_CONFIG[_ad].SITE_ID;
this._ajaxRequest("SetNotificationPreferences",this._createSetNotificationPreferencesRequest(_93,_94,_ab,_ac),_ae,this._handleSetNotificationPreferencesResponseSuccess.bind(this,_aa),this._handleSetNotificationPreferencesResponseFailure.bind(this,_aa));
};
EBayTradingLib.getItemsAwaitingFeedback=function(_af,_b0,_b1,_b2,_b3){
pc.Log.info("EBayTradingLib.getItemsAwaitingFeedback called[locale="+_b0+", pageNumber="+_b1+", entriesPerPage="+_b2+"]");
var _b4=Helpers.Locale.getCountry(_b0);
var _b5=EBayConfig.SITE_CONFIG[_b4].SITE_ID;
this._ajaxRequest("GetItemsAwaitingFeedback",this._createGetItemsAwaitingFeedbackRequest(_af,_b0,_b1,_b2),_b5,this._handleGetItemsAwaitingFeedbackSuccess.bind(this,_b3),this._handleGetItemsAwaitingFeedbackFailure.bind(this,_b3));
};
EBayTradingLib.leaveFeedback=function(_b6,_b7,_b8,_b9,_ba,_bb,_bc,_bd,_be,_bf,_c0,_c1){
pc.Log.info("EBayTradingLib.leaveFeedback called[locale="+_b7+", itemId="+_b8+", transactionId="+_b9+", commentText="+_ba+", commentType="+_bb+", sellerRatingCommunication="+_bc+", sellerRatingItemAsDescribed="+_bd+", sellerRatingShippingAndHandlingCharges="+_be+", sellerRatingShippingTime="+_bf+", targetUser="+_c0+"]");
var _c2=Helpers.Locale.getCountry(_b7);
var _c3=EBayConfig.SITE_CONFIG[_c2].SITE_ID;
this._ajaxRequest("LeaveFeedback",this._createLeaveFeedbackRequest(_b6,_b7,_b8,_b9,_ba,_bb,_bc,_bd,_be,_bf,_c0),_c3,this._handleLeaveFeedbackSuccess.bind(this,_c1),this._handleLeaveFeedbackFailure.bind(this,_c1));
};
EBayTradingLib.setUserNotes=function(_c4,_c5,_c6,_c7,_c8){
pc.Log.info("EBayTradingLib.setUserNotes called[locale="+_c5+", itemId="+_c6+", text="+_c7+"]");
var _c9=Helpers.Locale.getCountry(_c5);
var _ca=EBayConfig.SITE_CONFIG[_c9].SITE_ID;
this._ajaxRequest("SetUserNotes",this._createSetUserNotesRequest(_c4,_c5,_c6,_c7),_ca,this._handleSetUserNotesSuccess.bind(this,_c8),this._handleSetUserNotesFailure.bind(this,_c8));
};
EBayTradingLib.getCategories=function(_cb,_cc,_cd,_ce,_cf){
pc.Log.info("EBayTradingLib.getCategories called[locale="+_cc+", categorySiteId="+categorySiteid+", returnAll="+_ce+"]");
var _d0=Helpers.Locale.getCountry(_cc);
var _d1=EBayConfig.SITE_CONFIG[_d0].SITE_ID;
this._ajaxRequest("GetCategories",this._createGetCategoriesRequest(_cb,_cc,_cd,_ce),_d1,this._handleGetCategoriesSuccess.bind(this,_cf),this._handleGetCategoriesFailure.bind(this,_cf));
};
EBayTradingLib.getBestOffers=function(_d2,_d3,_d4,_d5,_d6){
pc.Log.info("EBayTradingLib.getBestOffers called[locale="+_d3+", itemId="+_d4+", onlyActive="+_d5+"]");
var _d7=Helpers.Locale.getCountry(_d3);
var _d8=EBayConfig.SITE_CONFIG[_d7].SITE_ID;
this._ajaxRequest("GetBestOffers",this._createGetBestOffersRequest(_d2,_d3,_d4,_d5),_d8,this._handleGetBestOffersSuccess.bind(this,_d6),this._handleGetBestOffersFailure.bind(this,_d6));
};
EBayTradingLib.respondToBestOffer=function(_d9,_da,_db,_dc,_dd,_de,_df,_e0,_e1){
pc.Log.info("EBayTradingLib.respondToBestOffer called[locale="+_da+", action="+_db+", bestOfferId="+_dc+", itemId="+_dd+", counterOfferPrice="+_de+", counterOfferCurrency="+_df+", counterOfferQuantity="+_e0+"]");
var _e2=Helpers.Locale.getCountry(_da);
var _e3=EBayConfig.SITE_CONFIG[_e2].SITE_ID;
this._ajaxRequest("RespondToBestOffer",this._createRespondToBestOfferRequest(_d9,_da,_db,_dc,_dd,_de,_df,_e0),_e3,this._handleRespondToBestOfferSuccess.bind(this,_e1),this._handleRespondToBestOfferFailure.bind(this,_e1));
};
EBayTradingLib.addItem=function(_e4,_e5,_e6,_e7,_e8,_e9,_ea,_eb,_ec,_ed,_ee,_ef){
var _f0=Helpers.Locale.getCountry(_e5);
var _f1=EBayConfig.SITE_CONFIG[_f0].SITE_ID;
this._ajaxRequest("AddItem",this._createAddItem(_e4,_e5,_e6,_e7,_e8,_e9,_ea,_eb,_ec,_ed,_ee),_f1,this._handleAddItemSuccess.bind(this,_ef),this._handleAddItemFailure.bind(this,_ef));
};
EBayTradingLib._getItemTransactions=function(_f6,_f7,_f8,_f9,_fa){
pc.Log.info("EBayTradingLib.getItemTransactions called[locale= "+_f7+", itemId="+_f8.itemId+", transactionId="+_f9+"]");
var _fb=Helpers.Locale.getCountry(_f7);
var _fc=EBayConfig.SITE_CONFIG[_fb].SITE_ID;
this._ajaxRequest("GetItemTransactions",this._createGetItemTransactionsRequest(_f6,_f7,_f8.itemId,_f9),_fc,this._handleGetItemTransactionsResponseSuccess.bind(this,_f7,_f8,_fa),this._handleGetItemTransactionsResponseFailure.bind(this,_fa));
};
EBayTradingLib._ajaxRequest=function(_fd,_fe,_ff,_100,_101){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
try{
// Authorized via OAuth2 (X-EBAY-API-IAF-TOKEN) instead of the old
// Auth'n'Auth DEV/APP/CERT-NAME headers + <RequesterCredentials> body
// field (removed from every _create*Request builder below) — eBay's
// traditional APIs accept a User access token this way and don't
// scope-check it. The token itself is the OAuth access token obtained
// through the oauth.wosa.link broker (see eBayBroker-lib.js), stored on
// enyo.application.preferences.data.user.access_token.
var _102={method:"post",requestHeaders:["X-EBAY-API-COMPATIBILITY-LEVEL",EBayConfig.API_COMPATIBILITY_LEVEL,"X-EBAY-API-CALL-NAME",_fd,"X-EBAY-API-SITEID",_ff,"X-EBAY-API-IAF-TOKEN",enyo.application.preferences.data.user.access_token,"Content-Type","text/xml"],postBody:_fe,onSuccess:this._handleEbayResponse.bind(this,true,_fd,_100,_101),onFailure:this._handleEbayResponse.bind(this,false,_fd,_100,_101)};
pc.Log.info("_ajaxRequest:",_fe);
pc.Ajax.request(EBayConfig.API_BASE_URL,_102);
}
catch(e){
pc.Log.logException(e);
var _103={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-01"};
_101(_103);
}
}else{
var _103={errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION};
_101(_103);
}
};
EBayTradingLib._handleEbayResponse=function(_104,_105,_106,_107,_108){
try{
if(_108.status==200){
pc.Log.info("ajaxResponse: "+_108.responseText);
var _109=_108.responseText.replace("xmlns=\"urn:ebay:apis:eBLBaseComponents\"","");
var _10a=(new DOMParser()).parseFromString(_109,"text/xml");
var ack=Helpers.XML.getNodeText("//*/Ack",_10a);
if(ack=="Success"){
_106(_10a);
}else{
var _10b=Helpers.XML.getNodeText("//*/Errors/ErrorCode",_10a);
var _10c=Helpers.XML.getNodeText("//*/Errors/ShortMessage",_10a);
var _10d=Helpers.XML.getNodeText("//*/Errors/LongMessage",_10a);
var _10e=undefined;
switch(_10b){
case "932":
case "17470":
_10e=EBayConstants.ErrorCodes.TOKEN_EXPIRED;
break;
case "16110":
case "21916013":
_10e=EBayConstants.ErrorCodes.TOKEN_REVOKED;
break;
case "16119":
case "931":
_10e=EBayConstants.ErrorCodes.TOKEN_INVALID;
break;
case "16118":
_10e=EBayConstants.ErrorCodes.TOKEN_RETRIEVAL_WINDOW_EXPIRED;
break;
case "21916016":
_10e=EBayConstants.ErrorCodes.SESSION_ID_EXPIRED;
break;
case "21916015":
_10e=EBayConstants.ErrorCodes.INVALID_SESSION_ID;
break;
case "841":
_10e=EBayConstants.ErrorCodes.USER_ACCOUNT_SUSPENDED;
break;
case "11104":
_10e=EBayConstants.ErrorCodes.USER_ACCOUNT_CLOSED;
break;
case "518":
_10e=EBayConstants.ErrorCodes.CALL_LIMIT_REACHED;
break;
case "18000":
_10e=EBayConstants.ErrorCodes.DAILY_LIMIT_REACHED;
break;
case "218050":
_10e=EBayConstants.ErrorCodes.USER_LIMIT_REACHED;
break;
case "21916530":
_10e=EBayConstants.ErrorCodes.USER_AGREEMENT_CHANGED;
break;
case "17":
case "231":
_10e=EBayConstants.ErrorCodes.ITEM_NOT_FOUND;
break;
case "12243":
_10e=EBayConstants.ErrorCodes.AUCTION_HAS_ENDED;
break;
case "12210":
_10e=EBayConstants.ErrorCodes.BID_TOO_LOW;
break;
case "12211":
_10e=EBayConstants.ErrorCodes.INVALID_BID;
break;
case "21916658":
_10e=EBayConstants.ErrorCodes.INVALID_BID_FOR_HIGHEST_BIDDER;
break;
case "12244":
_10e=EBayConstants.ErrorCodes.ITEM_ALREADY_SOLD;
break;
case "79":
_10e=EBayConstants.ErrorCodes.QUANTITY_ERROR;
break;
case "12213":
_10e=EBayConstants.ErrorCodes.INVALID_OFFER;
break;
case "21060":
_10e=EBayConstants.ErrorCodes.DUPLICATE_INVOCATION_ID_VIOLATION;
break;
case "21916017":
_10e=EBayConstants.ErrorCodes.AUTH_AND_AUTH_PROCESS_NOT_FINISHED;
break;
default:
_10e=EBayConstants.ErrorCodes.EBAY_ERROR;
break;
}
var _10f={errorCode:_10e,errorCodeNumerical:_10b,errorShortMessage:_10c,errorLongMessage:_10d};
_107(_10f);
}
}else{
pc.Log.error("status code"+_108.status);
var _10f={errorCode:EBayConstants.ErrorCodes.REQUEST_ERROR,errorCodeNumerical:"ETL-02"};
_107(_10f);
}
}
catch(e){
pc.Log.logException(e);
var _10f={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-03"};
_107(_10f);
}
};
EBayTradingLib._createGetMyeBayBuyingRequest=function(_110,_111,_112,_113,_114,_115,_116,_117,_118,_119,_11a,_11b){
var _11c="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetMyeBayBuyingRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_111+"</ErrorLanguage>"+"<DetailLevel>ReturnAll</DetailLevel>"+"<BuyingSummary><Include>true</Include></BuyingSummary>";
if(_113>0){
_11c+="<WatchList><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_113+"</EntriesPerPage><PageNumber>"+_112+"</PageNumber></Pagination></WatchList>";
}
if(_115>0){
_11c+="<BidList><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_115+"</EntriesPerPage><PageNumber>"+_114+"</PageNumber></Pagination></BidList>";
}
if(_117>0){
// DurationInDays: 60 is the max eBay allows for WonList/LostList (there is
// no way to get a full year via this API - a hard eBay platform limit, not
// a config we can raise) - without it, eBay defaults to a much shorter
// window and these lists appear empty for anything not very recent.
_11c+="<WonList><DurationInDays>60</DurationInDays><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_117+"</EntriesPerPage><PageNumber>"+_116+"</PageNumber></Pagination></WonList>";
}
if(_119>0){
_11c+="<LostList><DurationInDays>60</DurationInDays><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_119+"</EntriesPerPage><PageNumber>"+_118+"</PageNumber></Pagination><Sort>EndTimeDescending</Sort></LostList>";
}
if(_11a>0){
_11c+="<BestOfferList><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_11a+"</EntriesPerPage><PageNumber>"+_11b+"</PageNumber></Pagination></BestOfferList>";
}
_11c+="</GetMyeBayBuyingRequest>";
return _11c;
};
EBayTradingLib._createGetMyeBaySellingRequest=function(_11d,_11e,_11f,_120,_121,_122,_123,_124){
var _125="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetMyeBaySellingRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<DetailLevel>ReturnAll</DetailLevel>"+"<ErrorLanguage>"+_11e+"</ErrorLanguage>";
if(_120>0){
_125+="<ActiveList><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_120+"</EntriesPerPage><PageNumber>"+_11f+"</PageNumber></Pagination></ActiveList>";
}
if(_122>0){
// Same 60-day eBay platform cap as WonList/LostList above.
_125+="<SoldList><DurationInDays>60</DurationInDays><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_122+"</EntriesPerPage><PageNumber>"+_121+"</PageNumber></Pagination></SoldList>";
}
if(_124>0){
_125+="<UnsoldList><DurationInDays>60</DurationInDays><IncludeNotes>true</IncludeNotes><Pagination><EntriesPerPage>"+_124+"</EntriesPerPage><PageNumber>"+_123+"</PageNumber></Pagination></UnsoldList>";
}
_125+="</GetMyeBaySellingRequest>";
return _125;
};
EBayTradingLib._createGetMyeBayRemindersRequest=function(_126,_127,_128,_129){
var _12a="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetMyeBayRemindersRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_127+"</ErrorLanguage>";
if(_128>0){
_12a+="<BuyingReminders><DurationInDays>"+_128+"</DurationInDays><Include>true</Include></BuyingReminders>";
}
if(_129>0){
_12a+="<SellingReminders><DurationInDays>"+_129+"</DurationInDays><Include>true</Include></SellingReminders>";
}
_12a+="</GetMyeBayRemindersRequest>";
return _12a;
};
EBayTradingLib._createGetItemRequest=function(_12b,_12c,_12d){
var _12e="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetItemRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_12c+"</ErrorLanguage>"+"<DetailLevel>ReturnAll</DetailLevel>"+"<IncludeItemSpecifics>true</IncludeItemSpecifics>"+"<IncludeWatchCount>true</IncludeWatchCount>"+"<ItemID>"+_12d+"</ItemID>"+"</GetItemRequest>";
return _12e;
};
EBayTradingLib._createGetFeedbackRequest=function(_12f,_130,_131,_132,_133){
var _134="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetFeedbackRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_130+"</ErrorLanguage>"+"<DetailLevel>ReturnAll</DetailLevel>"+"<UserID>"+_131+"</UserID>"+"<Pagination><EntriesPerPage>"+_133+"</EntriesPerPage><PageNumber>"+_132+"</PageNumber></Pagination>"+"</GetFeedbackRequest>";
return _134;
};
EBayTradingLib._createGetItemTransactionsRequest=function(_135,_136,_137,_138){
var _139="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetItemTransactionsRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_136+"</ErrorLanguage>"+"<DetailLevel>ReturnAll</DetailLevel>"+"<ItemID>"+_137+"</ItemID>"+"<TransactionID>"+_138+"</TransactionID>"+"</GetItemTransactionsRequest>";
return _139;
};
EBayTradingLib._createGetAllBiddersRequest=function(_13a,_13b,_13c){
var _13d="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetAllBiddersRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_13b+"</ErrorLanguage>"+"<CallMode>ViewAll</CallMode>"+"<ItemID>"+_13c+"</ItemID>"+"</GetAllBiddersRequest>";
return _13d;
};
EBayTradingLib._createGetSellerListRequest=function(_13e,_13f,_140,_141,_142,_143,_144){
var _145="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetSellerListRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_13f+"</ErrorLanguage>"+"<DetailLevel>ReturnAll</DetailLevel>"+"<UserID>"+_140+"</UserID>"+"<EndTimeFrom>"+Helpers.formatISO8601Date(_141)+"</EndTimeFrom>"+"<EndTimeTo>"+Helpers.formatISO8601Date(_142)+"</EndTimeTo>"+"<Pagination><EntriesPerPage>"+_144+"</EntriesPerPage><PageNumber>"+_143+"</PageNumber></Pagination>"+"</GetSellerListRequest>";
return _145;
};
EBayTradingLib._createAddToWatchListRequest=function(_146,_147,_148){
var _149="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<AddToWatchListRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_147+"</ErrorLanguage>"+"<ItemID>"+_148+"</ItemID>"+"</AddToWatchListRequest>";
return _149;
};
EBayTradingLib._createRemoveFromWatchListRequest=function(_14a,_14b,_14c){
var _14d="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<RemoveFromWatchListRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_14b+"</ErrorLanguage>"+"<ItemID>"+_14c+"</ItemID>"+"</RemoveFromWatchListRequest>";
return _14d;
};
EBayTradingLib._createGetMyMessagesRequest=function(_14e,_14f,_150,_151,_152,_153){
var _154="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetMyMessagesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">";
if(_151!=undefined&&_152!=undefined){
if(_151.length>0){
_154+="<MessageIDs>";
for(var i=0;i<_151.length;i++){
_154+="<MessageID>"+_151[i]+"</MessageID> ";
}
_154+="</MessageIDs>";
}
if(_152.length>0){
_154+="<AlertIDs>";
for(var i=0;i<_152.length;i++){
_154+="<AlertID>"+_152[i]+"</AlertID> ";
}
_154+="</AlertIDs>";
}
_154+="<DetailLevel>ReturnMessages</DetailLevel>";
}else{
if(_153){
_154+="<DetailLevel>ReturnSummary</DetailLevel>";
}else{
_154+="<DetailLevel>ReturnHeaders</DetailLevel>";
}
}
if(_150!=undefined){
_154+="<FolderID>"+_150+"</FolderID> ";
}
_154+="<ErrorLanguage>"+_14f+"</ErrorLanguage>"+"</GetMyMessagesRequest>";
return _154;
};
EBayTradingLib._createReviseMyMessagesRequest=function(_155,_156,_157,_158,_159,read){
var _15a="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<ReviseMyMessagesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_156+"</ErrorLanguage>";
if(_157.length>0){
_15a+="<MessageIDs>";
for(var i=0;i<_157.length;i++){
_15a+="<MessageID>"+_157[i]+"</MessageID> ";
}
_15a+="</MessageIDs>";
}
if(_158.length>0){
_15a+="<AlertIDs>";
for(var i=0;i<_158.length;i++){
_15a+="<AlertID>"+_158[i]+"</AlertID> ";
}
_15a+="</AlertIDs>";
}
_15a+="<Read>"+read+"</Read>"+"<Flagged>"+_159+"</Flagged>"+"</ReviseMyMessagesRequest>";
return _15a;
};
EBayTradingLib._createDeleteMyMessagesRequest=function(_15b,_15c,_15d,_15e){
var _15f="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<DeleteMyMessagesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_15c+"</ErrorLanguage>";
if(_15d.length>0){
_15f+="<MessageIDs>";
for(var i=0;i<_15d.length;i++){
_15f+="<MessageID>"+_15d[i]+"</MessageID> ";
}
_15f+="</MessageIDs>";
}
if(_15e.length>0){
_15f+="<AlertIDs>";
for(var i=0;i<_15e.length;i++){
_15f+="<AlertID>"+_15e[i]+"</AlertID> ";
}
_15f+="</AlertIDs>";
}
_15f+="</DeleteMyMessagesRequest>";
return _15f;
};
EBayTradingLib._createGetUserRequest=function(_160,_161){
var _162="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetUserRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_161+"</ErrorLanguage>"+"</GetUserRequest>";
return _162;
};
EBayTradingLib._createPlaceOfferRequest=function(_169,_16a,_16b,_16c,_16d,_16e,_16f,_170,_171,_172,_173){
var _174="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<PlaceOfferRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_16a+"</ErrorLanguage>"+"<InvocationID>"+_16b+"</InvocationID>";
if(_172!=undefined&&_173!=undefined){
_174+="<BotBlock><BotBlockToken>"+_172+"</BotBlockToken><BotBlockUserInput>"+_173+"</BotBlockUserInput></BotBlock>";
}
_174+="<EndUserIP>"+_16c+"</EndUserIP>"+"<ItemID>"+_16d+"</ItemID>"+"<Offer>"+"<Action>"+_16e+"</Action>"+"<Quantity>"+_16f+"</Quantity>"+"<MaxBid currencyID=\""+_171+"\">"+_170+"</MaxBid>"+"</Offer>"+"</PlaceOfferRequest>";
return _174;
};
EBayTradingLib._createGetChallengeTokenRequest=function(_175,_176){
var _177="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetChallengeTokenRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_176+"</ErrorLanguage>"+"</GetChallengeTokenRequest>";
return _177;
};
EBayTradingLib._createGetClientAlertsAuthTokenRequest=function(_178,_179){
var _17a="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetClientAlertsAuthTokenRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_179+"</ErrorLanguage>"+"</GetClientAlertsAuthTokenRequest>";
return _17a;
};
EBayTradingLib._createSetNotificationPreferencesRequest=function(_17b,_17c,_17d,_17e){
var _17f="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<SetNotificationPreferencesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_17c+"</ErrorLanguage>"+"<UserDeliveryPreferenceArray>";
for(var i=0;i<_17d.length;i++){
_17f+="<NotificationEnable><EventType>"+_17d[i]+"</EventType><EventEnable>Enable</EventEnable></NotificationEnable>";
}
for(var i=0;i<_17e.length;i++){
_17f+="<NotificationEnable><EventType>"+_17e[i]+"</EventType><EventEnable>Disable</EventEnable></NotificationEnable>";
}
_17f+="</UserDeliveryPreferenceArray>"+"</SetNotificationPreferencesRequest>";
return _17f;
};
EBayTradingLib._createGetItemsAwaitingFeedbackRequest=function(_180,_181,_182,_183){
var _184="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetItemsAwaitingFeedbackRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_181+"</ErrorLanguage>"+"<Pagination><EntriesPerPage>"+_183+"</EntriesPerPage><PageNumber>"+_182+"</PageNumber></Pagination>"+"</GetItemsAwaitingFeedbackRequest>";
return _184;
};
EBayTradingLib._createLeaveFeedbackRequest=function(_185,_186,_187,_188,_189,_18a,_18b,_18c,_18d,_18e,_18f){
var req="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<LeaveFeedbackRequest  xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_186+"</ErrorLanguage>"+"<ItemID>"+_187+"</ItemID>";
if(_188){
req+="<TransactionID>"+_188+"</TransactionID>";
}
req+="<CommentText>"+_189+"</CommentText>";
req+="<CommentType>"+_18a+"</CommentType>";
req+="<TargetUser>"+_18f+"</TargetUser>";
req+="<SellerItemRatingDetailArray>";
if(_18b!=undefined){
req+="<ItemRatingDetails><RatingDetail>Communication</RatingDetail><Rating>"+_18b+"</Rating></ItemRatingDetails>";
}
if(_18c!=undefined){
req+="<ItemRatingDetails><RatingDetail>ItemAsDescribed</RatingDetail><Rating>"+_18c+"</Rating></ItemRatingDetails>";
}
if(_18d!=undefined){
req+="<ItemRatingDetails><RatingDetail>ShippingAndHandlingCharges</RatingDetail><Rating>"+_18d+"</Rating></ItemRatingDetails>";
}
if(_18e!=undefined){
req+="<ItemRatingDetails><RatingDetail>ShippingTime</RatingDetail><Rating>"+_18e+"</Rating></ItemRatingDetails>";
}
req+="</SellerItemRatingDetailArray></LeaveFeedbackRequest >";
return req;
};
EBayTradingLib._createSetUserNotesRequest=function(_190,_191,_192,text){
var _193="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<SetUserNotesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_191+"</ErrorLanguage>"+"<ItemID>"+_192+"</ItemID>";
if(text){
req+="<Action>AddOrUpdate</Action >"+"<NoteText>"+text+"</NoteText>";
}else{
req+="<Action>Delete</Action >";
}
req+="</SetUserNotesRequest>";
return _193;
};
EBayTradingLib._createGetCategoriesRequest=function(_194,_195,_196,_197){
var _198="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetCategoriesRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+locale+"</ErrorLanguage>";
if(_196){
req+="<CategorySiteID >"+_196+"</CategorySiteID  >";
}
if(_197){
req+="<DetailLevel>ReturnAll</DetailLevel>";
}
req+="</GetCategoriesRequest>";
return _198;
};
EBayTradingLib._createGetBestOffersRequest=function(_199,_19a,_19b,_19c){
var _19d="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<GetBestOffersRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_19a+"</ErrorLanguage>"+"<ItemID>"+_19b+"</ItemID>"+"<DetailLevel>ReturnAll</DetailLevel>";
if(_19c){
_19d+="<BestOfferStatus>Active</BestOfferStatus>";
}else{
_19d+="<BestOfferStatus>All</BestOfferStatus>";
}
_19d+="</GetBestOffersRequest>";
return _19d;
};
EBayTradingLib._createRespondToBestOfferRequest=function(_19e,_19f,_1a0,_1a1,_1a2,_1a3,_1a4,_1a5){
var _1a6="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<RespondToBestOfferRequest  xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_19f+"</ErrorLanguage>"+"<Action>"+_1a0+"</Action>"+"<BestOfferID>"+_1a1+"</BestOfferID>"+"<ItemID>"+_1a2+"</ItemID>";
if(_1a0==EBayConstants.BestOfferActionCodeTypes.COUNTER){
_1a6+="<CounterOfferPrice currencyID=\""+_1a4+"\">"+_1a3+"</CounterOfferPrice>";
_1a6+="<CounterOfferQuantity>"+_1a5+"</CounterOfferQuantity>";
}
_1a6+="</RespondToBestOfferRequest >";
return _1a6;
};
EBayTradingLib._createAddItemRequest=function(_1a7,_1a8,_1a9,_1aa,_1ab,_1ac,_1ad,_1ae,_1af,_1b0,_1b1){
var _1b2="<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"<AddItemRequest xmlns=\"urn:ebay:apis:eBLBaseComponents\">"+"<ErrorLanguage>"+_1a8+"</ErrorLanguage>"+"<Item>"+"<Title>"+_1a9+"</Title>"+"<Description>"+_1a9+"</Description>"+"<PrimaryCategory><CategoryID>"+_1ab+"</CategoryID></PrimaryCategory>"+"<ListingType>"+_1ac+"</ListingType>";
"<StartPrice currencyID=\""+_1ae+"\">"+_1ad+"</StartPrice>"+"<BuyItNowPrice currencyID=\""+_1b0+"\">"+_1af+"</BuyItNowPrice>"+"<Quantity>"+_1b1+"</Quantity>";
"<PaymentMethods>PayPal</PaymentMethods>"+"<ListingDuration>Days_7</ListingDuration>"+"<ReturnPolicy><ReturnsAcceptedOption>ReturnsAccepted</ReturnsAcceptedOption><RefundOption>MoneyBack</RefundOption><ReturnsWithinOption>Days_30</ReturnsWithinOption><Description></Description><ShippingCostPaidByOption>Buyer</ShippingCostPaidByOption></ReturnPolicy>"+"<ShippingDetails><ShippingType>Flat</ShippingType><ShippingServiceOptions><ShippingServicePriority>1</ShippingServicePriority><ShippingService>USPSMedia</ShippingService><ShippingServiceCost>2.50</ShippingServiceCost></ShippingServiceOptions></ShippingDetails>"+"</Item></AddItemRequest>";
return _1b2;
};
EBayTradingLib._handleGetMyeBayBuyingResponseSuccess=function(_1b3,_1b4,_1b5){
try{
var _1b6=Helpers.XML.getNodeText("//GetMyeBayBuyingResponse/Timestamp",_1b5);
var _1b7=Helpers.parseISO8601Date(_1b6);
var _1b8=Helpers.XML.getNode("//GetMyeBayBuyingResponse/BuyingSummary",_1b5);
var _1b9={watch:undefined,bid:undefined,won:undefined,lost:undefined,};
_1b9.watch=this._parseItemList(_1b5,_1b7,"GetMyeBayBuyingResponse","WatchList",_1b3);
_1b9.bid=this._parseItemList(_1b5,_1b7,"GetMyeBayBuyingResponse","BidList",_1b3);
_1b9.won=this._parseTransactionList(_1b5,_1b7,"GetMyeBayBuyingResponse","WonList",_1b3);
_1b9.lost=this._parseItemList(_1b5,_1b7,"GetMyeBayBuyingResponse","LostList",_1b3);
_1b9.bestOffer=this._parseItemList(_1b5,_1b7,"GetMyeBayBuyingResponse","BestOfferList",_1b3);
_1b4(true,_1b9);
}
catch(e){
pc.Log.logException(e);
var _1ba={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-04"};
_1b4(false,_1ba);
}
};
EBayTradingLib._handleGetMyeBayBuyingResponseFailure=function(_1bb,_1bc){
_1bb(false,_1bc);
};
EBayTradingLib._handleGetMyeBaySellingResponseSuccess=function(_1bd,_1be,_1bf){
try{
var _1c0=Helpers.XML.getNode("//GetMyeBaySellingResponse/SellingSummary",_1bf);
var _1c1=Helpers.XML.getNodeText("//GetMyeBaySellingResponse/Timestamp",_1bf);
var _1c2=Helpers.parseISO8601Date(_1c1);
var _1c3={active:undefined,sold:undefined,unsold:undefined,};
_1c3.active=this._parseItemList(_1bf,_1c2,"GetMyeBaySellingResponse","ActiveList",_1bd);
_1c3.sold=this._parseTransactionList(_1bf,_1c2,"GetMyeBaySellingResponse","SoldList",_1bd);
_1c3.unsold=this._parseItemList(_1bf,_1c2,"GetMyeBaySellingResponse","UnsoldList",_1bd);
_1be(true,_1c3);
}
catch(e){
pc.Log.logException(e);
var _1c4={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-05"};
_1be(false,_1c4);
}
};
EBayTradingLib._handleGetMyeBaySellingResponseFailure=function(_1c5,_1c6){
_1c5(false,_1c6);
};
EBayTradingLib._handleGetMyeBayRemindersResponseSuccess=function(_1c7,_1c8,_1c9){
try{
var _1ca=Helpers.XML.getNode("//GetMyeBayRemindersResponse/BuyingReminders",_1c9);
var _1cb=undefined;
var _1cc=undefined;
var _1cd=undefined;
var _1ce=undefined;
if(_1ca){
_1cb=Helpers.XML.getNodeAsNumber("FeedbackToReceiveCount",_1ca);
_1cc=Helpers.XML.getNodeAsNumber("FeedbackToSendCount",_1ca);
_1cd=Helpers.XML.getNodeAsNumber("OutbidCount",_1ca);
_1ce=Helpers.XML.getNodeAsNumber("PaymentToSendCount",_1ca);
}
var _1cf=Helpers.XML.getNode("//GetMyeBayRemindersResponse/SellingsReminders",_1c9);
var _1d0=undefined;
var _1d1=undefined;
var _1d2=undefined;
var _1d3=undefined;
var _1d4=undefined;
var _1d5=undefined;
var _1d6=undefined;
var _1d7=undefined;
var _1d8=undefined;
var _1d9=undefined;
var _1da=undefined;
var _1db=undefined;
var _1dc=undefined;
var _1dd=undefined;
var _1de=undefined;
var _1df=undefined;
var _1e0=undefined;
if(_1cf){
_1d0=Helpers.XML.getNodeAsNumber("DeclinedRTERequestCount",_1cf);
_1d1=Helpers.XML.getNodeAsNumber("DocsForCCProcessingToSendCount",_1cf);
_1d2=Helpers.XML.getNodeAsNumber("FeedbackToReceiveCount",_1cf);
_1d3=Helpers.XML.getNodeAsNumber("FeedbackToSendCount",_1cf);
_1d4=Helpers.XML.getNodeAsNumber("ItemReceiptConfirmationToReceiveCount",_1cf);
_1d5=Helpers.XML.getNodeAsNumber("ItemReceiptToConfirmCount",_1cf);
_1d6=Helpers.XML.getNodeAsNumber("PaymentToReceiveCount",_1cf);
_1d7=Helpers.XML.getNodeAsNumber("PendingRTERequestCount",_1cf);
_1d8=Helpers.XML.getNodeAsNumber("RefundCancelledCount",_1cf);
_1d9=Helpers.XML.getNodeAsNumber("RefundInitiatedCount",_1cf);
_1da=Helpers.XML.getNodeAsNumber("RefundOnHoldCount",_1cf);
_1db=Helpers.XML.getNodeAsNumber("RelistingNeededCount",_1cf);
_1dc=Helpers.XML.getNodeAsNumber("RTEToProcessCount",_1cf);
_1dd=Helpers.XML.getNodeAsNumber("SecondChanceOfferCount",_1cf);
_1de=Helpers.XML.getNodeAsNumber("ShippingDetailsToBeProvidedCount",_1cf);
_1df=Helpers.XML.getNodeAsNumber("ShippingNeededCount",_1cf);
_1e0=Helpers.XML.getNodeAsNumber("TotalNewLeadsCount",_1cf);
}
var _1e1={feedbackToReceiveCountBuyer:_1cb,feedbackToSendCountBuyer:_1cc,outbidCount:_1cd,paymentToSendCount:_1ce,declinedRTERequestCount:_1d0,docsForCCProcessingToSendCount:_1d1,feedbackToReceiveCountSeller:_1d2,feedbackToSendCountSeller:_1d3,itemReceiptConfirmationToReceiveCount:_1d4,itemReceiptToConfirmCount:_1d5,paymentToReceiveCount:_1d6,pendingRTERequestCount:_1d7,refundCancelledCount:_1d8,refundInitiatedCount:_1d9,refundOnHoldCount:_1da,relistingNeededCount:_1db,RTEToProcessCount:_1dc,secondChanceOfferCount:_1dd,shippingDetailsToBeProvidedCount:_1de,shippingNeededCount:_1df,totalNewLeadsCount:_1e0,};
_1c8(true,_1e1);
}
catch(e){
pc.Log.logException(e);
var _1e2={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-06"};
_1c8(false,_1e2);
}
};
EBayTradingLib._handleGetMyeBayRemindersResponseFailure=function(_1e3,_1e4){
_1e3(false,_1e4);
};
EBayTradingLib._handleAddToWatchListResponseSuccess=function(_1e5,_1e6){
try{
var _1e7=Helpers.XML.getNodeAsNumber("//AddToWatchListResponse/WatchListCount",_1e6);
_1e5(true,_1e7);
}
catch(e){
pc.Log.logException(e);
var _1e8={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-07"};
_1e5(false,_1e8);
}
};
EBayTradingLib._handleAddToWatchListResponseFailure=function(_1e9,_1ea){
_1e9(false,_1ea);
};
EBayTradingLib._handleRemoveFromWatchListResponseSuccess=function(_1eb,_1ec){
try{
var _1ed=Helpers.XML.getNodeAsNumber("//RemoveFromWatchListResponse/WatchListCount",_1ec);
_1eb(true,_1ed);
}
catch(e){
pc.Log.logException(e);
var _1ee={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-08"};
_1eb(false,_1ee);
}
};
EBayTradingLib._handleRemoveFromWatchListResponseFailure=function(_1ef,_1f0){
_1ef(false,_1f0);
};
EBayTradingLib._handleGetItemResponseSuccess=function(_1f1,_1f2,_1f3){
try{
var _1f4=Helpers.XML.getNodeText("//GetItemResponse/Timestamp",_1f3);
var _1f5=Helpers.parseISO8601Date(_1f4);
var _1f6=Helpers.XML.getNode("//GetItemResponse/Item",_1f3);
var _1f7=this._parseItem(_1f6,false,_1f1);
_1f7.lastUpdate=_1f5;
_1f2(true,_1f7);
}
catch(e){
pc.Log.logException(e);
var _1f8={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-09"};
_1f2(false,_1f8);
}
};
EBayTradingLib._handleGetItemResponseFailure=function(_1f9,_1fa){
_1f9(false,_1fa);
};
EBayTradingLib._handleGetTransactionItem=function(_1fb,_1fc,_1fd,_1fe,_1ff,_200){
try{
if(_1ff){
this._getItemTransactions(_1fb,_1fc,_200,_1fd,this._handleGetTransactionItem2.bind(this,_1fe));
}else{
_1fe(false,_200);
}
}
catch(e){
pc.Log.logException(e);
var _201={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-10"};
_1fe(false,_201);
}
};
EBayTradingLib._handleGetTransactionItem2=function(_202,_203,_204){
_202(_203,_204);
};
EBayTradingLib._handleGetItemTransactionsResponseSuccess=function(_205,item,_206,_207){
try{
var _208=Helpers.XML.getNode("//GetItemTransactionsResponse/TransactionArray/Transaction",_207);
var _209=this._parseTransaction(_208,item,_205);
_206(true,_209);
}
catch(e){
pc.Log.logException(e);
var _20a={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-11"};
_206(false,_20a);
}
};
EBayTradingLib._handleGetItemTransactionsResponseFailure=function(_20b,_20c){
_20b(false,_20c);
};
EBayTradingLib._handleGetFeedbackResponseSuccess=function(_20d,_20e,_20f){
try{
var _210=0;
var _211=0;
var _212=0;
var _213=0;
var _214=0;
var _215=0;
var _216=0;
var _217=0;
var _218=0;
var _219=0;
var _21a=0;
var _21b=0;
var _21c=0;
var _21d=0;
var _21e=0;
var _21f=0;
var _220=0;
var _221=document.evaluate("//GetFeedbackResponse/FeedbackSummary/NegativeFeedbackPeriodArray/FeedbackPeriod",_20f,null,XPathResult.ANY_TYPE,null);
var _222=_221.iterateNext();
while(_222){
switch(Helpers.XML.getNodeAsNumber("PeriodInDays",_222)){
case 30:
_210=Helpers.XML.getNodeAsNumber("Count",_222);
break;
case 180:
_211=Helpers.XML.getNodeAsNumber("Count",_222);
break;
case 365:
_212=Helpers.XML.getNodeAsNumber("Count",_222);
break;
}
_222=_221.iterateNext();
}
var _223=document.evaluate("//GetFeedbackResponse/FeedbackSummary/NeutralFeedbackPeriodArray/FeedbackPeriod",_20f,null,XPathResult.ANY_TYPE,null);
var _224=_223.iterateNext();
while(_224){
switch(Helpers.XML.getNodeAsNumber("PeriodInDays",_224)){
case 30:
_213=Helpers.XML.getNodeAsNumber("Count",_224);
break;
case 180:
_214=Helpers.XML.getNodeAsNumber("Count",_224);
break;
case 365:
_215=Helpers.XML.getNodeAsNumber("Count",_224);
break;
}
_224=_223.iterateNext();
}
var _225=document.evaluate("//GetFeedbackResponse/FeedbackSummary/PositiveFeedbackPeriodArray/FeedbackPeriod",_20f,null,XPathResult.ANY_TYPE,null);
var _226=_225.iterateNext();
while(_226){
switch(Helpers.XML.getNodeAsNumber("PeriodInDays",_226)){
case 30:
_216=Helpers.XML.getNodeAsNumber("Count",_226);
break;
case 180:
_217=Helpers.XML.getNodeAsNumber("Count",_226);
break;
case 365:
_218=Helpers.XML.getNodeAsNumber("Count",_226);
break;
}
_226=_225.iterateNext();
}
var _227=document.evaluate("//GetFeedbackResponse/FeedbackSummary/SellerRatingSummaryArray/AverageRatingSummary",_20f,null,XPathResult.ANY_TYPE,null);
var _228=_227.iterateNext();
while(_228){
var _229=Helpers.XML.getNodeText("FeedbackSummaryPeriod",_228);
if(_229==="FiftyTwoWeeks"){
var _22a=document.evaluate("AverageRatingDetails",_228,null,XPathResult.ANY_TYPE,null);
var _22b=_22a.iterateNext();
while(_22b){
var _22c=Helpers.XML.getNodeAsNumber("Rating",_22b);
var _22d=Helpers.XML.getNodeAsNumber("RatingCount",_22b);
var _22e=Helpers.XML.getNodeText("RatingDetail",_22b);
if(_22e=="Communication"){
_21b=_22c;
_21c=_22d;
}else{
if(_22e=="ItemAsDescribed"){
_219=_22c;
_21a=_22d;
}else{
if(_22e=="ShippingAndHandlingCharges"){
_21f=_22c;
_220=_22d;
}else{
if(_22e=="ShippingTime"){
_21d=_22c;
_21e=_22d;
}
}
}
}
_22b=_22a.iterateNext();
}
}
_228=_227.iterateNext();
}
var _22f=Helpers.XML.getNodeAsNumber("//GetFeedbackResponse/PaginationResult/TotalNumberOfEntries",_20f);
var _230={userId:_20d,negativeFeedback1Month:(_210===false)?0:_210,negativeFeedback6Month:(_211===false)?0:_211,negativeFeedback12Month:(_212===false)?0:_212,neutralFeedback1Month:(_213===false)?0:_213,neutralFeedback6Month:(_214===false)?0:_214,neutralFeedback12Month:(_215===false)?0:_215,positiveFeedback1Month:(_216===false)?0:_216,positiveFeedback6Month:(_217===false)?0:_217,positiveFeedback12Month:(_218===false)?0:_218,averageRatingItemAsDescribed:(_219===false)?0:_219,averageRatingCountItemAsDescribed:(_21a===false)?0:_21a,averageRatingCommunication:(_21b===false)?0:_21b,averageRatingCountCommunication:(_21c===false)?0:_21c,averageRatingShippingTime:(_21d===false)?0:_21d,averageRatingCountShippingTime:(_21e===false)?0:_21e,averageRatingShippingAndHandlingCharges:(_21f===false)?0:_21f,averageRatingCountShippingAndHandlingCharges:(_220===false)?0:_220,comments:[],count:(_22f===false)?0:_22f,};
var _231=document.evaluate("//GetFeedbackResponse/FeedbackDetailArray/FeedbackDetail",_20f,null,XPathResult.ANY_TYPE,null);
var _232=_231.iterateNext();
while(_232){
_230.comments.push(this._parseComment(_232));
_232=_231.iterateNext();
}
_20e(true,_230);
}
catch(e){
pc.Log.logException(e);
var _233={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-12"};
_20e(false,_233);
}
};
EBayTradingLib._handleGetFeedbackResponseFailure=function(_234,_235){
_234(false,_235);
};
EBayTradingLib._handleGetAllBiddersResponseSuccess=function(_236,_237){
try{
var _238=Helpers.XML.getNodeText("//GetAllBiddersResponse/HighBidder",_237);
var _239={highBidder:_238,offers:[],};
var _23a=document.evaluate("//GetAllBiddersResponse/BidArray/Offer",_237,null,XPathResult.ANY_TYPE,null);
var _23b=_23a.iterateNext();
while(_23b){
_239.offers.push(this._parseOffer(_23b));
_23b=_23a.iterateNext();
}
_236(true,_239);
}
catch(e){
pc.Log.logException(e);
var _23c={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-13"};
_236(false,_23c);
}
};
EBayTradingLib._handleGetAllBiddersResponseFailure=function(_23d,_23e){
_23d(false,_23e);
};
EBayTradingLib._handleGetSellerListResponseSuccess=function(_23f,_240,_241){
_240(false,undefined);
return;
try{
var _242=Helpers.XML.getNodeText("//GetSellerListResponse/PaginationResult/TotalNumberOfEntries",_241);
var _243={count:_242,items:[],lastUpdate:undefined,};
var _244=document.evaluate("//GetSellerListResponse/ItemArray/Item",_241,null,XPathResult.ANY_TYPE,null);
var item=_244.iterateNext();
while(item){
_243.items.push(this._parseItem(item,false,_23f));
item=_244.iterateNext();
}
_240(true,_243);
}
catch(e){
pc.Log.logException(e);
var _245={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-14"};
_240(false,_245);
}
};
EBayTradingLib._handleGetSellerListResponseFailure=function(_246,_247){
_246(false,result);
};
EBayTradingLib._handleGetMyMessagesResponseSuccess=function(_248,_249){
try{
var _24a=Helpers.XML.getNode("//GetMyMessagesResponse/Summary",_249);
if(_24a){
var _24b=Helpers.XML.getNodeAsNumber("FlaggedMessageCount",_24a);
var _24c=Helpers.XML.getNodeAsNumber("NewAlertCount",_24a);
var _24d=Helpers.XML.getNodeAsNumber("NewMessageCount",_24a);
var _24e=Helpers.XML.getNodeAsNumber("TotalAlertCount",_24a);
var _24f=Helpers.XML.getNodeAsNumber("TotalMessageCount",_24a);
var _250=Helpers.XML.getNodeAsNumber("UnresolvedAlertCount",_24a);
var _251={flaggedMessageCount:(_24b===false)?undefined:_24b,newAlertCount:(_24c===false)?undefined:_24c,newMessageCount:(_24d===false)?undefined:_24d,totalAlertCount:(_24e===false)?undefined:_24e,totalMessageCount:(_24f===false)?undefined:_24f,unresolvedAlertCount:(_250===false)?undefined:_250,folders:[],};
var _252=document.evaluate("//GetMyMessagesResponse/Summary/FolderSummary",_249,null,XPathResult.ANY_TYPE,null);
var _253=_252.iterateNext();
while(_253){
_251.folders.push(this._parseFolder(_253));
_253=_252.iterateNext();
}
_248(true,_251);
}else{
var _251={alerts:[],messages:[],};
var _254=document.evaluate("//GetMyMessagesResponse/Alerts/Alert",_249,null,XPathResult.ANY_TYPE,null);
var _255=_254.iterateNext();
while(_255){
_251.alerts.push(this._parseAlert(_255));
_255=_254.iterateNext();
}
var _256=document.evaluate("//GetMyMessagesResponse/Messages/Message",_249,null,XPathResult.ANY_TYPE,null);
var _257=_256.iterateNext();
while(_257){
_251.messages.push(this._parseMessage(_257));
_257=_256.iterateNext();
}
_248(true,_251);
}
}
catch(e){
pc.Log.logException(e);
var _258={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-15"};
_248(false,_258);
}
};
EBayTradingLib._handleGetMyMessagesResponseFailure=function(_259,_25a){
_259(false,_25a);
};
EBayTradingLib._handleReviseMyMessagesResponseSuccess=function(_25b,_25c){
try{
_25b(true,undefined);
}
catch(e){
pc.Log.logException(e);
var _25d={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-16"};
_25b(false,_25d);
}
};
EBayTradingLib._handleReviseMyMessagesResponseFailure=function(_25e,_25f){
_25e(false,_25f);
};
EBayTradingLib._handleDeleteMyMessagesResponseSuccess=function(_260,_261){
try{
_260(true,undefined);
}
catch(e){
pc.Log.logException(e);
var _262={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-17"};
_260(false,_262);
}
};
EBayTradingLib._handleDeleteMyMessagesResponseFailure=function(_263,_264){
_263(false,_264);
};
EBayTradingLib._handleGetUserResponseSuccess=function(_265,_266){
try{
var _267=Helpers.XML.getNodeText("//GetUserResponse/User/UserID",_266);
var _268=Helpers.XML.getNodeText("//GetUserResponse/User/Email",_266);
var _269={userId:_267,email:_268};
_265(true,_269);
}
catch(e){
pc.Log.logException(e);
var _26a={errorCode:EBayConstants.ErrorCodes.COMMON_ERROR,errorCodeNumerical:"ETL-18"};
_265(false,_26a);
}
};
EBayTradingLib._handleGetUserResponseFailure=function(_26b,_26c){
_26b(false,_26c);
};
EBayTradingLib._parseItemList=function(_26d,_26e,_26f,_270,_271){
var _272=Helpers.XML.getNode("//"+_26f+"/"+_270,_26d);
if(_272){
var _273=Helpers.XML.getNodeText("//"+_270+"/PaginationResult/TotalNumberOfEntries",_272);
var _274={count:_273,items:[],lastUpdate:_26e};
var _275=document.evaluate("ItemArray/Item",_272,null,XPathResult.ANY_TYPE,null);
var item=_275.iterateNext();
while(item){
var _276=this._parseItem(item,false,_271);
if(_270=="LostList"){
_276.isLostItem=true;
}
_274.items.push(_276);
item=_275.iterateNext();
}
return _274;
}else{
return undefined;
}
};
EBayTradingLib._parseTransactionList=function(_277,_278,_279,_27a,_27b){
var _27c=Helpers.XML.getNode("//"+_279+"/"+_27a,_277);
if(_27c){
var _27d=Helpers.XML.getNodeText("//"+_27a+"/PaginationResult/TotalNumberOfEntries",_27c);
var _27e={count:_27d,items:[],lastUpdate:_278};
var _27f=document.evaluate("//*/Transaction",_27c,null,XPathResult.ANY_TYPE,null);
var _280=_27f.iterateNext();
while(_280){
var _281=Helpers.XML.getNode("Item",_280);
var item=this._parseItem(_281,true,_27b);
_27e.items.push(this._parseTransaction(_280,item,_27b));
_280=_27f.iterateNext();
}
return _27e;
}else{
return undefined;
}
};
EBayTradingLib._parseItem=function(item,_282,_283){
var _284=Helpers.Locale.getCountry(_283);
var _285=Helpers.XML.getNodeText("ItemID",item);
var _286=Helpers.XML.getNodeText("Title",item);
var _284=Helpers.Locale.getCountry(_283);
// DESC_URL (vi.ebaydesc.com and friends) is a decommissioned legacy CGI
// endpoint - confirmed dead via a live request returning a literal HTTP 410
// Gone with a 4-byte "Gone" body. Parse the real Description node from this
// same GetItem response instead (already present under DetailLevel=ReturnAll,
// no extra request field needed) and render it inline; ArticleFacade falls
// back to detailPageUrl (the real ListingDetails/ViewItemURL, parsed below)
// if description is ever empty.
var _287desc=Helpers.XML.getNodeText("Description",item);
var _288=Helpers.XML.getNodeAsNumber("SellingStatus/BidCount",item);
var _289=Helpers.XML.getNodeAsNumber("SellingStatus/CurrentPrice",item);
var _28a=Helpers.XML.getNodeValue("SellingStatus/CurrentPrice/@currencyID",item);
var _28b=Helpers.XML.getNodeAsNumber("BuyItNowPrice",item);
var _28c=Helpers.XML.getNodeValue("BuyItNowPrice/@currencyID",item);
var _28d=Helpers.XML.getNodeText("AutoPay",item);
var _28e=false;
if(_28d=="true"){
_28e=true;
}
var _28f=Helpers.XML.getNodeText("BestOfferDetails/BestOfferEnabled",item);
var _290=false;
if(_28f=="true"){
_290=true;
}
var _291=Helpers.XML.getNodeAsNumber("BestOfferDetails/BestOfferCount",item);
var _292=Helpers.XML.getNodeAsNumber("BestOfferDetails/BestOffer",item);
var _293=Helpers.XML.getNodeValue("BestOfferDetails/BestOffer/@currencyID",item);
var _294=Helpers.XML.getNodeText("BestOfferDetails/BestOfferStatus",item);
var _295=Helpers.XML.getNodeAsNumber("ShippingDetails/ShippingServiceOptions/ShippingServiceCost",item);
var _296=Helpers.XML.getNodeValue("ShippingDetails/ShippingServiceOptions/ShippingServiceCost/@currencyID",item);
var _297=Helpers.XML.getNodeText("Seller/UserID",item);
var _298=Helpers.XML.getNodeText("Seller/FeedbackScore",item);
var _299=Helpers.XML.getNodeText("Seller/FeedbackRatingStar",item);
var _29a=Helpers.XML.getNodeText("Seller/PositiveFeedbackPercent",item);
var _29b=undefined;
try{
var _29c=Helpers.XML.getNodeText("ListingDetails/EndTime",item);
if(_29c!=undefined){
_29b=Helpers.parseISO8601Date(_29c);
}
}
catch(e){
}
var _29d=Helpers.XML.getNodeAsNumber("BiddingDetails/MaxBid",item);
var _29e=Helpers.XML.getNodeValue("BiddingDetails/MaxBid/@currencyID",item);
var _29f=Helpers.XML.getNodeText("TimeLeft",item);
var _2a0=undefined;
if(_29f!=undefined){
_2a0=Helpers.parseISO8601Duration(_29f);
}
var _2a1=Helpers.XML.getNodeText("PictureDetails/GalleryURL",item);
var _2a2=Helpers.XML.getNodeText("ListingDetails/ViewItemURL",item);
var _2a3=Helpers.XML.getNodeText("ListingDetails/BuyItNowAvailable",item);
var _2a4=false;
if(_2a4=="true"||((_288==false||_288==0)&&_28b>0)){
_2a4=true;
}
var _2a5=undefined;
var _2a6=Helpers.XML.getNodeText("SellingStatus/HighBidder/UserID",item);
var _2a7=Helpers.XML.getNodeText("SellingStatus/HighBidder/FeedbackScore",item);
var _2a8=Helpers.XML.getNodeText("SellingStatus/HighBidder/RatingStar",item);
var _2a9=Helpers.XML.getNodeText("SellingStatus/ReserveMet",item,undefined);
var _2aa=Helpers.XML.getNodeAsNumber("ReservePrice",item);
var _2ab=true;
if(_2a9=="false"||(_2aa>0&&_289<_2aa)){
_2ab=false;
}
var _2ac=Helpers.XML.getNodeAsNumber("SellingStatus/MinimumToBid",item);
var _2ad=Helpers.XML.getNodeValue("SellingStatus/MinimumToBid/@currencyID",item);
var _2ae=Helpers.XML.getNodeAsNumber("SellingStatus/BidIncrement",item);
var _2af=Helpers.XML.getNodeValue("SellingStatus/BidIncrement/@currencyID",item);
var _2b0=Helpers.XML.getNodeAsNumber("SellingStatus/QuantitySold",item);
var _2b1=Helpers.XML.getNodeText("ListingType",item);
if(_288==false||_288==undefined){
if(_2b1==EBayConstants.ListingTypes.CHINESE){
_288=Number("0");
}else{
_288=undefined;
}
}
var _2b2=Helpers.XML.getNodeText("Quantity",item);
var _2b3=Helpers.XML.getNodeText("QuantityAvailable",item);
var _2b4=Helpers.XML.getNodeText("Location",item);
var _2b5=[];
var _2b6=document.evaluate("ShipToLocations/text()",item,null,XPathResult.ANY_TYPE,null);
var _2b7=_2b6.iterateNext();
while(_2b7){
var _2b8=_2b7.data;
if(_2b8){
_2b8=Helpers.trimString(_2b8);
var _2b9=EBayMappings.ShipToLocations[_2b8];
if(_2b9!=undefined){
_2b5.push(_2b9);
}else{
_2b5.push(_2b8);
}
}
_2b7=_2b6.iterateNext();
}
var _2ba=Helpers.XML.getNodeText("InsuranceOption",item);
var _2bb=[];
var _2bc=document.evaluate("PaymentMethods/text()",item,null,XPathResult.ANY_TYPE,null);
var _2bd=_2bc.iterateNext();
while(_2bd){
var _2b8=_2bd.data;
if(_2b8){
_2b8=Helpers.trimString(_2b8);
var _2be=EBayMappings.PaymentMethods[_2b8];
_2bb.push(_2be);
}
_2bd=_2bc.iterateNext();
}
var _2bf=Helpers.XML.getNodeText("PrimaryCategory/CategoryName",item);
var _2c0=undefined;
var _2c1=Helpers.XML.getNode("PictureDetails",item);
if(_2c1!=false){
_2c0=Helpers.XML.getNodeTexts("PictureURL",_2c1);
}
var _2c2=Helpers.XML.getNodeText("ConditionDisplayName",item);
var _2c3=[];
var _2c4=document.evaluate("ItemSpecifics/NameValueList",item,null,XPathResult.ANY_TYPE,null);
var _2c5=_2c4.iterateNext();
while(_2c5){
var name=Helpers.XML.getNodeText("Name",_2c5);
var _2c6=Helpers.XML.getNodeText("Value",_2c5);
var _2c7={name:name,value:_2c6,};
_2c3.push(_2c7);
_2c5=_2c4.iterateNext();
}
var _2c8=[];
var _2c9=document.evaluate("ShippingDetails/ShippingServiceOptions",item,null,XPathResult.ANY_TYPE,null);
var _2ca=_2c9.iterateNext();
while(_2ca){
var _2cb=Helpers.XML.getNodeText("ShippingService",_2ca);
var _2b9=EBayMappings.ShippingServices[_2cb];
if(_2b9!=undefined){
_2cb=_2b9;
}
var _2cc=Helpers.XML.getNodeAsNumber("ShippingServiceCost",_2ca);
var _2cd=Helpers.XML.getNodeValue("ShippingServiceCost/@currencyID",_2ca);
var _2ce={shippingService:(_2cb===false)?undefined:_2cb,shippingServiceCost:(_2cc===false)?undefined:_2cc,shippingServiceCostCurrency:(_2cd===false)?undefined:_2cd,};
_2c8.push(_2ce);
_2ca=_2c9.iterateNext();
}
var _2cf=document.evaluate("ShippingDetails/InternationalShippingServiceOption",item,null,XPathResult.ANY_TYPE,null);
var _2d0=_2cf.iterateNext();
while(_2d0){
var _2cb=Helpers.XML.getNodeText("ShippingService",_2d0);
var _2b9=EBayMappings.ShippingServices[_2cb];
if(_2b9!=undefined){
_2cb=_2b9;
}
var _2cc=Helpers.XML.getNodeAsNumber("ShippingServiceCost",_2d0);
var _2cd=Helpers.XML.getNodeValue("ShippingServiceCost/@currencyID",_2d0);
var _2b6=document.evaluate("ShipToLocations/text()",_2d0,null,XPathResult.ANY_TYPE,null);
var _2b7=_2b6.iterateNext();
while(_2b7){
var _2b8=_2b7.data;
if(_2b8){
_2b8=Helpers.trimString(_2b8);
var _2b9=EBayMappings.ShipToLocations[_2b8];
if(_2b9!=undefined){
_2b5.push(_2b9);
}else{
_2b5.push(_2b8);
}
}
_2b7=_2b6.iterateNext();
}
var _2ce={shippingService:(_2cb===false)?undefined:_2cb,shippingServiceCost:(_2cc===false)?undefined:_2cc,shippingServiceCostCurrency:(_2cd===false)?undefined:_2cd,shipToLocations:_2b5,isInternationalShippingOption:true,};
_2c8.push(_2ce);
_2d0=_2cf.iterateNext();
}
var _2d1=Helpers.XML.getNodeText("ReturnPolicy/ReturnsAccepted",item);
var _2d2=Helpers.XML.getNodeText("ReturnPolicy/Refund",item);
var _2d3=Helpers.XML.getNodeText("ReturnPolicy/ReturnsWithin",item);
var _2d4=Helpers.XML.getNodeText("ReturnPolicy/ShippingCostPaidBy",item);
var _2d5=Helpers.XML.getNodeAsNumber("WatchCount",item);
var _2d6=Helpers.XML.getNodeAsNumber("HitCount",item);
var _2d7=Helpers.XML.getNodeText("PrivateNotes",item);
var _2d8={itemId:(_285===false)?undefined:_285,title:(_286===false)?undefined:_286,description:(_287desc===false)?undefined:_287desc,bidCount:_288,currency:(_28a===false)?undefined:_28a,price:(_289===false)?undefined:_289,buyItNowPrice:(_28b===false||_28b==0)?undefined:_28b,buyItNowCurrency:(_28c===false)?undefined:_28c,buyItNowAvailable:_2a4,autoPay:_28e,bestOfferCount:_291,bestOfferEnabled:_290,bestOffer:(_292===false||_292==0)?undefined:_292,bestOfferCurrency:(_293===false)?undefined:_293,bestOfferStatus:(_294===false)?undefined:_294,shippingCost:(_295===false)?undefined:_295,shippingCurrency:(_296===false)?undefined:_296,sellerID:(_297===false)?undefined:_297,sellerFeedbackScore:(_298===false)?undefined:_298,sellerPositiveFeedbackPercent:(_29a===false)?undefined:Number(_29a),sellerRatingStar:(_299===false)?undefined:_299,endTime:_29b,maxBid:(_29d===false)?undefined:_29d,maxBidCurrency:(_29e===false)?undefined:_29e,timeLeft:(_2a0===false)?undefined:_2a0,imageUrl:(_2a1===false)?undefined:_2a1,detailPageUrl:(_2a2===false)?undefined:_2a2,highestBidderID:(_2a6===false)?undefined:_2a6,highestBidderFeedbackScore:(_2a7===false)?undefined:_2a7,highestBidderRatingStar:(_2a8===false)?undefined:_2a8,isReserveMet:_2ab,minimumToBid:(_2ac===false)?undefined:_2ac,minimumToBidCurrency:(_2ad===false)?undefined:_2ad,quantitySold:(_2b0===false)?undefined:_2b0,listingType:_2b1,quantity:(_2b2===false)?1:_2b2,quantityAvailable:(_2b3===false)?1:_2b3,location:(_2b4===false)?undefined:_2b4,shipToLocations:(_2b5===false)?undefined:_2b5,insuranceOption:(_2ba===false)?undefined:_2ba,paymentMethods:(_2bb===false)?undefined:_2bb,primaryCategoryName:(_2bf===false)?undefined:_2bf,pictureUrls:_2c0,condition:_2c2,shippingServiceOptions:_2c8,returnPolicyReturnsAccepted:(_2d1===false)?undefined:_2d1,returnPolicyRefund:(_2d2===false)?undefined:_2d2,returnPolicyReturnsWithin:(_2d3===false)?undefined:_2d3,returnPolicyShippingCostPaidBy:(_2d4===false)?undefined:_2d4,watchCount:(_2d5===false)?undefined:_2d5,hitCount:(_2d6===false)?undefined:_2d6,itemSpecifics:_2c3,userNotes:(_2d7===false)?undefined:_2d7,};
return _2d8;
};
EBayTradingLib._parseTransaction=function(_2d9,item,_2da){
var _2db=Helpers.XML.getNodeText("TransactionID",_2d9);
var _2dc=Helpers.XML.getNodeText("Buyer/UserID",_2d9);
var _2dd=Helpers.XML.getNodeAsNumber("QuantityPurchased",_2d9);
var _2de=undefined;
try{
var _2df=Helpers.XML.getNodeText("CreatedDate",_2d9);
if(_2df!=undefined){
_2de=Helpers.parseISO8601Date(_2df);
}
}
catch(e){
}
var _2e0=Helpers.XML.getNodeAsNumber("TransactionPrice",_2d9);
var _2e1=Helpers.XML.getNodeValue("TransactionPrice/@currencyID",_2d9);
var _2e2=Helpers.XML.getNodeAsNumber("TotalTransactionPrice",_2d9);
var _2e3=Helpers.XML.getNodeValue("TotalTransactionPrice/@currencyID",_2d9);
var _2e4=false;
var _2e5=false;
var _2e6=Helpers.XML.getNodeText("FeedbackLeft/CommentType",_2d9);
if(_2e6!=undefined){
_2e4=true;
}
var _2e7=Helpers.XML.getNodeText("FeedbackReceived/CommentType",_2d9);
if(_2e7!=undefined){
_2e5=true;
}
item.transactionId=_2db;
item.buyerID=(_2dc===false)?undefined:_2dc;
item.quantityPurchased=(_2dd===false)?undefined:_2dd;
item.transactionTime=_2de;
item.transactionPrice=_2e0;
item.transactionPriceCurrency=_2e1;
item.totalPrice=_2e2;
item.totalPriceCurrency=_2e3;
item.feedbackLeft=_2e4;
item.feedbackReceived=_2e5;
var _2e8={transactionId:_2db,buyerID:(_2dc===false)?undefined:_2dc,quantityPurchased:(_2dd===false)?undefined:_2dd,transactionTime:_2de,transactionPrice:_2e0,transactionPriceCurrency:_2e1,totalPrice:_2e2,totalPriceCurrency:_2e3,feedbackLeft:_2e4,feedbackReceived:_2e5};
item.transaction=_2e8;
return item;
};
EBayTradingLib._parseOffer=function(_2e9){
var _2ea=Helpers.XML.getNodeAsNumber("HighestBid",_2e9);
var _2eb=Helpers.XML.getNodeValue("HighestBid/@currencyID",_2e9);
var _2ec=Helpers.XML.getNodeAsNumber("MaxBid",_2e9);
var _2ed=Helpers.XML.getNodeValue("MaxBid/@currencyID",_2e9);
var _2ee=Helpers.XML.getNodeText("User/UserID",_2e9);
var _2e9={highestBid:(_2ea===false)?undefined:_2ea,highestBidCurrency:(_2eb===false)?undefined:_2eb,maxBid:(_2ec===false)?undefined:_2ec,maxBidCurrency:(_2ed===false)?undefined:_2ed,bidderId:(_2ee===false)?undefined:_2ee,};
return _2e9;
};
EBayTradingLib._parseAlert=function(_2ef){
var _2f0=Helpers.XML.getNodeText("AlertID",_2ef);
var _2f1=Helpers.XML.getNodeText("Sender",_2ef);
var _2f2=Helpers.XML.getNodeText("RecipientUserID",_2ef);
var _2f3=Helpers.XML.getNodeText("Subject",_2ef);
var text=Helpers.XML.getNodeText("Text",_2ef);
var _2f4=Helpers.XML.getNodeText("Content",messageObject);
var _2f5=Helpers.XML.getNodeAsNumber("Priority",_2ef);
var _2f6=Helpers.XML.getNodeText("ResolutionStatus",_2ef);
var read=Helpers.XML.getNodeText("Read",_2ef);
var _2f7=undefined;
try{
var _2f8=Helpers.XML.getNodeText("ReceiveDate",_2ef);
if(_2f8!=undefined){
_2f7=Helpers.parseISO8601Date(_2f8);
}
}
catch(e){
}
var _2f9=undefined;
try{
var _2fa=Helpers.XML.getNodeText("ExpirationDate",_2ef);
if(_2fa!=undefined){
_2f9=Helpers.parseISO8601Date(_2fa);
}
}
catch(e){
}
var _2fb=Helpers.XML.getNodeText("IsTimedResolution",_2ef);
var _2fc=Helpers.XML.getNodeText("ActionURL",_2ef);
var _2fd=Helpers.XML.getNodeText("ResponseDetails/ResponseEnabled",_2ef);
var _2fe=Helpers.XML.getNodeText("ResponseDetails/ResponseURL",_2ef);
var _2ff=Helpers.XML.getNodeText("Folder/FolderID",_2ef);
var _300=Helpers.XML.getNodeText("ForwardDetails/ForwardMessageEncoding",_2ef);
var _301=undefined;
try{
var _302=Helpers.XML.getNodeText("ForwardDetails/UserForwardDate",_2ef);
if(_302!=undefined){
_301=Helpers.parseISO8601Date(_302);
}
}
catch(e){
}
var _303={messageId:(_2f0===false)?undefined:_2f0,sender:(_2f1===false)?undefined:_2f1,recipient:(_2f2===false)?undefined:_2f2,subject:(_2f3===false)?undefined:_2f3,text:(text===false)?undefined:text,content:(_2f4===false)?undefined:_2f4,priority:(_2f5===false)?undefined:_2f5,resolutionStatus:(_2f6===false)?undefined:_2f6,read:(read===false)?undefined:((read=="true")?true:false),receiveDate:(_2f7===false)?undefined:_2f7,expirationDate:(_2f9===false)?undefined:_2f9,isTimedResolution:(_2fb===false)?undefined:_2fb,actionUrl:(_2fc===false)?undefined:_2fc,responseEnabled:(_2fd===false)?undefined:_2fd,responseUrl:(_2fe===false)?undefined:_2fe,folderId:(_2ff===false)?undefined:_2ff,forwardMessageEncoding:(_300===false)?undefined:_300,userForwardDate:(_301===false)?undefined:_301,};
return _303;
};
EBayTradingLib._parseMessage=function(_304){
var _305=Helpers.XML.getNodeText("MessageID",_304);
var _306=Helpers.XML.getNodeText("ExternalMessageID",_304);
var _307=Helpers.XML.getNodeText("Sender",_304);
var _308=Helpers.XML.getNodeText("RecipientUserID",_304);
var _309=Helpers.XML.getNodeText("Subject",_304);
var text=Helpers.XML.getNodeText("Text",_304);
var _30a=Helpers.XML.getNodeText("Content",_304);
var _30b=Helpers.XML.getNodeAsNumber("Priority",_304);
var _30c=Helpers.XML.getNodeText("ResolutionStatus",_304);
var read=Helpers.XML.getNodeText("Read",_304);
var _30d=Helpers.XML.getNodeText("Flagged",_304);
var _30e=Helpers.XML.getNodeText("ItemID",_304);
var _30f=undefined;
try{
var _310=Helpers.XML.getNodeText("ReceiveDate",_304);
if(_310!=undefined){
_30f=Helpers.parseISO8601Date(_310);
}
}
catch(e){
}
var _311=undefined;
try{
var _312=Helpers.XML.getNodeText("ExpirationDate",_304);
if(_312!=undefined){
_311=Helpers.parseISO8601Date(_312);
}
}
catch(e){
}
var _313=Helpers.XML.getNodeText("ResponseDetails/ResponseEnabled",_304);
var _314=Helpers.XML.getNodeText("ResponseDetails/ResponseURL",_304);
var _315=Helpers.XML.getNodeText("Folder/FolderID",_304);
var _316=Helpers.XML.getNodeText("ForwardDetails/ForwardMessageEncoding",_304);
var _317=undefined;
try{
var _318=Helpers.XML.getNodeText("ForwardDetails/UserForwardDate",_304);
if(_318!=undefined){
_317=Helpers.parseISO8601Date(_318);
}
}
catch(e){
}
var _319={messageId:(_305===false)?undefined:_305,externalMessageId:(_306===false)?undefined:_306,sender:(_307===false)?undefined:_307,recipient:(_308===false)?undefined:_308,subject:(_309===false)?undefined:_309,text:(text===false)?undefined:text,content:(_30a===false)?undefined:_30a,priority:(_30b===false)?undefined:_30b,resolutionStatus:(_30c===false)?undefined:_30c,read:(read===false)?undefined:((read=="true")?true:false),flagged:(_30d===false)?undefined:((_30d=="true")?true:false),itemId:(_30e===false)?undefined:_30e,receiveDate:(_30f===false)?undefined:_30f,expirationDate:(_311===false)?undefined:_311,responseEnabled:(_313===false)?undefined:_313,responseUrl:(_314===false)?undefined:_314,folderId:(_315===false)?undefined:_315,forwardMessageEncoding:(_316===false)?undefined:_316,userForwardDate:(_317===false)?undefined:_317,};
return _319;
};
EBayTradingLib._parseFolder=function(_31a){
var _31b=Helpers.XML.getNodeText("FolderID",_31a);
var _31c=Helpers.XML.getNodeText("FolderName",_31a);
var _31d=Helpers.XML.getNodeAsNumber("NewAlertCount",_31a);
var _31e=Helpers.XML.getNodeAsNumber("NewMessageCount",_31a);
var _31f=Helpers.XML.getNodeAsNumber("TotalAlertCount",_31a);
var _320=Helpers.XML.getNodeAsNumber("TotalMessageCount",_31a);
if(_31b=="0"){
_31c=$L("Inbox");
}else{
if(_31b=="1"){
_31c=$L("Sent");
}
}
var _321={folderId:(_31b===false)?undefined:_31b,folderName:(_31c===false)?undefined:_31c,newAlertCount:(_31d===false)?undefined:_31d,newMessageCount:(_31e===false)?undefined:_31e,totalAlertCount:(_31f===false)?undefined:_31f,totalMessageCount:(_320===false)?undefined:_320,};
return _321;
};
EBayTradingLib._parseComment=function(_322){
var _323=Helpers.XML.getNodeText("CommentType",_322);
var _324=Helpers.XML.getNodeText("CommentText",_322);
var _325=undefined;
try{
var _326=Helpers.XML.getNodeText("CommentTime",_322);
if(_326!=undefined){
_325=Helpers.parseISO8601Date(_326);
}
}
catch(e){
}
var _327=Helpers.XML.getNodeText("CommentingUser",_322);
var _328=Helpers.XML.getNodeAsNumber("CommentingUserScore ",_322);
var _329=Helpers.XML.getNodeText("FeedbackResponse",_322);
var _32a=Helpers.XML.getNodeText("ItemID",_322);
var _32b=Helpers.XML.getNodeText("TransactionID",_322);
var _32c=Helpers.XML.getNodeText("ItemTitle",_322);
var _32d=Helpers.XML.getNodeAsNumber("ItemPrice",_322);
var _32e=Helpers.XML.getNodeValue("ItemPrice/@currencyID",_322);
var _32f=Helpers.XML.getNodeText("Role",_322);
var _330={commentType:(_323===false)?undefined:_323,commentText:(_324===false)?undefined:_324,commentTime:(_325===false)?undefined:_325,commentingUser:(_327===false)?undefined:_327,commentingUserScore:(_328===false)?undefined:_328,feedbackResponse:(_329===false)?undefined:_329,itemId:(_32a===false)?undefined:_32a,transactionId:(_32b===false)?undefined:_32b,itemTitle:(_32c===false)?undefined:_32c,itemPrice:(_32d===false)?undefined:_32d,itemCurrency:(_32e===false)?undefined:_32e,userRole:(_32f===false)?undefined:_32f,};
return _330;
};
EBayTradingLib._parseBestOffer=function(_331){
var _332=Helpers.XML.getNodeText("BestOfferID",_331);
var _333=undefined;
try{
var _334=Helpers.XML.getNodeText("ExpirationTime",_331);
if(_334!=undefined){
_333=Helpers.parseISO8601Date(_334);
}
}
catch(e){
}
var _335=Helpers.XML.getNodeAsNumber("Price",_331);
var _336=Helpers.XML.getNodeValue("Price/@currencyID",_331);
var _337=Helpers.XML.getNodeText("Status",_331);
var _338=Helpers.XML.getNodeAsNumber("Quantity",_331);
var type=Helpers.XML.getNodeText("BestOfferCodeType",_331);
var _339=undefined;
var _33a=undefined;
var _33b=Helpers.XML.getNode("Buyer",_331);
if(_33b){
_339=Helpers.XML.getNodeText("UserID",_33b);
_33a=Helpers.XML.getNodeAsNumber("FeedbackScore",_33b);
}
var _33c={bestOfferId:(_332===false)?undefined:_332,expirationTime:(_333===false)?undefined:_333,price:(_335===false)?undefined:_335,currency:(_336===false)?undefined:_336,status:(_337===false)?undefined:_337,quantity:(_338===false)?undefined:_338,type:(type===false)?undefined:type,buyerUserId:_339,buyerFeedbackScore:_33a};
return _33c;
};
EBayTradingLib._handlePlaceOfferResponseSuccess=function(_34d,_34e){
var _34f=Helpers.XML.getNodeText("//PlaceOfferResponse/BotBlock/BotBlockToken",_34e);
if(_34f!=undefined){
var _350=Helpers.XML.getNodeText("//PlaceOfferResponse/BotBlock/BotBlockUrl",_34e);
var _351=Helpers.XML.getNodeText("//PlaceOfferResponse/BotBlock/BotBlockAudioUrl",_34e);
var _352={isBotBlock:true,botBlockToken:_34f,botBlockUrl:_350,botBlockAudioUrl:_351,};
_34d(true,_352);
}else{
var _353=Helpers.XML.getNodeAsNumber("//PlaceOfferResponse/SellingStatus/CurrentPrice",_34e);
var _354=Helpers.XML.getNodeValue("//PlaceOfferResponse/SellingStatus/CurrentPrice/@currencyID",_34e);
var _355=Helpers.XML.getNodeAsNumber("//PlaceOfferResponse/SellingStatus/ConvertedCurrentPrice",_34e);
var _356=Helpers.XML.getNodeValue("//PlaceOfferResponse/SellingStatus/ConvertedCurrentPrice/@currencyID",_34e);
var _357=Helpers.XML.getNodeText("//PlaceOfferResponse/SellingStatus/HighBidder/UserID",_34e);
var _358=Helpers.XML.getNodeAsNumber("//PlaceOfferResponse/SellingStatus/MinimumToBid",_34e);
var _359=Helpers.XML.getNodeValue("//PlaceOfferResponse/SellingStatus/MinimumToBid/@currencyID",_34e);
var _35a=Helpers.XML.getNodeText("//PlaceOfferResponse/SellingStatus/ReserveMet",_34e,undefined);
var _35b=true;
if(_35a=="false"){
_35b=false;
}
var _352={currentPrice:_353,currentPriceCurrency:_354,convertedCurrentPrice:_355,convertedCurrentPriceCurrency:_356,highBidder:_357,minimumToBid:_358,minimumToBidCurrency:_359,isReserveMet:_35b,};
_34d(true,_352);
}
};
EBayTradingLib._handlePlaceOfferResponseFailure=function(_35c,_35d){
_35c(false,_35d);
};
EBayTradingLib._handleGetChallengeTokenResponseSuccess=function(_35e,_35f){
var _360=Helpers.XML.getNodeText("//GetChallengeTokenResponse/ChallengeToken",_35f);
var _361=Helpers.XML.getNodeText("//GetChallengeTokenResponse/ImageChallengeURL",_35f);
var _362=Helpers.XML.getNodeText("//GetChallengeTokenResponse/AudioChallangeURL",_35f);
var _363={isBotBlock:true,botBlockToken:_360,botBlockUrl:_361,botBlockAudioUrl:_362,};
_35e(true,_363);
};
EBayTradingLib._handleGetChallengeTokenResponseFailure=function(_364,_365){
_364(false,_365);
};
EBayTradingLib._handleGetClientAlertsAuthTokenResponseSuccess=function(_366,_367){
var _368=Helpers.XML.getNodeText("//GetClientAlertsAuthTokenResponse/ClientAlertsAuthToken",_367);
_366(true,_368);
};
EBayTradingLib._handleGetClientAlertsAuthTokenResponseFailure=function(_369,_36a){
_369(false,_36a);
};
EBayTradingLib._handleSetNotificationPreferencesResponseSuccess=function(_36b,_36c){
_36b(true,undefined);
};
EBayTradingLib._handleSetNotificationPreferencesResponseFailure=function(_36d,_36e){
_36d(false,_36e);
};
EBayTradingLib._handleGetItemsAwaitingFeedbackSuccess=function(_36f,_370){
var _371=Helpers.XML.getNodeAsNumber("//GetItemsAwaitingFeedbackResponse/ItemsAwaitingFeedback/PaginationResult/TotalNumberOfEntries",_370);
var _372={count:_371,feedbackTransactions:[],};
var _373=document.evaluate("//GetItemsAwaitingFeedbackResponse/ItemsAwaitingFeedback/TransactionArray/Transaction",_370,null,XPathResult.ANY_TYPE,null);
var _374=_373.iterateNext();
while(_374){
_372.feedbackTransactions.push(this._parseFeedbackTransaction(_374));
_374=_373.iterateNext();
}
_36f(true,_372);
};
EBayTradingLib._handleGetItemsAwaitingFeedbackFailure=function(_375,_376){
_375(false,_376);
};
EBayTradingLib._handleLeaveFeedbackSuccess=function(_377,_378){
_377(true,undefined);
};
EBayTradingLib._handleLeaveFeedbackFailure=function(_379,_37a){
_379(false,_37a);
};
EBayTradingLib._handleSetUserNotesSuccess=function(_37b,_37c){
_37b(true,undefined);
};
EBayTradingLib._handleSetUserNotesFailure=function(_37d,_37e){
_37d(false,_37e);
};
EBayTradingLib._handleGetCategoriesSuccess=function(_37f,_380){
var _381=Helpers.XML.getNodeText("CategoryVersion",_380);
};
EBayTradingLib._handleGetCategoriesFailure=function(_382,_383){
_382(false,_383);
};
EBayTradingLib._handleGetBestOffersSuccess=function(_384,_385){
var _386={bestOffers:[]};
var _387=document.evaluate("//GetBestOffersResponse/BestOfferArray/BestOffer",_385,null,XPathResult.ANY_TYPE,null);
var _388=_387.iterateNext();
while(_388){
_386.bestOffers.push(this._parseBestOffer(_388));
_388=_387.iterateNext();
}
_384(true,_386);
};
EBayTradingLib._handleGetBestOffersFailure=function(_389,_38a){
_389(false,_38a);
};
EBayTradingLib._handleRespondToBestOfferSuccess=function(_38b,_38c){
_38b(true,_38c);
};
EBayTradingLib._handleRespondToBestOfferFailure=function(_38d,_38e){
_38d(false,_38e);
};
EBayTradingLib._handleAddItemSuccess=function(_38f,_390){
_38f(true,_390);
};
EBayTradingLib._handleAddItemFailure=function(_391,_392){
_391(false,_392);
};
EBayTradingLib._parseFeedbackTransaction=function(_393){
var _394=Helpers.XML.getNodeText("Item/Buyer/UserID",_393);
var _395=Helpers.XML.getNodeText("Item/Seller/UserID",_393);
var _396=Helpers.XML.getNodeText("Item/ItemID",_393);
var _397=Helpers.XML.getNodeText("TransactionID",_393);
var _398=Helpers.XML.getNodeText("Item/Title",_393);
var _399=undefined;
try{
var _39a=Helpers.XML.getNodeText("Item/ListingDetails/EndTime",_393);
if(_39a!=undefined){
_399=Helpers.parseISO8601Date(_39a);
}
}
catch(e){
}
var _39b=Helpers.XML.getNodeText("FeedbackReceived/CommentType",_393);
var _39c=Helpers.XML.getNodeText("FeedbackLeft/CommentType",_393);
var _39d={buyerId:(_394===false)?undefined:_394,sellerId:(_395===false)?undefined:_395,itemId:(_396===false)?undefined:_396,transactionId:(_397===false)?undefined:_397,title:(_398===false)?undefined:_398,endTime:(_399===false)?undefined:_399,feedbackReceivedCommentType:(_39b===false)?undefined:_39b,feedbackLeftCommentType:(_39c===false)?undefined:_39c,};
return _39d;
};

