package ;

import haxe.Timer;
import Fuse.Event;
import haxe.Json;
import Observable.E;
import Observable.V;

using FileSystem;
using Bundle;
using Std;

class App implements UXExport {

	public var lists:Observable<List> = E();
	public var cards:Observable<Card> = E();

	public var categoryName:Observable<String> = E();

	public var currentPage = V(0);

	private var cardsData:Array<Card>;

	public function new() {
		Bundle.list().then(initList);
	}

	private function initList(files:Array<String>) {
		for (file in files) if (file.substr(-3) == 'csv') {
			file.read().then((data) -> {
				if (data != null) {
					var lines = data.split('\n');
					var cards:Array<Card> = [];
					var id = 0;
					for (line in lines) {
						var values = line.split(',');
						var script = values[2];
						var scripts = [];
						var b = false;
						for (i in 0...script.length) {
							var c = script.charAt(i);
							if (c == '!') b = true else {
								scripts.push({ c:c, b:b });
								if (b) b = false;
							}
						}
						cards.push({ id:id++, kanji: values[0], word: values[1], scripts: scripts, translation: values[3] });
					}
					lists.add({ name: file.substr(0, -4).substr(file.lastIndexOf('/') + 1), cards: cards, count: lines.length });
				}
			});
		};
	}

	public function listSelected(e:Event<List>) {
		if (cards.length > 0) cards.clear();
		var card = e.data;
		categoryName.value = card.name;
		cardsData = card.cards;
		cards.add(cardsData[0]);
		currentPage.value = 0;
	}

	public function pageChanged(p:Page) {
		if (p.name == "List") cards.clear();
	}

	public function cardChanged(p:Page) {
		if (cardsData != null) {
			var index = currentPage.value + 1;
			if (index < cardsData.length && index >= cards.length) {
				cards.add(cardsData[index]);
				trace('add $index');
			}
		}
	}

	public function resetCards(_) {
		cards.clear();
		cards.add(cardsData[0]);
		currentPage.value = 0;
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
	var id:Int;
	var kanji:String;
	var word:String;
	var scripts:Array<Char>;
	var translation:String;
}

typedef Char = {
	var c:String;
	var b:Bool;
}

typedef Page = {
	var name:String;
}