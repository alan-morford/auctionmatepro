enyo.kind({name:"amhd.ImageViewer",kind:"Control",published:{images:null,index:0},events:{onClose:""},components:[{kind:"ImageView",flex:1,className:"imageviewer-background",onGetLeft:"getLeft",onGetRight:"getRight"},{kind:"HFlexBox",className:"imageviewer-controls",components:[{kind:"ToolButton",content:$L("Back"),onclick:"closeImageViewer"}]}],create:function(){
this.inherited(arguments);
},indexChanged:function(){
this.$.imageView.snapTo(this.index);
this.$.imageView.setCenterSrc(this.getImageUrl(this.index));
},setImagesAndIndex:function(_1,_2){
this.images=_1;
this.index=_2;
this.$.imageView.snapTo(this.index);
this.$.imageView.setCenterSrc(this.getImageUrl(this.index));
},getImageUrl:function(_3){
var n=this.images[_3];
if(n){
return n;
}
},getLeft:function(_4,_5){
_5&&this.index--;
return this.getImageUrl(this.index-1);
},getRight:function(_6,_7){
_7&&this.index++;
return this.getImageUrl(this.index+1);
},closeImageViewer:function(){
this.doClose();
}});

