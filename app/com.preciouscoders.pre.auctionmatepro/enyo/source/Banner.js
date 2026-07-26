enyo.kind({name:"amhd.Banner",kind:"Control",components:[{kind:"HFlexBox",components:[{name:"bannerImage",kind:"Image",className:"banner-image",onclick:"bannerClick"}]},],create:function(){
this.inherited(arguments);
if(!enyo.application.appdata.updateAndBannerInformation){
enyo.application.appdata.registerAppEvent("UpdateInformation",enyo.bind(this,this.updateBanner));
}else{
this.updateBanner();
}
},updateBanner:function(){
var _1=enyo.application.appdata.updateAndBannerInformation.banner;
if(_1){
this.$.bannerImage.setSrc(_1);
}
},bannerClick:function(){
enyo.application.services.openCatalog("com.preciouscoders.pre.auctionmatepro");
}});

