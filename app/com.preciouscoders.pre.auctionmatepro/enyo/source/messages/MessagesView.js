enyo.kind({name:"amhd.MessagesView",kind:"enyo.VFlexBox",components:[{kind:"VFlexBox",className:"enyo-fit",components:[{kind:"Spacer"},{className:"footer-shadow"},{kind:"Toolbar"}]},{name:"slidingPane",kind:"SlidingPane",flex:1,components:[{name:"left",width:"240px",components:[{name:"folders",kind:"amhd.MessageFolders",flex:1,onFolderSelected:"folderSelected"}]},{name:"middle",width:"400px",dragAnywhere:false,components:[{name:"messages",kind:"amhd.MessageList",flex:1,onMessageSelected:"messageSelected"}]},{name:"right",flex:1,dragAnywhere:false,components:[{name:"message",kind:"amhd.Message",flex:1,onMessageStatusChanged:"messageStatusChanged",onMessageDeleted:"messageDeleted"}]}]}],reload:function(){
this.$.folders.reload();
},folderSelected:function(_1,_2){
this.$.messages.setFolder(_2);
},messageSelected:function(_3,_4,_5){
this.$.message.setFolder(_5);
this.$.message.setMessage(_4);
this.$.folders.updateFolder(_5);
},messageStatusChanged:function(_6,_7){
this.$.folders.reload();
this.$.messages.reload();
},messageDeleted:function(_8,_9){
this.log("messageDeleted called");
this.$.message.emptyMessage();
this.$.messages.resetSelection();
this.$.folders.reload();
this.$.messages.reload();
}});

