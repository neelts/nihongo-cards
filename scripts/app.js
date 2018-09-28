// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {};
var UXExport = function() { };
var App = function() {
	this.currentPage = Observable(0);
	this.categoryName = Observable();
	this.cards = Observable();
	this.lists = Observable();
	this.height = Observable(0);
	this.width = Observable(0);
	Bundle.list().then($bind(this,this.initList));
	this.currentPage.onValueChanged(module,$bind(this,this.onPageChanging));
	this.getSizes = $bind(this,this.getSizes);
	this.listSelected = $bind(this,this.listSelected);
	this.pageChanged = $bind(this,this.pageChanged);
	this.cardChanged = $bind(this,this.cardChanged);
	this.getCardsSize = $bind(this,this.getCardsSize);
	this.swipePage = $bind(this,this.swipePage);
	this.shuffleCards = $bind(this,this.shuffleCards);
	this.resetCards = $bind(this,this.resetCards);
};
App.__interfaces__ = [UXExport];
App.main = function() {
	module.exports = new App();
};
App.prototype = {
	initList: function(files) {
		var _gthis = this;
		var _g = 0;
		while(_g < files.length) {
			var file = [files[_g]];
			++_g;
			if(HxOverrides.substr(file[0],-3,null) == "tsv") {
				Bundle.read(file[0]).then((function(file1) {
					return function(data) {
						if(data != null) {
							var lines = data.split("\n");
							var cards = [];
							var id = 0;
							var _g1 = 0;
							while(_g1 < lines.length) {
								var values = lines[_g1++].split("\t");
								var script = values[2];
								var scripts = [];
								var b = false;
								if(script != null) {
									var _g3 = 0;
									var _g2 = script.length;
									while(_g3 < _g2) {
										var c = script.charAt(_g3++);
										if(c == "!") {
											b = true;
										} else {
											scripts.push({ c : c, b : b});
											if(b) {
												b = false;
											}
										}
									}
								}
								cards.push({ id : id++, kanji : values[0], word : values[1], scripts : scripts, translation : values[3]});
							}
							_gthis.lists.add({ name : HxOverrides.substr(HxOverrides.substr(file1[0],0,-4),file1[0].lastIndexOf("/") + 1,null), cards : cards, count : lines.length});
						}
						return;
					};
				})(file));
			}
		}
	}
	,onPageChanging: function(value) {
		this.busy = true;
	}
	,getSizes: function(e) {
		this.width.value = e.width;
		this.height.value = e.height;
	}
	,listSelected: function(e) {
		if(this.cards.length > 0) {
			this.cards.clear();
		}
		var card = e.data;
		this.categoryName.value = card.name;
		this.cardsData = card.cards;
		this.cards.add(this.cardsData[0]);
		this.currentPage.value = 0;
	}
	,pageChanged: function(p) {
		if(p.name == "List") {
			this.cards.clear();
		}
	}
	,cardChanged: function(_) {
		if(this.cardsData != null) {
			var index = this.currentPage.value + 1;
			if(index < this.cardsData.length && index >= this.cards.length) {
				this.cards.add(this.cardsData[index]);
			}
		}
		this.busy = false;
	}
	,getCardsSize: function(e) {
		console.log("src/App.hx:97:",JSON.stringify(e));
		this.cardsCenter = e.width * .5;
	}
	,swipePage: function(e) {
		if(!this.busy) {
			var right = e.x > this.cardsCenter;
			if(right && this.currentPage.value < this.cardsData.length || !right && this.currentPage.value > 0) {
				this.currentPage.value += right ? 1 : -1;
			}
		}
	}
	,shuffleCards: function(_) {
		var shuffled = [];
		var _g1 = 0;
		var _g = this.cardsData.length;
		while(_g1 < _g) {
			++_g1;
			shuffled.push(this.cardsData[Math.floor(this.cardsData.length * Math.random())]);
		}
		this.cardsData = shuffled;
		this.resetCards();
	}
	,resetCards: function(_) {
		this.cards.clear();
		this.cards.add(this.cardsData[0]);
		this.currentPage.value = 0;
	}
};
var Bundle = require("FuseJS/Bundle");
var Fuse = function() { };
var HxOverrides = function() { };
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
var Observable = require("FuseJS/Observable");
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
App.main();
})();
