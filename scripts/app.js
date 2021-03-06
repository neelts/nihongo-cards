// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var UXExport = function() { };
UXExport.__name__ = true;
var App = function() {
	this.expect = -1;
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
App.__name__ = true;
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
		haxe_Log.trace(">>> onPageChanging " + value + " " + this.currentPage.value,{ fileName : "src/App.hx", lineNumber : 69, className : "App", methodName : "onPageChanging"});
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
		haxe_Log.trace(">>> cardChanged " + this.currentPage.value,{ fileName : "src/App.hx", lineNumber : 91, className : "App", methodName : "cardChanged"});
		if(this.cardsData != null && (this.expect == -1 || this.expect == this.currentPage.value)) {
			var index = this.currentPage.value + 1;
			if(index < this.cardsData.length && index >= this.cards.length) {
				haxe_Log.trace(index,{ fileName : "src/App.hx", lineNumber : 95, className : "App", methodName : "cardChanged", customParams : [this.cardsData[index].translation]});
				this.cards.add(this.cardsData[index]);
			}
		}
		if(this.expect >= 0) {
			this.expect = -1;
		}
		this.busy = false;
	}
	,getCardsSize: function(e) {
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
		var _g = 0;
		var _g1 = this.cardsData;
		while(_g < _g1.length) {
			var card = _g1[_g++];
			var pos = Math.floor(shuffled.length * Math.random());
			shuffled.splice(pos,0,card);
		}
		this.cardsData = shuffled;
		this.resetCards();
	}
	,resetCards: function(_) {
		this.expect = 0;
		this.cards.clear();
		this.cards.add(this.cardsData[0]);
		this.currentPage.value = 0;
		haxe_Log.trace(">>> resetCards",{ fileName : "src/App.hx", lineNumber : 128, className : "App", methodName : "resetCards"});
	}
};
var Bundle = require("FuseJS/Bundle");
var Fuse = function() { };
Fuse.__name__ = true;
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
Math.__name__ = true;
var Observable = require("FuseJS/Observable");
var haxe_Log = function() { };
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	var msg = infos != null ? infos.fileName + ":" + infos.lineNumber + ": " : "";
	msg += js_Boot.__string_rec(v,"");
	if(infos != null && infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(msg);
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if((o instanceof Array)) {
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g11 = 0;
			var _g3 = l;
			while(_g11 < _g3) {
				var i1 = _g11++;
				str += (i1 > 0 ? "," : "") + js_Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
App.main();
})();
