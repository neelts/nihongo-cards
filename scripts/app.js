// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {};
var UXExport = function() { };
var App = function() {
	this.categoryName = Observable();
	this.cards = Observable();
	this.lists = Observable();
	var listsData = [{ name : "Животные", cards : [{ kanji : "猫", word : "ねこ", script : "n!eko", scripts : [], translation : "Cat"},{ kanji : "犬", word : "犬", script : "!inu", scripts : [], translation : "Dog"},{ kanji : "猿", word : "サル", script : "s!aru", scripts : [], translation : "Monkey"}], count : 0},{ name : "Больше Животных", cards : [{ kanji : "猫", word : "ねこ", script : "n!eko", scripts : [], translation : "Cat"},{ kanji : "犬", word : "犬", script : "!inu", scripts : [], translation : "Dog"},{ kanji : "猿", word : "サル", script : "s!aru", scripts : [], translation : "Monkey"},{ kanji : "猫", word : "ねこ", script : "n!eko", scripts : [], translation : "Cat"},{ kanji : "犬", word : "犬", script : "!inu", scripts : [], translation : "Dog"},{ kanji : "猿", word : "サル", script : "s!aru", scripts : [], translation : "Monkey"}], count : 0}];
	var b = false;
	var c;
	var _g = 0;
	while(_g < listsData.length) {
		var list = listsData[_g];
		++_g;
		var _g1 = 0;
		var _g2 = list.cards;
		while(_g1 < _g2.length) {
			var card = _g2[_g1];
			++_g1;
			var _g4 = 0;
			var _g3 = card.script.length;
			while(_g4 < _g3) {
				c = card.script.charAt(_g4++);
				if(c == "!") {
					b = true;
				} else {
					card.scripts.push({ c : c, b : b});
					if(b) {
						b = false;
					}
				}
			}
		}
		list.count = list.cards.length;
		this.lists.add(list);
	}
	this.listSelected = $bind(this,this.listSelected);
	this.clearCards = $bind(this,this.clearCards);
};
App.__interfaces__ = [UXExport];
App.main = function() {
	module.exports = new App();
};
App.prototype = {
	listSelected: function(e) {
		var card = e.data;
		this.categoryName.value = card.name;
		this.cards.addAll(card.cards);
	}
	,clearCards: function(e) {
		this.cards.clear();
	}
};
var Fuse = function() { };
var Observable = require("FuseJS/Observable");
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
App.main();
})();
