import Fuse.Promise;
@:jsRequire('FuseJS/Bundle')
extern class Bundle {

    public static function list():Promise<Array<String>>;
    public static function read(path:String):Promise<String>;
    public static function readSync(path:String):String;

}