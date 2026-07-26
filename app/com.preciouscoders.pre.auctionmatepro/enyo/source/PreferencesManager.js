enyo.kind({name:"amhd.PreferencesManager",kind:"enyo.Component",data:{user:{}},defaults:{"user":{"access_token":undefined,"refresh_token":undefined,"tokenExpiry":undefined,"userId":undefined,"site":"default","swipeDeleteAutoconfirmActivated":false,"notificationActivated":false,"notificationInterval":5,"notificationSnapshot":undefined}},create:function(){
this.inherited(arguments);
},getPreferences:function(){
this.log("getPreferences called");
try{
var _1=enyo.getCookie("amhd_preferences_user");
if(_1){
var _2=enyo.json.parse(_1);
this.data.user=_2;
}else{
this.data.user={};
}
this.completeUserData();
this.setPreferences();
return true;
}
catch(ex){
this.log("getPreferences error: "+ex);
this.deletePreferences();
return false;
}
},setPreferences:function(){
this.log("setPreferences called");
var _3=enyo.json.stringify(this.data.user);
enyo.setCookie("amhd_preferences_user",_3);
return true;
},deletePreferences:function(){
this.log("deletePreferences called");
this.initializeUserData();
this.setPreferences();
},completeUserData:function(){
this.log("completing user data");
var _4=enyo.clone(this.defaults.user);
var _5=enyo.mixin(_4,this.data.user);
this.data.user=_5;
},initializeUserData:function(){
this.data.user={};
this.completeUserData();
},getLocale:function(){
var _6=enyo.g11n.currentLocale();
if(!_6.region){
_6={region:""+_6,language:""+_6};
}
var _7=(this.data.user.site&&this.data.user.site!=this.defaults.user.site)?this.data.user.site:_6.region;
return _6.language+"_"+_7.toUpperCase();
},getUserConnected:function(){
return (this.data.user.access_token);
},});

