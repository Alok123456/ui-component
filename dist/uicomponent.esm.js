import { Prop, Component, Vue } from 'vue-property-decorator';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.error = '';
        _this.limits = [{ limit: 20, value: 'name' },
            { limit: 50, value: 'description' }];
        return _this;
    }
    InputComponent.prototype.validateMaxLength = function () {
        var _this = this;
        var want = this.limits.find(function (x) { return x.value === _this.inputType; });
        if (want && (this.value.length > want.limit)) {
            this.error = 'Limit exceeds';
        }
        else {
            this.error = '';
        }
    };
    Object.defineProperty(InputComponent.prototype, "inputVal", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.validateMaxLength();
            this.$emit('input', value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Prop({ type: String })
    ], InputComponent.prototype, "value", void 0);
    __decorate([
        Prop({ type: String, default: '' })
    ], InputComponent.prototype, "label", void 0);
    __decorate([
        Prop({ type: String })
    ], InputComponent.prototype, "inputType", void 0);
    __decorate([
        Prop()
    ], InputComponent.prototype, "width", void 0);
    InputComponent = __decorate([
        Component({
            directives: {
                telnumberformat: {
                    bind: function (el, binding, vnode) {
                        binding.def.handleKeyUp(el);
                    },
                    update: function (el, binding, vnode) {
                        binding.def.handleKeyUp(el);
                    },
                    inserted: function (el, binding, vnode) {
                        el.addEventListener("keyup", function (evt) {
                            if (evt.keyCode == 37 ||
                                evt.keyCode == 38 ||
                                evt.keyCode == 39 ||
                                evt.keyCode == 40) {
                                return;
                            }
                            binding.def.handleKeyUp(el);
                        });
                    },
                    handleKeyUp: function (input) {
                        var val = input.value;
                        var cursorIndex = input.selectionStart;
                        var objReg = /\D/;
                        for (var i = 0; i < cursorIndex; i++) {
                            var sub = val.substr(i, 1);
                            var test = objReg.test(sub.toString());
                            if (test) {
                                cursorIndex--;
                            }
                        }
                        val = val.replace(/\D/g, "").substring(0, 10);
                        if (cursorIndex < 3) {
                            cursorIndex += 1;
                        }
                        else if (cursorIndex > 2 && cursorIndex < 6) {
                            cursorIndex += 3;
                        }
                        else {
                            cursorIndex += 4;
                        }
                        var zip = val && val.substring(0, 3);
                        var middle = val && val.substring(3, 6);
                        var last = val && val.substring(6, 10);
                        if (val.length == 0 || val.charAt(0) == '0') {
                            val = "";
                        }
                        else if (val.length < 4) ;
                        else if (val.length < 7) {
                            val = "(" + zip + ") " + middle;
                        }
                        else {
                            val = "(" + zip + ") " + middle + "-" + last;
                        }
                        input.value = val;
                        var phone_error = document.querySelector('#phone_validation');
                        if (phone_error) {
                            phone_error.remove();
                        }
                        // if(input.value.length > 0 && input.value.length < 14) {
                        //   var node = document.createElement("span");           
                        //   node.id = 'phone_validation';
                        //   var textnode = document.createTextNode("Phone number is invalid");
                        //   node.appendChild(textnode);
                        //   node.setAttribute('style', 'color:#c90000')                 
                        //   input.parentNode.appendChild(node);
                        //   input.setAttribute('style', 'border: 1px solid #c90000;')
                        // } else {
                        //   phone_error && phone_error.remove();
                        //   input.setAttribute('style', 'border: 1px solid #c4cdd8;')
                        // }
                        //input.focus();
                        //input.setSelectionRange(cursorIndex, cursorIndex);
                    }
                }
            }
        })
    ], InputComponent);
    return InputComponent;
}(Vue));

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = InputComponent;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.width},[_c('label',[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputVal),expression:"inputVal"},{name:"telnumberformat",rawName:"v-telnumberformat"}],domProps:{"value":(_vm.inputVal)},on:{"input":function($event){if($event.target.composing){ return; }_vm.inputVal=$event.target.value;}}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.error))])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-211d61b0_0", { source: ".full-width[data-v-211d61b0]{width:100%}.half-width[data-v-211d61b0]{width:50%}.one-third-width[data-v-211d61b0]{width:calc(100% / 3)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-211d61b0";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var input = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("ui-input", input);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

input.install = install;

export default input;
