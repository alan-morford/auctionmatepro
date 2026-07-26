enyo.kind({name:"amhd.ArticleCard",kind:"enyo.VFlexBox",components:[{name:"mainPane",flex:1,kind:"Pane",components:[{name:"article",kind:"amhd.ArticleInCard",onOpenImageView:"openImageView",onOpenSellerInfo:"openSellerInfo"},{name:"sellerInfoContainer",kind:"VFlexBox",lazy:true,components:[{kind:"PageHeader",className:"main-header",components:[{name:"headerSellerInfoBack",kind:"ToolButton",content:$L("Back"),onclick:"paneBack"},]},{name:"sellerInfoView",kind:"amhd.SellerInfo",flex:1},]},{name:"imageView",kind:"amhd.ImageViewer",lazy:true,onClose:"paneBack"},]},{kind:"AppMenu",scrim:true,components:[{kind:"EditMenu"},]},],create:function(_1){
this.inherited(arguments);
this.$.article.setArticle({itemId:_1.articleId});
},openSellerInfo:function(_2,_3){
this.log("opening seller info for "+_3.sellerID);
this.$.mainPane.selectViewByName("sellerInfoContainer",true);
this.$.sellerInfoView.setArticle(_3);
},openImageView:function(_4,_5,_6){
this.$.mainPane.selectViewByName("imageView",true);
this.$.imageView.setImagesAndIndex(_5,_6);
},paneBack:function(){
this.$.mainPane.back();
this.$.mainPane.getView().resized();
},openAppMenuHandler:function(){
this.$.appMenu.open();
},closeAppMenuHandler:function(){
this.$.appMenu.close();
},});

