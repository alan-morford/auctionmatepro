Formatters={};
Formatters.formatTimeLeft=function(_1){
if(_1.y+_1.mn+_1.d==0){
if(_1.d+_1.h+_1.m==0){
return $L("#{s} seconds").interpolate(_1);
}else{
if(_1.d+_1.h==0&&_1.m<10){
return $L("#{m} minutes").interpolate(_1);
}else{
return $L("#{h}h #{m}m").interpolate(_1);
}
}
}else{
if(_1.y+_1.mn==0){
return $L("#{d}d #{h}h").interpolate(_1);
}else{
if(_1.y<=1){
if(_1.y*12+_1.mn==1){
return $L("one month");
}else{
return $L("#{months} months").interpolate({months:_1.y*12+_1.mn});
}
}else{
if(_1.y==1){
return $L("one year");
}else{
return $L("#{y} years").interpolate(_1);
}
}
}
}
};
Formatters.formatDate=function(_2){
var _3=new enyo.g11n.DateFmt({date:"medium",time:"medium",});
return _3.format(_2);
};
Formatters.formatDateLastUpdate=function(_4){
var _5=new enyo.g11n.DateFmt({time:"short",});
return _5.format(_4);
};
Formatters.formatCurrency=function(_6){
switch(_6){
default:
return _6;
}
};
Formatters.formatPrice=function(_7,_8,_9){
var _a=new enyo.g11n.NumberFmt({fractionDigits:2});
var _b=_9?"#{p}<small>&nbsp;#{c}</small>":"#{p}&nbsp;#{c}";
return $L(_b).interpolate({c:Formatters.formatCurrency(_8),p:_a.format(_7)});
};

