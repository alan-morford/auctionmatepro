enyo.kind({name:"amhd.UnconnectedView",kind:"VFlexBox",events:{onOpenConnect:"",onOpenImageView:""},components:[{kind:"PageHeader",className:"main-header",components:[{name:"ucHeaderConnect",kind:"Button",content:$L("Connect Account"),onclick:"doOpenConnect"},{name:"ucHeaderSellerInfoBack",kind:"ToolButton",showing:false,content:$L("Back"),onclick:"ucCloseSellerInfo"},{kind:"Spacer"},{name:"ucSearchInput",kind:"SearchInput",hint:$L("Enter Search Term"),onkeypress:"ucStartSearch",selectAllOnFocus:true,changeOnInput:false}]},{className:"main-header-shadow"},{name:"ucContentPane",kind:"Pane",transitionKind:"enyo.transitions.Simple",flex:1,components:[{name:"ucSearchResultView",kind:"amhd.Search",flex:1,onOpenImageView:"doOpenImageView",onOpenSellerInfo:"ucOpenSellerInfo"},{name:"ucSellerInfoView",kind:"amhd.SellerInfo",lazy:true},]},],create:function(){
this.inherited(arguments);
},startSearch:function(_1){
this.$.ucSearchInput.setValue(enyo.windowParams.searchterm);
this.ucStartSearch(null,"start");
},ucStartSearch:function(_2,_3){
var _4=this.prepareSearch(_3,this.$.ucSearchInput);
if(_4){
this.$.ucSearchInput.forceBlur();
this.$.ucSearchResultView.setSearchTerm(_4);
}
},prepareSearch:function(_5,_6){
if(_5=="start"||_5.charCode==13){
var _7=_6.getValue();
if(_7.length>1){
this.log("searching for "+_7);
return _7;
}
}
return false;
},ucOpenSellerInfo:function(_8,_9){
this.log("opening seller info for "+_9.sellerID);
this.$.ucContentPane.selectViewByName("ucSellerInfoView");
this.$.ucHeaderConnect.hide();
this.$.ucHeaderSellerInfoBack.show();
this.$.ucSearchInput.hide();
this.$.ucSellerInfoView.setArticle(_9);
},ucCloseSellerInfo:function(){
this.$.ucContentPane.back();
this.$.ucHeaderConnect.show();
this.$.ucHeaderSellerInfoBack.hide();
this.$.ucSearchInput.show();
this.$.ucContentPane.getView().resized();
},});

