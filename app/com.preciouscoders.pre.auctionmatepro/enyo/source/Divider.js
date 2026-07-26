enyo.kind({name:"amhd.Divider",kind:"Control",className:"enyo-item divider-main",published:{caption:"Divider"},chrome:[{name:"caption",className:"divider-caption"},],create:function(){
this.inherited(arguments);
this.captionChanged();
},captionChanged:function(){
this.$.caption.setContent(this.caption);
}});

