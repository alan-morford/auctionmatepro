enyo.kind({name:"amhd.PlaceBidPopup",kind:"amhd.BidPopupBase",components:[{content:$L("Enter Your Maximum Bid"),className:"popup-title"},{name:"enterMessage",allowHtml:true,className:"popup-text popup-bottomline"},{className:"placeBidPopup-numberarea popup-bottomline",components:[{name:"bidEntered",content:"",allowHtml:true,className:"placeBidPopup-bid"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"1"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"2"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"3"},]},{kind:"HFlexBox",components:[{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"4"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"5"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"6"},]},{kind:"HFlexBox",components:[{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"7"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"8"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"9"},]},{kind:"HFlexBox",components:[{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"clearValue",caption:$L("Clear")},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"0"},{kind:"Button",flex:1,className:"placeBidPopup-numberbutton",onclick:"numButtonClick",caption:"00"},]},]},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"doCancel"},{name:"continueBidButton",kind:"Button",flex:1,caption:$L("Continue"),className:"enyo-button-affirmative",disabled:true,onclick:"continueBid"},]}],_minimumBid:0,_bidText:"0",_placeBidSuccessfulMessage:"Bid placed for #{title}.",create:function(){
this._bidBuyAction=EBayConstants.PlaceOfferActions.BID;
this.inherited(arguments);
},articleFacadeChanged:function(){
this.inherited(arguments);
this._bidText="0";
if(this.articleFacade.isUserHighBidder()){
this._minimumBid=this.articleFacade.article.maxBid+0.01;
this._currency=this.articleFacade.article.maxBidCurrency;
var _1=this.articleFacade.getMaximumBidPrice();
message=$L("Enter more than #{v} (your current maximum bid).").interpolate({v:_1});
}else{
this._minimumBid=this.articleFacade.article.minimumToBid;
this._currency=this.articleFacade.article.minimumToBidCurrency;
var _1=this.articleFacade.getMinimumToBid();
message=$L("Please enter at least the minimum bid of #{v}.").interpolate({v:_1});
}
this.$.enterMessage.setContent(message);
this.updateBid();
},getBidNumberValue:function(){
return Number(this._bidText)*0.01;
},numButtonClick:function(_2){
enyo.application.services.playClick();
var _3=_2.caption;
if(this._bidText=="0"){
this._bidText=_3;
}else{
this._bidText=this._bidText+_3;
}
this.updateBid();
},clearValue:function(){
enyo.application.services.playClick();
this._bidText="0";
this.updateBid();
},updateBid:function(){
this.$.bidEntered.setContent(this.getBidDisplayValue());
if(this.getBidNumberValue()>=this._minimumBid){
this.$.continueBidButton.setDisabled(false);
this.$.bidEntered.addClass("common-textcolor-green");
}else{
this.$.continueBidButton.setDisabled(true);
this.$.bidEntered.removeClass("common-textcolor-green");
}
},continueBid:function(){
var _4=$L("Place bid");
var _5=$L("Place Bid");
var v={displayPrice:this.getBidDisplayValue(),title:this.articleFacade.article.title};
var _6=$L("Please confirm your bid of<br/><strong>#{displayPrice}</strong><br/>on<br/><em>#{title}</em>.").interpolate(v);
this.continueBidBase(_4,_6,_5);
},});

