enyo.kind({name:"amhd.About",kind:"Control",events:{onClose:"",},components:[{kind:"HFlexBox",components:[{name:"appInfoHeaderIconImage",kind:"Image",style:"margin-right: 8px; padding-top: 4px;"},{kind:"VFlexBox",flex:1,components:[{kind:"HtmlContent",name:"appInfoBodyTitle",className:""},{kind:"HtmlContent",name:"appInfoBodySubtitle",className:"enyo-item-secondary"}]}]},{kind:"RowGroup",caption:$L("Support"),components:[{kind:"HFlexBox",pack:"justify",align:"center",onclick:"openWebsite1",components:[{name:"appInfoWebsiteImage",kind:"Image",src:"enyo/images/icons/app-browser.png",style:"margin-right: 8px;"},{content:enyo._$L("Support Website"),flex:1},]},{kind:"HFlexBox",pack:"justify",align:"center",onclick:"openWebsite2",components:[{name:"appInfoWebsiteImage",kind:"Image",src:"enyo/images/icons/app-browser.png",style:"margin-right: 8px;"},{content:enyo._$L("License Agreement"),flex:1},]},{kind:"HFlexBox",pack:"justify",align:"center",onclick:"openEmail",components:[{name:"appInfoEmailImage",kind:"Image",src:"enyo/images/icons/app-email.png",style:"margin-right: 8px;"},{content:enyo._$L("Send Email"),flex:1},]}]},{kind:"HtmlContent",className:"enyo-subtext",allowHtml:true,components:[{name:"appInfoCopyrightText"}]},{kind:"Button",caption:$L("Close"),onclick:"doClose"},{kind:"HFlexBox",pack:"center",style:"padding-top: 10px",components:[{kind:"Image",src:"enyo/images/ebaycompatible-en.png"},]},{name:"service",kind:"PalmService",service:"palm://com.palm.applicationManager/",method:"open"}],create:function(){
this.inherited(arguments);
this.appInfo=enyo.fetchAppInfo();
this.$.appInfoHeaderIconImage.setSrc(this.appInfo.smallicon);
this.$.appInfoBodyTitle.setContent(this.appInfo.title);
this.$.appInfoBodySubtitle.setContent($L("version #{v}").interpolate({v:this.appInfo.version}));
this.$.appInfoCopyrightText.setContent(this.appInfo.copyright);
},openWebsite1:function(){
this.log("Opening Website");
this.$.service.call({id:"com.palm.app.browser",params:{target:this.appInfo.supporthd.resources[0].url}});
},openWebsite2:function(){
this.log("Opening Website");
this.$.service.call({id:"com.palm.app.browser",params:{target:this.appInfo.supporthd.resources[1].url}});
},openEmail:function(){
this.log("Opening Email");
this.$.service.call({id:"com.palm.app.email",params:{summary:this.appInfo.supporthd.email.subject+" v"+this.appInfo.version,recipients:[{"type":"email","role":1,"value":this.appInfo.supporthd.email.address}]}});
},});

