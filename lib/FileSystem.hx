import Fuse.Promise;
@:jsRequire('FuseJS/FileSystem')
extern class FileSystem {

    public static var dataDirectory:String;

    public static function readTextFromFile(path:String):Promise<String>;
    public static function readTextFromFileSync(path:String):String;
    public static function listFiles(path:String):Promise<Array<String>>;
    public static function listFilesSync(path:String):Array<String>;
    public static function existsSync(path:String):Bool;

}