/**
 * SearchCheckboxPopup.js — generic multi-select checkbox list, reused by
 * SearchFilterPopup.js for Condition, Buying Format, and each dynamic
 * aspect row (Model/Platform/etc.). Configured fresh via configure() before
 * each open, since one instance is shared across all of those rows rather
 * than declaring a separate popup per row.
 *
 * Deliberately not built on PopupSelect/MenuCheckItem-inside-PopupSelect:
 * Sort By's sortOrderMenu (SearchResultList.js) shows PopupSelect dismisses
 * itself on the first item tap (sortOrderSelected never calls .close()),
 * which is wrong for a checkbox list that must stay open across multiple
 * taps. MenuCheckItem itself (just the row kind, not the PopupSelect
 * container) is reused directly here, manually toggled the same way
 * sortOrderSelected already does (.setChecked()), just without clearing
 * sibling checks.
 *
 * configure() (not the published title/items/selectedValues' own setters)
 * is how the owning view feeds this popup fresh content before each open -
 * confirmed on-device that going through setTitle/setItems/setSelectedValues
 * as three separate calls (three separate rebuildList() passes in the same
 * tick) produced duplicate rows in one popup and stale content from the
 * previous open in another. One atomic update avoids that entirely.
 *
 * rebuildList() destroys each existing row individually before recreating
 * on every rebuild, rather than a bulk clear-in-place call. Two things
 * confirmed on-device this session: (1) this Enyo version's
 * destroyComponents(), called on an already-rendered container to clear it
 * before repopulating, does NOT actually remove the old rendered rows -
 * reopening for a different category just appended new rows after the old
 * ones stayed on screen, growing without bound (almost certainly also why
 * the whole app eventually froze scrolling through several filter
 * categories in one session); (2) destroying and recreating the whole
 * "list" container itself, then rendering the fresh replacement, rendered
 * nothing at all - blank lists every time. What IS confirmed working is
 * createComponent()+render() called directly on the SAME persistent,
 * already-rendered "list" object (that's how new rows showed up correctly
 * in the first place, before the old-row-clearing bug was even noticed) -
 * so this destroys each old row via individual control.destroy() calls
 * (ordinary, unambiguous Enyo lifecycle, not a bulk/container-level API)
 * and keeps everything else on that same proven working path.
 */
enyo.kind({name:"amhd.SearchCheckboxPopup",kind:"VFlexBox",className:"enyo-fit",events:{onDone:""},published:{title:"",items:[],selectedValues:[]},components:[{name:"popupTitle",className:"popup-title"},{kind:"Scroller",flex:1,className:"searchfilter-checkboxlist-scroller",components:[{name:"list",kind:"VFlexBox"}]},{kind:"HFlexBox",className:"popup-bottomline",components:[{kind:"Button",flex:1,caption:$L("Cancel"),onclick:"cancelTapped"},{kind:"Button",flex:1,caption:$L("Done"),className:"enyo-button-affirmative",onclick:"doneTapped"},]}],create:function(){
this.inherited(arguments);
this.rebuildList();
},configure:function(_title,_items,_selectedValues){
this.title=_title;
this.items=_items;
this.selectedValues=_selectedValues;
this.rebuildList();
},rebuildList:function(){
this.$.popupTitle.setContent(this.title);
var _oldRows=this.$.list.controls.slice();
for(var i=0;i<_oldRows.length;i++){
_oldRows[i].destroy();
}
for(var i=0;i<this.items.length;i++){
var item=this.items[i];
var isChecked=this.selectedValues.indexOf(item.value)>=0;
this.$.list.createComponent({kind:"MenuCheckItem",caption:item.label,checked:isChecked,itemValue:item.value,onclick:"rowTapped",owner:this});
}
this.$.list.render();
},rowTapped:function(_sender){
_sender.setChecked(!_sender.checked);
},doneTapped:function(){
var selected=[];
// .controls, not .children - SearchResultList.js's own sortOrderSelected
// already establishes .controls as this Enyo version's real API for a
// control's owned child list.
var rows=this.$.list.controls;
for(var i=0;i<rows.length;i++){
if(rows[i].checked){
selected.push(rows[i].itemValue);
}
}
this.doDone({selectedValues:selected});
},cancelTapped:function(){
this.doDone({selectedValues:this.selectedValues});
},});
