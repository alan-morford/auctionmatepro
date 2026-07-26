enyo.kind({name:"amhd.Notification",kind:"enyo.VFlexBox",style:"position: relative",components:[{kind:"VFlexBox",className:"enyo-fit",components:[{kind:"Spacer"},{kind:"Toolbar"}]},{name:"slidingPane",kind:"SlidingPane",flex:1,onSelectView:"slidingSelected",onSlideComplete:"slidingComplete",components:[{name:"left",width:"400px",components:[{name:"notificationList",kind:"amhd.NotificationList",flex:1,onNotificationSelected:"notificationSelected"}]},{name:"right",flex:1,components:[{name:"article",kind:"amhd.Article",flex:1,onOpenImageView:"doOpenImageView",onOpenSellerInfo:"doOpenSellerInfo"}]}]}],create:function(_1){
this.inherited(arguments);
},reload:function(){
this.$.notificationList.reload();
},notificationSelected:function(_2,_3){
console.log("notificationSelected");
if(_3==null){
this.$.article.emptyArticle();
}else{
this.$.article.setArticle(_3);
}
},});

