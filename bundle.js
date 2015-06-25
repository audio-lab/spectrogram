require=function e$$0(b,e,d){function f(c,k){if(!e[c]){if(!b[c]){var h="function"==typeof require&&require;if(!k&&h)return h(c,!0);if(g)return g(c,!0);h=Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h;}h=e[c]={exports:{}};b[c][0].call(h.exports,function(d){var g=b[c][1][d];return f(g?g:d)},h,h.exports,e$$0,b,e,d)}return e[c].exports}for(var g="function"==typeof require&&require,c=0;c<d.length;c++)f(d[c]);return f}({"audio-context":[function(a,b,e){a=a("global/window");if(a=a.AudioContext||
a.webkitAudioContext)b.exports=new a},{"global/window":1}],"audio-spectrogram":[function(a,b,e){function d(c){var a=this;if(!(a instanceof d))return new d(element);m(this,c);a.element=h.createElement("div");a.element.classList.add("audio-spectrogram");a.context=g;a.buffer=null;a.sourceNode=null;a.scriptNode=null;a.analyser=null;a.canvas=h.createElement("canvas");a.canvasContext=a.canvas.getContext("2d");a.canvas.className="audio-spectrogram-canvas";a.reset();a.element.appendChild(a.canvas);a.scriptNode=
a.context.createScriptProcessor(2048,1,1);a.analyser=a.context.createAnalyser();a.analyser.minDecibels=a.minDecibels;a.analyser.maxDecibels=a.maxDecibels;a.analyser.smoothingTimeConstant=a.smoothingTimeConstant;a.analyser.fftSize=a.fftSize;a.analyser.connect(a.scriptNode);a.scriptNode.connect(a.context.destination);a.scriptNode.onaudioprocess=function(){if(!a.isActive)return a;var c=new Uint8Array(a.analyser.frequencyBinCount);a.analyser.getByteFrequencyData(c);a.draw(c)};k(a.element);on(a.element,
"attached",function(){a.update()});on(l,"resize",function(){a.update()});a.reset()}a("mumath/lg");var f=a("color-space/cubehelix"),g=a("audio-context"),c=a("component-raf");e=a("events");var m=a("xtend/mutable"),k=a("lifecycle-events");b.exports=d;var h=document,l=window;a=d.prototype=Object.create(e.prototype);a.fftSize=4096;a.minDecibels=-90;a.maxDecibels=-30;a.smoothingTimeConstant=0;a.setSource=function(c){c instanceof AudioBuffer?(this.sourceNode=this.context.createBufferSource(),this.sourceNode.buffer=
this.audio):this.sourceNode=c instanceof AudioNode?c:c instanceof HTMLAudioElement?this.context.createMediaElementSource(c):this.context.createMediaStreamSource(c);this.sourceNode.connect(this.analyser);return this};a.connect=function(c){this.analyser.connect(c)};a.disconnect=function(){this.analyser.disconnect()};a.draw=function(a){var d=this;c(function(){var c=d.canvas.width,m=d.canvas.height,g=d.canvasContext;d.offset++;var f=g.getImageData(0,0,c,m);g.putImageData(f,-1,0);for(f=0;f<a.length;f++)g.fillStyle=
"rgb("+d.getColor(a[f]/255).map(Math.round)+")",g.fillRect(c-1,m-f,1,1)});d.emit("draw",a);return d};a.start=function(){this.update();this.isActive=!0;return this};a.stop=function(){this.isActive=!1;return this};a.reset=function(){this.update();this.offset=0;return this};a.update=function(){var c=this.canvasContext;this.canvas.width=this.element.clientWidth;this.canvas.height=this.element.clientHeight;c.fillStyle="rgb("+this.getColor(0).map(Math.round)+")";c.fillRect(0,0,this.canvas.width,this.canvas.height)};
a.getColor=function(c){return f.rgb(c,{rotation:1,start:2.2,hue:1.1,gamma:1})}},{"audio-context":"audio-context","color-space/cubehelix":26,"component-raf":30,events:2,"lifecycle-events":31,"mumath/lg":42,"xtend/mutable":44}],1:[function(a,b,e){a="undefined"!==typeof global?global:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{};b.exports="undefined"!==typeof window?window:"undefined"!==typeof a?a:{}},{}],2:[function(a,b,e){function d(){this._events=this._events||{};this._maxListeners=
this._maxListeners||void 0}function f(c){return"function"===typeof c}function g(c){return"object"===typeof c&&null!==c}b.exports=d;d.EventEmitter=d;d.prototype._events=void 0;d.prototype._maxListeners=void 0;d.defaultMaxListeners=10;d.prototype.setMaxListeners=function(c){if("number"!==typeof c||0>c||isNaN(c))throw TypeError("n must be a positive number");this._maxListeners=c;return this};d.prototype.emit=function(c){var a,d,b,e;this._events||(this._events={});if("error"===c&&(!this._events.error||
g(this._events.error)&&!this._events.error.length)){a=arguments[1];if(a instanceof Error)throw a;throw TypeError('Uncaught, unspecified "error" event.');}d=this._events[c];if(void 0===d)return!1;if(f(d))switch(arguments.length){case 1:d.call(this);break;case 2:d.call(this,arguments[1]);break;case 3:d.call(this,arguments[1],arguments[2]);break;default:a=arguments.length;b=Array(a-1);for(e=1;e<a;e++)b[e-1]=arguments[e];d.apply(this,b)}else if(g(d)){a=arguments.length;b=Array(a-1);for(e=1;e<a;e++)b[e-
1]=arguments[e];d=d.slice();a=d.length;for(e=0;e<a;e++)d[e].apply(this,b)}return!0};d.prototype.addListener=function(c,a){var b;if(!f(a))throw TypeError("listener must be a function");this._events||(this._events={});this._events.newListener&&this.emit("newListener",c,f(a.listener)?a.listener:a);this._events[c]?g(this._events[c])?this._events[c].push(a):this._events[c]=[this._events[c],a]:this._events[c]=a;g(this._events[c])&&!this._events[c].warned&&(b=void 0!==this._maxListeners?this._maxListeners:
d.defaultMaxListeners)&&0<b&&this._events[c].length>b&&(this._events[c].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[c].length),"function"===typeof console.trace&&console.trace());return this};d.prototype.on=d.prototype.addListener;d.prototype.once=function(c,a){function d(){this.removeListener(c,d);g||(g=!0,a.apply(this,arguments))}if(!f(a))throw TypeError("listener must be a function");
var g=!1;d.listener=a;this.on(c,d);return this};d.prototype.removeListener=function(c,a){var d,b,e;if(!f(a))throw TypeError("listener must be a function");if(!this._events||!this._events[c])return this;d=this._events[c];e=d.length;b=-1;if(d===a||f(d.listener)&&d.listener===a)delete this._events[c],this._events.removeListener&&this.emit("removeListener",c,a);else if(g(d)){for(;0<e--;)if(d[e]===a||d[e].listener&&d[e].listener===a){b=e;break}if(0>b)return this;1===d.length?(d.length=0,delete this._events[c]):
d.splice(b,1);this._events.removeListener&&this.emit("removeListener",c,a)}return this};d.prototype.removeAllListeners=function(c){var a;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[c]&&delete this._events[c],this;if(0===arguments.length){for(a in this._events)"removeListener"!==a&&this.removeAllListeners(a);this.removeAllListeners("removeListener");this._events={};return this}a=this._events[c];if(f(a))this.removeListener(c,
a);else for(;a.length;)this.removeListener(c,a[a.length-1]);delete this._events[c];return this};d.prototype.listeners=function(c){return this._events&&this._events[c]?f(this._events[c])?[this._events[c]]:this._events[c].slice():[]};d.listenerCount=function(c,a){return c._events&&c._events[a]?f(c._events[a])?1:c._events[a].length:0}},{}],3:[function(a,b,e){function d(a,c,d){a=a._callbacks;if(!c)return a||{};if(!a||!a[c])return[];c=a[c];d&&d.length&&(c=c.filter(function(a){return f(a,d)}));return c}
function f(a,c){if(a._ns)for(var d=c.length;d--;)if(0<=a._ns.indexOf(c[d]))return!0}d.remove=function(a,c,d,b){a=a._callbacks;if(!a||!a[c])return!1;c=a[c];if(b&&b.length&&!f(d,b))return!1;for(b=0;b<c.length;b++)if(c[b]===d||c[b].fn===d){c.splice(b,1);break}};d.add=function(a,c,d,f){if(d){var b=a._callbacks;b||(b={},Object.defineProperty(a,"_callbacks",{value:b}));(b[c]=b[c]||[]).push(d);f&&f.length&&(d._ns=f)}};b.exports=d},{}],4:[function(a,b,e){b.exports={freeze:function(a,b){var c=d.get(a);if(c&&
c[b])return!1;c||(c={},d.set(a,c));return c[b]=!0},unfreeze:function(a,b){var c=d.get(a);if(!c||!c[b])return!1;c[b]=null;return!0},isFrozen:function(a,b){var c=d.get(a);return c&&c[b]}};var d=new WeakMap},{}],5:[function(a,b,e){function d(){u=new RegExp("::?("+Object.keys(r).join("|")+")(\\\\[0-9]+)?")}function f(a,d){if(!a)return[];if(!t(a))return q(a)?a:[a];r.scope&&(a=a.replace(/^\s*:scope/,""));d=d?x(d)?v(d):d.querySelector?[d]:[g.document]:[g.document];return c(d,a)}function g(a,c){return f(a,
c)[0]}function c(a,d){d=d.trim();if(!d)return a;if(">"===d[0])if(r.scope){var b=l();a.forEach(function(a){a.setAttribute("__scoped",b)});d='[__scoped="'+b+'"]'+d}else d=":scope"+d;var f,g,e,k=n.parse(d),q=k[0].match(u);return q?(f=q[1],(g=q[2])&&(e=n.stringify(k[g.slice(1)],k)),(g=n.stringify(k[0].slice(0,q.index),k))||p[f]||(g="*"),g&&(a=m(a,g)),g=function(a){return r[f](a,e)},w[f]?a=a.filter(g):p[f]&&(a=h(v(a.map(g)))),d=k[0].slice(q.index+q[0].length),c(a,n.stringify(d,k))):m(a,d)}function m(a,
c){return h(v(a.map(function(a){return k(a.querySelectorAll(c))})))}var k=a("sliced"),h=a("array-unique"),l=a("get-uid"),n=a("parenthesis"),t=a("mutype/is-string"),q=a("mutype/is-array"),x=a("mutype/is-array-like"),v=a("arrayify-compact");a=a("get-doc");var r={},w={},p={},u;g.all=f;g.registerFilter=function(a,c,b){r[a]||(r[a]=c,r[a].includeSelf=b,w[a]=!0,d())};g.registerMapper=function(a,c,b){r[a]||(r[a]=c,r[a].includeSelf=b,p[a]=!0,d())};g.document=a;b.exports=g},{"array-unique":11,"arrayify-compact":12,
"get-doc":14,"get-uid":16,"mutype/is-array":18,"mutype/is-array-like":17,"mutype/is-string":20,parenthesis:21,sliced:24}],6:[function(a,b,e){var d=a("..");b.exports=function(a,b){return!!d(b,a)}},{"..":5}],7:[function(a,b,e){var d=a("..");b.exports=function(a,b){a.parentNode||d.document.createDocumentFragment().appendChild(a);return-1<d.all(b,a.parentNode).indexOf(a)}},{"..":5}],8:[function(a,b,e){var d=a("./matches");b.exports=function(a,b){return!d(a,b)}},{"./matches":7}],9:[function(a,b,e){var d=
a("..");b.exports=function(a){return a===d.document.documentElement}},{"..":5}],10:[function(a,b,e){b.exports=function(a){return a.hasAttribute("scoped")}},{}],11:[function(a,b,e){b.exports=function(a){if(!Array.isArray(a))throw new TypeError("array-unique expects an array.");for(var b=a.length,g=-1;g++<b;)for(var c=g+1;c<a.length;++c)a[g]===a[c]&&a.splice(c--,1);return a}},{}],12:[function(a,b,e){var d=a("array-flatten");b.exports=function(a){return d(Array.isArray(a)?a:[a]).filter(Boolean)}},{"array-flatten":13}],
13:[function(a,b,e){function d(a,c,b){for(var f=0;f<a.length;f++){var e=a[f];0<b&&Array.isArray(e)?d(e,c,b-1):c.push(e)}return c}function f(a,c){for(var d=0;d<a.length;d++){var b=a[d];Array.isArray(b)?f(b,c):c.push(b)}return c}b.exports=function(a,c){return null==c?f(a,[]):d(a,[],c)}},{}],14:[function(a,b,e){a=a("has-dom");b.exports=a()?document:null},{"has-dom":15}],15:[function(a,b,e){b.exports=function(){return"undefined"!==typeof window&&"undefined"!==typeof document&&"function"===typeof document.createElement}},
{}],16:[function(a,b,e){var d=Date.now()%1E9;b.exports=function(){return(1E9*Math.random()>>>0)+d++}},{}],17:[function(a,b,e){var d=a("./is-string"),f=a("./is-array"),g=a("./is-fn");b.exports=function(a){return f(a)||a&&!d(a)&&!a.nodeType&&("undefined"!=typeof window?a!=window:!0)&&!g(a)&&"number"===typeof a.length}},{"./is-array":18,"./is-fn":19,"./is-string":20}],18:[function(a,b,e){b.exports=function(a){return a instanceof Array}},{}],19:[function(a,b,e){b.exports=function(a){return!(!a||!a.apply)}},
{}],20:[function(a,b,e){b.exports=function(a){return"string"===typeof a||a instanceof String}},{}],21:[function(a,b,e){b.exports={parse:a("./parse"),stringify:a("./stringify")}},{"./parse":22,"./stringify":23}],22:[function(a,b,e){b.exports=function(a,b){function g(a,d,b){return"\\"+c.push(a.slice(1,-1))}if("string"!==typeof a)return[a];var c=[],e;b=b||"()";for(var k=new RegExp(["\\",b[0],"[^\\",b[0],"\\",b[1],"]*\\",b[1]].join(""));a!=e;)e=a,a=a.replace(k,g);c.unshift(a);return c}},{}],23:[function(a,
b,e){b.exports=function(a,b,g){function c(a,c,d){return g[0]+b[a.slice(1)]+g[1]}var e;if(!a)return"";"string"!==typeof a&&(g=b,b=a,a=b[0]);for(g=g||"()";a!=e;)e=a,a=a.replace(/\\[0-9]+/,c);return a}},{}],24:[function(a,b,e){b.exports=a("./lib/sliced")},{"./lib/sliced":25}],25:[function(a,b,e){b.exports=function(a,b,g){var c=[],e=a.length;if(0===e)return c;b=0>b?Math.max(0,b+e):b||0;for(void 0!==g&&(e=0>g?g+e:g);e-- >b;)c[e-b]=a[e];return c}},{}],26:[function(a,b,e){e=a("./rgb");var d=a("mumath/between");
a=b.exports={name:"cubehelix",channel:["fraction"],min:[0],max:[1]};var f=a.defaults={start:0,rotation:.5,hue:1,gamma:1};a.rgb=function(a,c){c=c||{};var b=void 0!==c.hue?c.hue:f.hue,e=2*Math.PI*((void 0!==c.start?c.start:f.start)/3+1+(void 0!==c.rotation?c.rotation:f.rotation)*a);a=Math.pow(a,void 0!==c.gamma?c.gamma:f.gamma);var h=b*a*(1-a)/2,b=a+h*(-.14861*Math.cos(e)+1.78277*Math.sin(e)),l=a+h*(-.29227*Math.cos(e)-.90649*Math.sin(e)),e=a+1.97294*h*Math.cos(e),b=d(b,0,1),l=d(l,0,1),e=d(e,0,1);return[255*
b,255*l,255*e]};e.cubehelix=function(a){}},{"./rgb":29,"mumath/between":27}],27:[function(a,b,e){b.exports=a("./wrap")(function(a,b,e){return e>b?Math.max(Math.min(a,e),b):Math.max(Math.min(a,b),e)})},{"./wrap":28}],28:[function(a,b,e){b.exports=function(a){return function(b){var e=arguments;if(b instanceof Array){for(var c=Array(b.length),m,k=0;k<b.length;k++){m=[];for(var h=0,l=e.length,n;h<l;h++)n=e[h]instanceof Array?e[h][k]:e[h],m.push(n);c[k]=a.apply(this,m)}return c}if("object"===typeof b){c=
{};for(k in b){m=[];h=0;for(l=e.length;h<l;h++)n="object"===typeof e[h]?e[h][k]:e[h],m.push(n);c[k]=a.apply(this,m)}return c}return a.apply(this,e)}}},{}],29:[function(a,b,e){b.exports={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]}},{}],30:[function(a,b,e){function d(a){var b=(new Date).getTime(),d=Math.max(0,16-(b-f));a=setTimeout(a,d);f=b;return a}e=b.exports=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||
d;var f=(new Date).getTime(),g=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.clearTimeout;e.cancel=function(a){g.call(window,a)}},{}],31:[function(a,b,e){function d(a,b){a||(a="*");b=c(b||m);l.push(a);h.observe(b,{subtree:!0,childList:!0});a instanceof Node&&!m.contains(a)||f(c.call(b,a,!0))}function f(a){for(var c=!1,b,d=a.length;d--;)if(b=a[d],1===b.nodeType&&!n.has(b)){a:{for(var e=l.length,f=void 0;e--;){f=l[e];if(b===f)break a;if("string"===
typeof f&&b.matches(f))break a;if(b.contains(f)){b=f;break a}}b=void 0}b&&(c||(c=!0),n.add(b),g(b,k.attachedCallbackName,null,!0))}}a("emmy/on");var g=a("emmy/emit");a("emmy/off");var c=a("tiny-element"),m=document,k=b.exports=d;k.enable=d;k.disable=function(a){a=l.indexOf(a);0<=a&&l.splice(a,1)};k.attachedCallbackName="attached";k.detachedCallbackName="detached";var h=new (window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver)(function(a){a.forEach(function(a){f(a.addedNodes);
a=a.removedNodes;for(var c=a.length;c--;){var b=a[c];1===b.nodeType&&n.has(b)&&(g(b,k.detachedCallbackName,null,!0),n.delete(b))}})}),l=[],n=new WeakSet},{"emmy/emit":32,"emmy/off":40,"emmy/on":"emmy/on","tiny-element":41}],32:[function(a,b,e){function d(a,c,b,d){var e,p=c;m(a)||a===t?(k(c)?p=c:(p=n.createEvent("CustomEvent"),p.initCustomEvent(c,d,!0,b)),e=a.dispatchEvent):l&&a instanceof l?(p=l.Event(c,b),p.detail=b,e=d?targte.trigger:a.triggerHandler):e=a.dispatchEvent||a.emit||a.trigger||a.fire||
a.raise;var u=g(arguments,2);if(e&&f.freeze(a,"emit"+c))return e.apply(a,[p].concat(u)),f.unfreeze(a,"emit"+c),a;e=h(a,p);e=g(e);for(p=0;p<e.length;p++)e[p]&&e[p].apply(a,u);return a}var f=a("icicle"),g=a("sliced"),c=a("mutype/is-string"),m=a("mutype/is-node"),k=a("mutype/is-event"),h=a("./listeners");b.exports=function(a,b){if(a){var e=arguments;if(c(b))e=g(arguments,2),b.split(/\s+/).forEach(function(c){c=c.split(".")[0];d.apply(this,[a,c].concat(e))});else return d.apply(this,e)}};var l="undefined"===
typeof jQuery?void 0:jQuery,n="undefined"===typeof document?void 0:document,t="undefined"===typeof window?void 0:window},{"./listeners":33,icicle:34,"mutype/is-event":35,"mutype/is-node":36,"mutype/is-string":37,sliced:38}],33:[function(a,b,e){arguments[4][3][0].apply(e,arguments)},{dup:3}],34:[function(a,b,e){arguments[4][4][0].apply(e,arguments)},{dup:4}],35:[function(a,b,e){b.exports=function(a){return"undefined"!==typeof Event&&a instanceof Event}},{}],36:[function(a,b,e){b.exports=function(a){return"undefined"!==
typeof document&&a instanceof Node}},{}],37:[function(a,b,e){arguments[4][20][0].apply(e,arguments)},{dup:20}],38:[function(a,b,e){arguments[4][24][0].apply(e,arguments)},{"./lib/sliced":39,dup:24}],39:[function(a,b,e){arguments[4][25][0].apply(e,arguments)},{dup:25}],40:[function(a,b,e){function d(a,b,e){if(!a)return a;var l;if(void 0===e){var n=g(arguments,1),t=a.removeAll||a.removeAllListeners;t&&t.apply(a,n);if(b)b.split(/\s+/).forEach(function(b){var e=b.split(".");b=e.shift();l=c(a,b,e);for(e=
l.length;e--;)d(a,b,l[e])});else for(b in l=c(a),l)d(a,b);return a}var q=a.removeEventListener||a.removeListener||a.detachEvent||a.off;b.split(/\s+/).forEach(function(b){var d=b.split(".");b=d.shift();if(q)if(f.freeze(a,"off"+b))q.call(a,b,e),f.unfreeze(a,"off"+b);else return a;e.closedCall&&(e.closedCall=!1);c.remove(a,b,e,d)});return a}b.exports=d;var f=a("icicle"),g=a("sliced"),c=a("./listeners")},{"./listeners":33,icicle:34,sliced:38}],41:[function(a,b,e){var d=[].slice;b.exports=function(a,b){var c=
this===window?document:this;return"string"==typeof a?b?d.call(c.querySelectorAll(a),0):c.querySelector(a):a instanceof Node||a===window||!a.length?b?[a]:a:d.call(a,0)}},{}],42:[function(a,b,e){b.exports=a("./wrap")(function(a){return Math.log(a)/Math.log(10)})},{"./wrap":43}],43:[function(a,b,e){arguments[4][28][0].apply(e,arguments)},{dup:28}],44:[function(a,b,e){b.exports=function(a){for(var b=1;b<arguments.length;b++){var e=arguments[b],c;for(c in e)e.hasOwnProperty(c)&&(a[c]=e[c])}return a}},
{}],"emmy/on":[function(a,b,e){function d(a,b,d){if(!a)return a;var e=a.addEventListener||a.addListener||a.attachEvent||a.on;b.split(/\s+/).forEach(function(b){var m=b.split(".");b=m.shift();if(e)if(f.freeze(a,"on"+b))e.call(a,b,d),f.unfreeze(a,"on"+b);else return a;g.add(a,b,d,m)});return a}var f=a("icicle"),g=a("./listeners");b.exports=d;d.wrap=function(a,b,d,e){b=function(){if(e.apply(a,arguments))return d.apply(a,arguments)};b.fn=d;return b}},{"./listeners":3,icicle:4}],getusermedia:[function(a,
b,e){var d=window.navigator.getUserMedia||window.navigator.webkitGetUserMedia||window.navigator.mozGetUserMedia||window.navigator.msGetUserMedia;b.exports=function(a,b){var c,e={video:!0,audio:!0};2!==arguments.length&&(b=a,a=e);if(!d)return c=Error("MediaStreamError"),c.name="NotSupportedError",window.setTimeout(function(){b(c)},0);if(!a.audio&&!a.video)return c=Error("MediaStreamError"),c.name="NoMediaRequestedError",window.setTimeout(function(){b(c)},0);localStorage&&"true"===localStorage.useFirefoxFakeDevice&&
(a.fake=!0);d.call(window.navigator,a,function(a){b(null,a)},function(a){var c;"string"===typeof a?(c=Error("MediaStreamError"),c.name="PermissionDeniedError"===a||"PERMISSION_DENIED"===a?"PermissionDeniedError":"ConstraintNotSatisfiedError"):(c=a,c.name||(a.name=c.PermissionDeniedError?"PermissionDeniedError":"ConstraintNotSatisfiedError"));b(c)})}},{}],queried:[function(a,b,e){e=a("get-doc");var d=a("./lib/");try{e.querySelector(":scope")}catch(f){d.registerFilter("scope",a("./lib/pseudos/scope"))}try{e.querySelector(":has")}catch(g){d.registerFilter("has",
a("./lib/pseudos/has")),d.registerFilter("not",a("./lib/pseudos/not"))}try{e.querySelector(":root")}catch(c){d.registerFilter("root",a("./lib/pseudos/root"))}try{e.querySelector(":matches")}catch(m){d.registerFilter("matches",a("./lib/pseudos/matches"))}b.exports=d},{"./lib/":5,"./lib/pseudos/has":6,"./lib/pseudos/matches":7,"./lib/pseudos/not":8,"./lib/pseudos/root":9,"./lib/pseudos/scope":10,"get-doc":14}]},{},[]);