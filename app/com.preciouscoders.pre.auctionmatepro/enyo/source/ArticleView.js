enyo.kind({name:"amhd.ArticleView",kind:"enyo.VFlexBox",style:"position: relative",events:{onOpenImageView:"",onOpenSellerInfo:"",},MIDDLEPEEKWIDTH:70,RIGHTPEEKWIDTH:85,components:[{kind:"VFlexBox",className:"enyo-fit",components:[{kind:"Spacer"},{className:"footer-shadow"},{kind:"Toolbar"}]},{name:"slidingPane",kind:"SlidingPane",flex:1,onSelectView:"slidingSelected",onSlideComplete:"slidingComplete",components:[{name:"left",width:"240px",components:[{name:"mainList",kind:"amhd.MainList",flex:1,onListSelected:"articleListSelected",onReloadTap:"reload"}]},{name:"middle",width:"400px",dragAnywhere:false,components:[{name:"articleList",kind:"amhd.ArticleList",flex:1,onArticleSelected:"articleSelected",onEmptyArticle:"emptyArticle"}]},{name:"right",flex:1,dragAnywhere:false,components:[{name:"article",kind:"amhd.Article",flex:1,onOpenImageView:"doOpenImageView",onOpenSellerInfo:"doOpenSellerInfo"}]}]},{name:"errorDialog",kind:"amhd.ErrorDialog"},],_previousArticleList:null,create:function(){
this.inherited(arguments);
this.updateOrientation(enyo.getWindowOrientation());
enyo.application.appdata.registerAppEvent("Orientation",enyo.bind(this,this.updateOrientation));
this.$.mainList.setSelectedList(enyo.application.appdata.lists[0]);
},reload:function(){
if(enyo.application.appdata.connectionInformation.isInternetConnectionAvailable){
enyo.application.ebaydata.updateHomeScreen(true,enyo.bind(this,function(_1,_2){
if(!_1){
this.$.errorDialog.showError(_2);
}
}));
}else{
var _3={errorCode:enyo.application.appdata.ErrorCodes.NO_CONNECTION};
this.$.errorDialog.showError(_3);
}
},gotoLeft:function(){
this.$.slidingPane.selectView(this.$.left);
},gotoMiddle:function(){
this.$.slidingPane.selectView(this.$.middle);
},gotoRight:function(){
this.$.slidingPane.selectView(this.$.right);
},articleListSelected:function(_4,_5){
this.log("You clicked list "+_5.listName);
if(this._previousArticleList!=_5){
this._previousArticleList=_5;
this.$.articleList.setList(_5);
this.$.article.emptyArticle();
}
},articleSelected:function(_6,_7){
if(_7!=null&&this.$.slidingPane.getViewName()=="left"&&(enyo.getWindowOrientation()=="left"||enyo.getWindowOrientation()=="right")){
this.gotoMiddle();
}
this.$.article.setArticle(_7);
},slidingSelected:function(_8,_9,_a){
this.log(_9.name,(_a||0).name);
if(_9.name=="left"){
this.$.mainList.slideToPeek(false);
}
},slidingComplete:function(_b,_c){
this.log(_c.name);
if(_c.name!="left"){
this.$.mainList.slideToPeek(true);
}
var _d="small";
if(_c.name=="middle"){
_d="medium";
}
if(_c.name=="right"){
_d="large";
}
this.$.article.setViewSize(_d);
},updateOrientation:function(_e){
this.log("change orientation to "+_e);
if(_e=="up"||_e=="down"){
this.$.middle.setPeekWidth(this.MIDDLEPEEKWIDTH);
this.$.right.setPeekWidth(this.MIDDLEPEEKWIDTH+this.RIGHTPEEKWIDTH);
}else{
if(_e=="left"||_e=="right"){
this.$.middle.setPeekWidth(0);
this.$.right.setPeekWidth(this.RIGHTPEEKWIDTH);
}
}
this.resized();
},emptyArticle:function(){
this.$.article.emptyArticle();
},});

