enyo.kind({name:"amhd.AddToCalendarPopup",kind:enyo.Control,events:{onClose:""},published:{articleFacade:null,},components:[{name:"defaultView",components:[{content:$L("Add to calendar"),className:"popup-title"},{name:"message",allowHtml:true,className:"popup-text popup-bottomline"},{name:"reminderSelector",kind:"ListSelector",label:$L("Reminder"),className:"popup-bottomline"},{kind:"Button",caption:$L("Add to Calendar"),className:"enyo-button-affirmative",onclick:"addToCalendar"},{kind:"Button",caption:$L("Cancel"),onclick:"doClose"},]},{name:"errorView",showing:false,components:[{content:$L("An error occured"),allowHtml:true,className:"popup-title"},{content:$L("An error occured while creating the calendar event. Please try again or contact the support."),allowHtml:true,className:"popup-text popup-bottomline"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Close"),onclick:"doClose"},]}]},{name:"calendarService",kind:"PalmService",service:"palm://com.palm.applicationManager/",method:"open",onSuccess:"calendarServiceSuccess",onFailure:"calendarServiceFailure"},],create:function(){
this.inherited(arguments);
this.$.reminderSelector.setItems([{caption:$L("#{min} minutes").interpolate({min:5}),value:"-PT5M"},{caption:$L("#{min} minutes").interpolate({min:10}),value:"-PT10M"},{caption:$L("#{min} minutes").interpolate({min:15}),value:"-PT15M"},{caption:$L("#{min} minutes").interpolate({min:30}),value:"-PT30M"},{caption:$L("#{min} minutes").interpolate({min:60}),value:"-PT1H"},{caption:$L("No reminder"),value:false},]);
this.$.reminderSelector.setValue("-PT10M");
this.resetPopup();
if(this.articleFacade!=null){
this.articleFacadeChanged();
}
},resetPopup:function(){
this.$.defaultView.show();
this.$.errorView.hide();
},articleFacadeChanged:function(){
this.$.message.setContent($L("Do you want to add the article <br/><b><em>#{v}</em></b><br/> to your calendar?").interpolate({v:this.articleFacade.article.title}));
this.resetPopup();
},addToCalendar:function(){
var _1=$L("eBay: #{title} #{nl}Ends: #{ends} #{nl}#{url} #{nl}(created by AuctionMate Pro for eBay)").interpolate({nl:Helpers.NEWLINE+Helpers.NEWLINE,title:this.articleFacade.article.title,ends:this.articleFacade.getEndTime(),url:this.articleFacade.article.detailPageUrl});
var _2=this.articleFacade.article.endTime.getTime();
var _3=[];
if(this.$.reminderSelector.getValue()){
_3=[{alarmTrigger:{valueType:"DURATION",value:this.$.reminderSelector.getValue()}}];
}
var _4={subject:$L("eBay: #{title}").interpolate({title:this.articleFacade.article.title}),dtstart:_2.toString(),dtend:_2.toString(),note:_1,alarm:_3,location:"AuctionMate Pro"};
this.log(_4);
this.$.calendarService.call({id:"com.palm.app.calendar",params:{newEvent:_4}});
},calendarServiceSuccess:function(){
this.log("add to calendar successful");
this.doClose();
},calendarServiceFailure:function(){
this.log("add to calendar not successful");
this.$.defaultView.hide();
this.$.errorView.show();
}});

