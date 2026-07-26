enyo.kind({name:"Admob",kind:"Component",published:{options:"",displayed:false},events:{onFailure:"",onSuccess:""},components:[{name:"webServ",kind:"WebService",onSuccess:"requestOnSuccess",onFailure:"requestOnFailure"},],create:function(){
this.inherited(arguments);
this.admob_url="http://r.admob.com/ad_source.php";
this.pub_id="",this.bg_color="",this.text_color="",this.udid="",this.ipAddress="",this.test_mode=true,this.tiles=["chat","affilateoffers","contests","generic","healthfitness","toolsutilities","portal2"];
this.armor="clear:none;outline:none;margin:0;border:none;";
this.cpc_template=new enyo.g11n.Template(["<div style=\"float: left\"><img src=\"http://mm.admob.com/static/pre/img/#{tile}.png\"></div>","<div style=\"float: left; padding: 3px 5px; height: 30px; width: 230px; color: ##{text_color}; overflow: hidden\">","<div style=\"line-height: 17px; font: bold 12px helvetica;\">#{text}</div>","<div style=\"padding-top: 5px; width: 100%; text-align: right;line-height: 13px; font: normal 9.5px helvetica;\">Ads by AdMob</div>","</div>","<div style=\"float: left; padding: 5px 0\"><img class=\"_AdMobAction\" src=\"http://mm.admob.com/static/pre/img/action_web.png\"></div>","<div style=\"clear: both\"></div>"].join(""));
this.cpm_template=new enyo.g11n.Template(["<div style=\"padding: 0; margin: 0; background: url(#{banner}); width: 320px; height: 48px;\">&nbsp;","<img style=\"display:none\" src=\"#{tracking_pixel}\"><img style=\"display: none\" src=\"#{cpm_url}\">","<div style=\"clear: both\"></div></div>"].join(""));
},optionsChanged:function(){
this.initialize();
},initialize:function(){
this.log("initialize called");
this.pub_id=this.options.pub_id;
if(this.pub_id==null){
this.log("AdMob Publisher ID required.");
return;
}
this.ipAddress=this.options.ipAddress;
this.udid=this.options.udid;
this.test_mode=this.options.test_mode;
this.bg_color=this.options.bg_color||"#fff";
this.text_color=this.options.text_color||"#000";
},request:function(_1){
this.log("AdMob Ad Request Pub Id: ",this.pub_id);
var _2={s:this.pub_id,u:navigator.userAgent,i:this.ipAddress,o:this.udid,v:"20091118-WEBOSSDK-3cd2b53620088ef8",f:"jsonp"};
if(this.test_mode){
_2.m="test";
}
var _3=this.admob_url+"?"+enyo.objectToQuery(_2);
this.log("admob url: "+_3);
this.$.webServ.setUrl(_3);
this.$.webServ.call();
},requestOnSuccess:function(_4,_5){
enyo.log("Success");
var ad=_5;
var _6=ad.url;
var _7=this.armor+"width: 320px; height: 48px; padding: 4px; background-color: "+this.bg_color;
var _8=null;
if(!ad[20]&&ad.banner){
_8=this.cpm_template.evaluate(ad);
}else{
_8=this.cpc_template.evaluate({bg_color:this.bg_color,text_color:this.text_color,text:ad.text,url:ad.url,tile:this.tiles[Math.floor(Math.random()*this.tiles.length)]});
}
this.doSuccess(_8,_7,_6);
},requestOnFailure:function(_9,_a){
this.log("requestOnFailure called");
this.log(_a);
},displayedChanged:function(){
this.request(this.options);
}});

