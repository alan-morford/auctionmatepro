enyo.kind({name:"amhd.Preferences",kind:"VFlexBox",events:{onChanged:""},components:[{kind:"PageHeader",pack:"center",components:[{content:$L("Preferences & Accounts"),flex:1,className:"common-headercentered"}]},{kind:"Scroller",flex:1,components:[{kind:"HFlexBox",components:[{kind:"Spacer"},{kind:"VFlexBox",className:"preferences-content",components:[{name:"showAccountConnected",showing:false,kind:"RowGroup",caption:$L("Connected Account"),components:[{components:[{name:"userId",className:"preferences-spacebottom"},{kind:"Button",content:$L("Remove Account"),onclick:"removeAccount"},]}]},{kind:"RowGroup",caption:$L("Select eBay Site"),components:[{content:$L("The default eBay site is automatically chosen according to your device's locale settings. Alternatively, you can manually select a site below."),className:"preferences-smalltext"},{name:"siteSelector",kind:"ListSelector",label:$L("Site")},]},{name:"notificationsGroup",showing:false,kind:"RowGroup",caption:$L("Notifications"),components:[{kind:"HFlexBox",align:"center",components:[{content:$L("Enable Notifications"),flex:1},{name:"notificationToggle",kind:"ToggleButton",onLabel:$L("Active"),offLabel:$L("Inactive")},]},{name:"notificationIntervalSelector",kind:"ListSelector",label:$L("Interval")},]},{name:"notConnectedText",showing:false,content:$L("Further preferences such as notifications become available once you connected your eBay account with AuctionMate."),className:"preferences-spacebottom preferences-smalltext"},{name:"doneButton",kind:"ActivityButton",content:$L("Done"),active:false,className:"enyo-button-affirmative",onclick:"savePreferences"},]},{kind:"Spacer"},]},]},{name:"notificationErrorDialog",kind:"DialogPrompt",title:$L("Setting eBay Notifications"),message:$L("An error occured while updating the notification settings. Please try again later."),acceptButtonCaption:$L("OK"),onAccept:"notificationErrorDialogOk",cancelButtonCaption:null},],create:function(){
this.inherited(arguments);
var _1=[{value:"default",caption:$L("Default")}];
for(var _2 in EBayConfig.SITE_CONFIG){
_1.push({value:_2,caption:EBayConfig.SITE_CONFIG[_2].SITE_NAME});
}
this.$.siteSelector.setItems(_1);
var _3=[{caption:$L("#{n} minutes").interpolate({n:5}),value:5},{caption:$L("#{n} minutes").interpolate({n:10}),value:10},{caption:$L("#{n} minutes").interpolate({n:15}),value:15},{caption:$L("#{n} minutes").interpolate({n:30}),value:30},{caption:$L("#{n} hour").interpolate({n:1}),value:60},{caption:$L("#{n} hours").interpolate({n:3}),value:180}];
this.$.notificationIntervalSelector.setItems(_3);
},update:function(){
if(enyo.application.preferences.getUserConnected()){
this.$.showAccountConnected.show();
this.$.notificationsGroup.show();
this.$.notConnectedText.hide();
this.$.userId.setContent(enyo.application.preferences.data.user.userId);
}else{
this.$.showAccountConnected.hide();
this.$.notificationsGroup.hide();
this.$.notConnectedText.show();
}
this.$.siteSelector.setValue(enyo.application.preferences.data.user.site);
this.$.notificationIntervalSelector.setValue(enyo.application.preferences.data.user.notificationInterval);
this.$.notificationToggle.setState(enyo.application.preferences.data.user.notificationActivated);
this.$.doneButton.setActive(false);
},removeAccount:function(){
enyo.application.preferences.deletePreferences();
this.log("preferences deleted");
enyo.application.notificationManager.clearAll();
this.log("notifications deleted");
this.doChanged();
},savePreferences:function(){
enyo.application.preferences.data.user.site=this.$.siteSelector.getValue();
var _4=enyo.application.preferences.data.user.notificationInterval;
enyo.application.preferences.data.user.notificationInterval=this.$.notificationIntervalSelector.getValue();
enyo.application.preferences.setPreferences();
var _5=this.$.notificationToggle.getState();
if(enyo.application.preferences.data.user.notificationActivated!=_5){
this.$.doneButton.setActive(true);
enyo.scrim.show();
enyo.application.notificationManager.updateSubscription(_5,enyo.application.preferences.data.user.notificationInterval,enyo.bind(this,function(_6){
this.$.doneButton.setActive(false);
if(_6){
this.doChanged();
enyo.scrim.hide();
}else{
this.$.notificationErrorDialog.open();
}
}));
}else{
if(_4!=enyo.application.preferences.data.user.notificationInterval){
enyo.application.notificationManager.updateInterval(enyo.application.preferences.data.user.notificationInterval);
this.doChanged();
}else{
this.doChanged();
}
}
},notificationErrorDialogOk:function(){
this.$.notificationErrorDialog.close();
this.doChanged();
enyo.scrim.hide();
}});

