enyo.kind({name:"amhd.ArticleInCard",kind:"amhd.Article",create:function(){
this.inherited(arguments);
enyo.nextTick(enyo.bind(this,function(){
this.$.toolbarGrabButton.destroy();
this.$.toolbarOpenCardButton.destroy();
this._viewSize="large";
this.updateLayout();
}));
enyo.application.ebaydata.registerUpdateModelCallback(enyo.application.ebaydata.registerUpdateModelCallbackType.ALL,enyo.bind(this,function(_1){
if(_1!=this){
this.$.reload(false);
}
}));
},reload:function(_2){
this.inherited(arguments,false);
}});

