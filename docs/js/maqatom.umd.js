(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global));
}(this, (function (exports) { 'use strict';

  // import VDOM.
  const h = exports.maquette.h;
  const createMapping = exports.maquette.createMapping;

  function genShortUniq() {
    return "xxxxxxxxxxxx".split("").map(function(x){
      switch (x) {
            case "x":
                return Math.floor(Math.random() * 16).toString(16).toUpperCase();
                break;
            default:
                return x;
                break;
      }
    }).join("");
  }

  // Atomic render.
  function atomHr(){ return h('hr', {key: '' + genShortUniq()}, []);}
  function atomBr(){ return h('br', {key: '' + genShortUniq()}, []);}
  function atomAnchor(href, text, selector = ""){ return h('a' + selector, {href:href, target:"_blank", rel:"noopener noreferrer"}, [text]);}
  function atomText(text, id, classes = {}, style = ''){
    return h('span#' + id, {classes: classes, style: style}, [text]);
  };
  function atomTextButton(text, id, onClickedFunc, classes = {}, style = ''){
    return h('button#' + id, {classes: classes, style: style, onclick: onClickedFunc}, [text]);
  };
  function atomLabelCheckbox(text, id, onChangedFunc, classes = {}, style = ''){
    return h('label', {key: '' + id + 'Label', classes: classes, style: style, onchange: onChangedFunc}, [
      h('input#' + id, {type: 'checkbox'}, [text])
    ]);
  };
  function atomInputNumber(id, onChangeFunc, classes = {}, style = '', min = -9999.9999, max = 9999.9999, step = 'any'){
    return h('input#' + id, {type: 'number', classes: classes, style: style, onchange: onChangeFunc, min: min, max: max, step: step}, []);
  };
  function atomCombobox(id, opt = [{val:0, text: ''}], onSelectFunc, classes = {}, style =  ''){
    var mapping = createMapping(function getKey(x){return x;},
      function create(x){
        return h('option', {key: x.val, value: x.val}, [x.text]);
      },
      function update(x, y){return;});

    mapping.map(opt);

    return h('select#' + id, {classes: classes, style: style, onselect: onSelectFunc}, [mapping.results]);
  };

  const MetaNode = function(){
    this._vr = undefined;
    this._args = undefined;
    this._children = [];
    this._key = genShortUniq();
  };
  
  MetaNode.prototype.addNode = function(m){
    this._children.push(m);
  };

  MetaNode.prototype.setRender = function(vr, args){
    if('function' !== typeof vr){ throw new Error('Have to set the render function.');}

    this._vr = vr;
    this._args = args;
  };

  MetaNode.prototype.render = function(){
    let v = this._vr(this._args)
    let c = []
    console.log(this._key)
    console.log(this._args)

    this._children.forEach(function(m){c.push(m.render())});
    v.children = c;

    return v;
  };

  MetaNode.prototype.clone = function createMetaNode(args = undefined){
    let m = new MetaNode();

    m._vr = this._vr;
    m._children = this._children;
    m._key = genShortUniq();
    
    if(undefined !== args){
      m._args = args;
    }
    else{
      m._args = this.args;
    }

    return m;
  };

  function createMetaNode(vr = undefined, args = {}){ // v = function(args){return h();}
    let m = new MetaNode();

    m.setRender(vr, args);

    return m;
  };

  exports.maquette.atomHr = atomHr;
  exports.maquette.atomBr = atomBr;
  exports.maquette.atomAnchor = atomAnchor;
  exports.maquette.atomText = atomText;
  exports.maquette.atomTextButton = atomTextButton;
  exports.maquette.atomLabelCheckbox = atomLabelCheckbox;
  exports.maquette.atomInputNumber = atomInputNumber;
  exports.maquette.atomCombobox = atomCombobox;
  exports.maquette.createMetaNode = createMetaNode;

//  Object.defineProperty(exports, '__esModule', { value: true });
})));
