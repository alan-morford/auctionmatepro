/**
 * NotificationManager.js — notifications, redesigned as a poll-diff against
 * the Trading API instead of eBay's Client Alerts push service.
 *
 * Client Alerts (clientalerts.ebay.com) is DNS-dead with no REST replacement.
 * The wakeup/timer mechanism itself is unrelated to Client Alerts specifically
 * (it's just a periodic background stage, same amhd.NotificationManager
 * component) so it's kept as-is; only the data source changed.
 *
 * Each wakeup, this refreshes the full My eBay list set (watch/bid/won/lost/
 * active/sold/unsold — all still-alive Trading API calls, see
 * EBayData.updateHomeScreen) and diffs it against a snapshot of the previous
 * poll (persisted on enyo.application.preferences.data.user.notificationSnapshot,
 * the same cookie-backed store the OAuth tokens live on) to synthesize the
 * same alert shape/eventType vocabulary (EBayConstants.ClientAlertsTypes)
 * Dashboard.js/NotificationListItem.js already consume — those views are
 * unchanged.
 *
 * Known limitation: "outbid" is approximated as "price on an item you're
 * bidding on went up since the last poll" — the classic Trading API result
 * doesn't carry an explicit per-item high-bidder flag, so this can't
 * distinguish "you got outbid" from "you just placed a higher bid yourself
 * from another device" with full precision. Good enough for a personal
 * single-account app; flagged here in case it matters later.
 */
enyo.kind({name:"amhd.NotificationManager",kind:"enyo.Component",components:[{name:"setWakeupService",kind:"PalmService",method:"set",service:"palm://com.palm.power/timeout/",subscribe:false,},{name:"clearWakeupService",kind:"PalmService",method:"clear",service:"palm://com.palm.power/timeout/",subscribe:false,},{name:"launchService",kind:"PalmService",service:"palm://com.palm.applicationManager/",method:"launch",subscribe:false,},{name:"notificationDataAccess",kind:"amhd.NotificationDataAccess"}],create:function(){
this.inherited(arguments);
this.appInfo=enyo.fetchAppInfo();
this.wakeupCall();
},setWakeup:function(){
var d=new Date(enyo.application.preferences.data.user.notificationInterval*60*1000);
var _1=d.toGMTString().substr(17,8);
console.log("setting new wakeup[interval="+_1+"]");
this.$.setWakeupService.call({"in":_1,key:this.appInfo.id+".timer",uri:"palm://com.palm.applicationManager/launch",params:{id:this.appInfo.id,params:{wakeup:true}},wakeup:true});
},clearWakeup:function(){
console.log("clearing wakeup");
this.$.clearWakeupService.call({key:this.appInfo.id+".timer",});
},wakeupCall:function(_2){
console.log("wakeup call received");
if(enyo.application.preferences.data.user.notificationActivated){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
enyo.application.ebaydata.updateHomeScreen(true,enyo.bind(this,function(_3){
console.log("updateHomeScreen (for notification diff) called [success="+_3+"]");
if(_3){
this.diffAndNotify();
}else{
console.log("error refreshing lists - trying again next time");
}
}));
}else{
console.log("no internet connection available at the moment - trying again next time");
}
this.setWakeup();
}else{
console.log("notifications not enabled - nothing to do");
}
},diffAndNotify:function(){
var lists=enyo.application.ebaydata.data.auctionlists;
var prevSnapshot=enyo.application.preferences.data.user.notificationSnapshot||{};
var nextSnapshot={};
var now=(new Date()).getTime();
// Ending-soon fires once per item, a few poll intervals before it ends —
// wide enough that a normal polling cadence is very likely to catch it
// at least once before the auction actually closes.
var endingSoonWindowMs=enyo.application.preferences.data.user.notificationInterval*60*1000*3;
var buildEntry=function(item){
return{price:item.price,bidCount:item.bidCount,endingSoonNotified:false};
};
var checkEndingSoon=enyo.bind(this,function(item,entry,prev){
if(prev){
entry.endingSoonNotified=prev.endingSoonNotified;
}
if(!entry.endingSoonNotified&&item.endTime){
var msLeft=item.endTime.getTime()-now;
if(msLeft>0&&msLeft<=endingSoonWindowMs){
this.processNotificationItem(this._toAlert(item,EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON));
entry.endingSoonNotified=true;
}
}
});
if(lists.bid&&lists.bid.items){
for(var i=0;i<lists.bid.items.length;i++){
var item=lists.bid.items[i];
var prev=prevSnapshot[item.itemId];
var entry=buildEntry(item);
if(prev&&item.price!=undefined&&prev.price!=undefined&&item.price>prev.price){
this.processNotificationItem(this._toAlert(item,EBayConstants.ClientAlertsTypes.OUT_BID));
}
checkEndingSoon(item,entry,prev);
nextSnapshot[item.itemId]=entry;
}
}
if(lists.watch&&lists.watch.items){
for(var i=0;i<lists.watch.items.length;i++){
var item=lists.watch.items[i];
var prev=prevSnapshot[item.itemId];
var entry=buildEntry(item);
checkEndingSoon(item,entry,prev);
nextSnapshot[item.itemId]=entry;
}
}
if(lists.active&&lists.active.items){
for(var i=0;i<lists.active.items.length;i++){
var item=lists.active.items[i];
var prev=prevSnapshot[item.itemId];
if(prev&&item.bidCount!=undefined&&prev.bidCount!=undefined&&item.bidCount>prev.bidCount){
this.processNotificationItem(this._toAlert(item,EBayConstants.ClientAlertsTypes.BID_RECEIVED));
}
nextSnapshot[item.itemId]=buildEntry(item);
}
}
this._notifyNewArrivals(lists.won&&lists.won.items,prevSnapshot._won||{},EBayConstants.ClientAlertsTypes.ITEM_WON,nextSnapshot,"_won");
this._notifyNewArrivals(lists.lost&&lists.lost.items,prevSnapshot._lost||{},EBayConstants.ClientAlertsTypes.ITEM_LOST,nextSnapshot,"_lost");
this._notifyNewArrivals(lists.sold&&lists.sold.items,prevSnapshot._sold||{},EBayConstants.ClientAlertsTypes.ITEM_SOLD,nextSnapshot,"_sold");
this._notifyNewArrivals(lists.unsold&&lists.unsold.items,prevSnapshot._unsold||{},EBayConstants.ClientAlertsTypes.ITEM_UNSOLD,nextSnapshot,"_unsold");
enyo.application.preferences.data.user.notificationSnapshot=nextSnapshot;
enyo.application.preferences.setPreferences();
},_notifyNewArrivals:function(items,prevIdSet,eventType,nextSnapshot,key){
var idSet={};
if(items){
for(var i=0;i<items.length;i++){
idSet[items[i].itemId]=true;
if(!prevIdSet[items[i].itemId]){
this.processNotificationItem(this._toAlert(items[i],eventType));
}
}
}
nextSnapshot[key]=idSet;
},_toAlert:function(item,eventType){
return{itemId:item.itemId,transactionId:"",title:item.title,eventType:eventType,price:item.price,currency:item.currency,bidCount:item.bidCount,endTime:item.endTime,galleryUrl:item.imageUrl,timestamp:new Date()};
},processNotificationItem:function(_a){
console.log("processing notification");
switch(_a.eventType){
case EBayConstants.ClientAlertsTypes.OUT_BID:
case EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON:
case EBayConstants.ClientAlertsTypes.ITEM_WON:
case EBayConstants.ClientAlertsTypes.ITEM_LOST:
case EBayConstants.ClientAlertsTypes.END_OF_AUCTION:
case EBayConstants.ClientAlertsTypes.FIXED_PRICE_TRANSACTION:
case EBayConstants.ClientAlertsTypes.BID_RECEIVED:
case EBayConstants.ClientAlertsTypes.ITEM_SOLD:
case EBayConstants.ClientAlertsTypes.ITEM_UNSOLD:
var _b=Helpers.UUID.GUID();
_a.guid=_b;
this.$.notificationDataAccess.addNotification(_a,enyo.bind(this,function(_c){
if(_c){
console.log("added notification to db");
}else{
console.error("unable to add notification to db");
}
}));
this.$.launchService.call({id:this.appInfo.id,params:{notification:true,alert:_a}});
break;
default:
console.log("unsupported alert");
break;
}
},updateSubscription:function(_d,_e,_f){
console.log("updateSubscription called [inIsActivated="+_d+", inInterval="+_e+"]");
enyo.application.preferences.data.user.notificationActivated=_d;
if(!_d){
enyo.application.preferences.data.user.notificationSnapshot=undefined;
}
enyo.application.preferences.setPreferences();
if(_d){
this.setWakeup();
}else{
this.clearWakeup();
}
_f(true);
},updateInterval:function(_14){
this.clearWakeup();
this.setWakeup();
},clearAll:function(){
console.log("clearAll called");
this.$.notificationDataAccess.dropAll(enyo.bind(this,function(){
}));
enyo.application.dashboard.popAllDashboards();
}});
