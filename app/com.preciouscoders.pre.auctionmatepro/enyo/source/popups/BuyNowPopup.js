enyo.kind({name:"amhd.BuyNowPopup",kind:"amhd.BidPopupBase",components:[{content:$L("Select quantity"),className:"popup-title"},{name:"enterMessage",allowHtml:true,className:"popup-text popup-bottomline"},{name:"quantitySelector",kind:"ListSelector",label:$L("Quantity"),className:"buynowpopup-quantityselector popup-bottomline",onSelect:"quantitySelected"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"doCancel"},{name:"continueBidButton",kind:"Button",flex:1,caption:$L("Continue"),className:"enyo-button-affirmative",disabled:false,onclick:"continueBid"},]}],_amount:0,_placeBidSuccessfulMessage:"You bought #{title}.",create:function(){
this._bidBuyAction=EBayConstants.PlaceOfferActions.PURCHASE;
this.inherited(arguments);
},articleFacadeChanged:function(){
this.inherited(arguments);
this._amount=this.articleFacade.getBuyNowAmount();
this._currency=this.articleFacade.getBuyNowCurrency();
var _1=Math.min(this.articleFacade.getQuantityAvailable(),10);
var _2=[];
for(var i=1;i<=_1;i++){
_2.push({caption:i,value:i});
}
this.$.quantitySelector.setItems(_2);
this.$.quantitySelector.setValue(this._quantity);
var _3=$L("Please select the number of items to buy for #{v} each.").interpolate({v:this.articleFacade.getPrice()});
this.$.enterMessage.setContent(_3);
},getBidNumberValue:function(){
return Number(this._amount);
},quantitySelected:function(){
this._quantity=this.$.quantitySelector.getValue();
},continueBid:function(){
var _4=$L("Buy now");
var _5=$L("Buy Now");
var v={quantity:this._quantity,displayPrice:this.getBidDisplayValue(),title:this.articleFacade.article.title};
var _6=$L("Please confirm to buy <strong>#{quantity}</strong> item(s) of<br/><em>#{title}</em><br/>for <strong>#{displayPrice}</strong> each.").interpolate(v);
this.continueBidBase(_4,_6,_5);
},});

