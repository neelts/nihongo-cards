package ;

import Fuse.Event;
import haxe.Json;
import Observable.E;

class App implements UXExport {

	public var lists:Observable<List> = E();
	public var cards:Observable<Card> = E();

	public var categoryName:Observable<String> = E();

	public function new() {

		var listsData:Array<List> = [
			{
				name:"Животные",
				cards:[
					{ kanji:"猫", word:"ねこ", script:"n!eko", scripts:[], translation:"Cat" },
					{ kanji:"犬", word:"犬", script:"!inu", scripts:[], translation:"Dog" },
					{ kanji:"猿", word:"サル", script:"s!aru", scripts:[], translation:"Monkey" }
				],
				count:0
			},
			{
				name:"Больше Животных",
				cards:[
					{ kanji:"猫", word:"ねこ", script:"n!eko", scripts:[], translation:"Cat" },
					{ kanji:"犬", word:"犬", script:"!inu", scripts:[], translation:"Dog" },
					{ kanji:"猿", word:"サル", script:"s!aru", scripts:[], translation:"Monkey" },
					{ kanji:"猫", word:"ねこ", script:"n!eko", scripts:[], translation:"Cat" },
					{ kanji:"犬", word:"犬", script:"!inu", scripts:[], translation:"Dog" },
					{ kanji:"猿", word:"サル", script:"s!aru", scripts:[], translation:"Monkey" }
				],
				count:0
			}
		];

		var b:Bool = false;
		var c:String;
		for (list in listsData) {
			for (card in list.cards) {
				for (i in 0...card.script.length) {
					c = card.script.charAt(i);
					if (c == '!') b = true else {
						card.scripts.push({ c:c, b:b });
						if (b) b = false;
					}
				}
			}
			list.count = list.cards.length;
			lists.add(list);
		}
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
	var script:String;
	var scripts:Array<Char>;
	var translation:String;
}

typedef Char = {
	var c:String;
	var b:Bool;
}