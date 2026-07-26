enyo.kind({name:"amhd.Dashboard",kind:enyo.Component,components:[{name:"dashboard",kind:"Dashboard",smallIcon:"enyo/images/icons/dashboard-24-color.png",onMessageTap:"messageTap",onIconTap:"iconTap",onUserClose:"dashboardClose",onLayerSwipe:"layerSwiped"}],create:function(){
this.inherited(arguments);
},showNotification:function(_1){
this.pushDashboard(_1);
},pushDashboard:function(_2){
var _3=undefined;
var _4=undefined;
switch(_2.eventType){
case EBayConstants.ClientAlertsTypes.OUT_BID:
_3=$L("Outbid");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON:
_3=$L("Ending Soon");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.ITEM_WON:
_3=$L("Item Won");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.ITEM_LOST:
_3=$L("Item Lost");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.ITEM_LOST:
_3=$L("Item Lost");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.END_OF_AUCTION:
_3=$L("Auction Ended");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.FIXED_PRICE_TRANSACTION:
_3=$L("Item bought");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.BID_RECEIVED:
_3=$L("Bid Received");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.ITEM_SOLD:
_3=$L("Item Sold");
_4=_2.title;
break;
case EBayConstants.ClientAlertsTypes.ITEM_UNSOLD:
_3=$L("Item Unsold");
_4=_2.title;
break;
}
if(_3&&_4){
this.$.dashboard.push({icon:"enyo/images/icons/dashboard-48.png",title:_3,text:_4,alert:_2});
this.log("dashboard layer pushed");
}else{
this.log("unsupported alert");
}
},popDashboard:function(){
this.$.dashboard.pop();
},popAllDashboards:function(){
while(this.$.dashboard.layers.length>0){
this.$.dashboard.pop();
}
},messageTap:function(_5,_6){
this.log("Tapped on message: "+_6.text);
var _7={openNotifications:true,alert:_6.alert};
enyo.application.launcher.openNotificationNewCard(_7);
this.popAllDashboards();
},iconTap:function(_8,_9){
this.log("Tapped on icon for message: "+_9.text);
var _a={openNotifications:true};
enyo.application.launcher.openNotificationNewCard(_a);
this.popAllDashboards();
},dashboardClose:function(_b){
this.log("Closed dashboard.");
},layerSwiped:function(_c,_d){
this.log("Swiped layer: "+_d.text);
}});

