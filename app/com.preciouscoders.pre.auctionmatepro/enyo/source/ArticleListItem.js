enyo.kind({name:"amhd.ArticleListItem",kind:"Control",published:{article:null,listName:null},_articleFacade:null,components:[{kind:"HFlexBox",components:[{name:"imageContainer",kind:"HFlexBox",className:"articlelistitem-imagebox",align:"center",pack:"center",components:[{name:"image",kind:"Image",src:"enyo/images/dummyarticle.jpg",className:"articlelistitem-image"},]},{kind:"VFlexBox",flex:1,components:[{kind:"HFlexBox",components:[{kind:"VFlexBox",flex:1,align:"start",className:"articlelistitem-middle",components:[{name:"title",content:"",className:"articlelistitem-title"},{name:"subtitle",content:"",allowHtml:true,className:"articlelistitem-reserveNotMet"},]},{kind:"VFlexBox",align:"end",components:[{name:"price",content:"",allowHtml:true,className:"articlelistitem-price"},{name:"addData1",content:"",allowHtml:true,className:"articlelistitem-flags"},{name:"addData2",content:"",allowHtml:true,className:"articlelistitem-flags"},]},]},{kind:"Spacer"},{kind:"HFlexBox",components:[{name:"flags",flex:1,content:"",allowHtml:true,className:"articlelistitem-flags articlelistitem-middle"},{name:"timeLeft",content:"",allowHtml:true,className:"articlelistitem-timeleft"}]},]},]}],articleChanged:function(){
this._articleFacade=new amhd.Facades.ArticleFacade({article:this.article});
this.updateView();
},resetView:function(){
this.$.title.setContent("");
this.$.subtitle.setContent("");
this.$.subtitle.setClassName("articlelistitem-flags");
this.$.flags.setContent("");
this.$.timeLeft.setContent("");
this.$.price.setContent("");
this.$.price.setClassName("articlelistitem-price");
this.$.addData1.setContent("");
this.$.addData2.setContent("");
},updateView:function(){
this.resetView();
if(this._articleFacade.getTitleImageUrl()){
this.$.image.setSrc(this._articleFacade.getTitleImageUrl());
}else{
this.$.imageContainer.addClass("articlelistitem-imagebox-noimage");
this.$.image.hide();
}
this.$.title.setContent(this._articleFacade.article.title);
switch(this.listName){
case enyo.application.ebaydata.lists.WATCH:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
this.$.price.setClassName("articlelistitem-price"+this._articleFacade.getCurrentPriceColorSuffix());
if(this._articleFacade.isBuyingAvailable()){
if(this._articleFacade.isBiddingAvailable()){
this.$.addData1.setContent($L("Buy It Now")+" "+this._articleFacade.getPrice());
this.$.addData2.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}else{
this.$.addData1.setContent($L("Buy It Now"));
}
}else{
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}
if(this._articleFacade.article.quantityAvailable>1){
this.$.addData2.setContent($L("Quantity:")+" "+this._articleFacade.article.quantityAvailable);
}
this.$.subtitle.setContent(this._articleFacade.getReserveMet());
this.$.subtitle.setClassName("articlelistitem-reserveNotMet");
this.$.timeLeft.setContent(this._articleFacade.getTimeLeftShort());
this.$.flags.setContent($L("Shipping cost:")+" "+this._articleFacade.getShippingCost());
break;
case enyo.application.ebaydata.lists.BID:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
this.$.price.setClassName("articlelistitem-price"+this._articleFacade.getCurrentPriceColorSuffix());
if(this._articleFacade.isBuyingAvailable()){
if(this._articleFacade.isBiddingAvailable()){
this.$.addData1.setContent($L("BuyIt Now")+" "+this._articleFacade.getPrice());
this.$.addData2.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}else{
this.$.addData1.setContent($L("BuyIt Now"));
}
}else{
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}
this.$.subtitle.setContent(this._articleFacade.getReserveMet());
this.$.subtitle.setClassName("articlelistitem-reserveNotMet");
this.$.timeLeft.setContent(this._articleFacade.getTimeLeftShort());
break;
case enyo.application.ebaydata.lists.WON:
this.$.price.setContent(this._articleFacade.getTotalTransactionPrice());
this.$.price.setClassName("articlelistitem-price-green");
this.$.subtitle.setContent($L("Quantity:")+" "+this._articleFacade.article.quantityPurchased);
this.$.timeLeft.setContent(this._articleFacade.getTransactionTime());
break;
case enyo.application.ebaydata.lists.LOST:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
this.$.price.setClassName("articlelistitem-price-red");
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
this.$.flags.setContent(this._articleFacade.getReserveMet());
this.$.timeLeft.setContent(this._articleFacade.getEndTime());
break;
case enyo.application.ebaydata.lists.ACTIVE:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
if(this._articleFacade.isBuyingAvailable()){
if(this._articleFacade.isBiddingAvailable()){
this.$.addData1.setContent($L("BuyIt Now")+" "+this._articleFacade.getPrice());
this.$.addData2.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids"))+", "+this._articleFacade.getWatchCount()+" "+$L("watching"));
}else{
this.$.addData1.setContent($L("BuyIt Now"));
this.$.addData2.setContent(this._articleFacade.getWatchCount()+" "+$L("watching"));
}
}else{
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
this.$.addData2.setContent(this._articleFacade.getWatchCount()+" "+$L("watching"));
}
this.$.subtitle.setContent(this._articleFacade.getReserveMet());
this.$.subtitle.setClassName("articlelistitem-reserveNotMet");
this.$.flags.setContent($L("Shipping cost:")+" "+this._articleFacade.getShippingCost());
this.$.timeLeft.setContent(this._articleFacade.getTimeLeftShort());
break;
case enyo.application.ebaydata.lists.SOLD:
this.$.price.setContent(this._articleFacade.article.quantityPurchased+"x "+this._articleFacade.getCurrentPrice());
this.$.addData1.setContent(this._articleFacade.article.buyerID);
this.$.timeLeft.setContent(this._articleFacade.getTransactionTime());
break;
case enyo.application.ebaydata.lists.UNSOLD:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
if(this._articleFacade.isBuyingAvailable()){
if(this._articleFacade.isBiddingAvailable()){
this.$.addData1.setContent($L("BuyIt Now")+" "+this._articleFacade.getPrice());
this.$.addData2.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids"))+", "+this._articleFacade.getWatchCount()+" "+$L("watching"));
}else{
this.$.addData1.setContent($L("BuyIt Now"));
this.$.addData2.setContent(this._articleFacade.getWatchCount()+" "+$L("watching"));
}
}else{
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
this.$.addData2.setContent(this._articleFacade.getWatchCount()+" "+$L("watching"));
}
this.$.subtitle.setContent(this._articleFacade.getReserveMet());
this.$.subtitle.setClassName("articlelistitem-reserveNotMet");
this.$.flags.setContent($L("Shipping cost:")+" "+this._articleFacade.getShippingCost());
this.$.timeLeft.setContent(this._articleFacade.getTimeLeftShort());
break;
case enyo.application.ebaydata.searchList:
this.$.price.setContent(this._articleFacade.getCurrentPrice());
if(this._articleFacade.isBuyingAvailable()){
if(this._articleFacade.isBiddingAvailable()){
this.$.addData1.setContent($L("BuyIt Now")+" "+this._articleFacade.getPrice());
this.$.addData2.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}else{
this.$.addData1.setContent($L("BuyIt Now"));
}
}else{
this.$.addData1.setContent(this._articleFacade.article.bidCount+" "+(this._articleFacade.article.bidCount==1?$L("bid"):$L("bids")));
}
if(this._articleFacade.article.quantityAvailable>1){
this.$.addData2.setContent($L("Quantity:")+" "+this._articleFacade.article.quantityAvailable);
}
this.$.timeLeft.setContent(this._articleFacade.getTimeLeftShort());
this.$.flags.setContent($L("Shipping cost:")+" "+this._articleFacade.getShippingCost());
break;
default:
break;
}
},});

