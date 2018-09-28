package ;

import Fuse.Placed;
import Fuse.Click;
import haxe.Timer;
import Fuse.Event;
import haxe.Json;
import Observable.E;
import Observable.V;

using FileSystem;
using Bundle;
using Std;

class App implements UXExport {

	public var width = V(0);
	public var height = V(0);

	public var lists:Observable<List> = E();
	public var cards:Observable<Card> = E();

	public var categoryName:Observable<String> = E();

	public var currentPage = V(0);

	private var cardsCenter:Float;
	private var cardsData:Array<Card>;

	private var busy:Bool;
	private var expect:Int = -1;

	public function new() {
		Bundle.list().then(initList);
		currentPage.onChange(onPageChanging);
	}

	private function initList(files:Array<String>) {
		for (file in files) if (file.substr(-3) == 'tsv') {
			file.read().then((data) -> {
				if (data != null) {
					var lines = data.split('\n');
					var cards:Array<Card> = [];
					var id = 0;
					for (line in lines) {
						var values = line.split('\t');
						var script = values[2];
						var scripts = [];
						var b = false;
						if (script != null) {
							for (i in 0...script.length) {
								var c = script.charAt(i);
								if (c == '!') b = true else {
									scripts.push({ c:c, b:b });
									if (b) b = false;
								}
							}
						}
						cards.push({ id:id++, kanji: values[0], word: values[1], scripts: scripts, translation: values[3] });
					}
					lists.add({ name: file.substr(0, -4).substr(file.lastIndexOf('/') + 1), cards: cards, count: lines.length });
				}
			});
		};
	}

	private function onPageChanging(value:Int) {
		busy = true;
		trace('>>> onPageChanging ' + value + ' ' + currentPage.value);
	}

	public function getSizes(e:Placed) {
		width.value = e.width;
		height.value = e.height;
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

	public function cardChanged(?_) {
		trace('>>> cardChanged ' + currentPage.value);
		if (cardsData != null && (expect == -1 || expect == currentPage.value)) {
			var index = currentPage.value + 1;
			if (index < cardsData.length && index >= cards.length) {
				trace(index, cardsData[index].translation);
				cards.add(cardsData[index]);
			}
		}
		if (expect >= 0) expect = -1;
		busy = false;
	}

	public function getCardsSize(e:Placed) {
		cardsCenter = e.width * .5;
	}

	public function swipePage(e:Click) {
		if (!busy) {
			var right = e.x > cardsCenter;
			if ((right && currentPage.value < cardsData.length) || (!right && currentPage.value > 0)) {
				currentPage.value += right ? 1 : -1;
			}
		}
	}

	public function shuffleCards(_) {
		var shuffled = [];
		for (card in cardsData) shuffled.insert(Math.floor(shuffled.length * Math.random()), card);
		cardsData = shuffled;
		resetCards();
	}

	public function resetCards(?_) {
		expect = 0;
		cards.clear();
		cards.add(cardsData[0]);
		currentPage.value = 0;
		trace('>>> resetCards');
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