(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global));
}(this, (function (exports) { 'use strict';

  // import VDOM.
  const h = exports.maquette.h;
  const m = exports.maquette.createMapping;

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
    var mapping = m(function getKey(x){return x;},
      function create(x){
        return h('option', {key: x.val, value: x.val}, [x.text]);
      },
      function update(x, y){return;});

    mapping.map(opt);

    return h('select#' + id, {classes: classes, style: style, onselect: onSelectFunc}, [mapping.results]);
  };

  exports.maquette.atomHr = atomHr;
  exports.maquette.atomBr = atomBr;
  exports.maquette.atomText = atomText;
  exports.maquette.atomTextButton = atomTextButton;
  exports.maquette.atomLabelCheckbox = atomLabelCheckbox;
  exports.maquette.atomInputNumber = atomInputNumber;
  exports.maquette.atomCombobox = atomCombobox;

//  Object.defineProperty(exports, '__esModule', { value: true });
})));
