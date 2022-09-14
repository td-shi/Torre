(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.gU = {}));
}(this, (function (exports) {
   'use strict';
  function jprintf(format){ // jprintf("%s%d%s", "Set, ",9999, "[A]")
    let i = 0;
    let j = 0;
    let r = "";
    let next = function(args){
      j += 1;
      i += 1;
      return (args[j] !== void(0)) ? args[j]: "";
    };

    for(i = 0; i < format.length; i += 1){
      if('%' === format.charAt(i)){
        switch(format.charAt(i+1)){
          case 's': r += next(arguments); break;
          case 'd': r += parseInt(next(arguments), 10) + ""; break;
          case 'o': r += parseInt(next(arguments), 10).toString(8); break;
          case 'x': r += parseInt(next(arguments), 10).toString(16).toLowerCase(); break;
          case 'X': r += parseInt(next(arguments), 10).toString(16).toUpperCase(); break;
          default: r += format[i]; console.log("jprintf not impl %" + format.charAt(i+1) + ".") ;break;
        }
      }
      else{
          r += format[i];
      }
    }

    return r;
  }

  function setCokie(key, val){
    document.cookie = key + "=" + escape(val) + ";" + "expires=" + (new Date((new Date()).getTime() + 1000*24*3600*31)).toUTCString() + ";";
  }

  function getCokie(key){
    let ret = "";
    let tmp = document.cookie + ";";
    tmp1 = tmp.indexOf(key, 0);
    if (tmp1 != -1) {
      tmp = tmp.substring(tmp1, tmp.length);
      let start = tmp.indexOf("=", 0);
      let end = tmp.indexOf(";", start);
      ret = unescape(tmp.substring(start + 1, end));
    }

    return ret;
  }

  // Enum class
  const Enum = function() {
    this._enums = [];
    this._lookups = {};
  };

  Enum.prototype.getEnums = function() { return this._enums; }

  Enum.prototype.forEach = function(callback){
    let length = this._enums.length;
    for (var i = 0; i < length; ++i){ callback(this._enums[i]); }
  }

  Enum.prototype.addEnum = function(e) {
    this._enums.push(e);
  }

  Enum.prototype.getByName = function(name) {
    return this[name];
  }

  Enum.prototype.getByValue = function(field, value) {
    let lookup = this._lookups[field];
    if(lookup) {
      return lookup[value];
    }
    else {
      this._lookups[field] = ( lookup = {});
      let k = this._enums.length - 1;
      for(; k >= 0; --k) {
        let m = this._enums[k];
        let j = m[field];
        lookup[j] = m;
      }

      return lookup[value];
    }

    return null;
  }

  function genEnum(defObject) {
    let k;
    let e = new Enum();
    for(k in defObject) {
        let j = defObject[k];
        e[k] = j;
        e.addEnum(j);
    }

    return e;
  }

  function genUniq() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map(function(x){
      switch (x) {
            case "x":
                return Math.floor(Math.random() * 16).toString(16).toUpperCase();
                break;
            case "y":
                return (Math.floor(Math.random() * 4) + 8).toString(16).toUpperCase();
                break;
            default:
                return x;
                break;
      }
    }).join("");
  }

  const Uniqs = function(){
    this._uniqs = [];
  };

  Uniqs.prototype.make = function(){
    let u = new Array(100000).fill("xxxxxxxxxwvxuxxxxxxxxxxxx");
    function v6(x){
      switch(x){
        case "u":
          return (Math.floor(Math.random() * 16) * 2 + 1).toString(32);
          break;
        case "v":
          return Math.floor(Math.random() * 8).toString(32);
          break;
        case "w":
          return (Math.floor(Math.random() * 8) * 4 + 1).toString(32);
          break;
        case "x":
          return Math.floor(Math.random() * 32).toString(32);
          break;
        default:
          return x;
          break;
      }
    }

    return u.map(function(s){ return s.split("").map(v6).join("");});
  }

  Uniqs.prototype.getUniq = function(){
    if(1 > this._uniqs.length){
      this._uniqs = this.make();
    }

    return this._uniqs.shift();
  }

  function genUniqs(){
    let u = new Uniqs();
    u._uniqs = u.make();
    return u;
  }

  function readTextFile(file){
    return new Promise(function(resolve, reject){
      const r = new FileReader();
      r.onload = function(){
        resolve(r.result);
      }
      r.onerror = reject;
      r.readAsText(file)
    });
  }
  
  function setItemLsf(name, value){
    try{
      localStorage.setItem(name, value);
      return true;
    }
    catch(e){
      return false;
    }
  }

  function deleteItemLsf(name){
    try{
      localStorage.setItem(name);
      return true;
    }
    catch(e){
      return false;
    }
  }
  
  function getItemLsf(name){
    try{
      return localStorage.getItem(name);
    }
    catch(e){
      return false;
    }
  }
  
  function clearLsf(){
    try{
      localStorage.clear();
    }
    catch(e){
      return false;
    }
  }
  
  function keyLsf(){
    try{
      return localStorage.key();
    }
    catch(e){
      return false;
    }
  }

  function storageAvailable(type) {
    try{
      let storage = window[type];
      let x = '__storage_test__';

      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e){
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }

  exports.jprintf = jprintf;
  exports.setCookie = setCokie;
  exports.getCokie = getCokie;
  exports.genEnum = genEnum;
  exports.genUniq = genUniq;
  exports.genUniqs = genUniqs;
  exports.readTextFile = readTextFile;
  exports.setItemLsf = setItemLsf;
  exports.getItemLsf = getItemLsf;
  exports.deleteItemLsf = deleteItemLsf;
  exports.clearLsf = clearLsf;
  exports.keyLsf = keyLsf;
  exports.storageAvailable = storageAvailable;

  Object.defineProperty(exports, '__esModule', { value: true });
  
})));
