var ffi= require("ffi");
var ref = require("ref");
var int = ref.types.int;
var str = ref.types.CString;
var bool = ref.types.bool;
var voi = ref.types.void;

vscodemem = "./VSCodeMemory.so";

var vsinterface = ffi.Library(vscodemem, {
    getUpdate: [str, [voi]],
    setClientSettings:[bool,[str, str, str, str]],
    setLocal: [ voi, [bool]],
})
  
module.exports = vsinterface