enyo.kind({name:"amhd.ExpiredMessage",kind:"VFlexBox",align:"center",pack:"center",components:[{content:$L("This version of AuctionMate has expired. Please go to the app catalog to obtain the current version."),style:"margin-bottom: 25px"},{caption:$L("Download AuctionMate Pro for eBay"),kind:"Button",className:"enyo-button-affirmative",onclick:"betaInfoDialogDownloadPro"},],betaInfoDialogDownloadPro:function(){
enyo.application.services.openCatalog("com.preciouscoders.pre.auctionmatepro");
},betaInfoDialogDownloadFree:function(){
enyo.application.services.openCatalog("com.preciouscoders.pre.auctionmate");
},});

