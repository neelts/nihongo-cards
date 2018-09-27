class Fuse {

}

typedef Event<T> = {
	var data:T;
	var ?width:Int;
	var ?height:Int;
}

typedef Promise<T> = {
    function then(data:T->Void, ?error:String->Void):Void;
}