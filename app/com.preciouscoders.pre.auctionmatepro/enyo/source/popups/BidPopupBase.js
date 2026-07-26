enyo.kind({name:"amhd.BidPopupBase",kind:enyo.Control,events:{onPlaceBidSuccessful:"",onCancel:""},published:{articleFacade:null,},chrome:[{name:"pane",kind:"Control",components:[{name:"enterView",components:[{name:"client",kind:"Control",}]},{name:"confirmView",showing:false,components:[{name:"confirmTitle",allowHtml:true,className:"popup-title"},{name:"confirmMessage",allowHtml:true,className:"popup-text popup-bottomline"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"doCancel"},{name:"confirmButton",kind:"ActivityButton",flex:1,active:false,className:"enyo-button-affirmative",onclick:"confirmBid"},]}]},{name:"captchaView",showing:false,components:[{content:$L("Please confirm you're human"),className:"popup-title"},{content:$L("Please enter the text shown on the following image."),className:"popup-text popup-bottomline"},{kind:"HFlexBox",pack:"center",components:[{name:"captchaImage",align:"center",kind:"Image",className:"popup-bottomline"},]},{name:"captchaText",kind:"Input",className:"popup-bottomline",hint:$L("Type the text you see above"),spellcheck:false,autocorrect:false,autoWordComplete:false},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"doCancel"},{kind:"Button",flex:1,caption:$L("OK"),className:"enyo-button-affirmative",onclick:"checkCaptcha"},]}]},{name:"errorView",showing:false,components:[{name:"errorTitle",allowHtml:true,className:"popup-title"},{name:"errorMessage",allowHtml:true,className:"popup-text popup-bottomline"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"closeAfterError"},]}]},]},],_quantity:1,_currency:"ERROR",_uuid:null,_captchaToken:null,_bidBuyAction:"ERROR",_placeBidSuccessfulMessage:"",create:function(){
this.inherited(arguments);
this.resetPopup();
if(this.articleFacade!=null){
this.articleFacadeChanged();
}
},resetPopup:function(){
this.$.confirmView.hide();
this.$.captchaView.hide();
this.$.errorView.hide();
this.$.enterView.show();
this.$.confirmButton.setActive(false);
this._quantity=1;
this._uuid=Helpers.UUID.GUID();
this._captchaToken=null;
this.$.captchaText.setValue("");
},articleFacadeChanged:function(){
this.resetPopup();
},getBidNumberValue:function(){
return "ERROR";
},getBidDisplayValue:function(){
return Formatters.formatPrice(this.getBidNumberValue(),this._currency);
},continueBidBase:function(_1,_2,_3){
this.$.confirmTitle.setContent(_1);
this.$.confirmMessage.setContent(_2);
this.$.confirmButton.setCaption(_3);
this.$.enterView.hide();
this.$.confirmView.show();
},confirmBid:function(){
this.log("placing bid");
this.placeBid(null);
},checkCaptcha:function(){
this.log("placing bid after captcha");
this.placeBid(this.$.captchaText.getValue());
},placeBid:function(_4){
enyo.scrim.showAtZIndex(1000);
this.$.confirmButton.setActive(true);
var ip=enyo.application.appdata.connectionInformation.ipAddress;
enyo.application.ebaydata.placeOffer(this._uuid,ip,this.articleFacade.article.itemId,this._bidBuyAction,this._quantity,this.getBidNumberValue(),this._currency,this._captchaToken,_4,enyo.bind(this,function(_5,_6,_7){
enyo.scrim.hideAtZIndex(1000);
this.$.confirmButton.setActive(false);
if(_6){
if(_7.isBotBlock){
this.log("IsBotBlock!!!");
this.$.captchaImage.setSrc(_7.botBlockUrl);
this._captchaToken=_7.botBlockToken;
this.$.captchaText.forceFocus();
this.$.confirmView.hide();
this.$.captchaView.show();
}else{
this.log("Place bid successful");
var _8=$L(this._placeBidSuccessfulMessage).interpolate(this.articleFacade.article);
enyo.windows.addBannerMessage(_8,"{}","enyo/images/icons/dashboard-24-color.png","notification");
this.doPlaceBidSuccessful();
}
}else{
this.log("Place bid NOT successful");
this.showError(_7.errorShortMessage,_7.errorLongMessage);
}
}));
},showError:function(_9,_a){
this.$.confirmView.hide();
this.$.captchaView.hide();
this.$.enterView.hide();
this.$.errorView.show();
this.$.errorTitle.setContent(_9?_9:$L("An error occured"));
this.$.errorMessage.setContent(_a?_a:$L("An error occured while processing your request. Please try again."));
},closeAfterError:function(){
this.doCancel("error");
}});

