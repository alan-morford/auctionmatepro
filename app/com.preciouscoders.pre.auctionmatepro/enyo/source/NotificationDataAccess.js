enyo.kind({name:"amhd.NotificationDataAccess",kind:"enyo.Component",_db:undefined,create:function(){
this.inherited(arguments);
},getNotifications:function(_1){
console.log("getNotifications called");
try{
this._selectNotifications(enyo.bind(this,function(_2,_3){
_1(_2,_3);
}));
return true;
}
catch(e){
console.error("getNotifications error: "+e.message);
return false;
}
},addNotification:function(_4,_5){
console.log("addNotification called");
try{
this._insertNotification(_4,enyo.bind(this,function(_6,_7){
_5(_6,_7);
}));
return true;
}
catch(ex){
console.error("addNotification error",ex);
return false;
}
},removeNotification:function(_8,_9){
console.log("removeNotification called");
try{
this._deleteNotification(_8,enyo.bind(this,function(_a,_b){
_9(_a,_b);
}));
return true;
}
catch(ex){
console.error("removeNotification error",ex);
return false;
}
},removeAll:function(_c){
console.log("removeAll called");
try{
this._deleteAllNotifications(enyo.bind(this,function(_d,_e){
_c(_d,_e);
}));
return true;
}
catch(ex){
console.error("removeAll error",ex);
return false;
}
},removeRead:function(_f){
console.log("removeRead called");
try{
this._deleteAllReadNotifications(enyo.bind(this,function(_10,_11){
_f(_10,_11);
}));
return true;
}
catch(ex){
console.error("removeRead error",ex);
return false;
}
},markAllRead:function(_12){
console.log("markAllRead called");
try{
this._markAllReadNotifications(enyo.bind(this,function(_13,_14){
_12(_13,_14);
}));
return true;
}
catch(ex){
console.error("markAllRead error",ex);
return false;
}
},setItemRead:function(_15,_16,_17){
console.log("setItemRead called");
try{
this._updateReadNotification(_15,_16,enyo.bind(this,function(_18,_19){
_17(_18,_19);
}));
return true;
}
catch(ex){
console.error("setItemRead error",ex);
return false;
}
},dropAll:function(_1a){
console.log("dropAll called");
try{
this._dropTables(enyo.bind(this,function(_1b,_1c){
_1a(_1b);
}));
return true;
}
catch(ex){
console.error("dropAll error",ex);
return false;
}
},_openDatabase:function(_1d){
if(this._db==undefined){
try{
this._db=openDatabase("AuctionMateNotificationsDB","","",65536);
console.log("database opened");
var _1e="CREATE TABLE IF NOT EXISTS notifications ("+"id INTEGER PRIMARY KEY AUTOINCREMENT ,"+"accountId TEXT NOT NULL DEFAULT \"default\","+"itemId TEXT NOT NULL DEFAULT \"\","+"transactionId TEXT NOT NULL DEFAULT \"\","+"guid TEXT NOT NULL DEFAULT \"\","+"title TEXT NOT NULL DEFAULT \"\","+"eventType TEXT NOT NULL DEFAULT \"\","+"price REAL NOT NULL DEFAULT \"\","+"currency TEXT NOT NULL DEFAULT \"\","+"bidCount INTEGER NOT NULL DEFAULT \"\","+"endTime DATETIME NOT NULL DEFAULT \"\","+"galleryUrl TEXT NOT NULL DEFAULT \"\","+"notificationRead BOOLEAN NOT NULL DEFAULT \"\","+"notificationTimestamp DATETIME NOT NULL DEFAULT \"\");";
this._db.transaction(enyo.bind(this,function(_1f){
_1f.executeSql(_1e,[],enyo.bind(this,function(_20,_21){
console.log("create schema success callback handler called");
_1d(true);
}),enyo.bind(this,function(_22,_23){
console.error("error during db operation: "+_23.message+" (code "+_23.code+")");
_1d(false);
}));
}));
}
catch(e){
console.error("unable to open database",e);
enyo.nextTick(enyo.bind(this,function(){
_1d(false);
}));
}
}else{
console.log("database was already opened");
enyo.nextTick(enyo.bind(this,function(){
_1d(true);
}));
}
},_dropTables:function(_24){
if(this._db==undefined){
try{
this._db=openDatabase("AuctionMateNotificationsDB","","",65536);
console.log("database opened");
}
catch(e){
console.error("unable to open database",e);
enyo.nextTick(enyo.bind(this,function(){
_24(false);
}));
}
}
var _25="DROP TABLE IF EXISTS notifications;";
this._db.transaction(enyo.bind(this,function(_26){
_26.executeSql(_25,[],enyo.bind(this,function(_27,_28){
console.log("drop schema success callback handler called");
_24(true);
}),enyo.bind(this,function(_29,_2a){
console.error("error during db operation: "+_2a.message+" (code "+_2a.code+")");
_24(false);
}));
}));
},_insertNotification:function(_2b,_2c){
var _2d="INSERT INTO notifications (itemId, transactionId, guid, title, eventType, price, currency, bidCount, endTime, galleryUrl, notificationRead, notificationTimestamp) VALUES (\""+_2b.itemId+"\",\""+_2b.transactionId+"\",\""+_2b.guid+"\",\""+_2b.title+"\",\""+_2b.eventType+"\",\""+_2b.price+"\",\""+_2b.currency+"\",\""+_2b.bidCount+"\",\""+_2b.endTime+"\",\""+_2b.galleryUrl+"\",\""+"false"+"\",\""+_2b.timestamp+"\");";
this._executeSQL(_2d,_2c);
},_selectNotifications:function(_2e){
var _2f="SELECT * FROM notifications;";
this._executeSQL(_2f,_2e,enyo.bind(this,function(_30,_31){
console.log("select notifications success callback handler called");
var _32=this._parseResult(_31);
if(_32!=undefined){
_2e(true,_32);
}else{
_2e(false);
}
}));
},_deleteNotification:function(_33,_34){
var _35="DELETE FROM notifications WHERE id=\""+_33.id+"\";";
this._executeSQL(_35,_34);
},_deleteAllNotifications:function(_36){
var _37="DELETE FROM notifications;";
this._executeSQL(_37,_36);
},_deleteAllReadNotifications:function(_38){
var _39="DELETE FROM notifications WHERE notificationRead=\"true\";";
this._executeSQL(_39,_38);
},_markAllReadNotifications:function(_3a){
var _3b="UPDATE notifications SET notificationRead=\"true\";";
this._executeSQL(_3b,_3a);
},_updateReadNotification:function(_3c,_3d,_3e){
var _3f="UPDATE notifications SET notificationRead=\""+_3d+"\" WHERE id=\""+_3c.id+"\";";
this._executeSQL(_3f,_3e);
},_selectCountUnread:function(_40){
var _41="SELECT * FROM notifications;";
this._executeSQL(_41,_40,enyo.bind(this,function(_42,_43){
console.log("select count unread success callback handler called");
_40(true);
}));
},_executeSQL:function(_44,_45,_46){
this._openDatabase(enyo.bind(this,function(_47){
if(_47){
if(_46==undefined){
_46=enyo.bind(this,function(_48,_49){
console.log("db operation success callback handler called");
_45(true);
});
}
this._db.transaction(enyo.bind(this,function(_4a){
_4a.executeSql(_44,[],_46,enyo.bind(this,function(_4b,_4c){
console.error("error during db operation: "+_4c.message+" (code "+_4c.code+")");
_45(false);
}));
}));
}else{
}
}));
},_parseResult:function(_4d){
try{
var _4e=[];
for(var i=0;i<_4d.rows.length;i++){
var row=_4d.rows.item(i);
var id=row["id"];
var _4f=row["itemId"];
var _50=row["transactionId"];
var _51=row["guid"];
var _52=row["title"];
var _53=row["eventType"];
var _54=row["price"];
var _55=row["currency"];
var _56=row["bidCount"];
var _57=row["endTime"];
var _58=row["galleryUrl"];
var _59=row["notificationRead"];
var _5a=row["notificationTimestamp"];
var _5b={id:id,itemId:_4f,transactionId:_50,guid:_51,title:_52,eventType:_53,price:_54,currency:_55,bidCount:_56,endTime:new Date(_57),galleryUrl:_58,notificationRead:(_59=="true")?true:false,notificationTimestamp:new Date(_5a)};
_4e.push(_5b);
}
return _4e;
}
catch(e){
console.error("error while parsing result",e);
return undefined;
}
}});

