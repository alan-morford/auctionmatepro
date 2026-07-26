enyo.kind({name:"amhd.NotificationListItem",kind:"Control",published:{notification:null,},components:[{kind:"HFlexBox",components:[{name:"imageContainer",kind:"HFlexBox",className:"articlelistitem-imagebox",align:"center",pack:"center",components:[{name:"image",kind:"Image",src:"enyo/images/dummyarticle.jpg",className:"articlelistitem-image"},]},{kind:"VFlexBox",flex:1,components:[{kind:"HFlexBox",components:[{kind:"VFlexBox",flex:1,align:"start",className:"articlelistitem-middle",components:[{name:"title",content:"",className:"articlelistitem-price"},{name:"subtitle",content:"",allowHtml:true,className:"articlelistitem-reserveNotMet"},]},{kind:"VFlexBox",align:"end",components:[{name:"price",content:"",allowHtml:true,className:"articlelistitem-price"},{name:"addData1",content:"",allowHtml:true,className:"articlelistitem-flags"},{name:"addData2",content:"",allowHtml:true,className:"articlelistitem-flags"},]},]},{kind:"Spacer"},{kind:"HFlexBox",components:[{name:"flags",flex:1,content:"",allowHtml:true,className:"articlelistitem-flags articlelistitem-middle"},{name:"timeLeft",content:"",allowHtml:true,className:"articlelistitem-timeleft"}]},]},]}],create:function(){
this.inherited(arguments);
},notificationChanged:function(){
this.updateView();
},updateView:function(){
var _1=undefined;
switch(this.notification.eventType){
case EBayConstants.ClientAlertsTypes.OUT_BID:
_1=$L("Outbid");
break;
case EBayConstants.ClientAlertsTypes.WATCHED_ITEM_ENDING_SOON:
_1=$L("Ending Soon");
break;
case EBayConstants.ClientAlertsTypes.ITEM_WON:
_1=$L("Item Won");
break;
case EBayConstants.ClientAlertsTypes.ITEM_LOST:
_1=$L("Item Lost");
break;
case EBayConstants.ClientAlertsTypes.ITEM_LOST:
_1=$L("Item Lost");
break;
case EBayConstants.ClientAlertsTypes.END_OF_AUCTION:
_1=$L("Auction Ended");
break;
case EBayConstants.ClientAlertsTypes.FIXED_PRICE_TRANSACTION:
_1=$L("Item bought");
break;
case EBayConstants.ClientAlertsTypes.BID_RECEIVED:
_1=$L("Bid Received");
break;
case EBayConstants.ClientAlertsTypes.ITEM_SOLD:
_1=$L("Item Sold");
break;
case EBayConstants.ClientAlertsTypes.ITEM_UNSOLD:
_1=$L("Item Unsold");
break;
}
this.$.image.setSrc(this.notification.galleryUrl);
this.$.title.setContent(this.notification.title);
this.$.price.setContent(_1);
this.$.addData1.setContent(Formatters.formatPrice(this.notification.price,this.notification.currency));
this.$.addData2.setContent(this.notification.bidCount+" bids");
this.$.flags.setContent("Ends: "+Formatters.formatDate(this.notification.endTime));
if(this.notification.notificationRead){
this.$.title.setClassName("articlelistitem-title");
this.$.price.setClassName("articlelistitem-title");
}else{
this.$.title.setClassName("articlelistitem-price");
this.$.price.setClassName("articlelistitem-price");
}
}});

