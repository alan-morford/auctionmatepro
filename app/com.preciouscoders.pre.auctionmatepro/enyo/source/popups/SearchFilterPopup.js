/**
 * SearchFilterPopup.js — search filter list, opened from the "Filter" button
 * next to "Sort By" in SearchResultList.js.
 *
 * Mirrors eBay's own app filter set (per the user's live test searching
 * "NES" on the eBay Android app): fixed filters (Category/Condition/Price/
 * Buying Format/Location/Shipping/Returns Accepted/Business Seller) plus
 * dynamic, search-dependent aspect facets (Platform/Model/etc, from
 * EBayBrowseLib's aspectRefinements - absent entirely for an unrelated
 * search like "socks"). "Completed items"/"sold items" are deliberately not
 * offered - Browse API is active-listings-only, no eBay app can query
 * completed/sold listings anymore since Finding API's decommission.
 *
 * Edits build up in _workingFilters (a clone of the filters this popup was
 * opened with) until Apply is tapped, so Cancel can discard changes
 * cleanly. Condition/Buying Format/each aspect row share one
 * amhd.SearchCheckboxPopup instance - but that Popup is deliberately NOT
 * declared here nested inside this popup's own content: SearchResultList.js
 * (the owning view) declares it as a sibling of this popup's own Popup
 * wrapper, same as the Article.js convention of every popup wrapper living
 * in the view that triggers it. A Popup-inside-a-Popup's content tree threw
 * framework-level "setTimeout is not defined"/"Illegal invocation" errors
 * from deep inside Enyo's own build the moment this filter popup opened
 * (confirmed live on-device) - this old Enyo Popup implementation doesn't
 * tolerate that nesting. openConditionPopup/openBuyingFormatPopup/
 * openAspectPopup fire onOpenCheckboxPopup, which SearchResultList.js
 * catches to configure and open its own checkboxPopup; the result comes
 * back via SearchResultList.js calling checkboxDone directly (a plain
 * method call, not an Enyo event - this control has no owned checkbox
 * popup to receive an onDone event from anymore).
 */
enyo.kind({name:"amhd.SearchFilterPopup",kind:"VFlexBox",className:"enyo-fit",events:{onApply:"",onCancel:"",onOpenCheckboxPopup:""},published:{filters:null,aspectRefinements:[]},components:[{kind:"PageHeader",pack:"center",components:[{kind:"Button",content:$L("Cancel"),onclick:"cancelTapped",className:"common-headerbutton"},{content:$L("Filter Search"),flex:1,className:"common-headercentered"}]},{kind:"Scroller",flex:1,className:"searchfilter-scroller",components:[{kind:"HFlexBox",components:[{kind:"Spacer"},{kind:"VFlexBox",className:"preferences-content",components:[{kind:"RowGroup",caption:$L("Category"),components:[{name:"categorySelector",kind:"ListSelector",label:$L("Category"),onSelect:"categorySelected"},{name:"categoryLoginNotice",content:$L("Log in to filter by category."),className:"preferences-smalltext",showing:false},]},{kind:"RowGroup",caption:$L("Condition"),components:[{name:"conditionRow",kind:"Button",content:$L("Any condition"),onclick:"openConditionPopup"},]},{kind:"RowGroup",caption:$L("Buying Format"),components:[{name:"buyingFormatRow",kind:"Button",content:$L("Any format"),onclick:"openBuyingFormatPopup"},]},{kind:"RowGroup",caption:$L("Price"),components:[{kind:"HFlexBox",align:"center",components:[{name:"minPriceInput",kind:"Input",flex:1,hint:$L("Min"),className:"searchfilter-priceinput"},{content:$L("to"),className:"searchfilter-pricetolabel"},{name:"maxPriceInput",kind:"Input",flex:1,hint:$L("Max"),className:"searchfilter-priceinput"},]},]},{kind:"RowGroup",caption:$L("Location"),components:[{name:"locationSelector",kind:"ListSelector",label:$L("Location"),onSelect:"locationSelected"},]},{kind:"RowGroup",caption:$L("Shipping"),components:[{kind:"HFlexBox",align:"center",components:[{content:$L("Free shipping only"),flex:1},{name:"freeShippingToggle",kind:"ToggleButton",onLabel:$L("On"),offLabel:$L("Off"),onChange:"freeShippingToggled"},]},{name:"maxShippingRow",kind:"HFlexBox",align:"center",components:[{content:$L("Max shipping cost"),flex:1},{name:"maxShippingInput",kind:"Input",hint:$L("Any"),className:"searchfilter-priceinput"},]},]},{kind:"RowGroup",caption:$L("Seller"),components:[{kind:"HFlexBox",align:"center",components:[{content:$L("Returns accepted"),flex:1},{name:"returnsAcceptedToggle",kind:"ToggleButton",onLabel:$L("On"),offLabel:$L("Off")},]},{kind:"HFlexBox",align:"center",components:[{content:$L("Business sellers only"),flex:1},{name:"businessSellerToggle",kind:"ToggleButton",onLabel:$L("On"),offLabel:$L("Off")},]},]},{name:"aspectRowsGroup",kind:"VFlexBox",components:[]},]},{kind:"Spacer"},]},]},{kind:"HFlexBox",className:"popup-bottomline searchfilter-actions",components:[{kind:"Button",flex:1,caption:$L("Clear All"),onclick:"clearAllTapped"},{kind:"Button",flex:1,caption:$L("Apply"),className:"enyo-button-affirmative",onclick:"applyTapped"},]},],_workingFilters:{},_activeCheckboxTarget:null,create:function(){
this.inherited(arguments);
this.$.locationSelector.setItems(this.buildLocationItems());
this.loadCategories();
this.configure(this.filters,this.aspectRefinements);
// configure() (one atomic update) is how SearchResultList.js's
// openFilterPopup feeds this popup fresh state before each open - going
// through setFilters/setAspectRefinements as two separate calls had the
// same class of duplicate/stale-row bug this file's sibling
// SearchCheckboxPopup.js hit and fixed the same way.
},configure:function(_filters,_aspectRefinements){
this._workingFilters=this.cloneFilters(_filters);
this.aspectRefinements=_aspectRefinements||[];
this.refreshRowSummaries();
},cloneFilters:function(_filters){
try{
return enyo.json.parse(enyo.json.stringify(_filters||{}));
}
catch(e){
return {};
}
},loadCategories:function(){
if(!enyo.application.preferences.getUserConnected()){
this.$.categorySelector.hide();
this.$.categoryLoginNotice.show();
return;
}
this.$.categorySelector.show();
this.$.categoryLoginNotice.hide();
EBayTaxonomyLib.getCategories(enyo.application.ebaydata.data.user.locale,enyo.bind(this,function(_success,_result){
if(_success&&_result.categories){
var _items=[{caption:$L("Any category"),value:undefined}];
for(var i=0;i<_result.categories.length;i++){
_items.push({caption:_result.categories[i].categoryName,value:_result.categories[i].categoryId});
}
this.$.categorySelector.setItems(_items);
this.$.categorySelector.setValue(this._workingFilters.category);
}
}));
},buildLocationItems:function(){
var _items=[{caption:$L("Any location"),value:undefined}];
for(var i=0;i<EBayConstants.LocationCountries.length;i++){
_items.push({caption:EBayConstants.LocationCountries[i].label,value:EBayConstants.LocationCountries[i].code});
}
return _items;
},categorySelected:function(){
this._workingFilters.category=this.$.categorySelector.getValue();
},locationSelected:function(){
this._workingFilters.itemLocationCountry=this.$.locationSelector.getValue();
},freeShippingToggled:function(){
this.$.maxShippingRow.setShowing(!this.$.freeShippingToggle.getState());
},openConditionPopup:function(){
this._activeCheckboxTarget="conditions";
var _items=[];
for(var i=0;i<EBayConstants.Conditions.length;i++){
_items.push({value:EBayConstants.Conditions[i].id,label:EBayConstants.Conditions[i].label});
}
this.doOpenCheckboxPopup({title:$L("Condition"),items:_items,selectedValues:this._workingFilters.conditions||[]});
},openBuyingFormatPopup:function(){
this._activeCheckboxTarget="buyingFormat";
var _items=[{value:"AUCTION",label:$L("Auction")},{value:"FIXED_PRICE",label:$L("Buy It Now")}];
this.doOpenCheckboxPopup({title:$L("Buying Format"),items:_items,selectedValues:this._workingFilters.buyingFormats||[]});
},rebuildAspectRows:function(){
// Destroys each existing row individually rather than a bulk clear - see
// SearchCheckboxPopup.js's rebuildList() for the full story (this Enyo
// version's destroyComponents() didn't remove old rows at all, and
// destroying+recreating the whole container rendered blank).
var _oldRows=this.$.aspectRowsGroup.controls.slice();
for(var i=0;i<_oldRows.length;i++){
_oldRows[i].destroy();
}
for(var i=0;i<this.aspectRefinements.length;i++){
var _aspect=this.aspectRefinements[i];
this.$.aspectRowsGroup.createComponent({kind:"RowGroup",caption:_aspect.aspectName,components:[{kind:"Button",content:this.aspectRowSummary(_aspect.aspectName),aspectName:_aspect.aspectName,onclick:"openAspectPopup",owner:this}]});
}
this.$.aspectRowsGroup.render();
},aspectRowSummary:function(_aspectName){
var _selected=this._workingFilters.aspectFilters&&this._workingFilters.aspectFilters.selections&&this._workingFilters.aspectFilters.selections[_aspectName];
if(_selected&&_selected.length>0){
return _selected.join(", ");
}
return $L("Any");
},findAspect:function(_aspectName){
for(var i=0;i<this.aspectRefinements.length;i++){
if(this.aspectRefinements[i].aspectName==_aspectName){
return this.aspectRefinements[i];
}
}
return undefined;
},openAspectPopup:function(_sender){
var _aspect=this.findAspect(_sender.aspectName);
if(!_aspect){
return;
}
this._activeCheckboxTarget=_aspect.aspectName;
var _items=[];
for(var i=0;i<_aspect.values.length;i++){
var _v=_aspect.values[i];
_items.push({value:_v.value,label:(_v.matchCount!=undefined)?(_v.value+" ("+_v.matchCount+")"):_v.value});
}
var _selections=this._workingFilters.aspectFilters&&this._workingFilters.aspectFilters.selections;
this._activeAspectCategoryId=_aspect.dominantCategoryId;
this.doOpenCheckboxPopup({title:_aspect.aspectName,items:_items,selectedValues:(_selections&&_selections[_aspect.aspectName])||[]});
},checkboxDone:function(_selectedValues){
if(this._activeCheckboxTarget=="conditions"){
this._workingFilters.conditions=_selectedValues;
this.$.conditionRow.setContent(_selectedValues.length>0?_selectedValues.length+" "+$L("selected"):$L("Any condition"));
}else{
if(this._activeCheckboxTarget=="buyingFormat"){
this._workingFilters.buyingFormats=_selectedValues;
// Browse API's single listingType filter can't express "either" - only
// set it when exactly one format is chosen, matching the one dimension
// _buildFilterParam already understands.
if(_selectedValues.length==1){
this._workingFilters.listingType=(_selectedValues[0]=="AUCTION")?EBayConstants.ListingTypes.CHINESE:EBayConstants.ListingTypes.FIXED_PRICE_ITEM;
}else{
this._workingFilters.listingType=undefined;
}
this.$.buyingFormatRow.setContent(_selectedValues.length>0?_selectedValues.length+" "+$L("selected"):$L("Any format"));
}else{
this.applyAspectSelection(this._activeCheckboxTarget,_selectedValues);
}
}
},applyAspectSelection:function(_aspectName,_selectedValues){
if(!this._workingFilters.aspectFilters){
this._workingFilters.aspectFilters={categoryId:this._activeAspectCategoryId,selections:{}};
}
// aspect_filter only reliably scopes to one category context (see
// EBayBrowseLib._buildAspectFilterParam) - picking a non-empty value from
// a different aspect group's dominantCategoryId starts a fresh group
// instead of mixing categories in one request.
if(_selectedValues.length>0&&this._workingFilters.aspectFilters.categoryId!=this._activeAspectCategoryId){
this._workingFilters.aspectFilters={categoryId:this._activeAspectCategoryId,selections:{}};
}
if(_selectedValues.length>0){
this._workingFilters.aspectFilters.selections[_aspectName]=_selectedValues;
}else{
delete this._workingFilters.aspectFilters.selections[_aspectName];
}
var _hasAnySelection=false;
for(var _k in this._workingFilters.aspectFilters.selections){
_hasAnySelection=true;
}
if(!_hasAnySelection){
this._workingFilters.aspectFilters=undefined;
}
this.rebuildAspectRows();
},refreshRowSummaries:function(){
this.$.categorySelector.setValue(this._workingFilters.category);
this.$.locationSelector.setValue(this._workingFilters.itemLocationCountry);
this.$.conditionRow.setContent((this._workingFilters.conditions&&this._workingFilters.conditions.length>0)?this._workingFilters.conditions.length+" "+$L("selected"):$L("Any condition"));
this.$.buyingFormatRow.setContent((this._workingFilters.buyingFormats&&this._workingFilters.buyingFormats.length>0)?this._workingFilters.buyingFormats.length+" "+$L("selected"):$L("Any format"));
this.$.minPriceInput.setValue(this._workingFilters.minPrice!=undefined?String(this._workingFilters.minPrice):"");
this.$.maxPriceInput.setValue(this._workingFilters.maxPrice!=undefined?String(this._workingFilters.maxPrice):"");
this.$.freeShippingToggle.setState(!!this._workingFilters.freeShippingOnly);
this.$.maxShippingRow.setShowing(!this._workingFilters.freeShippingOnly);
this.$.maxShippingInput.setValue(this._workingFilters.maxDeliveryCost!=undefined?String(this._workingFilters.maxDeliveryCost):"");
this.$.returnsAcceptedToggle.setState(!!this._workingFilters.returnsAccepted);
this.$.businessSellerToggle.setState(!!this._workingFilters.businessSellerOnly);
this.rebuildAspectRows();
},clearAllTapped:function(){
this._workingFilters={};
this.refreshRowSummaries();
},applyTapped:function(){
var _minPrice=this.parseNumber(this.$.minPriceInput.getValue());
var _maxPrice=this.parseNumber(this.$.maxPriceInput.getValue());
this._workingFilters.minPrice=_minPrice;
this._workingFilters.maxPrice=_maxPrice;
this._workingFilters.freeShippingOnly=this.$.freeShippingToggle.getState();
this._workingFilters.maxDeliveryCost=this._workingFilters.freeShippingOnly?undefined:this.parseNumber(this.$.maxShippingInput.getValue());
this._workingFilters.returnsAccepted=this.$.returnsAcceptedToggle.getState();
this._workingFilters.businessSellerOnly=this.$.businessSellerToggle.getState();
this.doApply({filters:this._workingFilters});
},parseNumber:function(_value){
if(_value==undefined||_value==""){
return undefined;
}
var _n=Number(_value);
return isNaN(_n)?undefined:_n;
},cancelTapped:function(){
this.doCancel();
},});
