enyo.kind({name:"amhd.Services",kind:"enyo.Component",components:[{name:"browserService",kind:"PalmService",service:"palm://com.palm.applicationManager/",method:"open",subscribe:false,onSuccess:"openWebsiteSuccess",onFailure:"openWebsiteFailure"},{name:"soundService",kind:"PalmService",service:"palm://com.palm.audio/systemsounds/",method:"playFeedback",subscribe:false,onSuccess:"soundSuccess",onFailure:"soundFailure"},{name:"catalogService",kind:"PalmService",service:"palm://com.palm.applicationManager/",method:"launch",subscribe:false,onSuccess:"catalogSuccess",onFailure:"catalogFailure"},],openWebsite:function(_1,_2){
this.$.browserService.call({id:"com.palm.app.browser",params:{target:_1}},{callback:_2});
},openWebsiteSuccess:function(_3,_4,_5){
this.log("openWebsiteSuccess");
_5.callback(true);
},openWebsiteFailure:function(_6,_7,_8){
this.log("openWebsiteFailure");
_8.callback(false);
},playSound:function(_9){
this.log("playing sound "+_9);
this.$.soundService.call({name:_9});
},soundSuccess:function(_a,_b,_c){
this.log("soundSuccess");
},soundFailure:function(_d,_e,_f){
this.log("soundFailure");
},playClick:function(){
this.playSound("key");
},openCatalog:function(_10){
this.log("opening catalog for ID: "+_10);
this.$.catalogService.call({id:"com.palm.app.enyo-findapps",params:{scene:"page",target:"http://developer.palm.com/appredirect/?packageid="+_10}});
},catalogSuccess:function(_11,_12,_13){
this.log("catalogSuccess");
},catalogFailure:function(_14,_15,_16){
this.log("catalogFailure");
},});

