Helpers={};
Helpers.NEWLINE=String.fromCharCode(10);
Helpers.trimString=function(_1){
return _1.replace(/^\s*(.*)\s*$/,"$1");
};
Helpers.formatISO8601Date=function(_2){
var _3=function(_4){
return ((_4<10)?"0":"")+_4;
};
var _5=function(_6){
if(_6<10){
return ("00"+_6);
}
if(_6<100){
return ("0"+_6);
}
return ""+_6;
};
var _7="";
_7+=_2.getUTCFullYear();
_7+="-"+_3(_2.getUTCMonth()+1);
_7+="-"+_3(_2.getUTCDate());
_7+="T"+_3(_2.getUTCHours());
_7+=":"+_3(_2.getUTCMinutes());
_7+=":"+_3(_2.getUTCSeconds());
_7+="."+_5(_2.getUTCMilliseconds());
_7+="Z";
return _7;
};
Helpers.parseISO8601Date=function(_8){
try{
var _9=_8.match(/([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?/);
var _a=0;
var _b=new Date(_9[1],0,1);
if(_9[3]){
_b.setMonth(_9[3]-1);
}
if(_9[5]){
_b.setDate(_9[5]);
}
if(_9[7]){
_b.setHours(_9[7]);
}
if(_9[8]){
_b.setMinutes(_9[8]);
}
if(_9[10]){
_b.setSeconds(_9[10]);
}
if(_9[12]){
_b.setMilliseconds(Number("0."+_9[12])*1000);
}
if(_9[14]){
_a=(Number(_9[16])*60)+Number(_9[17]);
_a*=((_9[15]=="-")?1:-1);
}
_a-=_b.getTimezoneOffset();
time=(Number(_b)+(_a*60*1000));
_b.setTime(Number(time));
return _b;
}
catch(e){
pc.Log.logException(e);
}
};
Helpers.parseISO8601Duration=function(_c){
try{
var _d=_c.match(/P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9\.]*)S)?)?/);
var _e={"y":_d[1]?_d[1]:0,"mn":_d[2]?_d[2]:0,"d":_d[3]?_d[3]:0,"h":_d[4]?_d[4]:0,"m":_d[5]?_d[5]:0,"s":_d[6]?_d[6]:0};
return _e;
}
catch(e){
pc.Log.logException(e);
var _e={"y":0,"mn":0,"d":0,"h":0,"m":0,"s":0};
return _e;
}
};
// Browse API only ever gives an end Date (itemEndDate), never a Trading-API-style
// TimeLeft duration string - this derives the {y,mn,d,h,m,s} shape ArticleFacade/
// Formatters.formatTimeLeft expect (same shape parseISO8601Duration produces) so
// Browse-sourced search results/item detail get a real countdown instead of
// always reading as zero/ended.
Helpers.timeLeftFromEndDate=function(_endDate){
var _ms=_endDate.getTime()-(new Date()).getTime();
if(_ms<0){
_ms=0;
}
var _totalSeconds=Math.floor(_ms/1000);
var _s=_totalSeconds%60;
var _totalMinutes=Math.floor(_totalSeconds/60);
var _m=_totalMinutes%60;
var _totalHours=Math.floor(_totalMinutes/60);
var _h=_totalHours%24;
var _d=Math.floor(_totalHours/24);
return{"y":0,"mn":0,"d":_d,"h":_h,"m":_m,"s":_s};
};
Helpers.UUID={};
Helpers.UUID.S4=function(){
return (((1+Math.random())*65536)|0).toString(16).substring(1);
};
Helpers.UUID.GUID=function(){
return (Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4()+Helpers.UUID.S4());
};
Helpers.XML={};
Helpers.XML.getNode=function(_f,_10){
var _11=document.evaluate(_f,_10,null,XPathResult.ANY_TYPE,null);
var _12=_11.iterateNext();
if(_12){
return _12;
}
return false;
};
Helpers.XML.putNodeValuesInArrayHTML=function(_13,_14,_15,key,_16){
var _17=(_13.length>0)?false:true;
var i=0;
var _18=document.evaluate(_14,_15,null,XPathResult.ANY_TYPE,null);
var _19=_18.iterateNext();
var _1a;
while(_19){
if(_17){
_13.push({id:i});
}
if(_13[i]){
if(_16){
_1a=_16(_19,i);
_13[i][key]=_1a;
pc.Log.info(_1a);
}else{
_1a=_19.innerText;
_13[i][key]=Helpers.trimString(_1a);
}
}
_19=_18.iterateNext();
i++;
}
};
Helpers.XML.getNodeValue=function(_1b,_1c){
var _1d=document.evaluate(_1b,_1c,null,XPathResult.ANY_TYPE,null);
var _1e=_1d.iterateNext();
if(_1e){
var _1f=_1e.nodeValue;
if(_1f){
_1f=Helpers.trimString(_1f);
}
return _1f;
}
return false;
};
Helpers.XML.getNodeText=function(_20,_21){
return Helpers.XML.getNodeText(_20,_21,false);
};
Helpers.XML.getNodeText=function(_22,_23,_24){
var _25=document.evaluate(_22+"/text()",_23,null,XPathResult.ANY_TYPE,null);
var _26=_25.iterateNext();
if(_26){
var _27=_26.data;
if(_27){
_27=Helpers.trimString(_27);
}
return _27;
}
return _24;
};
Helpers.XML.getNodeTexts=function(_28,_29){
var _2a=document.evaluate(_28+"/text()",_29,null,XPathResult.ANY_TYPE,null);
var _2b=[];
var _2c=_2a.iterateNext();
while(_2c){
var _2d=_2c.data;
if(_2d){
_2d=Helpers.trimString(_2d);
}
_2b.push(_2d);
_2c=_2a.iterateNext();
}
return _2b;
};
Helpers.XML.getNodeAsNumber=function(_2e,_2f){
var _30=document.evaluate(_2e+"/text()",_2f,null,XPathResult.ANY_TYPE,null);
var _31=_30.iterateNext();
if(_31){
var _32=_31.data;
if(_32){
_32=Helpers.trimString(_32);
}
try{
return Number(_32);
}
catch(e){
}
}
return false;
};
Helpers.XML.getAllNodeText=function(_33,_34){
var _35=document.evaluate(_33+"/text()",_34,null,XPathResult.ANY_TYPE,null);
var _36=_35.iterateNext();
var _37="";
while(_36){
var val=_36.data;
if(_36.data){
_37+=Helpers.trimString(_36.data)+" ";
}
_36=_35.iterateNext();
}
_37=Helpers.trimString(_37);
return _37;
};
Helpers.XML.getNodesByXPathString=function(_38,_39){
try{
var _3a=_38.replace("xmlns=\"http://www.w3.org/1999/xhtml\"","");
var _3b=(new DOMParser()).parseFromString(_3a,"text/xml");
var _3c=document.evaluate(_39,_3b,null,XPathResult.ANY_TYPE,null);
return _3c;
}
catch(e){
pc.Log.error("getNodesByXPath: ",e);
throw (e);
}
};
Helpers.Array={};
Helpers.Array.remove=function(_3d,_3e,to){
var _3f=_3d.slice((to||_3e)+1||_3d.length);
_3d.length=_3e<0?_3d.length+_3e:_3e;
return _3d.push.apply(_3d,_3f);
};
Helpers.Date={};
Helpers.Date.getPrintDate=function(_40){
var day=_40.getDate();
if(day.length==1){
day="0"+day;
}
var _41=_40.getMonth()+1;
return day+"."+_41+"."+_40.getFullYear();
};
Helpers.Date.addDay=function(_42,_43){
var _44=1000*60*60*24;
return new Date(_42.getTime()+_44*_43);
};
Helpers.Log={};
Helpers.Log.info=function(a,b,c,d,e){
pc.Log.info(a,b,c,d,e);
};
Helpers.Locale={};
Helpers.Locale.getCountry=function(_45){
var a=_45.split("_");
return a[1];
};
Helpers.Locale.getLanguage=function(_46){
var a=_46.split("_");
return a[0];
};
Helpers.Log.logPropertiesRec=function(obj,_47,_48,_49){
if(pc.Log.currentLogLevel<pc.Log.LOG_LEVEL_INFO){
return;
}
_47=_47||"obj";
_49=_49||0;
pc.Log.info("Properties in object "+_47+":");
for(var _4a in obj){
if(_48||obj.hasOwnProperty(_4a)){
pc.Log.info(_47+"."+_4a+" = "+obj[_4a]);
Helpers.Log.logPropertiesRec2(obj[_4a],_47+"."+_4a,false,_49-1);
}
}
pc.Log.info("Properties in object "+_47+": log done.");
};
Helpers.Log.logPropertiesRec2=function(obj,_4b,_4c,_4d){
_4b=_4b||"";
if(_4d>=0&&typeof (obj)!="string"){
for(var _4e in obj){
if(_4c||obj.hasOwnProperty(_4e)){
pc.Log.info(_4b+"."+_4e+" = "+obj[_4e]);
Helpers.Log.logPropertiesRec2(obj[_4e],_4b+"."+_4e,false,_4d-1);
}
}
}
};
Helpers.Log.logToDOM=function(_4f){
pc.Log("Helpers.Log.logToDOM: not implemented.");
};
Helpers.Log.logLongString=function(_50){
while(_50.length>0){
var _51=Math.min(_50.length,140);
pc.Log.info(_50.slice(0,_51));
_50=_50.slice(_51,_50.length);
}
};
Helpers.Date.format=function(_52,_53){
var _54="";
var _55=Helpers.Date.replaceChars;
for(var i=0;i<_53.length;i++){
var _56=_53.charAt(i);
if(_55[_56]){
_54+=_55[_56].call(_52);
}else{
_54+=_56;
}
}
return _54;
};
Helpers.Date.replaceChars={shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d:function(){
return (this.getDate()<10?"0":"")+this.getDate();
},D:function(){
return Date.replaceChars.shortDays[this.getDay()];
},j:function(){
return this.getDate();
},l:function(){
return Date.replaceChars.longDays[this.getDay()];
},N:function(){
return this.getDay()+1;
},S:function(){
return (this.getDate()%10==1&&this.getDate()!=11?"st":(this.getDate()%10==2&&this.getDate()!=12?"nd":(this.getDate()%10==3&&this.getDate()!=13?"rd":"th")));
},w:function(){
return this.getDay();
},z:function(){
return "Not Yet Supported";
},W:function(){
return "Not Yet Supported";
},F:function(){
return Date.replaceChars.longMonths[this.getMonth()];
},m:function(){
return (this.getMonth()<9?"0":"")+(this.getMonth()+1);
},M:function(){
return Date.replaceChars.shortMonths[this.getMonth()];
},n:function(){
return this.getMonth()+1;
},t:function(){
return "Not Yet Supported";
},L:function(){
return (((this.getFullYear()%4==0)&&(this.getFullYear()%100!=0))||(this.getFullYear()%400==0))?"1":"0";
},o:function(){
return "Not Supported";
},Y:function(){
return this.getFullYear();
},y:function(){
return (""+this.getFullYear()).substr(2);
},a:function(){
return this.getHours()<12?"am":"pm";
},A:function(){
return this.getHours()<12?"AM":"PM";
},B:function(){
return "Not Yet Supported";
},g:function(){
return this.getHours()%12||12;
},G:function(){
return this.getHours();
},h:function(){
return ((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12);
},H:function(){
return (this.getHours()<10?"0":"")+this.getHours();
},i:function(){
return (this.getMinutes()<10?"0":"")+this.getMinutes();
},s:function(){
return (this.getSeconds()<10?"0":"")+this.getSeconds();
},e:function(){
return "Not Yet Supported";
},I:function(){
return "Not Supported";
},O:function(){
return (-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+(Math.abs(this.getTimezoneOffset()/60))+"00";
},P:function(){
return (-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+(Math.abs(this.getTimezoneOffset()/60))+":"+(Math.abs(this.getTimezoneOffset()%60)<10?"0":"")+(Math.abs(this.getTimezoneOffset()%60));
},T:function(){
var m=this.getMonth();
this.setMonth(0);
var _57=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");
this.setMonth(m);
return _57;
},Z:function(){
return -this.getTimezoneOffset()*60;
},c:function(){
return this.format("Y-m-d")+"T"+this.format("H:i:sP");
},r:function(){
return this.toString();
},U:function(){
return this.getTime()/1000;
}};

