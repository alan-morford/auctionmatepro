enyo.kind({name:"amhd.SellerInfo",kind:"enyo.VFlexBox",events:{onOpenImageView:"",onClose:""},published:{article:null},className:"common-anchor",components:[{kind:"HFlexBox",flex:1,components:[{kind:"VFlexBox",className:"sellerinfo-leftcolumn common-columnrightborder common-anchor",components:[{kind:"Header",components:[{kind:"HFlexBox",components:[{kind:"Image",src:"enyo/images/sellerinfo/seller.png",className:"sellerinfo-sellericon"},{kind:"VFlexBox",flex:1,components:[{name:"sellerId"},{kind:"HFlexBox",align:"center",pack:"start",components:[{name:"sellerRating",className:"sellerinfo-sellerrating"},]},]},]},]},{className:"header-shadow"},{kind:"Scroller",flex:1,autoHorizontal:false,horizontal:false,components:[{kind:"RowGroup",caption:$L("Recent Feedback Ratings"),components:[{kind:"amhd.Table",className:"sellerinfo-table",components:[{components:[{content:""},{content:$L("1 month"),kind:"amhd.HeaderCell"},{content:$L("6 months"),kind:"amhd.HeaderCell"},{content:$L("12 months"),kind:"amhd.HeaderCell"},]},{components:[{content:$L("Positive")},{name:"positive_1",content:""},{name:"positive_6",content:""},{name:"positive_12",content:""},]},{components:[{content:$L("Neutral")},{name:"neutral_1",content:""},{name:"neutral_6",content:""},{name:"neutral_12",content:""},]},{components:[{content:$L("Negative")},{name:"negative_1",content:""},{name:"negative_6",content:""},{name:"negative_12",content:""},]},]},]},{kind:"RowGroup",caption:$L("Detailed Seller Ratings"),components:[{kind:"amhd.Table",className:"sellerinfo-table",components:[{components:[{content:$L("Criteria"),kind:"amhd.HeaderCell",className:"sellerinfo-ratingtext"},{content:$L("Average<br/>rating"),allowHtml:true,kind:"amhd.HeaderCell"},{content:$L("Num.<br/>ratings"),allowHtml:true,kind:"amhd.HeaderCell"},]},{components:[{content:$L("Item as described"),className:"sellerinfo-ratingtext"},{components:[{name:"stars_1",kind:"amhd.SellerInfoStars"}]},{name:"numratings_1",content:""},]},{components:[{content:$L("Communication"),className:"sellerinfo-ratingtext"},{components:[{name:"stars_2",kind:"amhd.SellerInfoStars"}]},{name:"numratings_2",content:""},]},{components:[{content:$L("Shipping time"),className:"sellerinfo-ratingtext"},{components:[{name:"stars_3",kind:"amhd.SellerInfoStars"}]},{name:"numratings_3",content:""},]},{components:[{content:$L("Shipping and handling charges"),className:"sellerinfo-ratingtext"},{components:[{name:"stars_4",kind:"amhd.SellerInfoStars"}]},{name:"numratings_4",content:""},]},]},]},]},]},{className:"right-shadow"},{kind:"VFlexBox",flex:1,className:"common-anchor",components:[{kind:"Header",content:$L("Comments")},{className:"header-shadow"},{name:"commentList",kind:"VirtualList",flex:1,onSetupRow:"setupListItem",onAcquirePage:"acquirePage",pageSize:25,lookAhead:2,components:[{name:"commentItem",kind:"Item",tapHighlight:false,layoutKind:"VFlexLayout",className:"sellerinfo-comment",components:[{kind:"HFlexBox",align:"center",components:[{name:"commentItemComment",flex:1,className:"sellerinfo-comment-text"},{name:"commentItemType",kind:"Image",className:"sellerinfo-comment-type"},]},{kind:"HFlexBox",components:[{name:"commentItemUser",className:"sellerinfo-comment-subtext"},{kind:"Spacer"},{name:"commentItemDate",className:"sellerinfo-comment-subtext"},]},]},{name:"commentListShortEnd",content:$L("Connect your eBay account to see all comments."),className:"sellerinfo-comment-listend"},]},]},]},{name:"scrim",kind:"HFlexBox",pack:"center",align:"center",showing:false,className:"common-scrim common-partialscrim common-scrimhigh",components:[{name:"spinner",kind:"SpinnerLarge"},]},],PAGESIZE:25,_seller:null,_articleFacade:null,create:function(){
this.inherited(arguments);
if(this.article!=null){
this.articleChanged();
}
},articleChanged:function(){
this.$.scrim.show();
this.$.spinner.show();
this._articleFacade=new amhd.Facades.ArticleFacade({article:this.article});
this._seller=null;
this.$.sellerId.setContent(this._articleFacade.article.sellerID);
this.$.sellerRating.setContent(this._articleFacade.getSellerRating());
this.updateView();
enyo.application.ebaydata.getUserProfile(this._articleFacade.article.sellerID,0,50,enyo.bind(this,function(_1,_2){
if(this._articleFacade.article.sellerID==_2.userId){
this._seller=_2;
this.log(this._seller);
this.updateView();
this.$.scrim.hide();
this.$.spinner.hide();
}
}));
},updateView:function(){
this.setNonNull(this.$.positive_1,"positiveFeedback1Month");
this.setNonNull(this.$.positive_6,"positiveFeedback6Month");
this.setNonNull(this.$.positive_12,"positiveFeedback12Month");
this.setNonNull(this.$.neutral_1,"neutralFeedback1Month");
this.setNonNull(this.$.neutral_6,"neutralFeedback6Month");
this.setNonNull(this.$.neutral_12,"neutralFeedback12Month");
this.setNonNull(this.$.negative_1,"negativeFeedback1Month");
this.setNonNull(this.$.negative_6,"negativeFeedback6Month");
this.setNonNull(this.$.negative_12,"negativeFeedback12Month");
this.setRating(this.$.stars_1,this.$.numratings_1,"averageRatingItemAsDescribed","averageRatingCountItemAsDescribed");
this.setRating(this.$.stars_2,this.$.numratings_2,"averageRatingCommunication","averageRatingCountCommunication");
this.setRating(this.$.stars_3,this.$.numratings_3,"averageRatingShippingTime","averageRatingCountShippingTime");
this.setRating(this.$.stars_4,this.$.numratings_4,"averageRatingShippingAndHandlingCharges","averageRatingCountShippingAndHandlingCharges");
this.$.commentList.refresh();
},setNonNull:function(_3,_4){
if(this._seller&&_4&&(this._seller[_4]||this._seller[_4]==0)){
_3.setContent(this._seller[_4]);
}else{
_3.setContent("");
}
},setRating:function(_5,_6,_7,_8){
if(this._seller&&_7&&_8){
if(!this._seller[_8]||this._seller[_8]==0){
_5.setRating(-1);
_6.setContent("");
}else{
if(this._seller[_7]||this._seller[_7]==0){
_5.setRating(this._seller[_7]);
}else{
_5.setRating(-1);
}
_6.setContent(this._seller[_8]);
}
}else{
_5.setRating(-1);
_6.setContent("");
}
},setupListItem:function(_9,_a){
if(!this._seller){
return;
}
var _b=this._seller.comments[_a];
if(_b){
this.log("creating list item no "+_a);
this.$.commentItem.canGenerate=true;
this.$.commentListShortEnd.canGenerate=false;
var _c=(_b.userRole=="Seller")?$L("from buyer:"):$L("from seller:");
_c+=" "+_b.commentingUser;
this.$.commentItemComment.setContent(_b.commentText);
this.$.commentItemUser.setContent(_c);
this.$.commentItemDate.setContent(Formatters.formatDate(_b.commentTime));
this.$.commentItemType.setClassName("sellerinfo-comment-type sellerinfo-comment-type-"+_b.commentType);
return true;
}else{
if(!enyo.application.preferences.getUserConnected()&&this._seller.count==_a){
this.$.commentItem.canGenerate=false;
this.$.commentListShortEnd.canGenerate=true;
return true;
}
}
},acquirePage:function(_d,_e){
if(!this._articleFacade){
return false;
}
this.log("acquiring page no "+_e);
if(_e>=0){
var _f=_e*this.PAGESIZE;
if(this._seller&&this._seller.comments[_f]&&this._seller.comments[_f+this.PAGESIZE]){
return true;
}
enyo.application.ebaydata.getUserProfile(this._articleFacade.article.sellerID,_f,this.PAGESIZE,enyo.bind(this,function(_10,_11){
this.log("got another page");
if(this._articleFacade.article.sellerID==_11.userId){
enyo.mixin(this._seller,_11);
this.log(this._seller);
enyo.nextTick(enyo.bind(this,function(){
this.$.commentList.refresh();
}));
}
}));
return true;
}
return false;
},});
enyo.kind({name:"amhd.SellerInfoStars",kind:"enyo.HFlexBox",published:{rating:-1},className:"sellerinfo-rating",components:[{name:"star1",kind:"Image",className:"sellerinfo-rating-none"},{name:"star2",kind:"Image",className:"sellerinfo-rating-none"},{name:"star3",kind:"Image",className:"sellerinfo-rating-none"},{name:"star4",kind:"Image",className:"sellerinfo-rating-none"},{name:"star5",kind:"Image",className:"sellerinfo-rating-none"},],create:function(){
this.inherited(arguments);
this.ratingChanged();
},ratingChanged:function(){
var _12;
for(var i=0;i<5;i++){
var _13=this.$["star"+(i+1)];
if(this.rating==-1){
_12="none";
}else{
if(this.rating>=i+1){
_12=100;
}else{
if(this.rating<=i){
_12=0;
}else{
var _14=this.rating-i;
_14=_14.toFixed(1);
_12=_14*100;
}
}
}
_13.setClassName("sellerinfo-rating-"+_12);
}
},});

