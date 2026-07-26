enyo.kind({name:"amhd.KeyValuePair",kind:"Control",published:{key:"",value:"",stacked:false},components:[{name:"ccc",className:"keyvaluepair-float",components:[{name:"keyComponent",content:"",className:"common-color-textlight keyvaluepair-left"},{name:"valueComponent",content:"",allowHtml:true,className:"keyvaluepair-right"}]}],create:function(){
this.inherited(arguments);
if(this.key!=null){
this.keyChanged();
}
if(this.value!=null){
this.valueChanged();
}
if(this.stacked){
this.stackedChanged();
}
},keyChanged:function(){
this.$.keyComponent.setContent(this.key);
},valueChanged:function(){
this.$.valueComponent.setContent(this.value);
},stackedChanged:function(){
this.$.ccc.addRemoveClass("keyvaluepair-stacked",this.stacked);
this.$.ccc.addRemoveClass("keyvaluepair-float",!this.stacked);
},});

