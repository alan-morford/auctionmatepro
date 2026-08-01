EBayConstants={};
EBayConstants.DEFAULT_ALL="all";
EBayConstants.ListingTypes={CHINESE:"Chinese",FIXED_PRICE_ITEM:"FixedPriceItem",STORES_FIXED_PRICE:"StoresFixedPrice"};
EBayConstants.CommentTypes={POSITIVE:"Positive",NEUTRAL:"Neutral",NEGATIVE:"Negative",WITHDRAWN:"Withdrawn",INDEPENDENTLY_WITHDRAWN:"IndependentlyWithdrawn",};
EBayConstants.ReminderTypes={PAYMENT_TO_SEND:"PaymentToSend",OUTBID:"Outbid",FEEDBACK_TO_SEND_BUYER:"feedbackToSendBuyer",FEEDBACK_TO_RECEIVE_BUYER:"feedbackToReceiveBuyer",PAYMENT_TO_RECEIVE:"PaymentToReceive",FEEDBACK_TO_SEND_SELLER:"feedbackToSendSeller",FEEDBACK_TO_RECEIVE_SELLER:"feedbackToReceiveSeller",};
EBayConstants.UserRoles={BUYER:"Buyer",SELLER:"Seller",};
EBayConstants.AlertResolutions={RESOLVED_BY_AUTO_RESOLUTION:"ResolvedByAutoResolution",RESOLVED_BY_USER:"ResolvedByUser",UNRESOLVED:"Unresolved",};
// Browse API conditionIds - eBay-wide stable numeric IDs (not category-specific
// refinements), used for the search Condition filter's checkbox list.
EBayConstants.Conditions=[{id:"1000",label:$L("New")},{id:"1500",label:$L("New other")},{id:"1750",label:$L("New with defects")},{id:"2000",label:$L("Certified refurbished")},{id:"2010",label:$L("Excellent refurbished")},{id:"2020",label:$L("Very good refurbished")},{id:"2030",label:$L("Good refurbished")},{id:"2500",label:$L("Seller refurbished")},{id:"3000",label:$L("Used")},{id:"7000",label:$L("For parts or not working")}];
EBayConstants.SellerTypes={BUSINESS:"Business",PRIVATE:"Private",};
// ISO-3166 country codes for the search Location filter (itemLocationCountry).
// Deliberately not derived from EBayConfig.SITE_CONFIG - several of its keys
// (BENL, BEFR, CAFR) are eBay site variants, not real country codes, and
// would need remapping/deduping to be usable here. Hand-picked instead, kept
// short and eBay-marketplace-relevant rather than exhaustive ISO-3166.
EBayConstants.LocationCountries=[{code:"US",label:$L("United States")},{code:"CA",label:$L("Canada")},{code:"GB",label:$L("United Kingdom")},{code:"AU",label:$L("Australia")},{code:"DE",label:$L("Germany")},{code:"FR",label:$L("France")},{code:"IT",label:$L("Italy")},{code:"ES",label:$L("Spain")},{code:"NL",label:$L("Netherlands")},{code:"BE",label:$L("Belgium")},{code:"AT",label:$L("Austria")},{code:"CH",label:$L("Switzerland")},{code:"IE",label:$L("Ireland")},{code:"PL",label:$L("Poland")},{code:"CN",label:$L("China")},{code:"JP",label:$L("Japan")},{code:"HK",label:$L("Hong Kong")}];
EBayConstants.ErrorCodes={COMMON_ERROR:"common",TIMEOUT:"timeout",REQUEST_ERROR:"request_error",EBAY_ERROR:"ebay_error",TOKEN_EXPIRED:"token_expired",TOKEN_REVOKED:"token_revoked",TOKEN_INVALID:"token_invalid",TOKEN_RETRIEVAL_WINDOW_EXPIRED:"token_retrieval_window_expired",SESSION_ID_EXPIRED:"session_id_expired",INVALID_SESSION_ID:"invalid_session_id",AUTH_AND_AUTH_PROCESS_NOT_FINISHED:"auth_and_auth_process_not_finished",USER_ACCOUNT_SUSPENDED:"user_account_suspended",USER_ACCOUNT_CLOSED:"user_account_closed",CALL_LIMIT_REACHED:"call_limit_reached",DAILY_LIMIT_REACHED:"daily_limit_reached",USER_LIMIT_REACHED:"user_limit_reached",USER_AGREEMENT_CHANGED:"user_agreement_changed",ITEM_NOT_FOUND:"item_not_found",AUCTION_HAS_ENDED:"auction_has_ended",BID_TOO_LOW:"bid_too_low",INVALID_BID:"invalid_bid",INVALID_BID_FOR_HIGHEST_BIDDER:"invalid_bid_for_highest_bidder",ITEM_ALREADY_SOLD:"item_already_sold",QUANTITY_ERROR:"quantity_error",INVALID_OFFER:"invalid_offer",DUPLICATE_INVOCATION_ID_VIOLATION:"invalid_invocation_id_violation",INVALID_KEYWORD:"invalid_keyword",INVALID_ITEM_ID:"invalid_item_id",EBAY_CLIENT_ALERT_ERROR:"ebay_client_alert_error",INVALID_CLIENT_ALERT_AUTH_TOKEN:"invalid_client_alert_auth_token",CLIENT_ALERT_AUTH_TOKEN_EXPIRED:"client_alert_auth_token_expired",CLIENT_ALERT_SESSION_EXPIRED:"client_alert_session_expired",INVALID_CLIENT_ALERT_SESSION_ID:"invalid_client_alert_session_id",INVALID_CLIENT_ALERT_SESSION_DATA:"invalid_client_alert_session_data",};
EBayConstants.SortOrder={BEST_MATCH:"BestMatch",CURRENT_PRICE_HIGHEST:"CurrentPriceHighest",DISTANCE_NEAREST:"DistanceNearest",END_TIME_SOONEST:"EndTimeSoonest",PRICE_PLUS_SHIPPING_HIGHEST:"PricePlusShippingHighest",PRICE_PLUS_SHIPPING_LOWEST:"PricePlusShippingLowest",START_TIME_NEWEST:"StartTimeNewest",};
EBayConstants.PlaceOfferActions={ACCEPT:"Accept",BID:"Bid",COUNTER:"Counter",DECLINE:"Decline",OFFER:"Offer",PURCHASE:"Purchase",};
EBayConstants.MessageTypes={ALL:"All",ASK_SELLER_QUESTION:"AskSellerQuestion",CONTACT_EBAY_MEMBER:"ContactEbayMember",CONTACT_EBAY_MEMBER_VIA_COMMUNITY_LINK:"ContacteBayMemberViaCommunityLink",CONTACT_MY_BIDDER:"ContactMyBidder",CONTACT_TRANSACTION_PARTNER:"ContactTransactionPartner",RESPONSE_TO_ASQ_QUESTION:"ResponseToASQQuestion",RESPONSE_TO_CONTACT_EBAY_MEMBER:"ResponseToContacteBayMember",};
EBayConstants.BestOfferCodeTypes={BUYER_BEST_OFFER:"BuyerBestOffer",BUYER_COUNTER_OFFER:"BuyerCounterOffer",SELLER_COUNTER_OFFER:"SellerCounterOffer",};
EBayConstants.BestOfferStatusTypes={ACCEPTED:"Accepted",ACTIVE:"Active",ADMIN_ENDED:"AdminEnded",COUNTERED:"Countered",DECLINED:"Declined",EXPIRED:"Expired",PENDING:"Pending",RETRACTED:"Retracted",};
EBayConstants.BestOfferActionCodeTypes={ACCEPT:"Accept",COUNTER:"Counter",DECLINE:"Decline",};
// Shared by eBayBrowse-lib.js and eBayTaxonomy-lib.js's REST response
// handlers - unlike eBayTrading-lib.js's SOAP ErrorCode switch, neither of
// those ever mapped an expired/invalid OAuth token to TOKEN_EXPIRED/
// TOKEN_INVALID at all, so ErrorDialog.js's shared logout branch (see
// TOKEN_EXPIRED/TOKEN_REVOKED/TOKEN_INVALID/TOKEN_RETRIEVAL_WINDOW_EXPIRED
// in that file's switch) never fired for a Browse/Taxonomy API auth
// failure - they always fell into the generic REQUEST_ERROR case, which
// shows eBay's real error text (why the popup message looked right) but
// never calls deletePreferences()/restarts to the login screen. A 401 is
// the reliable, API-agnostic signal for "this token is no good" on REST
// APIs; the specific errorId codes are a secondary check in case a token
// failure ever comes back as a different HTTP status.
EBayConstants.mapOAuthErrorToErrorCode=function(_status,_errorId){
if(_status==401){
return EBayConstants.ErrorCodes.TOKEN_EXPIRED;
}
switch(String(_errorId)){
case "1001":
return EBayConstants.ErrorCodes.TOKEN_EXPIRED;
case "21916984":
return EBayConstants.ErrorCodes.TOKEN_INVALID;
}
return undefined;
};
EBayConstants.ClientAlertsTypes={ASK_SELLER_QUESTION:"AskSellerQuestion",BEST_OFFER:"BestOffer",BEST_OFFER_DECLINED:"BestOfferDeclined",BEST_OFFER_PLACED:"BestOfferPlaced",BID_PLACED:"BidPlaced",BID_RECEIVED:"BidReceived",COUNTER_OFFER_RECEIVED:"CounterOfferReceived",END_OF_AUCTION:"EndOfAuction",FEEDBACK_LEFT:"FeedbackLeft",FEEDBACK_RECEIVED:"FeedbackReceived",FEEDBACK_STAR_CHANGED:"FeedbackStarChanged",FIXED_PRICE_END_OF_TRANSACTION:"FixedPriceEndOfTransaction",FIXED_PRICE_TRANSACTION:"FixedPriceTransaction",ITEM_ADDED_TO_WATCH_LIST:"ItemAddedToWatchList",ITEM_ENDED:"ItemEnded",ITEM_LOST:"ItemLost",ITEM_MARKED_PAID:"ItemMarkedPaid",ITEM_MARKED_SHIPPED:"ItemMarkedShipped",ITEM_REMOVED_FROM_WATCH_LIST:"ItemRemovedFromWatchList",ITEM_SOLD:"ItemSold",ITEM_UNSOLD:"ItemUnsold",ITEM_WON:"ItemWon",OUT_BID:"OutBid",PRICE_CHANGE:"PriceChange",SECOND_CHANCE_OFFER:"SecondChanceOffer",WATCHED_ITEM_ENDING_SOON:"WatchedItemEndingSoon",};

