enyo.kind({name:"amhd.NotificationList",kind:"VFlexBox",events:{onNotificationSelected:""},flex:1,components:[{kind:"Header",components:[{kind:"Image",src:"enyo/images/icons/dashboard-48.png",className:"articlelist-headericon"},{content:$L("Notifications")}]},{className:"header-shadow"},{name:"spinnerContainer",kind:"HFlexBox",pack:"center",className:"common-spinnercontainer",components:[{name:"spinner",kind:"SpinnerLarge",className:"common-spinner"},]},{kind:"VirtualList",name:"notificationList",flex:1,onSetupRow:"setupListItem",components:[{kind:"SwipeableItem",name:"listItem",swipeable:true,confirmRequired:true,confirmCaption:$L("Remove"),onConfirm:"itemSwipedConfirm",tapHighlight:true,layoutKind:"HFlexLayout",align:"center",onclick:"itemClick",components:[{kind:"amhd.NotificationListItem",name:"notificationListItem",flex:1}]}]},{className:"footer-shadow"},{kind:"Toolbar",components:[{kind:"GrabButton"},{name:"reloadButton",icon:"enyo/images/icons/menu-icon-refresh.png",onclick:"reload"},{name:"deleteButton",icon:"enyo/images/icons/menu-icon-delete.png",onclick:"openDeleteButtonMenu"},{name:"deleteButtonMenu",kind:"PopupSelect",onSelect:"deleteSelected",items:[{caption:$L("Old"),value:"old"},{caption:$L("All"),value:"all"}]},{name:"markAllReadButton",content:$L("Mark All As Read"),onclick:"markAllRead"},]},{name:"notificationDataAccess",kind:"amhd.NotificationDataAccess"}],_notifications:undefined,_selectedRow:-1,_startNotification:undefined,create:function(){
this.inherited(arguments);
this._startNotification=enyo.windowParams.alert;
},setupListItem:function(_1,_2){
if(!this._notifications){
return;
}
var _3=this._notifications[_2];
if(_3){
this.$.notificationListItem.setNotification(_3);
this.$.listItem.addRemoveClass("common-list-activeitem",this._selectedRow==_2);
return true;
}
return false;
},itemClick:function(_4,_5){
this._selectedRow=_5.rowIndex;
this.reload();
this.doNotificationSelected(this._notifications[this._selectedRow]);
this.$.notificationDataAccess.setItemRead(this._notifications[this._selectedRow],true,enyo.bind(this,function(_6,_7){
this.reload();
}));
},itemSwipedConfirm:function(_8,_9){
this.$.notificationDataAccess.removeNotification(this._notifications[_9],enyo.bind(this,function(_a,_b){
console.log("selRow="+this._selectedRow+",inIndex="+_9);
if(this._selectedRow==_9){
this._selectedRow=-1;
this.doNotificationSelected(null);
}
this.reload();
}));
},reload:function(){
this.$.notificationDataAccess.getNotifications(enyo.bind(this,function(_c,_d){
this.log("Notifications loaded: result.length="+_d.length);
this._notifications=_d;
if(this._startNotification){
this.log("start notification found");
var _e=this._startNotification;
this._startNotification=undefined;
this.selectNotification(_e);
}else{
enyo.nextTick(enyo.bind(this,function(){
this.$.notificationList.refresh();
}));
}
}));
},openDeleteButtonMenu:function(_f,_10){
this.$.deleteButtonMenu.openAtControl(_f,{left:0,top:-40});
},deleteSelected:function(_11,_12){
var _13=_12.getValue();
if(_13=="old"){
this.deleteOld();
}else{
if(_13=="all"){
this.deleteAll();
}
}
},deleteOld:function(){
var _14=this._notifications[this._selectedRow];
this.$.notificationDataAccess.removeRead(enyo.bind(this,function(_15,_16){
if(_14){
this._selectedRow=-1;
this.doNotificationSelected(null);
}
this.reload();
}));
},deleteAll:function(){
this.$.notificationDataAccess.removeAll(enyo.bind(this,function(_17,_18){
this._selectedRow=-1;
this.doNotificationSelected(null);
this.reload();
}));
},markAllRead:function(){
this.$.notificationDataAccess.markAllRead(enyo.bind(this,function(_19,_1a){
this.reload();
}));
},selectNotification:function(_1b){
if(_1b){
for(var i=0;i<this._notifications.length;i++){
if(this._notifications[i].guid==_1b.guid){
this._selectedRow=i;
this.doNotificationSelected(this._notifications[i]);
this.reload();
return;
}
}
}
}});

