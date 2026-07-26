pc={};
pc.Log={};
pc.Log.info=function(_1){
enyo.log(_1);
};
pc.Log.error=function(_2,_3){
enyo.error(_2,_3);
};
pc.Log.logException=function(_4){
enyo.error(_4);
};
pc.Ajax={};
pc.Ajax.request=function(_5,_6){
return new Ajax.Request(_5,_6);
};
pc.defer=function(_7){
enyo.nextTick(this,_7);
};

