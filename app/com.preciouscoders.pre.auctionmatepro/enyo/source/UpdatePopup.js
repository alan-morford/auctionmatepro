/**
 * UpdatePopup.js — "a newer version is available" popup, opened from
 * Main.js when AppData.checkForAppMuseumUpdate() (see appdata.js and
 * update.MD in the repo root) finds a newer version on App Museum II.
 *
 * configure() sets all three fields in one call rather than through
 * separate published-property setters - this session's SearchFilterPopup/
 * SearchCheckboxPopup work found that pattern unreliable on this Enyo
 * version for anything beyond the simplest single-field case, so this
 * kind avoids it from the start even though its own content is simple
 * enough that it probably wouldn't have hit the same bug.
 */
enyo.kind({name:"amhd.UpdatePopup",kind:enyo.Control,events:{onDismiss:"",onInstall:""},components:[{content:$L("Update Available"),className:"popup-title"},{name:"versionText",className:"popup-text"},{name:"noteText",allowHtml:true,className:"popup-text popup-bottomline"},{kind:"HFlexBox",components:[{kind:"Button",flex:1,caption:$L("Not Now"),onclick:"dismissTapped"},{kind:"Button",flex:1,caption:$L("Update"),className:"enyo-button-affirmative",onclick:"installTapped"},]}],_downloadUri:null,configure:function(_updateInfo){
this._downloadUri=_updateInfo.downloadUri;
this.$.versionText.setContent($L("Version #{v} is available.").interpolate({v:_updateInfo.version}));
this.$.noteText.setContent(_updateInfo.versionNote||"");
},dismissTapped:function(){
this.doDismiss();
},installTapped:function(){
this.doInstall({downloadUri:this._downloadUri});
},});
