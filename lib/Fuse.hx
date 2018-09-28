class Fuse {

}

typedef Event<T> = {
	var data:T;
}

typedef Promise<T> = {
    function then(data:T->Void, ?error:String->Void):Void;
}

typedef Click = {
	var x:Float;
	var y:Float;
	var localX:Float;
	var localY:Float;
}

typedef Sender = {
	var sender:String;
}

typedef Placed = { > Sender,
	var x:Int;
	var y:Int;
	var width:Int;
	var height:Int;
}