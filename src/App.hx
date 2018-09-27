package ;

import Fuse.Event;
import haxe.Json;
import Observable.E;

using FileSystem;
using Bundle;

class App implements UXExport {

	public var lists:Observable<List> = E();
	public var cards:Observable<Card> = E();

	public var categoryName:Observable<String> = E();

	public function new() {

		var listsData = [];
		var files = ['Animals'];

		for (file in files) {
			var data = 'data/${file}.csv'.readSync();
			if (data != null) {
				var lines = data.split('\n');
				var cards:Array<Card> = [];
				for (line in lines) {
					var values = line.split(',');
					var script = values[2];
					var scripts = [];
					for (i in 0...script.length) {
						var c = script.charAt(i);
						var b = false;
						if (c == '!') b = true else {
							scripts.push({ c:c, b:b });
							if (b) b = false;
						}
					}
					cards.push({ kanji: values[0], word: values[1], scripts: scripts, translation: values[3] });
				}
				listsData.push({
					name: file,
					cards: cards,
					count: lines.length
				});
			}
		}

		lists.addAll(listsData);
	}

	public function listSelected(e:Event<List>) {
		var card = e.data;
		categoryName.value = card.name;
		cards.addAll(card.cards);
	}

	public function clearCards(e:Event<Dynamic>) {
		cards.clear();
	}

	public static inline function main() {
		untyped module.exports = new App(); 
	}
}

typedef List = {
	var name:String;
	var cards:Array<Card>;
	var count:Int;
}

typedef Card = {
	var kanji:String;
	var word:String;
	var scripts:Array<Char>;
	var translation:String;
}

typedef Char = {
	var c:String;
	var b:Bool;
}