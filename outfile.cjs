#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/registry.npmmirror.com+minimist@1.2.8/node_modules/minimist/index.js
var require_minimist = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+minimist@1.2.8/node_modules/minimist/index.js"(exports, module2) {
    "use strict";
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    function isNumber(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
    module2.exports = function(args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      if (typeof opts.unknown === "function") {
        flags.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags.allBools = true;
      } else {
        [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          [].concat(aliases[key2]).forEach(function(k) {
            flags.strings[k] = true;
          });
        }
      });
      var defaults = opts.default || {};
      var argv2 = { _: [] };
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setKey(obj, keys, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2)) {
            return;
          }
          if (o[key2] === void 0) {
            o[key2] = {};
          }
          if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype) {
            o[key2] = {};
          }
          if (o[key2] === Array.prototype) {
            o[key2] = [];
          }
          o = o[key2];
        }
        var lastKey = keys[keys.length - 1];
        if (isConstructorOrProto(o, lastKey)) {
          return;
        }
        if (o === Object.prototype || o === Number.prototype || o === String.prototype) {
          o = {};
        }
        if (o === Array.prototype) {
          o = [];
        }
        if (o[lastKey] === void 0 || flags.bools[lastKey] || typeof o[lastKey] === "boolean") {
          o[lastKey] = value2;
        } else if (Array.isArray(o[lastKey])) {
          o[lastKey].push(value2);
        } else {
          o[lastKey] = [o[lastKey], value2];
        }
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv2, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x) {
          setKey(argv2, x.split("."), value2);
        });
      }
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv2._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv2._.push.apply(argv2._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function(k) {
        if (!hasKey(argv2, k.split("."))) {
          setKey(argv2, k.split("."), defaults[k]);
          (aliases[k] || []).forEach(function(x) {
            setKey(argv2, x.split("."), defaults[k]);
          });
        }
      });
      if (opts["--"]) {
        argv2["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function(k) {
          argv2._.push(k);
        });
      }
      return argv2;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+kleur@3.0.3/node_modules/kleur/index.js
var require_kleur = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+kleur@3.0.3/node_modules/kleur/index.js"(exports, module2) {
    "use strict";
    var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
    var $ = {
      enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
      // modifiers
      reset: init2(0, 0),
      bold: init2(1, 22),
      dim: init2(2, 22),
      italic: init2(3, 23),
      underline: init2(4, 24),
      inverse: init2(7, 27),
      hidden: init2(8, 28),
      strikethrough: init2(9, 29),
      // colors
      black: init2(30, 39),
      red: init2(31, 39),
      green: init2(32, 39),
      yellow: init2(33, 39),
      blue: init2(34, 39),
      magenta: init2(35, 39),
      cyan: init2(36, 39),
      white: init2(37, 39),
      gray: init2(90, 39),
      grey: init2(90, 39),
      // background colors
      bgBlack: init2(40, 49),
      bgRed: init2(41, 49),
      bgGreen: init2(42, 49),
      bgYellow: init2(43, 49),
      bgBlue: init2(44, 49),
      bgMagenta: init2(45, 49),
      bgCyan: init2(46, 49),
      bgWhite: init2(47, 49)
    };
    function run(arr, str) {
      let i = 0, tmp, beg = "", end = "";
      for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (str.includes(tmp.close)) {
          str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
      }
      return beg + str + end;
    }
    function chain(has, keys) {
      let ctx = { has, keys };
      ctx.reset = $.reset.bind(ctx);
      ctx.bold = $.bold.bind(ctx);
      ctx.dim = $.dim.bind(ctx);
      ctx.italic = $.italic.bind(ctx);
      ctx.underline = $.underline.bind(ctx);
      ctx.inverse = $.inverse.bind(ctx);
      ctx.hidden = $.hidden.bind(ctx);
      ctx.strikethrough = $.strikethrough.bind(ctx);
      ctx.black = $.black.bind(ctx);
      ctx.red = $.red.bind(ctx);
      ctx.green = $.green.bind(ctx);
      ctx.yellow = $.yellow.bind(ctx);
      ctx.blue = $.blue.bind(ctx);
      ctx.magenta = $.magenta.bind(ctx);
      ctx.cyan = $.cyan.bind(ctx);
      ctx.white = $.white.bind(ctx);
      ctx.gray = $.gray.bind(ctx);
      ctx.grey = $.grey.bind(ctx);
      ctx.bgBlack = $.bgBlack.bind(ctx);
      ctx.bgRed = $.bgRed.bind(ctx);
      ctx.bgGreen = $.bgGreen.bind(ctx);
      ctx.bgYellow = $.bgYellow.bind(ctx);
      ctx.bgBlue = $.bgBlue.bind(ctx);
      ctx.bgMagenta = $.bgMagenta.bind(ctx);
      ctx.bgCyan = $.bgCyan.bind(ctx);
      ctx.bgWhite = $.bgWhite.bind(ctx);
      return ctx;
    }
    function init2(open, close) {
      let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, "g")
      };
      return function(txt) {
        if (this !== void 0 && this.has !== void 0) {
          this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
          return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
        }
        return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
      };
    }
    module2.exports = $;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/action.js
var require_action = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/action.js"(exports, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/strip.js
var require_strip = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/strip.js"(exports, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/clear.js
var require_clear = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/clear.js"(exports, module2) {
    "use strict";
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    var strip = require_strip();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      var _iterator = _createForOfIteratorHelper(lines), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let line = _step.value;
          rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/figures.js
var require_figures = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/figures.js"(exports, module2) {
    "use strict";
    var main2 = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main2.arrowUp,
      arrowDown: main2.arrowDown,
      arrowLeft: main2.arrowLeft,
      arrowRight: main2.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main2;
    module2.exports = figures;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/style.js
var require_style = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/style.js"(exports, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures();
    var styles4 = Object.freeze({
      password: {
        scale: 1,
        render: (input) => "*".repeat(input.length)
      },
      emoji: {
        scale: 2,
        render: (input) => "\u{1F603}".repeat(input.length)
      },
      invisible: {
        scale: 0,
        render: (input) => ""
      },
      default: {
        scale: 1,
        render: (input) => `${input}`
      }
    });
    var render = (type) => styles4[type] || styles4.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles: styles4,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/lines.js
var require_lines = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/lines.js"(exports, module2) {
    "use strict";
    var strip = require_strip();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/wrap.js
var require_wrap = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/entriesToDisplay.js"(exports, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return {
        startIndex,
        endIndex
      };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/index.js
var require_util = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/util/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      action: require_action(),
      clear: require_clear(),
      style: require_style(),
      strip: require_strip(),
      figures: require_figures(),
      lines: require_lines(),
      wrap: require_wrap(),
      entriesToDisplay: require_entriesToDisplay()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/prompt.js
var require_prompt = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/prompt.js"(exports, module2) {
    "use strict";
    var readline = require("readline");
    var _require = require_util();
    var action = _require.action;
    var EventEmitter = require("events");
    var _require2 = require_src();
    var beep = _require2.beep;
    var cursor = _require2.cursor;
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({
          input: this.in,
          escapeCodeTimeout: 50
        });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/text.js
var require_text = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/text.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var figures = _require2.figures;
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          _this2.value = _this2.value || _this2.initial;
          _this2.cursorOffset = 0;
          _this2.cursor = _this2.rendered.length;
          yield _this2.validate();
          if (_this2.error) {
            _this2.red = true;
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/select.js
var require_select = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/select.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var wrap = _require.wrap;
    var entriesToDisplay = _require.entriesToDisplay;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, {
                    margin: 3,
                    width: this.out.columns
                  });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/toggle.js
var require_toggle = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/toggle.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var erase = _require2.erase;
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray("/"), this.value ? color.cyan().underline(this.active) : this.active].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/datepart.js
var require_datepart = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/datepart.js"(exports, module2) {
    "use strict";
    var DatePart = class {
      constructor({
        token,
        date,
        parts,
        locales
      }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/meridiem.js
var require_meridiem = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/meridiem.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/day.js
var require_day = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/day.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/hours.js
var require_hours = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/hours.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/milliseconds.js
var require_milliseconds = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/milliseconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/minutes.js
var require_minutes = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/minutes.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/month.js
var require_month = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/month.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/seconds.js
var require_seconds = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/seconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/year.js
var require_year = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/year.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/index.js
var require_dateparts = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/dateparts/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart(),
      Meridiem: require_meridiem(),
      Day: require_day(),
      Hours: require_hours(),
      Milliseconds: require_milliseconds(),
      Minutes: require_minutes(),
      Month: require_month(),
      Seconds: require_seconds(),
      Year: require_year()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/date.js
var require_date = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/date.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var _require3 = require_dateparts();
    var DatePart = _require3.DatePart;
    var Meridiem = _require3.Meridiem;
    var Day = _require3.Day;
    var Hours = _require3.Hours;
    var Milliseconds = _require3.Milliseconds;
    var Minutes = _require3.Minutes;
    var Month = _require3.Month;
    var Seconds = _require3.Seconds;
    var Year = _require3.Year;
    var regex2 = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({
        token
      }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex2.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({
            token: result[idx] || match,
            date: this.date,
            parts: this.parts,
            locales: this.locales
          }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === "string") {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = "red";
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/number.js
var require_number = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/number.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var cursor = _require.cursor;
    var erase = _require.erase;
    var _require2 = require_util();
    var style = _require2.style;
    var figures = _require2.figures;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = `red`;
            _this2.fire();
            _this2.render();
            return;
          }
          let x = _this2.value;
          _this2.value = x !== `` ? x : _this2.initial;
          _this2.done = true;
          _this2.aborted = false;
          _this2.error = false;
          _this2.fire();
          _this2.render();
          _this2.out.write(`
`);
          _this2.close();
        })();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/multiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var Prompt = require_prompt();
    var _require2 = require_util();
    var clear = _require2.clear;
    var figures = _require2.figures;
    var style = _require2.style;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, {
                margin: prefix.length,
                width: this.out.columns
              });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let _entriesToDisplay = entriesToDisplay(this.cursor, options.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/autocomplete.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var figures = _require2.figures;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = {
          noMatches: opts.noMatches || "no matches found"
        };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = {
            title: this._fb
          };
        return choice || this._fb || {
          title: this.i18n.noMatches
        };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      complete(cb) {
        var _this = this;
        return _asyncToGenerator(function* () {
          const p = _this.completing = _this.suggest(_this.input, _this.choices);
          const suggestions = yield p;
          if (_this.completing !== p)
            return;
          _this.suggestions = suggestions.map((s, i, arr) => ({
            title: getTitle(arr, i),
            value: getVal(arr, i),
            description: s.description
          }));
          _this.completing = false;
          const l = Math.max(suggestions.length - 1, 0);
          _this.moveSelect(Math.min(l, _this.select));
          cb && cb();
        })();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, {
              margin: 3,
              width: this.out.columns
            });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.select, this.choices.length, this.limit), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted, this.exited), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(item, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/autocompleteMultiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var MultiselectPrompt = require_multiselect();
    var _require2 = require_util();
    var clear = _require2.clear;
    var style = _require2.style;
    var figures = _require2.figures;
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/confirm.js
var require_confirm = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/confirm.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/index.js
var require_elements = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/elements/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text(),
      SelectPrompt: require_select(),
      TogglePrompt: require_toggle(),
      DatePrompt: require_date(),
      NumberPrompt: require_number(),
      MultiselectPrompt: require_multiselect(),
      AutocompletePrompt: require_autocomplete(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
      ConfirmPrompt: require_confirm()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/prompts.js
var require_prompts = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/prompts.js"(exports) {
    "use strict";
    var $ = exports;
    var el = require_elements();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit2 = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit2(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/dist/index.js"(exports, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var prompts2 = require_prompts();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    function prompt() {
      return _prompt.apply(this, arguments);
    }
    function _prompt() {
      _prompt = _asyncToGenerator(function* (questions = [], {
        onSubmit = noop,
        onCancel = noop
      } = {}) {
        const answers = {};
        const override2 = prompt._override || {};
        questions = [].concat(questions);
        let answer, question, quit, name, type, lastPrompt;
        const getFormattedAnswer = /* @__PURE__ */ function() {
          var _ref = _asyncToGenerator(function* (question2, answer2, skipValidation = false) {
            if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
              return;
            }
            return question2.format ? yield question2.format(answer2, answers) : answer2;
          });
          return function getFormattedAnswer2(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }();
        var _iterator = _createForOfIteratorHelper(questions), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            question = _step.value;
            var _question = question;
            name = _question.name;
            type = _question.type;
            if (typeof type === "function") {
              type = yield type(answer, _objectSpread({}, answers), question);
              question["type"] = type;
            }
            if (!type)
              continue;
            for (let key in question) {
              if (passOn.includes(key))
                continue;
              let value = question[key];
              question[key] = typeof value === "function" ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
            }
            lastPrompt = question;
            if (typeof question.message !== "string") {
              throw new Error("prompt message is required");
            }
            var _question2 = question;
            name = _question2.name;
            type = _question2.type;
            if (prompts2[type] === void 0) {
              throw new Error(`prompt type (${type}) is not defined`);
            }
            if (override2[question.name] !== void 0) {
              answer = yield getFormattedAnswer(question, override2[question.name]);
              if (answer !== void 0) {
                answers[name] = answer;
                continue;
              }
            }
            try {
              answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : yield prompts2[type](question);
              answers[name] = answer = yield getFormattedAnswer(question, answer, true);
              quit = yield onSubmit(question, answer, answers);
            } catch (err) {
              quit = !(yield onCancel(question, answers));
            }
            if (quit)
              return answers;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return answers;
      });
      return _prompt.apply(this, arguments);
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, {
      prompt,
      prompts: prompts2,
      inject,
      override
    });
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/action.js
var require_action2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/action.js"(exports, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/strip.js
var require_strip2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/strip.js"(exports, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/clear.js
var require_clear2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/clear.js"(exports, module2) {
    "use strict";
    var strip = require_strip2();
    var { erase, cursor } = require_src();
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
      return erase.lines(rows);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/figures.js
var require_figures2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/figures.js"(exports, module2) {
    "use strict";
    var main2 = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main2.arrowUp,
      arrowDown: main2.arrowDown,
      arrowLeft: main2.arrowLeft,
      arrowRight: main2.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main2;
    module2.exports = figures;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/style.js
var require_style2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/style.js"(exports, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures2();
    var styles4 = Object.freeze({
      password: { scale: 1, render: (input) => "*".repeat(input.length) },
      emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
      invisible: { scale: 0, render: (input) => "" },
      default: { scale: 1, render: (input) => `${input}` }
    });
    var render = (type) => styles4[type] || styles4.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles: styles4,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/lines.js
var require_lines2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/lines.js"(exports, module2) {
    "use strict";
    var strip = require_strip2();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/wrap.js
var require_wrap2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/entriesToDisplay.js"(exports, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return { startIndex, endIndex };
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/index.js
var require_util2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/util/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      action: require_action2(),
      clear: require_clear2(),
      style: require_style2(),
      strip: require_strip2(),
      figures: require_figures2(),
      lines: require_lines2(),
      wrap: require_wrap2(),
      entriesToDisplay: require_entriesToDisplay2()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/prompt.js
var require_prompt2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/prompt.js"(exports, module2) {
    "use strict";
    var readline = require("readline");
    var { action } = require_util2();
    var EventEmitter = require("events");
    var { beep, cursor } = require_src();
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/text.js
var require_text2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/text.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, lines, figures } = require_util2();
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        this.value = this.value || this.initial;
        this.cursorOffset = 0;
        this.cursor = this.rendered.length;
        await this.validate();
        if (this.error) {
          this.red = true;
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.red ? color.red(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/select.js
var require_select2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/select.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var { cursor } = require_src();
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
        ].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/toggle.js
var require_toggle2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/toggle.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { cursor, erase } = require_src();
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan().underline(this.inactive),
          color.gray("/"),
          this.value ? color.cyan().underline(this.active) : this.active
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/datepart.js
var require_datepart2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/datepart.js"(exports, module2) {
    "use strict";
    var DatePart = class {
      constructor({ token, date, parts, locales }) {
        this.token = token;
        this.date = date || /* @__PURE__ */ new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/meridiem.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/day.js
var require_day2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/day.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/hours.js
var require_hours2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/hours.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/milliseconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/minutes.js
var require_minutes2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/minutes.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/month.js
var require_month2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/month.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/seconds.js
var require_seconds2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/seconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/year.js
var require_year2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/year.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/index.js
var require_dateparts2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/dateparts/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart2(),
      Meridiem: require_meridiem2(),
      Day: require_day2(),
      Hours: require_hours2(),
      Milliseconds: require_milliseconds2(),
      Minutes: require_minutes2(),
      Month: require_month2(),
      Seconds: require_seconds2(),
      Year: require_year2()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/date.js
var require_date2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/date.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures } = require_util2();
    var { erase, cursor } = require_src();
    var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts2();
    var regex2 = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({ token }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      // Day // TODO
      3: (opts) => new Month(opts),
      // Month
      4: (opts) => new Year(opts),
      // Year
      5: (opts) => new Meridiem(opts),
      // AM/PM // TODO (special)
      6: (opts) => new Hours(opts),
      // Hours
      7: (opts) => new Minutes(opts),
      // Minutes
      8: (opts) => new Seconds(opts),
      // Seconds
      9: (opts) => new Milliseconds(opts)
      // Fractional seconds
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || /* @__PURE__ */ new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex2.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === "string") {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = "red";
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
        ].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce(
            (a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`,
            ``
          );
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/number.js
var require_number2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/number.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { cursor, erase } = require_src();
    var { style, figures, clear, lines } = require_util2();
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = `red`;
          this.fire();
          this.render();
          return;
        }
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = true;
        this.aborted = false;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/multiselect.js
var require_multiselect2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/multiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var Prompt = require_prompt2();
    var { clear, figures, style, wrap, entriesToDisplay } = require_util2();
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, { margin: prefix.length, width: this.out.columns });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      // shared with autocompleteMultiselect
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      // shared with autocomleteMultiselect
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/autocomplete.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = { noMatches: opts.noMatches || "no matches found" };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = { title: this._fb };
        return choice || this._fb || { title: this.i18n.noMatches };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      async complete(cb) {
        const p = this.completing = this.suggest(this.input, this.choices);
        const suggestions = await p;
        if (this.completing !== p)
          return;
        this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
        this.completing = false;
        const l = Math.max(suggestions.length - 1, 0);
        this.moveSelect(Math.min(l, this.select));
        cb && cb();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
        this.outputText = [
          style.symbol(this.done, this.aborted, this.exited),
          color.bold(this.msg),
          style.delimiter(this.completing),
          this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
        ].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(
            item,
            this.select === i + startIndex,
            i === 0 && startIndex > 0,
            i + startIndex === endIndex - 1 && endIndex < this.choices.length
          )).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/autocompleteMultiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var MultiselectPrompt = require_multiselect2();
    var { clear, style, figures } = require_util2();
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/confirm.js
var require_confirm2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/confirm.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { erase, cursor } = require_src();
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/index.js
var require_elements2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/elements/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text2(),
      SelectPrompt: require_select2(),
      TogglePrompt: require_toggle2(),
      DatePrompt: require_date2(),
      NumberPrompt: require_number2(),
      MultiselectPrompt: require_multiselect2(),
      AutocompletePrompt: require_autocomplete2(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect2(),
      ConfirmPrompt: require_confirm2()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/prompts.js
var require_prompts2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/prompts.js"(exports) {
    "use strict";
    var $ = exports;
    var el = require_elements2();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit2 = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit2(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(
      choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
    );
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/lib/index.js"(exports, module2) {
    "use strict";
    var prompts2 = require_prompts2();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
      const answers = {};
      const override2 = prompt._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
        if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
          return;
        }
        return question2.format ? await question2.format(answer2, answers) : answer2;
      };
      for (question of questions) {
        ({ name, type } = question);
        if (typeof type === "function") {
          type = await type(answer, { ...answers }, question);
          question["type"] = type;
        }
        if (!type)
          continue;
        for (let key in question) {
          if (passOn.includes(key))
            continue;
          let value = question[key];
          question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
        }
        lastPrompt = question;
        if (typeof question.message !== "string") {
          throw new Error("prompt message is required");
        }
        ({ name, type } = question);
        if (prompts2[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }
        if (override2[question.name] !== void 0) {
          answer = await getFormattedAnswer(question, override2[question.name]);
          if (answer !== void 0) {
            answers[name] = answer;
            continue;
          }
        }
        try {
          answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts2[type](question);
          answers[name] = answer = await getFormattedAnswer(question, answer, true);
          quit = await onSubmit(question, answer, answers);
        } catch (err) {
          quit = !await onCancel(question, answers);
        }
        if (quit)
          return answers;
      }
      return answers;
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, { prompt, prompts: prompts2, inject, override });
  }
});

// node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/index.js
var require_prompts3 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+prompts@2.4.2/node_modules/prompts/index.js"(exports, module2) {
    function isNodeLT(tar) {
      tar = (Array.isArray(tar) ? tar : tar.split(".")).map(Number);
      let i = 0, src = process.versions.node.split(".").map(Number);
      for (; i < tar.length; i++) {
        if (src[i] > tar[i])
          return false;
        if (tar[i] > src[i])
          return true;
      }
      return false;
    }
    module2.exports = isNodeLT("8.6.0") ? require_dist() : require_lib();
  }
});

// node_modules/.pnpm/emoji-regex@10.4.0/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/.pnpm/emoji-regex@10.4.0/node_modules/emoji-regex/index.js"(exports, module2) {
    module2.exports = () => {
      return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE89\uDE8F-\uDEC2\uDEC6\uDECE-\uDEDC\uDEDF-\uDEE9]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
  }
});

// node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/boxes.json
var require_boxes = __commonJS({
  "node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/boxes.json"(exports, module2) {
    module2.exports = {
      single: {
        topLeft: "\u250C",
        top: "\u2500",
        topRight: "\u2510",
        right: "\u2502",
        bottomRight: "\u2518",
        bottom: "\u2500",
        bottomLeft: "\u2514",
        left: "\u2502"
      },
      double: {
        topLeft: "\u2554",
        top: "\u2550",
        topRight: "\u2557",
        right: "\u2551",
        bottomRight: "\u255D",
        bottom: "\u2550",
        bottomLeft: "\u255A",
        left: "\u2551"
      },
      round: {
        topLeft: "\u256D",
        top: "\u2500",
        topRight: "\u256E",
        right: "\u2502",
        bottomRight: "\u256F",
        bottom: "\u2500",
        bottomLeft: "\u2570",
        left: "\u2502"
      },
      bold: {
        topLeft: "\u250F",
        top: "\u2501",
        topRight: "\u2513",
        right: "\u2503",
        bottomRight: "\u251B",
        bottom: "\u2501",
        bottomLeft: "\u2517",
        left: "\u2503"
      },
      singleDouble: {
        topLeft: "\u2553",
        top: "\u2500",
        topRight: "\u2556",
        right: "\u2551",
        bottomRight: "\u255C",
        bottom: "\u2500",
        bottomLeft: "\u2559",
        left: "\u2551"
      },
      doubleSingle: {
        topLeft: "\u2552",
        top: "\u2550",
        topRight: "\u2555",
        right: "\u2502",
        bottomRight: "\u255B",
        bottom: "\u2550",
        bottomLeft: "\u2558",
        left: "\u2502"
      },
      classic: {
        topLeft: "+",
        top: "-",
        topRight: "+",
        right: "|",
        bottomRight: "+",
        bottom: "-",
        bottomLeft: "+",
        left: "|"
      },
      arrow: {
        topLeft: "\u2198",
        top: "\u2193",
        topRight: "\u2199",
        right: "\u2190",
        bottomRight: "\u2196",
        bottom: "\u2191",
        bottomLeft: "\u2197",
        left: "\u2192"
      }
    };
  }
});

// node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/index.js
var require_cli_boxes = __commonJS({
  "node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/index.js"(exports, module2) {
    "use strict";
    var cliBoxes2 = require_boxes();
    module2.exports = cliBoxes2;
    module2.exports.default = cliBoxes2;
  }
});

// node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js"(exports, module2) {
    "use strict";
    var ansiRegex2 = require_ansi_regex();
    module2.exports = (string) => typeof string === "string" ? string.replace(ansiRegex2(), "") : string;
  }
});

// node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS({
  "node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js"(exports, module2) {
    "use strict";
    var isFullwidthCodePoint = (codePoint) => {
      if (Number.isNaN(codePoint)) {
        return false;
      }
      if (codePoint >= 4352 && (codePoint <= 4447 || // Hangul Jamo
      codePoint === 9001 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 9002 || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      12880 <= codePoint && codePoint <= 19903 || // CJK Unified Ideographs .. Yi Radicals
      19968 <= codePoint && codePoint <= 42182 || // Hangul Jamo Extended-A
      43360 <= codePoint && codePoint <= 43388 || // Hangul Syllables
      44032 <= codePoint && codePoint <= 55203 || // CJK Compatibility Ideographs
      63744 <= codePoint && codePoint <= 64255 || // Vertical Forms
      65040 <= codePoint && codePoint <= 65049 || // CJK Compatibility Forms .. Small Form Variants
      65072 <= codePoint && codePoint <= 65131 || // Halfwidth and Fullwidth Forms
      65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || // Kana Supplement
      110592 <= codePoint && codePoint <= 110593 || // Enclosed Ideographic Supplement
      127488 <= codePoint && codePoint <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      131072 <= codePoint && codePoint <= 262141)) {
        return true;
      }
      return false;
    };
    module2.exports = isFullwidthCodePoint;
    module2.exports.default = isFullwidthCodePoint;
  }
});

// node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js
var require_emoji_regex2 = __commonJS({
  "node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js
var require_string_width = __commonJS({
  "node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js"(exports, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var isFullwidthCodePoint = require_is_fullwidth_code_point();
    var emojiRegex2 = require_emoji_regex2();
    var stringWidth2 = (string) => {
      if (typeof string !== "string" || string.length === 0) {
        return 0;
      }
      string = stripAnsi2(string);
      if (string.length === 0) {
        return 0;
      }
      string = string.replace(emojiRegex2(), "  ");
      let width = 0;
      for (let i = 0; i < string.length; i++) {
        const code = string.codePointAt(i);
        if (code <= 31 || code >= 127 && code <= 159) {
          continue;
        }
        if (code >= 768 && code <= 879) {
          continue;
        }
        if (code > 65535) {
          i++;
        }
        width += isFullwidthCodePoint(code) ? 2 : 1;
      }
      return width;
    };
    module2.exports = stringWidth2;
    module2.exports.default = stringWidth2;
  }
});

// node_modules/.pnpm/ansi-align@3.0.1/node_modules/ansi-align/index.js
var require_ansi_align = __commonJS({
  "node_modules/.pnpm/ansi-align@3.0.1/node_modules/ansi-align/index.js"(exports, module2) {
    "use strict";
    var stringWidth2 = require_string_width();
    function ansiAlign2(text, opts) {
      if (!text)
        return text;
      opts = opts || {};
      const align = opts.align || "center";
      if (align === "left")
        return text;
      const split = opts.split || "\n";
      const pad = opts.pad || " ";
      const widthDiffFn = align !== "right" ? halfDiff : fullDiff;
      let returnString = false;
      if (!Array.isArray(text)) {
        returnString = true;
        text = String(text).split(split);
      }
      let width;
      let maxWidth = 0;
      text = text.map(function(str) {
        str = String(str);
        width = stringWidth2(str);
        maxWidth = Math.max(width, maxWidth);
        return {
          str,
          width
        };
      }).map(function(obj) {
        return new Array(widthDiffFn(maxWidth, obj.width) + 1).join(pad) + obj.str;
      });
      return returnString ? text.join(split) : text;
    }
    ansiAlign2.left = function left(text) {
      return ansiAlign2(text, { align: "left" });
    };
    ansiAlign2.center = function center(text) {
      return ansiAlign2(text, { align: "center" });
    };
    ansiAlign2.right = function right(text) {
      return ansiAlign2(text, { align: "right" });
    };
    module2.exports = ansiAlign2;
    function halfDiff(maxWidth, curWidth) {
      return Math.floor((maxWidth - curWidth) / 2);
    }
    function fullDiff(maxWidth, curWidth) {
      return maxWidth - curWidth;
    }
  }
});

// node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/spinners.json
var require_spinners = __commonJS({
  "node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/spinners.json"(exports, module2) {
    module2.exports = {
      dots: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u2839",
          "\u2838",
          "\u283C",
          "\u2834",
          "\u2826",
          "\u2827",
          "\u2807",
          "\u280F"
        ]
      },
      dots2: {
        interval: 80,
        frames: [
          "\u28FE",
          "\u28FD",
          "\u28FB",
          "\u28BF",
          "\u287F",
          "\u28DF",
          "\u28EF",
          "\u28F7"
        ]
      },
      dots3: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u281A",
          "\u281E",
          "\u2816",
          "\u2826",
          "\u2834",
          "\u2832",
          "\u2833",
          "\u2813"
        ]
      },
      dots4: {
        interval: 80,
        frames: [
          "\u2804",
          "\u2806",
          "\u2807",
          "\u280B",
          "\u2819",
          "\u2838",
          "\u2830",
          "\u2820",
          "\u2830",
          "\u2838",
          "\u2819",
          "\u280B",
          "\u2807",
          "\u2806"
        ]
      },
      dots5: {
        interval: 80,
        frames: [
          "\u280B",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B"
        ]
      },
      dots6: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2809",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2824",
          "\u2804",
          "\u2804",
          "\u2824",
          "\u2834",
          "\u2832",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u281A",
          "\u2819",
          "\u2809",
          "\u2801"
        ]
      },
      dots7: {
        interval: 80,
        frames: [
          "\u2808",
          "\u2809",
          "\u280B",
          "\u2813",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2816",
          "\u2826",
          "\u2824",
          "\u2820",
          "\u2820",
          "\u2824",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B",
          "\u2809",
          "\u2808"
        ]
      },
      dots8: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2801",
          "\u2809",
          "\u2819",
          "\u281A",
          "\u2812",
          "\u2802",
          "\u2802",
          "\u2812",
          "\u2832",
          "\u2834",
          "\u2824",
          "\u2804",
          "\u2804",
          "\u2824",
          "\u2820",
          "\u2820",
          "\u2824",
          "\u2826",
          "\u2816",
          "\u2812",
          "\u2810",
          "\u2810",
          "\u2812",
          "\u2813",
          "\u280B",
          "\u2809",
          "\u2808",
          "\u2808"
        ]
      },
      dots9: {
        interval: 80,
        frames: [
          "\u28B9",
          "\u28BA",
          "\u28BC",
          "\u28F8",
          "\u28C7",
          "\u2867",
          "\u2857",
          "\u284F"
        ]
      },
      dots10: {
        interval: 80,
        frames: [
          "\u2884",
          "\u2882",
          "\u2881",
          "\u2841",
          "\u2848",
          "\u2850",
          "\u2860"
        ]
      },
      dots11: {
        interval: 100,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2840",
          "\u2880",
          "\u2820",
          "\u2810",
          "\u2808"
        ]
      },
      dots12: {
        interval: 80,
        frames: [
          "\u2880\u2800",
          "\u2840\u2800",
          "\u2804\u2800",
          "\u2882\u2800",
          "\u2842\u2800",
          "\u2805\u2800",
          "\u2883\u2800",
          "\u2843\u2800",
          "\u280D\u2800",
          "\u288B\u2800",
          "\u284B\u2800",
          "\u280D\u2801",
          "\u288B\u2801",
          "\u284B\u2801",
          "\u280D\u2809",
          "\u280B\u2809",
          "\u280B\u2809",
          "\u2809\u2819",
          "\u2809\u2819",
          "\u2809\u2829",
          "\u2808\u2899",
          "\u2808\u2859",
          "\u2888\u2829",
          "\u2840\u2899",
          "\u2804\u2859",
          "\u2882\u2829",
          "\u2842\u2898",
          "\u2805\u2858",
          "\u2883\u2828",
          "\u2843\u2890",
          "\u280D\u2850",
          "\u288B\u2820",
          "\u284B\u2880",
          "\u280D\u2841",
          "\u288B\u2801",
          "\u284B\u2801",
          "\u280D\u2809",
          "\u280B\u2809",
          "\u280B\u2809",
          "\u2809\u2819",
          "\u2809\u2819",
          "\u2809\u2829",
          "\u2808\u2899",
          "\u2808\u2859",
          "\u2808\u2829",
          "\u2800\u2899",
          "\u2800\u2859",
          "\u2800\u2829",
          "\u2800\u2898",
          "\u2800\u2858",
          "\u2800\u2828",
          "\u2800\u2890",
          "\u2800\u2850",
          "\u2800\u2820",
          "\u2800\u2880",
          "\u2800\u2840"
        ]
      },
      dots13: {
        interval: 80,
        frames: [
          "\u28FC",
          "\u28F9",
          "\u28BB",
          "\u283F",
          "\u285F",
          "\u28CF",
          "\u28E7",
          "\u28F6"
        ]
      },
      dots8Bit: {
        interval: 80,
        frames: [
          "\u2800",
          "\u2801",
          "\u2802",
          "\u2803",
          "\u2804",
          "\u2805",
          "\u2806",
          "\u2807",
          "\u2840",
          "\u2841",
          "\u2842",
          "\u2843",
          "\u2844",
          "\u2845",
          "\u2846",
          "\u2847",
          "\u2808",
          "\u2809",
          "\u280A",
          "\u280B",
          "\u280C",
          "\u280D",
          "\u280E",
          "\u280F",
          "\u2848",
          "\u2849",
          "\u284A",
          "\u284B",
          "\u284C",
          "\u284D",
          "\u284E",
          "\u284F",
          "\u2810",
          "\u2811",
          "\u2812",
          "\u2813",
          "\u2814",
          "\u2815",
          "\u2816",
          "\u2817",
          "\u2850",
          "\u2851",
          "\u2852",
          "\u2853",
          "\u2854",
          "\u2855",
          "\u2856",
          "\u2857",
          "\u2818",
          "\u2819",
          "\u281A",
          "\u281B",
          "\u281C",
          "\u281D",
          "\u281E",
          "\u281F",
          "\u2858",
          "\u2859",
          "\u285A",
          "\u285B",
          "\u285C",
          "\u285D",
          "\u285E",
          "\u285F",
          "\u2820",
          "\u2821",
          "\u2822",
          "\u2823",
          "\u2824",
          "\u2825",
          "\u2826",
          "\u2827",
          "\u2860",
          "\u2861",
          "\u2862",
          "\u2863",
          "\u2864",
          "\u2865",
          "\u2866",
          "\u2867",
          "\u2828",
          "\u2829",
          "\u282A",
          "\u282B",
          "\u282C",
          "\u282D",
          "\u282E",
          "\u282F",
          "\u2868",
          "\u2869",
          "\u286A",
          "\u286B",
          "\u286C",
          "\u286D",
          "\u286E",
          "\u286F",
          "\u2830",
          "\u2831",
          "\u2832",
          "\u2833",
          "\u2834",
          "\u2835",
          "\u2836",
          "\u2837",
          "\u2870",
          "\u2871",
          "\u2872",
          "\u2873",
          "\u2874",
          "\u2875",
          "\u2876",
          "\u2877",
          "\u2838",
          "\u2839",
          "\u283A",
          "\u283B",
          "\u283C",
          "\u283D",
          "\u283E",
          "\u283F",
          "\u2878",
          "\u2879",
          "\u287A",
          "\u287B",
          "\u287C",
          "\u287D",
          "\u287E",
          "\u287F",
          "\u2880",
          "\u2881",
          "\u2882",
          "\u2883",
          "\u2884",
          "\u2885",
          "\u2886",
          "\u2887",
          "\u28C0",
          "\u28C1",
          "\u28C2",
          "\u28C3",
          "\u28C4",
          "\u28C5",
          "\u28C6",
          "\u28C7",
          "\u2888",
          "\u2889",
          "\u288A",
          "\u288B",
          "\u288C",
          "\u288D",
          "\u288E",
          "\u288F",
          "\u28C8",
          "\u28C9",
          "\u28CA",
          "\u28CB",
          "\u28CC",
          "\u28CD",
          "\u28CE",
          "\u28CF",
          "\u2890",
          "\u2891",
          "\u2892",
          "\u2893",
          "\u2894",
          "\u2895",
          "\u2896",
          "\u2897",
          "\u28D0",
          "\u28D1",
          "\u28D2",
          "\u28D3",
          "\u28D4",
          "\u28D5",
          "\u28D6",
          "\u28D7",
          "\u2898",
          "\u2899",
          "\u289A",
          "\u289B",
          "\u289C",
          "\u289D",
          "\u289E",
          "\u289F",
          "\u28D8",
          "\u28D9",
          "\u28DA",
          "\u28DB",
          "\u28DC",
          "\u28DD",
          "\u28DE",
          "\u28DF",
          "\u28A0",
          "\u28A1",
          "\u28A2",
          "\u28A3",
          "\u28A4",
          "\u28A5",
          "\u28A6",
          "\u28A7",
          "\u28E0",
          "\u28E1",
          "\u28E2",
          "\u28E3",
          "\u28E4",
          "\u28E5",
          "\u28E6",
          "\u28E7",
          "\u28A8",
          "\u28A9",
          "\u28AA",
          "\u28AB",
          "\u28AC",
          "\u28AD",
          "\u28AE",
          "\u28AF",
          "\u28E8",
          "\u28E9",
          "\u28EA",
          "\u28EB",
          "\u28EC",
          "\u28ED",
          "\u28EE",
          "\u28EF",
          "\u28B0",
          "\u28B1",
          "\u28B2",
          "\u28B3",
          "\u28B4",
          "\u28B5",
          "\u28B6",
          "\u28B7",
          "\u28F0",
          "\u28F1",
          "\u28F2",
          "\u28F3",
          "\u28F4",
          "\u28F5",
          "\u28F6",
          "\u28F7",
          "\u28B8",
          "\u28B9",
          "\u28BA",
          "\u28BB",
          "\u28BC",
          "\u28BD",
          "\u28BE",
          "\u28BF",
          "\u28F8",
          "\u28F9",
          "\u28FA",
          "\u28FB",
          "\u28FC",
          "\u28FD",
          "\u28FE",
          "\u28FF"
        ]
      },
      sand: {
        interval: 80,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2840",
          "\u2848",
          "\u2850",
          "\u2860",
          "\u28C0",
          "\u28C1",
          "\u28C2",
          "\u28C4",
          "\u28CC",
          "\u28D4",
          "\u28E4",
          "\u28E5",
          "\u28E6",
          "\u28EE",
          "\u28F6",
          "\u28F7",
          "\u28FF",
          "\u287F",
          "\u283F",
          "\u289F",
          "\u281F",
          "\u285B",
          "\u281B",
          "\u282B",
          "\u288B",
          "\u280B",
          "\u280D",
          "\u2849",
          "\u2809",
          "\u2811",
          "\u2821",
          "\u2881"
        ]
      },
      line: {
        interval: 130,
        frames: [
          "-",
          "\\",
          "|",
          "/"
        ]
      },
      line2: {
        interval: 100,
        frames: [
          "\u2802",
          "-",
          "\u2013",
          "\u2014",
          "\u2013",
          "-"
        ]
      },
      pipe: {
        interval: 100,
        frames: [
          "\u2524",
          "\u2518",
          "\u2534",
          "\u2514",
          "\u251C",
          "\u250C",
          "\u252C",
          "\u2510"
        ]
      },
      simpleDots: {
        interval: 400,
        frames: [
          ".  ",
          ".. ",
          "...",
          "   "
        ]
      },
      simpleDotsScrolling: {
        interval: 200,
        frames: [
          ".  ",
          ".. ",
          "...",
          " ..",
          "  .",
          "   "
        ]
      },
      star: {
        interval: 70,
        frames: [
          "\u2736",
          "\u2738",
          "\u2739",
          "\u273A",
          "\u2739",
          "\u2737"
        ]
      },
      star2: {
        interval: 80,
        frames: [
          "+",
          "x",
          "*"
        ]
      },
      flip: {
        interval: 70,
        frames: [
          "_",
          "_",
          "_",
          "-",
          "`",
          "`",
          "'",
          "\xB4",
          "-",
          "_",
          "_",
          "_"
        ]
      },
      hamburger: {
        interval: 100,
        frames: [
          "\u2631",
          "\u2632",
          "\u2634"
        ]
      },
      growVertical: {
        interval: 120,
        frames: [
          "\u2581",
          "\u2583",
          "\u2584",
          "\u2585",
          "\u2586",
          "\u2587",
          "\u2586",
          "\u2585",
          "\u2584",
          "\u2583"
        ]
      },
      growHorizontal: {
        interval: 120,
        frames: [
          "\u258F",
          "\u258E",
          "\u258D",
          "\u258C",
          "\u258B",
          "\u258A",
          "\u2589",
          "\u258A",
          "\u258B",
          "\u258C",
          "\u258D",
          "\u258E"
        ]
      },
      balloon: {
        interval: 140,
        frames: [
          " ",
          ".",
          "o",
          "O",
          "@",
          "*",
          " "
        ]
      },
      balloon2: {
        interval: 120,
        frames: [
          ".",
          "o",
          "O",
          "\xB0",
          "O",
          "o",
          "."
        ]
      },
      noise: {
        interval: 100,
        frames: [
          "\u2593",
          "\u2592",
          "\u2591"
        ]
      },
      bounce: {
        interval: 120,
        frames: [
          "\u2801",
          "\u2802",
          "\u2804",
          "\u2802"
        ]
      },
      boxBounce: {
        interval: 120,
        frames: [
          "\u2596",
          "\u2598",
          "\u259D",
          "\u2597"
        ]
      },
      boxBounce2: {
        interval: 100,
        frames: [
          "\u258C",
          "\u2580",
          "\u2590",
          "\u2584"
        ]
      },
      triangle: {
        interval: 50,
        frames: [
          "\u25E2",
          "\u25E3",
          "\u25E4",
          "\u25E5"
        ]
      },
      binary: {
        interval: 80,
        frames: [
          "010010",
          "001100",
          "100101",
          "111010",
          "111101",
          "010111",
          "101011",
          "111000",
          "110011",
          "110101"
        ]
      },
      arc: {
        interval: 100,
        frames: [
          "\u25DC",
          "\u25E0",
          "\u25DD",
          "\u25DE",
          "\u25E1",
          "\u25DF"
        ]
      },
      circle: {
        interval: 120,
        frames: [
          "\u25E1",
          "\u2299",
          "\u25E0"
        ]
      },
      squareCorners: {
        interval: 180,
        frames: [
          "\u25F0",
          "\u25F3",
          "\u25F2",
          "\u25F1"
        ]
      },
      circleQuarters: {
        interval: 120,
        frames: [
          "\u25F4",
          "\u25F7",
          "\u25F6",
          "\u25F5"
        ]
      },
      circleHalves: {
        interval: 50,
        frames: [
          "\u25D0",
          "\u25D3",
          "\u25D1",
          "\u25D2"
        ]
      },
      squish: {
        interval: 100,
        frames: [
          "\u256B",
          "\u256A"
        ]
      },
      toggle: {
        interval: 250,
        frames: [
          "\u22B6",
          "\u22B7"
        ]
      },
      toggle2: {
        interval: 80,
        frames: [
          "\u25AB",
          "\u25AA"
        ]
      },
      toggle3: {
        interval: 120,
        frames: [
          "\u25A1",
          "\u25A0"
        ]
      },
      toggle4: {
        interval: 100,
        frames: [
          "\u25A0",
          "\u25A1",
          "\u25AA",
          "\u25AB"
        ]
      },
      toggle5: {
        interval: 100,
        frames: [
          "\u25AE",
          "\u25AF"
        ]
      },
      toggle6: {
        interval: 300,
        frames: [
          "\u101D",
          "\u1040"
        ]
      },
      toggle7: {
        interval: 80,
        frames: [
          "\u29BE",
          "\u29BF"
        ]
      },
      toggle8: {
        interval: 100,
        frames: [
          "\u25CD",
          "\u25CC"
        ]
      },
      toggle9: {
        interval: 100,
        frames: [
          "\u25C9",
          "\u25CE"
        ]
      },
      toggle10: {
        interval: 100,
        frames: [
          "\u3282",
          "\u3280",
          "\u3281"
        ]
      },
      toggle11: {
        interval: 50,
        frames: [
          "\u29C7",
          "\u29C6"
        ]
      },
      toggle12: {
        interval: 120,
        frames: [
          "\u2617",
          "\u2616"
        ]
      },
      toggle13: {
        interval: 80,
        frames: [
          "=",
          "*",
          "-"
        ]
      },
      arrow: {
        interval: 100,
        frames: [
          "\u2190",
          "\u2196",
          "\u2191",
          "\u2197",
          "\u2192",
          "\u2198",
          "\u2193",
          "\u2199"
        ]
      },
      arrow2: {
        interval: 80,
        frames: [
          "\u2B06\uFE0F ",
          "\u2197\uFE0F ",
          "\u27A1\uFE0F ",
          "\u2198\uFE0F ",
          "\u2B07\uFE0F ",
          "\u2199\uFE0F ",
          "\u2B05\uFE0F ",
          "\u2196\uFE0F "
        ]
      },
      arrow3: {
        interval: 120,
        frames: [
          "\u25B9\u25B9\u25B9\u25B9\u25B9",
          "\u25B8\u25B9\u25B9\u25B9\u25B9",
          "\u25B9\u25B8\u25B9\u25B9\u25B9",
          "\u25B9\u25B9\u25B8\u25B9\u25B9",
          "\u25B9\u25B9\u25B9\u25B8\u25B9",
          "\u25B9\u25B9\u25B9\u25B9\u25B8"
        ]
      },
      bouncingBar: {
        interval: 80,
        frames: [
          "[    ]",
          "[=   ]",
          "[==  ]",
          "[=== ]",
          "[====]",
          "[ ===]",
          "[  ==]",
          "[   =]",
          "[    ]",
          "[   =]",
          "[  ==]",
          "[ ===]",
          "[====]",
          "[=== ]",
          "[==  ]",
          "[=   ]"
        ]
      },
      bouncingBall: {
        interval: 80,
        frames: [
          "( \u25CF    )",
          "(  \u25CF   )",
          "(   \u25CF  )",
          "(    \u25CF )",
          "(     \u25CF)",
          "(    \u25CF )",
          "(   \u25CF  )",
          "(  \u25CF   )",
          "( \u25CF    )",
          "(\u25CF     )"
        ]
      },
      smiley: {
        interval: 200,
        frames: [
          "\u{1F604} ",
          "\u{1F61D} "
        ]
      },
      monkey: {
        interval: 300,
        frames: [
          "\u{1F648} ",
          "\u{1F648} ",
          "\u{1F649} ",
          "\u{1F64A} "
        ]
      },
      hearts: {
        interval: 100,
        frames: [
          "\u{1F49B} ",
          "\u{1F499} ",
          "\u{1F49C} ",
          "\u{1F49A} ",
          "\u2764\uFE0F "
        ]
      },
      clock: {
        interval: 100,
        frames: [
          "\u{1F55B} ",
          "\u{1F550} ",
          "\u{1F551} ",
          "\u{1F552} ",
          "\u{1F553} ",
          "\u{1F554} ",
          "\u{1F555} ",
          "\u{1F556} ",
          "\u{1F557} ",
          "\u{1F558} ",
          "\u{1F559} ",
          "\u{1F55A} "
        ]
      },
      earth: {
        interval: 180,
        frames: [
          "\u{1F30D} ",
          "\u{1F30E} ",
          "\u{1F30F} "
        ]
      },
      material: {
        interval: 17,
        frames: [
          "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
          "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
        ]
      },
      moon: {
        interval: 80,
        frames: [
          "\u{1F311} ",
          "\u{1F312} ",
          "\u{1F313} ",
          "\u{1F314} ",
          "\u{1F315} ",
          "\u{1F316} ",
          "\u{1F317} ",
          "\u{1F318} "
        ]
      },
      runner: {
        interval: 140,
        frames: [
          "\u{1F6B6} ",
          "\u{1F3C3} "
        ]
      },
      pong: {
        interval: 80,
        frames: [
          "\u2590\u2802       \u258C",
          "\u2590\u2808       \u258C",
          "\u2590 \u2802      \u258C",
          "\u2590 \u2820      \u258C",
          "\u2590  \u2840     \u258C",
          "\u2590  \u2820     \u258C",
          "\u2590   \u2802    \u258C",
          "\u2590   \u2808    \u258C",
          "\u2590    \u2802   \u258C",
          "\u2590    \u2820   \u258C",
          "\u2590     \u2840  \u258C",
          "\u2590     \u2820  \u258C",
          "\u2590      \u2802 \u258C",
          "\u2590      \u2808 \u258C",
          "\u2590       \u2802\u258C",
          "\u2590       \u2820\u258C",
          "\u2590       \u2840\u258C",
          "\u2590      \u2820 \u258C",
          "\u2590      \u2802 \u258C",
          "\u2590     \u2808  \u258C",
          "\u2590     \u2802  \u258C",
          "\u2590    \u2820   \u258C",
          "\u2590    \u2840   \u258C",
          "\u2590   \u2820    \u258C",
          "\u2590   \u2802    \u258C",
          "\u2590  \u2808     \u258C",
          "\u2590  \u2802     \u258C",
          "\u2590 \u2820      \u258C",
          "\u2590 \u2840      \u258C",
          "\u2590\u2820       \u258C"
        ]
      },
      shark: {
        interval: 120,
        frames: [
          "\u2590|\\____________\u258C",
          "\u2590_|\\___________\u258C",
          "\u2590__|\\__________\u258C",
          "\u2590___|\\_________\u258C",
          "\u2590____|\\________\u258C",
          "\u2590_____|\\_______\u258C",
          "\u2590______|\\______\u258C",
          "\u2590_______|\\_____\u258C",
          "\u2590________|\\____\u258C",
          "\u2590_________|\\___\u258C",
          "\u2590__________|\\__\u258C",
          "\u2590___________|\\_\u258C",
          "\u2590____________|\\\u258C",
          "\u2590____________/|\u258C",
          "\u2590___________/|_\u258C",
          "\u2590__________/|__\u258C",
          "\u2590_________/|___\u258C",
          "\u2590________/|____\u258C",
          "\u2590_______/|_____\u258C",
          "\u2590______/|______\u258C",
          "\u2590_____/|_______\u258C",
          "\u2590____/|________\u258C",
          "\u2590___/|_________\u258C",
          "\u2590__/|__________\u258C",
          "\u2590_/|___________\u258C",
          "\u2590/|____________\u258C"
        ]
      },
      dqpb: {
        interval: 100,
        frames: [
          "d",
          "q",
          "p",
          "b"
        ]
      },
      weather: {
        interval: 100,
        frames: [
          "\u2600\uFE0F ",
          "\u2600\uFE0F ",
          "\u2600\uFE0F ",
          "\u{1F324} ",
          "\u26C5\uFE0F ",
          "\u{1F325} ",
          "\u2601\uFE0F ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u26C8 ",
          "\u{1F328} ",
          "\u{1F327} ",
          "\u{1F328} ",
          "\u2601\uFE0F ",
          "\u{1F325} ",
          "\u26C5\uFE0F ",
          "\u{1F324} ",
          "\u2600\uFE0F ",
          "\u2600\uFE0F "
        ]
      },
      christmas: {
        interval: 400,
        frames: [
          "\u{1F332}",
          "\u{1F384}"
        ]
      },
      grenade: {
        interval: 80,
        frames: [
          "\u060C  ",
          "\u2032  ",
          " \xB4 ",
          " \u203E ",
          "  \u2E0C",
          "  \u2E0A",
          "  |",
          "  \u204E",
          "  \u2055",
          " \u0DF4 ",
          "  \u2053",
          "   ",
          "   ",
          "   "
        ]
      },
      point: {
        interval: 125,
        frames: [
          "\u2219\u2219\u2219",
          "\u25CF\u2219\u2219",
          "\u2219\u25CF\u2219",
          "\u2219\u2219\u25CF",
          "\u2219\u2219\u2219"
        ]
      },
      layer: {
        interval: 150,
        frames: [
          "-",
          "=",
          "\u2261"
        ]
      },
      betaWave: {
        interval: 80,
        frames: [
          "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
          "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
        ]
      },
      fingerDance: {
        interval: 160,
        frames: [
          "\u{1F918} ",
          "\u{1F91F} ",
          "\u{1F596} ",
          "\u270B ",
          "\u{1F91A} ",
          "\u{1F446} "
        ]
      },
      fistBump: {
        interval: 80,
        frames: [
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
          "\u3000\u{1F91C}\u3000\u3000\u{1F91B}\u3000 ",
          "\u3000\u3000\u{1F91C}\u{1F91B}\u3000\u3000 ",
          "\u3000\u{1F91C}\u2728\u{1F91B}\u3000\u3000 ",
          "\u{1F91C}\u3000\u2728\u3000\u{1F91B}\u3000 "
        ]
      },
      soccerHeader: {
        interval: 80,
        frames: [
          " \u{1F9D1}\u26BD\uFE0F       \u{1F9D1} ",
          "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} ",
          "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
          "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
          "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
          "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
          "\u{1F9D1}       \u26BD\uFE0F\u{1F9D1}  ",
          "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
          "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
          "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
          "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
          "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} "
        ]
      },
      mindblown: {
        interval: 160,
        frames: [
          "\u{1F610} ",
          "\u{1F610} ",
          "\u{1F62E} ",
          "\u{1F62E} ",
          "\u{1F626} ",
          "\u{1F626} ",
          "\u{1F627} ",
          "\u{1F627} ",
          "\u{1F92F} ",
          "\u{1F4A5} ",
          "\u2728 ",
          "\u3000 ",
          "\u3000 ",
          "\u3000 "
        ]
      },
      speaker: {
        interval: 160,
        frames: [
          "\u{1F508} ",
          "\u{1F509} ",
          "\u{1F50A} ",
          "\u{1F509} "
        ]
      },
      orangePulse: {
        interval: 100,
        frames: [
          "\u{1F538} ",
          "\u{1F536} ",
          "\u{1F7E0} ",
          "\u{1F7E0} ",
          "\u{1F536} "
        ]
      },
      bluePulse: {
        interval: 100,
        frames: [
          "\u{1F539} ",
          "\u{1F537} ",
          "\u{1F535} ",
          "\u{1F535} ",
          "\u{1F537} "
        ]
      },
      orangeBluePulse: {
        interval: 100,
        frames: [
          "\u{1F538} ",
          "\u{1F536} ",
          "\u{1F7E0} ",
          "\u{1F7E0} ",
          "\u{1F536} ",
          "\u{1F539} ",
          "\u{1F537} ",
          "\u{1F535} ",
          "\u{1F535} ",
          "\u{1F537} "
        ]
      },
      timeTravel: {
        interval: 100,
        frames: [
          "\u{1F55B} ",
          "\u{1F55A} ",
          "\u{1F559} ",
          "\u{1F558} ",
          "\u{1F557} ",
          "\u{1F556} ",
          "\u{1F555} ",
          "\u{1F554} ",
          "\u{1F553} ",
          "\u{1F552} ",
          "\u{1F551} ",
          "\u{1F550} "
        ]
      },
      aesthetic: {
        interval: 80,
        frames: [
          "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
          "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
          "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
        ]
      },
      dwarfFortress: {
        interval: 80,
        frames: [
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "\u263A \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u263A \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u263A \u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
          "   \u263A \u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
          "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
          "    \u263A \u2588\xA3\xA3\xA3  ",
          "     \u263A\u2588\xA3\xA3\xA3  ",
          "     \u263A\u2588\xA3\xA3\xA3  ",
          "     \u263A\u2593\xA3\xA3\xA3  ",
          "     \u263A\u2593\xA3\xA3\xA3  ",
          "     \u263A\u2592\xA3\xA3\xA3  ",
          "     \u263A\u2592\xA3\xA3\xA3  ",
          "     \u263A\u2591\xA3\xA3\xA3  ",
          "     \u263A\u2591\xA3\xA3\xA3  ",
          "     \u263A \xA3\xA3\xA3  ",
          "      \u263A\xA3\xA3\xA3  ",
          "      \u263A\xA3\xA3\xA3  ",
          "      \u263A\u2593\xA3\xA3  ",
          "      \u263A\u2593\xA3\xA3  ",
          "      \u263A\u2592\xA3\xA3  ",
          "      \u263A\u2592\xA3\xA3  ",
          "      \u263A\u2591\xA3\xA3  ",
          "      \u263A\u2591\xA3\xA3  ",
          "      \u263A \xA3\xA3  ",
          "       \u263A\xA3\xA3  ",
          "       \u263A\xA3\xA3  ",
          "       \u263A\u2593\xA3  ",
          "       \u263A\u2593\xA3  ",
          "       \u263A\u2592\xA3  ",
          "       \u263A\u2592\xA3  ",
          "       \u263A\u2591\xA3  ",
          "       \u263A\u2591\xA3  ",
          "       \u263A \xA3  ",
          "        \u263A\xA3  ",
          "        \u263A\xA3  ",
          "        \u263A\u2593  ",
          "        \u263A\u2593  ",
          "        \u263A\u2592  ",
          "        \u263A\u2592  ",
          "        \u263A\u2591  ",
          "        \u263A\u2591  ",
          "        \u263A   ",
          "        \u263A  &",
          "        \u263A \u263C&",
          "       \u263A \u263C &",
          "       \u263A\u263C  &",
          "      \u263A\u263C  & ",
          "      \u203C   & ",
          "     \u263A   &  ",
          "    \u203C    &  ",
          "   \u263A    &   ",
          "  \u203C     &   ",
          " \u263A     &    ",
          "\u203C      &    ",
          "      &     ",
          "      &     ",
          "     &   \u2591  ",
          "     &   \u2592  ",
          "    &    \u2593  ",
          "    &    \xA3  ",
          "   &    \u2591\xA3  ",
          "   &    \u2592\xA3  ",
          "  &     \u2593\xA3  ",
          "  &     \xA3\xA3  ",
          " &     \u2591\xA3\xA3  ",
          " &     \u2592\xA3\xA3  ",
          "&      \u2593\xA3\xA3  ",
          "&      \xA3\xA3\xA3  ",
          "      \u2591\xA3\xA3\xA3  ",
          "      \u2592\xA3\xA3\xA3  ",
          "      \u2593\xA3\xA3\xA3  ",
          "      \u2588\xA3\xA3\xA3  ",
          "     \u2591\u2588\xA3\xA3\xA3  ",
          "     \u2592\u2588\xA3\xA3\xA3  ",
          "     \u2593\u2588\xA3\xA3\xA3  ",
          "     \u2588\u2588\xA3\xA3\xA3  ",
          "    \u2591\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2592\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2593\u2588\u2588\xA3\xA3\xA3  ",
          "    \u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "   \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          "  \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
          " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  "
        ]
      }
    };
  }
});

// node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/index.js
var require_cli_spinners = __commonJS({
  "node_modules/.pnpm/cli-spinners@2.9.2/node_modules/cli-spinners/index.js"(exports, module2) {
    "use strict";
    var spinners = Object.assign({}, require_spinners());
    var spinnersList = Object.keys(spinners);
    Object.defineProperty(spinners, "random", {
      get() {
        const randomIndex = Math.floor(Math.random() * spinnersList.length);
        const spinnerName = spinnersList[randomIndex];
        return spinners[spinnerName];
      }
    });
    module2.exports = spinners;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/lib/utils.js"(exports) {
    "use strict";
    var regExpChars = /[|\\{}()[\]^$+*?.]/g;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function(obj, key) {
      return hasOwnProperty.apply(obj, [key]);
    };
    exports.escapeRegExpChars = function(string) {
      if (!string) {
        return "";
      }
      return String(string).replace(regExpChars, "\\$&");
    };
    var _ENCODE_HTML_RULES = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    };
    var _MATCH_HTML = /[&<>'"]/g;
    function encode_char(c) {
      return _ENCODE_HTML_RULES[c] || c;
    }
    var escapeFuncStr = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
    exports.escapeXML = function(markup) {
      return markup == void 0 ? "" : String(markup).replace(_MATCH_HTML, encode_char);
    };
    exports.escapeXML.toString = function() {
      return Function.prototype.toString.call(this) + ";\n" + escapeFuncStr;
    };
    exports.shallowCopy = function(to, from) {
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var p in from) {
          if (!hasOwn(from, p)) {
            continue;
          }
          if (p === "__proto__" || p === "constructor") {
            continue;
          }
          to[p] = from[p];
        }
      }
      return to;
    };
    exports.shallowCopyFromList = function(to, from, list) {
      list = list || [];
      from = from || {};
      if (to !== null && to !== void 0) {
        for (var i = 0; i < list.length; i++) {
          var p = list[i];
          if (typeof from[p] != "undefined") {
            if (!hasOwn(from, p)) {
              continue;
            }
            if (p === "__proto__" || p === "constructor") {
              continue;
            }
            to[p] = from[p];
          }
        }
      }
      return to;
    };
    exports.cache = {
      _data: {},
      set: function(key, val) {
        this._data[key] = val;
      },
      get: function(key) {
        return this._data[key];
      },
      remove: function(key) {
        delete this._data[key];
      },
      reset: function() {
        this._data = {};
      }
    };
    exports.hyphenToCamel = function(str) {
      return str.replace(/-[a-z]/g, function(match) {
        return match[1].toUpperCase();
      });
    };
    exports.createNullProtoObjWherePossible = function() {
      if (typeof Object.create == "function") {
        return function() {
          return /* @__PURE__ */ Object.create(null);
        };
      }
      if (!({ __proto__: null } instanceof Object)) {
        return function() {
          return { __proto__: null };
        };
      }
      return function() {
        return {};
      };
    }();
  }
});

// node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/package.json"(exports, module2) {
    module2.exports = {
      name: "ejs",
      description: "Embedded JavaScript templates",
      keywords: [
        "template",
        "engine",
        "ejs"
      ],
      version: "3.1.8",
      author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
      license: "Apache-2.0",
      bin: {
        ejs: "./bin/cli.js"
      },
      main: "./lib/ejs.js",
      jsdelivr: "ejs.min.js",
      unpkg: "ejs.min.js",
      repository: {
        type: "git",
        url: "git://github.com/mde/ejs.git"
      },
      bugs: "https://github.com/mde/ejs/issues",
      homepage: "https://github.com/mde/ejs",
      dependencies: {
        jake: "^10.8.5"
      },
      devDependencies: {
        browserify: "^16.5.1",
        eslint: "^6.8.0",
        "git-directory-deploy": "^1.5.1",
        jsdoc: "^3.6.7",
        "lru-cache": "^4.0.1",
        mocha: "^7.1.1",
        "uglify-js": "^3.3.16"
      },
      engines: {
        node: ">=0.10.0"
      },
      scripts: {
        test: "mocha"
      }
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/lib/ejs.js
var require_ejs = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+ejs@3.1.8/node_modules/ejs/lib/ejs.js"(exports) {
    "use strict";
    var fs4 = require("fs");
    var path4 = require("path");
    var utils = require_utils();
    var scopeOptionWarned = false;
    var _VERSION_STRING = require_package().version;
    var _DEFAULT_OPEN_DELIMITER = "<";
    var _DEFAULT_CLOSE_DELIMITER = ">";
    var _DEFAULT_DELIMITER = "%";
    var _DEFAULT_LOCALS_NAME = "locals";
    var _NAME = "ejs";
    var _REGEX_STRING = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";
    var _OPTS_PASSABLE_WITH_DATA = [
      "delimiter",
      "scope",
      "context",
      "debug",
      "compileDebug",
      "client",
      "_with",
      "rmWhitespace",
      "strict",
      "filename",
      "async"
    ];
    var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat("cache");
    var _BOM = /^\uFEFF/;
    var _JS_IDENTIFIER = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
    exports.cache = utils.cache;
    exports.fileLoader = fs4.readFileSync;
    exports.localsName = _DEFAULT_LOCALS_NAME;
    exports.promiseImpl = new Function("return this;")().Promise;
    exports.resolveInclude = function(name, filename, isDir) {
      var dirname = path4.dirname;
      var extname = path4.extname;
      var resolve = path4.resolve;
      var includePath = resolve(isDir ? filename : dirname(filename), name);
      var ext = extname(name);
      if (!ext) {
        includePath += ".ejs";
      }
      return includePath;
    };
    function resolvePaths(name, paths) {
      var filePath;
      if (paths.some(function(v) {
        filePath = exports.resolveInclude(name, v, true);
        return fs4.existsSync(filePath);
      })) {
        return filePath;
      }
    }
    function getIncludePath(path5, options) {
      var includePath;
      var filePath;
      var views = options.views;
      var match = /^[A-Za-z]+:\\|^\//.exec(path5);
      if (match && match.length) {
        path5 = path5.replace(/^\/*/, "");
        if (Array.isArray(options.root)) {
          includePath = resolvePaths(path5, options.root);
        } else {
          includePath = exports.resolveInclude(path5, options.root || "/", true);
        }
      } else {
        if (options.filename) {
          filePath = exports.resolveInclude(path5, options.filename);
          if (fs4.existsSync(filePath)) {
            includePath = filePath;
          }
        }
        if (!includePath && Array.isArray(views)) {
          includePath = resolvePaths(path5, views);
        }
        if (!includePath && typeof options.includer !== "function") {
          throw new Error('Could not find the include file "' + options.escapeFunction(path5) + '"');
        }
      }
      return includePath;
    }
    function handleCache(options, template) {
      var func;
      var filename = options.filename;
      var hasTemplate = arguments.length > 1;
      if (options.cache) {
        if (!filename) {
          throw new Error("cache option requires a filename");
        }
        func = exports.cache.get(filename);
        if (func) {
          return func;
        }
        if (!hasTemplate) {
          template = fileLoader(filename).toString().replace(_BOM, "");
        }
      } else if (!hasTemplate) {
        if (!filename) {
          throw new Error("Internal EJS error: no file name or template provided");
        }
        template = fileLoader(filename).toString().replace(_BOM, "");
      }
      func = exports.compile(template, options);
      if (options.cache) {
        exports.cache.set(filename, func);
      }
      return func;
    }
    function tryHandleCache(options, data, cb) {
      var result;
      if (!cb) {
        if (typeof exports.promiseImpl == "function") {
          return new exports.promiseImpl(function(resolve, reject) {
            try {
              result = handleCache(options)(data);
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        } else {
          throw new Error("Please provide a callback function");
        }
      } else {
        try {
          result = handleCache(options)(data);
        } catch (err) {
          return cb(err);
        }
        cb(null, result);
      }
    }
    function fileLoader(filePath) {
      return exports.fileLoader(filePath);
    }
    function includeFile(path5, options) {
      var opts = utils.shallowCopy(utils.createNullProtoObjWherePossible(), options);
      opts.filename = getIncludePath(path5, opts);
      if (typeof options.includer === "function") {
        var includerResult = options.includer(path5, opts.filename);
        if (includerResult) {
          if (includerResult.filename) {
            opts.filename = includerResult.filename;
          }
          if (includerResult.template) {
            return handleCache(opts, includerResult.template);
          }
        }
      }
      return handleCache(opts);
    }
    function rethrow(err, str, flnm, lineno, esc) {
      var lines = str.split("\n");
      var start = Math.max(lineno - 3, 0);
      var end = Math.min(lines.length, lineno + 3);
      var filename = esc(flnm);
      var context = lines.slice(start, end).map(function(line, i) {
        var curr = i + start + 1;
        return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
      }).join("\n");
      err.path = filename;
      err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
      throw err;
    }
    function stripSemi(str) {
      return str.replace(/;(\s*$)/, "$1");
    }
    exports.compile = function compile(template, opts) {
      var templ;
      if (opts && opts.scope) {
        if (!scopeOptionWarned) {
          console.warn("`scope` option is deprecated and will be removed in EJS 3");
          scopeOptionWarned = true;
        }
        if (!opts.context) {
          opts.context = opts.scope;
        }
        delete opts.scope;
      }
      templ = new Template(template, opts);
      return templ.compile();
    };
    exports.render = function(template, d, o) {
      var data = d || utils.createNullProtoObjWherePossible();
      var opts = o || utils.createNullProtoObjWherePossible();
      if (arguments.length == 2) {
        utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
      }
      return handleCache(opts, template)(data);
    };
    exports.renderFile = function() {
      var args = Array.prototype.slice.call(arguments);
      var filename = args.shift();
      var cb;
      var opts = { filename };
      var data;
      var viewOpts;
      if (typeof arguments[arguments.length - 1] == "function") {
        cb = args.pop();
      }
      if (args.length) {
        data = args.shift();
        if (args.length) {
          utils.shallowCopy(opts, args.pop());
        } else {
          if (data.settings) {
            if (data.settings.views) {
              opts.views = data.settings.views;
            }
            if (data.settings["view cache"]) {
              opts.cache = true;
            }
            viewOpts = data.settings["view options"];
            if (viewOpts) {
              utils.shallowCopy(opts, viewOpts);
            }
          }
          utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
        }
        opts.filename = filename;
      } else {
        data = utils.createNullProtoObjWherePossible();
      }
      return tryHandleCache(opts, data, cb);
    };
    exports.Template = Template;
    exports.clearCache = function() {
      exports.cache.reset();
    };
    function Template(text, opts) {
      opts = opts || utils.createNullProtoObjWherePossible();
      var options = utils.createNullProtoObjWherePossible();
      this.templateText = text;
      this.mode = null;
      this.truncate = false;
      this.currentLine = 1;
      this.source = "";
      options.client = opts.client || false;
      options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
      options.compileDebug = opts.compileDebug !== false;
      options.debug = !!opts.debug;
      options.filename = opts.filename;
      options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
      options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
      options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
      options.strict = opts.strict || false;
      options.context = opts.context;
      options.cache = opts.cache || false;
      options.rmWhitespace = opts.rmWhitespace;
      options.root = opts.root;
      options.includer = opts.includer;
      options.outputFunctionName = opts.outputFunctionName;
      options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
      options.views = opts.views;
      options.async = opts.async;
      options.destructuredLocals = opts.destructuredLocals;
      options.legacyInclude = typeof opts.legacyInclude != "undefined" ? !!opts.legacyInclude : true;
      if (options.strict) {
        options._with = false;
      } else {
        options._with = typeof opts._with != "undefined" ? opts._with : true;
      }
      this.opts = options;
      this.regex = this.createRegex();
    }
    Template.modes = {
      EVAL: "eval",
      ESCAPED: "escaped",
      RAW: "raw",
      COMMENT: "comment",
      LITERAL: "literal"
    };
    Template.prototype = {
      createRegex: function() {
        var str = _REGEX_STRING;
        var delim = utils.escapeRegExpChars(this.opts.delimiter);
        var open = utils.escapeRegExpChars(this.opts.openDelimiter);
        var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
        str = str.replace(/%/g, delim).replace(/</g, open).replace(/>/g, close);
        return new RegExp(str);
      },
      compile: function() {
        var src;
        var fn;
        var opts = this.opts;
        var prepended = "";
        var appended = "";
        var escapeFn = opts.escapeFunction;
        var ctor;
        var sanitizedFilename = opts.filename ? JSON.stringify(opts.filename) : "undefined";
        if (!this.source) {
          this.generateSource();
          prepended += '  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
          if (opts.outputFunctionName) {
            if (!_JS_IDENTIFIER.test(opts.outputFunctionName)) {
              throw new Error("outputFunctionName is not a valid JS identifier.");
            }
            prepended += "  var " + opts.outputFunctionName + " = __append;\n";
          }
          if (opts.localsName && !_JS_IDENTIFIER.test(opts.localsName)) {
            throw new Error("localsName is not a valid JS identifier.");
          }
          if (opts.destructuredLocals && opts.destructuredLocals.length) {
            var destructuring = "  var __locals = (" + opts.localsName + " || {}),\n";
            for (var i = 0; i < opts.destructuredLocals.length; i++) {
              var name = opts.destructuredLocals[i];
              if (!_JS_IDENTIFIER.test(name)) {
                throw new Error("destructuredLocals[" + i + "] is not a valid JS identifier.");
              }
              if (i > 0) {
                destructuring += ",\n  ";
              }
              destructuring += name + " = __locals." + name;
            }
            prepended += destructuring + ";\n";
          }
          if (opts._with !== false) {
            prepended += "  with (" + opts.localsName + " || {}) {\n";
            appended += "  }\n";
          }
          appended += "  return __output;\n";
          this.source = prepended + this.source + appended;
        }
        if (opts.compileDebug) {
          src = "var __line = 1\n  , __lines = " + JSON.stringify(this.templateText) + "\n  , __filename = " + sanitizedFilename + ";\ntry {\n" + this.source + "} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n";
        } else {
          src = this.source;
        }
        if (opts.client) {
          src = "escapeFn = escapeFn || " + escapeFn.toString() + ";\n" + src;
          if (opts.compileDebug) {
            src = "rethrow = rethrow || " + rethrow.toString() + ";\n" + src;
          }
        }
        if (opts.strict) {
          src = '"use strict";\n' + src;
        }
        if (opts.debug) {
          console.log(src);
        }
        if (opts.compileDebug && opts.filename) {
          src = src + "\n//# sourceURL=" + sanitizedFilename + "\n";
        }
        try {
          if (opts.async) {
            try {
              ctor = new Function("return (async function(){}).constructor;")();
            } catch (e) {
              if (e instanceof SyntaxError) {
                throw new Error("This environment does not support async/await");
              } else {
                throw e;
              }
            }
          } else {
            ctor = Function;
          }
          fn = new ctor(opts.localsName + ", escapeFn, include, rethrow", src);
        } catch (e) {
          if (e instanceof SyntaxError) {
            if (opts.filename) {
              e.message += " in " + opts.filename;
            }
            e.message += " while compiling ejs\n\n";
            e.message += "If the above error is not helpful, you may want to try EJS-Lint:\n";
            e.message += "https://github.com/RyanZim/EJS-Lint";
            if (!opts.async) {
              e.message += "\n";
              e.message += "Or, if you meant to create an async function, pass `async: true` as an option.";
            }
          }
          throw e;
        }
        var returnedFn = opts.client ? fn : function anonymous(data) {
          var include = function(path5, includeData) {
            var d = utils.shallowCopy(utils.createNullProtoObjWherePossible(), data);
            if (includeData) {
              d = utils.shallowCopy(d, includeData);
            }
            return includeFile(path5, opts)(d);
          };
          return fn.apply(
            opts.context,
            [data || utils.createNullProtoObjWherePossible(), escapeFn, include, rethrow]
          );
        };
        if (opts.filename && typeof Object.defineProperty === "function") {
          var filename = opts.filename;
          var basename = path4.basename(filename, path4.extname(filename));
          try {
            Object.defineProperty(returnedFn, "name", {
              value: basename,
              writable: false,
              enumerable: false,
              configurable: true
            });
          } catch (e) {
          }
        }
        return returnedFn;
      },
      generateSource: function() {
        var opts = this.opts;
        if (opts.rmWhitespace) {
          this.templateText = this.templateText.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
        }
        this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
        var self = this;
        var matches = this.parseTemplateText();
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        if (matches && matches.length) {
          matches.forEach(function(line, index) {
            var closing;
            if (line.indexOf(o + d) === 0 && line.indexOf(o + d + d) !== 0) {
              closing = matches[index + 2];
              if (!(closing == d + c || closing == "-" + d + c || closing == "_" + d + c)) {
                throw new Error('Could not find matching close tag for "' + line + '".');
              }
            }
            self.scanLine(line);
          });
        }
      },
      parseTemplateText: function() {
        var str = this.templateText;
        var pat = this.regex;
        var result = pat.exec(str);
        var arr = [];
        var firstPos;
        while (result) {
          firstPos = result.index;
          if (firstPos !== 0) {
            arr.push(str.substring(0, firstPos));
            str = str.slice(firstPos);
          }
          arr.push(result[0]);
          str = str.slice(result[0].length);
          result = pat.exec(str);
        }
        if (str) {
          arr.push(str);
        }
        return arr;
      },
      _addOutput: function(line) {
        if (this.truncate) {
          line = line.replace(/^(?:\r\n|\r|\n)/, "");
          this.truncate = false;
        }
        if (!line) {
          return line;
        }
        line = line.replace(/\\/g, "\\\\");
        line = line.replace(/\n/g, "\\n");
        line = line.replace(/\r/g, "\\r");
        line = line.replace(/"/g, '\\"');
        this.source += '    ; __append("' + line + '")\n';
      },
      scanLine: function(line) {
        var self = this;
        var d = this.opts.delimiter;
        var o = this.opts.openDelimiter;
        var c = this.opts.closeDelimiter;
        var newLineCount = 0;
        newLineCount = line.split("\n").length - 1;
        switch (line) {
          case o + d:
          case o + d + "_":
            this.mode = Template.modes.EVAL;
            break;
          case o + d + "=":
            this.mode = Template.modes.ESCAPED;
            break;
          case o + d + "-":
            this.mode = Template.modes.RAW;
            break;
          case o + d + "#":
            this.mode = Template.modes.COMMENT;
            break;
          case o + d + d:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")\n';
            break;
          case d + d + c:
            this.mode = Template.modes.LITERAL;
            this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")\n';
            break;
          case d + c:
          case "-" + d + c:
          case "_" + d + c:
            if (this.mode == Template.modes.LITERAL) {
              this._addOutput(line);
            }
            this.mode = null;
            this.truncate = line.indexOf("-") === 0 || line.indexOf("_") === 0;
            break;
          default:
            if (this.mode) {
              switch (this.mode) {
                case Template.modes.EVAL:
                case Template.modes.ESCAPED:
                case Template.modes.RAW:
                  if (line.lastIndexOf("//") > line.lastIndexOf("\n")) {
                    line += "\n";
                  }
              }
              switch (this.mode) {
                case Template.modes.EVAL:
                  this.source += "    ; " + line + "\n";
                  break;
                case Template.modes.ESCAPED:
                  this.source += "    ; __append(escapeFn(" + stripSemi(line) + "))\n";
                  break;
                case Template.modes.RAW:
                  this.source += "    ; __append(" + stripSemi(line) + ")\n";
                  break;
                case Template.modes.COMMENT:
                  break;
                case Template.modes.LITERAL:
                  this._addOutput(line);
                  break;
              }
            } else {
              this._addOutput(line);
            }
        }
        if (self.opts.compileDebug && newLineCount) {
          this.currentLine += newLineCount;
          this.source += "    ; __line = " + this.currentLine + "\n";
        }
      }
    };
    exports.escapeXML = utils.escapeXML;
    exports.__express = exports.renderFile;
    exports.VERSION = _VERSION_STRING;
    exports.name = _NAME;
    if (typeof window != "undefined") {
      window.ejs = exports;
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+universalify@2.0.0/node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+universalify@2.0.0/node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function")
          fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(
              this,
              ...args,
              (err, res) => err != null ? reject(err) : resolve(res)
            );
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, args);
        else
          fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs4) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs4);
      }
      if (!fs4.lutimes) {
        patchLutimes(fs4);
      }
      fs4.chown = chownFix(fs4.chown);
      fs4.fchown = chownFix(fs4.fchown);
      fs4.lchown = chownFix(fs4.lchown);
      fs4.chmod = chmodFix(fs4.chmod);
      fs4.fchmod = chmodFix(fs4.fchmod);
      fs4.lchmod = chmodFix(fs4.lchmod);
      fs4.chownSync = chownFixSync(fs4.chownSync);
      fs4.fchownSync = chownFixSync(fs4.fchownSync);
      fs4.lchownSync = chownFixSync(fs4.lchownSync);
      fs4.chmodSync = chmodFixSync(fs4.chmodSync);
      fs4.fchmodSync = chmodFixSync(fs4.fchmodSync);
      fs4.lchmodSync = chmodFixSync(fs4.lchmodSync);
      fs4.stat = statFix(fs4.stat);
      fs4.fstat = statFix(fs4.fstat);
      fs4.lstat = statFix(fs4.lstat);
      fs4.statSync = statFixSync(fs4.statSync);
      fs4.fstatSync = statFixSync(fs4.fstatSync);
      fs4.lstatSync = statFixSync(fs4.lstatSync);
      if (fs4.chmod && !fs4.lchmod) {
        fs4.lchmod = function(path4, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs4.lchmodSync = function() {
        };
      }
      if (fs4.chown && !fs4.lchown) {
        fs4.lchown = function(path4, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs4.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs4.rename = typeof fs4.rename !== "function" ? fs4.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs4.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs4.rename);
      }
      fs4.read = typeof fs4.read !== "function" ? fs4.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs4, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs4, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs4.read);
      fs4.readSync = typeof fs4.readSync !== "function" ? fs4.readSync : function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs4, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs4.readSync);
      function patchLchmod(fs5) {
        fs5.lchmod = function(path4, mode, callback) {
          fs5.open(
            path4,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs5.fchmod(fd, mode, function(err2) {
                fs5.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            }
          );
        };
        fs5.lchmodSync = function(path4, mode) {
          var fd = fs5.openSync(path4, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs5.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs5.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs5.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs5) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs5.futimes) {
          fs5.lutimes = function(path4, at, mt, cb) {
            fs5.open(path4, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs5.futimes(fd, at, mt, function(er2) {
                fs5.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs5.lutimesSync = function(path4, at, mt) {
            var fd = fs5.openSync(path4, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs5.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs5.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs5.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs5.futimes) {
          fs5.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs5.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs4, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs4, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs4, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs4, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs4, target, options, callback) : orig.call(fs4, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs4, target, options) : orig.call(fs4, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs4) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path4, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path4, options);
        Stream.call(this);
        var self = this;
        this.path = path4;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs4.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path4, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path4, options);
        Stream.call(this);
        this.path = path4;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs4.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs4 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs4[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs4, queue);
      fs4.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs4, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs4.close);
      fs4.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs4, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs4.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs4[gracefulQueue]);
          require("assert").equal(fs4[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs4[gracefulQueue]);
    }
    module2.exports = patch(clone(fs4));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs4.__patched) {
      module2.exports = patch(fs4);
      fs4.__patched = true;
    }
    function patch(fs5) {
      polyfills(fs5);
      fs5.gracefulify = patch;
      fs5.createReadStream = createReadStream;
      fs5.createWriteStream = createWriteStream;
      var fs$readFile = fs5.readFile;
      fs5.readFile = readFile;
      function readFile(path4, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path4, options, cb);
        function go$readFile(path5, options2, cb2, startTime) {
          return fs$readFile(path5, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path5, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs5.writeFile;
      fs5.writeFile = writeFile;
      function writeFile(path4, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path4, data, options, cb);
        function go$writeFile(path5, data2, options2, cb2, startTime) {
          return fs$writeFile(path5, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path5, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs5.appendFile;
      if (fs$appendFile)
        fs5.appendFile = appendFile;
      function appendFile(path4, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path4, data, options, cb);
        function go$appendFile(path5, data2, options2, cb2, startTime) {
          return fs$appendFile(path5, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path5, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs5.copyFile;
      if (fs$copyFile)
        fs5.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs5.readdir;
      fs5.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path4, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path5, options2, cb2, startTime) {
          return fs$readdir(path5, fs$readdirCallback(
            path5,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path5, options2, cb2, startTime) {
          return fs$readdir(path5, options2, fs$readdirCallback(
            path5,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path4, options, cb);
        function fs$readdirCallback(path5, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path5, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs5);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs5.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs5.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs5, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs5, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs5, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs5, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path4, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path4, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path4, options) {
        return new fs5.ReadStream(path4, options);
      }
      function createWriteStream(path4, options) {
        return new fs5.WriteStream(path4, options);
      }
      var fs$open = fs5.open;
      fs5.open = open;
      function open(path4, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path4, flags, mode, cb);
        function go$open(path5, flags2, mode2, cb2, startTime) {
          return fs$open(path5, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path5, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs5;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs4[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs4[gracefulQueue].length; ++i) {
        if (fs4[gracefulQueue][i].length > 2) {
          fs4[gracefulQueue][i][3] = now;
          fs4[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs4[gracefulQueue].length === 0)
        return;
      var elem = fs4[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs4[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs4 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs4[key] === "function";
    });
    Object.assign(exports, fs4);
    api.forEach((method) => {
      exports[method] = u(fs4[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs4.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs4.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs4.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs4.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs4.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs4.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs4.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs4.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs4.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs4.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs4.realpath.native === "function") {
      exports.realpath.native = u(fs4.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module2) {
    "use strict";
    var path4 = require("path");
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path4.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module2) {
    "use strict";
    var fs4 = require_fs();
    var { checkPath } = require_utils2();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number")
        return options;
      return { ...defaults, ...options }.mode;
    };
    module2.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs4.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module2.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs4.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/mkdirs/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/path-exists/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs4 = require_fs();
    function pathExists(path4) {
      return fs4.access(path4).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs4.existsSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/util/utimes.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    function utimesMillis(path4, atime, mtime, callback) {
      fs4.open(path4, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs4.futimes(fd, atime, mtime, (futimesErr) => {
          fs4.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path4, atime, mtime) {
      const fd = fs4.openSync(path4, "r+");
      fs4.futimesSync(fd, atime, mtime);
      return fs4.closeSync(fd);
    }
    module2.exports = {
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/util/stat.js"(exports, module2) {
    "use strict";
    var fs4 = require_fs();
    var path4 = require("path");
    var util = require("util");
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs4.stat(file, { bigint: true }) : (file) => fs4.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs4.statSync(file, { bigint: true }) : (file) => fs4.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, opts, cb) {
      util.callbackify(getStats)(src, dest, opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path4.basename(src);
            const destBaseName = path4.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true });
            }
            return cb(new Error("Source and destination must not be the same."));
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path4.basename(src);
          const destBaseName = path4.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path4.resolve(path4.dirname(src));
      const destParent = path4.resolve(path4.dirname(dest));
      if (destParent === srcParent || destParent === path4.parse(destParent).root)
        return cb();
      fs4.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT")
            return cb();
          return cb(err);
        }
        if (areIdentical(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path4.resolve(path4.dirname(src));
      const destParent = path4.resolve(path4.dirname(dest));
      if (destParent === srcParent || destParent === path4.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs4.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path4.resolve(src).split(path4.sep).filter((i) => i);
      const destArr = path4.resolve(dest).split(path4.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/copy.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require("path");
    var mkdirs = require_mkdirs().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimesMillis = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          runFilter(src, dest, opts, (err3, include) => {
            if (err3)
              return cb(err3);
            if (!include)
              return cb();
            checkParentDir(destStat, src, dest, opts, cb);
          });
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path4.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return getStats(destStat, src, dest, opts, cb);
        mkdirs(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return getStats(destStat, src, dest, opts, cb);
        });
      });
    }
    function runFilter(src, dest, opts, cb) {
      if (!opts.filter)
        return cb(null, true);
      Promise.resolve(opts.filter(src, dest)).then((include) => cb(null, include), (error) => cb(error));
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs4.stat : fs4.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
        else if (srcStat.isSocket())
          return cb(new Error(`Cannot copy a socket file: ${src}`));
        else if (srcStat.isFIFO())
          return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
        return cb(new Error(`Unknown file: ${src}`));
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs4.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      fs4.copyFile(src, dest, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps)
          return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
        return setDestMode(dest, srcStat.mode, cb);
      });
    }
    function handleTimestampsAndMode(srcMode, src, dest, cb) {
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, (err) => {
          if (err)
            return cb(err);
          return setDestTimestampsAndMode(srcMode, src, dest, cb);
        });
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 128, cb);
    }
    function setDestTimestampsAndMode(srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, (err) => {
        if (err)
          return cb(err);
        return setDestMode(dest, srcMode, cb);
      });
    }
    function setDestMode(dest, srcMode, cb) {
      return fs4.chmod(dest, srcMode, cb);
    }
    function setDestTimestamps(src, dest, cb) {
      fs4.stat(src, (err, updatedSrcStat) => {
        if (err)
          return cb(err);
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcMode, src, dest, opts, cb) {
      fs4.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return setDestMode(dest, srcMode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs4.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path4.join(src, item);
      const destItem = path4.join(dest, item);
      runFilter(srcItem, destItem, opts, (err, include) => {
        if (err)
          return cb(err);
        if (!include)
          return copyDirItems(items, src, dest, opts, cb);
        stat.checkPaths(srcItem, destItem, "copy", opts, (err2, stats) => {
          if (err2)
            return cb(err2);
          const { destStat } = stats;
          getStats(destStat, srcItem, destItem, opts, (err3) => {
            if (err3)
              return cb(err3);
            return copyDirItems(items, src, dest, opts, cb);
          });
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs4.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path4.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs4.symlink(resolvedSrc, dest, cb);
        } else {
          fs4.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs4.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path4.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs4.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs4.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path4.dirname(dest);
      if (!fs4.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs4.statSync : fs4.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs4.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs4.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs4.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs4.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs4.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs4.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path4.join(src, item);
      const destItem = path4.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem))
        return;
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs4.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path4.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs4.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs4.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs4.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path4.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs4.unlinkSync(dest);
      return fs4.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/copy/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/remove/index.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var u = require_universalify().fromCallback;
    function remove(path4, callback) {
      fs4.rm(path4, { recursive: true, force: true }, callback);
    }
    function removeSync(path4) {
      fs4.rmSync(path4, { recursive: true, force: true });
    }
    module2.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/empty/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs4 = require_fs();
    var path4 = require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs4.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path4.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs4.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path4.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/file.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path4 = require("path");
    var fs4 = require_graceful_fs();
    var mkdir = require_mkdirs();
    function createFile(file, callback) {
      function makeFile() {
        fs4.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs4.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path4.dirname(file);
        fs4.stat(dir, (err2, stats2) => {
          if (err2) {
            if (err2.code === "ENOENT") {
              return mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeFile();
              });
            }
            return callback(err2);
          }
          if (stats2.isDirectory())
            makeFile();
          else {
            fs4.readdir(dir, (err3) => {
              if (err3)
                return callback(err3);
            });
          }
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs4.statSync(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path4.dirname(file);
      try {
        if (!fs4.statSync(dir).isDirectory()) {
          fs4.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs4.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/link.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path4 = require("path");
    var fs4 = require_graceful_fs();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs4.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs4.lstat(dstpath, (_, dstStat) => {
        fs4.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          if (dstStat && areIdentical(srcStat, dstStat))
            return callback(null);
          const dir = path4.dirname(dstpath);
          pathExists(dir, (err2, dirExists) => {
            if (err2)
              return callback(err2);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err3) => {
              if (err3)
                return callback(err3);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs4.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs4.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path4.dirname(dstpath);
      const dirExists = fs4.existsSync(dir);
      if (dirExists)
        return fs4.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs4.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module2) {
    "use strict";
    var path4 = require("path");
    var fs4 = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path4.isAbsolute(srcpath)) {
        return fs4.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          });
        });
      } else {
        const dstdir = path4.dirname(dstpath);
        const relativeToDst = path4.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            });
          } else {
            return fs4.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path4.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path4.isAbsolute(srcpath)) {
        exists = fs4.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      } else {
        const dstdir = path4.dirname(dstpath);
        const relativeToDst = path4.join(dstdir, srcpath);
        exists = fs4.existsSync(relativeToDst);
        if (exists) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          };
        } else {
          exists = fs4.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: path4.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs4.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs4.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/symlink.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path4 = require("path");
    var fs4 = require_fs();
    var _mkdirs = require_mkdirs();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs4.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs4.stat(srcpath),
            fs4.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat))
              return callback(null);
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else
          _createSymlink(srcpath, dstpath, type, callback);
      });
    }
    function _createSymlink(srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err)
          return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err2, type2) => {
          if (err2)
            return callback(err2);
          const dir = path4.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return fs4.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              fs4.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs4.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs4.statSync(srcpath);
        const dstStat = fs4.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path4.dirname(dstpath);
      const exists = fs4.existsSync(dir);
      if (exists)
        return fs4.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs4.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/ensure/index.js"(exports, module2) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module2.exports = {
      // file
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js
var require_polyfills2 = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/polyfills.js"(exports, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs4) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs4);
      }
      if (!fs4.lutimes) {
        patchLutimes(fs4);
      }
      fs4.chown = chownFix(fs4.chown);
      fs4.fchown = chownFix(fs4.fchown);
      fs4.lchown = chownFix(fs4.lchown);
      fs4.chmod = chmodFix(fs4.chmod);
      fs4.fchmod = chmodFix(fs4.fchmod);
      fs4.lchmod = chmodFix(fs4.lchmod);
      fs4.chownSync = chownFixSync(fs4.chownSync);
      fs4.fchownSync = chownFixSync(fs4.fchownSync);
      fs4.lchownSync = chownFixSync(fs4.lchownSync);
      fs4.chmodSync = chmodFixSync(fs4.chmodSync);
      fs4.fchmodSync = chmodFixSync(fs4.fchmodSync);
      fs4.lchmodSync = chmodFixSync(fs4.lchmodSync);
      fs4.stat = statFix(fs4.stat);
      fs4.fstat = statFix(fs4.fstat);
      fs4.lstat = statFix(fs4.lstat);
      fs4.statSync = statFixSync(fs4.statSync);
      fs4.fstatSync = statFixSync(fs4.fstatSync);
      fs4.lstatSync = statFixSync(fs4.lstatSync);
      if (fs4.chmod && !fs4.lchmod) {
        fs4.lchmod = function(path4, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs4.lchmodSync = function() {
        };
      }
      if (fs4.chown && !fs4.lchown) {
        fs4.lchown = function(path4, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs4.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs4.rename = typeof fs4.rename !== "function" ? fs4.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs4.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs4.rename);
      }
      fs4.read = typeof fs4.read !== "function" ? fs4.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs4, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs4, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs4.read);
      fs4.readSync = typeof fs4.readSync !== "function" ? fs4.readSync : function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs4, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs4.readSync);
      function patchLchmod(fs5) {
        fs5.lchmod = function(path4, mode, callback) {
          fs5.open(
            path4,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs5.fchmod(fd, mode, function(err2) {
                fs5.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            }
          );
        };
        fs5.lchmodSync = function(path4, mode) {
          var fd = fs5.openSync(path4, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs5.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs5.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs5.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs5) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs5.futimes) {
          fs5.lutimes = function(path4, at, mt, cb) {
            fs5.open(path4, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs5.futimes(fd, at, mt, function(er2) {
                fs5.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs5.lutimesSync = function(path4, at, mt) {
            var fd = fs5.openSync(path4, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs5.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs5.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs5.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs5.futimes) {
          fs5.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs5.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs4, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs4, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs4, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs4, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs4, target, options, callback) : orig.call(fs4, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs4, target, options) : orig.call(fs4, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams2 = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/legacy-streams.js"(exports, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs4) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path4, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path4, options);
        Stream.call(this);
        var self = this;
        this.path = path4;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs4.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path4, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path4, options);
        Stream.call(this);
        this.path = path4;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs4.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js
var require_clone2 = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/clone.js"(exports, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs2 = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.10/node_modules/graceful-fs/graceful-fs.js"(exports, module2) {
    var fs4 = require("fs");
    var polyfills = require_polyfills2();
    var legacy = require_legacy_streams2();
    var clone = require_clone2();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs4[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs4, queue);
      fs4.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs4, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs4.close);
      fs4.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs4, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs4.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs4[gracefulQueue]);
          require("assert").equal(fs4[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs4[gracefulQueue]);
    }
    module2.exports = patch(clone(fs4));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs4.__patched) {
      module2.exports = patch(fs4);
      fs4.__patched = true;
    }
    function patch(fs5) {
      polyfills(fs5);
      fs5.gracefulify = patch;
      fs5.createReadStream = createReadStream;
      fs5.createWriteStream = createWriteStream;
      var fs$readFile = fs5.readFile;
      fs5.readFile = readFile;
      function readFile(path4, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path4, options, cb);
        function go$readFile(path5, options2, cb2, startTime) {
          return fs$readFile(path5, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path5, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs5.writeFile;
      fs5.writeFile = writeFile;
      function writeFile(path4, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path4, data, options, cb);
        function go$writeFile(path5, data2, options2, cb2, startTime) {
          return fs$writeFile(path5, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path5, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs5.appendFile;
      if (fs$appendFile)
        fs5.appendFile = appendFile;
      function appendFile(path4, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path4, data, options, cb);
        function go$appendFile(path5, data2, options2, cb2, startTime) {
          return fs$appendFile(path5, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path5, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs5.copyFile;
      if (fs$copyFile)
        fs5.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs5.readdir;
      fs5.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path4, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path5, options2, cb2, startTime) {
          return fs$readdir(path5, fs$readdirCallback(
            path5,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path5, options2, cb2, startTime) {
          return fs$readdir(path5, options2, fs$readdirCallback(
            path5,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path4, options, cb);
        function fs$readdirCallback(path5, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path5, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs5);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs5.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs5.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs5, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs5, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs5, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs5, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path4, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path4, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path4, options) {
        return new fs5.ReadStream(path4, options);
      }
      function createWriteStream(path4, options) {
        return new fs5.WriteStream(path4, options);
      }
      var fs$open = fs5.open;
      fs5.open = open;
      function open(path4, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path4, flags, mode, cb);
        function go$open(path5, flags2, mode2, cb2, startTime) {
          return fs$open(path5, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path5, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs5;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs4[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs4[gracefulQueue].length; ++i) {
        if (fs4[gracefulQueue][i].length > 2) {
          fs4[gracefulQueue][i][3] = now;
          fs4[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs4[gracefulQueue].length === 0)
        return;
      var elem = fs4[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs4[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/.pnpm/registry.npmmirror.com+jsonfile@6.1.0/node_modules/jsonfile/utils.js
var require_utils3 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+jsonfile@6.1.0/node_modules/jsonfile/utils.js"(exports, module2) {
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module2.exports = { stringify, stripBom };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+jsonfile@6.1.0/node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+jsonfile@6.1.0/node_modules/jsonfile/index.js"(exports, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs2();
    } catch (_) {
      _fs = require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils3();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs4 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs4.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs4 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs4.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs4 = options.fs || _fs;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs4.writeFile)(file, str, options);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs4 = options.fs || _fs;
      const str = stringify(obj, options);
      return fs4.writeFileSync(file, str, options);
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/jsonfile.js"(exports, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/output-file/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs4 = require_graceful_fs();
    var path4 = require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path4.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs4.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs4.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path4.dirname(file);
      if (fs4.existsSync(dir)) {
        return fs4.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs4.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/output-json.js"(exports, module2) {
    "use strict";
    var { stringify } = require_utils3();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module2.exports = outputJson;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module2) {
    "use strict";
    var { stringify } = require_utils3();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/json/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/move.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          if (isParentRoot(dest))
            return doRename(src, dest, overwrite, isChangingCase, cb);
          mkdirp(path4.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, isChangingCase, cb);
          });
        });
      });
    }
    function isParentRoot(dest) {
      const parent = path4.dirname(dest);
      const parsedPath = path4.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase)
        return rename(src, dest, overwrite, cb);
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs4.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/move-sync.js"(exports, module2) {
    "use strict";
    var fs4 = require_graceful_fs();
    var path4 = require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path4.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path4.dirname(dest);
      const parsedPath = path4.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs4.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs4.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/move/index.js"(exports, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/.pnpm/registry.npmmirror.com+fs-extra@11.1.0/node_modules/fs-extra/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      // Export promiseified graceful-fs:
      ...require_fs(),
      // Export extra methods:
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv2 = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv2.indexOf(prefix + flag);
  const terminatorPosition = argv2.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.4.1/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// inquiry.ts
var import_fs3 = __toESM(require("fs"));
var import_minimist = __toESM(require_minimist());
var import_path3 = __toESM(require("path"));
var import_prompts = __toESM(require_prompts3());

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_node_process2 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/ansi-regex@6.0.1/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.1.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(regex, "");
}

// node_modules/.pnpm/get-east-asian-width@1.3.0/node_modules/get-east-asian-width/lookup.js
function isAmbiguous(x) {
  return x === 161 || x === 164 || x === 167 || x === 168 || x === 170 || x === 173 || x === 174 || x >= 176 && x <= 180 || x >= 182 && x <= 186 || x >= 188 && x <= 191 || x === 198 || x === 208 || x === 215 || x === 216 || x >= 222 && x <= 225 || x === 230 || x >= 232 && x <= 234 || x === 236 || x === 237 || x === 240 || x === 242 || x === 243 || x >= 247 && x <= 250 || x === 252 || x === 254 || x === 257 || x === 273 || x === 275 || x === 283 || x === 294 || x === 295 || x === 299 || x >= 305 && x <= 307 || x === 312 || x >= 319 && x <= 322 || x === 324 || x >= 328 && x <= 331 || x === 333 || x === 338 || x === 339 || x === 358 || x === 359 || x === 363 || x === 462 || x === 464 || x === 466 || x === 468 || x === 470 || x === 472 || x === 474 || x === 476 || x === 593 || x === 609 || x === 708 || x === 711 || x >= 713 && x <= 715 || x === 717 || x === 720 || x >= 728 && x <= 731 || x === 733 || x === 735 || x >= 768 && x <= 879 || x >= 913 && x <= 929 || x >= 931 && x <= 937 || x >= 945 && x <= 961 || x >= 963 && x <= 969 || x === 1025 || x >= 1040 && x <= 1103 || x === 1105 || x === 8208 || x >= 8211 && x <= 8214 || x === 8216 || x === 8217 || x === 8220 || x === 8221 || x >= 8224 && x <= 8226 || x >= 8228 && x <= 8231 || x === 8240 || x === 8242 || x === 8243 || x === 8245 || x === 8251 || x === 8254 || x === 8308 || x === 8319 || x >= 8321 && x <= 8324 || x === 8364 || x === 8451 || x === 8453 || x === 8457 || x === 8467 || x === 8470 || x === 8481 || x === 8482 || x === 8486 || x === 8491 || x === 8531 || x === 8532 || x >= 8539 && x <= 8542 || x >= 8544 && x <= 8555 || x >= 8560 && x <= 8569 || x === 8585 || x >= 8592 && x <= 8601 || x === 8632 || x === 8633 || x === 8658 || x === 8660 || x === 8679 || x === 8704 || x === 8706 || x === 8707 || x === 8711 || x === 8712 || x === 8715 || x === 8719 || x === 8721 || x === 8725 || x === 8730 || x >= 8733 && x <= 8736 || x === 8739 || x === 8741 || x >= 8743 && x <= 8748 || x === 8750 || x >= 8756 && x <= 8759 || x === 8764 || x === 8765 || x === 8776 || x === 8780 || x === 8786 || x === 8800 || x === 8801 || x >= 8804 && x <= 8807 || x === 8810 || x === 8811 || x === 8814 || x === 8815 || x === 8834 || x === 8835 || x === 8838 || x === 8839 || x === 8853 || x === 8857 || x === 8869 || x === 8895 || x === 8978 || x >= 9312 && x <= 9449 || x >= 9451 && x <= 9547 || x >= 9552 && x <= 9587 || x >= 9600 && x <= 9615 || x >= 9618 && x <= 9621 || x === 9632 || x === 9633 || x >= 9635 && x <= 9641 || x === 9650 || x === 9651 || x === 9654 || x === 9655 || x === 9660 || x === 9661 || x === 9664 || x === 9665 || x >= 9670 && x <= 9672 || x === 9675 || x >= 9678 && x <= 9681 || x >= 9698 && x <= 9701 || x === 9711 || x === 9733 || x === 9734 || x === 9737 || x === 9742 || x === 9743 || x === 9756 || x === 9758 || x === 9792 || x === 9794 || x === 9824 || x === 9825 || x >= 9827 && x <= 9829 || x >= 9831 && x <= 9834 || x === 9836 || x === 9837 || x === 9839 || x === 9886 || x === 9887 || x === 9919 || x >= 9926 && x <= 9933 || x >= 9935 && x <= 9939 || x >= 9941 && x <= 9953 || x === 9955 || x === 9960 || x === 9961 || x >= 9963 && x <= 9969 || x === 9972 || x >= 9974 && x <= 9977 || x === 9979 || x === 9980 || x === 9982 || x === 9983 || x === 10045 || x >= 10102 && x <= 10111 || x >= 11094 && x <= 11097 || x >= 12872 && x <= 12879 || x >= 57344 && x <= 63743 || x >= 65024 && x <= 65039 || x === 65533 || x >= 127232 && x <= 127242 || x >= 127248 && x <= 127277 || x >= 127280 && x <= 127337 || x >= 127344 && x <= 127373 || x === 127375 || x === 127376 || x >= 127387 && x <= 127404 || x >= 917760 && x <= 917999 || x >= 983040 && x <= 1048573 || x >= 1048576 && x <= 1114109;
}
function isFullWidth(x) {
  return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
}
function isWide(x) {
  return x >= 4352 && x <= 4447 || x === 8986 || x === 8987 || x === 9001 || x === 9002 || x >= 9193 && x <= 9196 || x === 9200 || x === 9203 || x === 9725 || x === 9726 || x === 9748 || x === 9749 || x >= 9776 && x <= 9783 || x >= 9800 && x <= 9811 || x === 9855 || x >= 9866 && x <= 9871 || x === 9875 || x === 9889 || x === 9898 || x === 9899 || x === 9917 || x === 9918 || x === 9924 || x === 9925 || x === 9934 || x === 9940 || x === 9962 || x === 9970 || x === 9971 || x === 9973 || x === 9978 || x === 9981 || x === 9989 || x === 9994 || x === 9995 || x === 10024 || x === 10060 || x === 10062 || x >= 10067 && x <= 10069 || x === 10071 || x >= 10133 && x <= 10135 || x === 10160 || x === 10175 || x === 11035 || x === 11036 || x === 11088 || x === 11093 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12773 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 94176 && x <= 94180 || x === 94192 || x === 94193 || x >= 94208 && x <= 100343 || x >= 100352 && x <= 101589 || x >= 101631 && x <= 101640 || x >= 110576 && x <= 110579 || x >= 110581 && x <= 110587 || x === 110589 || x === 110590 || x >= 110592 && x <= 110882 || x === 110898 || x >= 110928 && x <= 110930 || x === 110933 || x >= 110948 && x <= 110951 || x >= 110960 && x <= 111355 || x >= 119552 && x <= 119638 || x >= 119648 && x <= 119670 || x === 126980 || x === 127183 || x === 127374 || x >= 127377 && x <= 127386 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x === 127568 || x === 127569 || x >= 127584 && x <= 127589 || x >= 127744 && x <= 127776 || x >= 127789 && x <= 127797 || x >= 127799 && x <= 127868 || x >= 127870 && x <= 127891 || x >= 127904 && x <= 127946 || x >= 127951 && x <= 127955 || x >= 127968 && x <= 127984 || x === 127988 || x >= 127992 && x <= 128062 || x === 128064 || x >= 128066 && x <= 128252 || x >= 128255 && x <= 128317 || x >= 128331 && x <= 128334 || x >= 128336 && x <= 128359 || x === 128378 || x === 128405 || x === 128406 || x === 128420 || x >= 128507 && x <= 128591 || x >= 128640 && x <= 128709 || x === 128716 || x >= 128720 && x <= 128722 || x >= 128725 && x <= 128727 || x >= 128732 && x <= 128735 || x === 128747 || x === 128748 || x >= 128756 && x <= 128764 || x >= 128992 && x <= 129003 || x === 129008 || x >= 129292 && x <= 129338 || x >= 129340 && x <= 129349 || x >= 129351 && x <= 129535 || x >= 129648 && x <= 129660 || x >= 129664 && x <= 129673 || x >= 129679 && x <= 129734 || x >= 129742 && x <= 129756 || x >= 129759 && x <= 129769 || x >= 129776 && x <= 129784 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
}

// node_modules/.pnpm/get-east-asian-width@1.3.0/node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/.pnpm/string-width@7.2.0/node_modules/string-width/index.js
var import_emoji_regex = __toESM(require_emoji_regex(), 1);
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = /^\p{Default_Ignorable_Code_Point}$/u;
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  if (!countAnsiEscapeCodes) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if ((0, import_emoji_regex.default)().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}

// node_modules/.pnpm/widest-line@5.0.0/node_modules/widest-line/index.js
function widestLine(string) {
  let lineWidth = 0;
  for (const line of string.split("\n")) {
    lineWidth = Math.max(lineWidth, stringWidth(line));
  }
  return lineWidth;
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_cli_boxes = __toESM(require_cli_boxes(), 1);

// node_modules/.pnpm/camelcase@8.0.0/node_modules/camelcase/index.js
var UPPERCASE = /[\p{Lu}]/u;
var LOWERCASE = /[\p{Ll}]/u;
var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[_.\- ]+/;
var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
var preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase2) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;
  for (let index = 0; index < string.length; index++) {
    const character = string[index];
    isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;
    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character) && (!isLastLastCharPreserved || preserveConsecutiveUppercase2)) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
    }
  }
  return string;
};
var preserveConsecutiveUppercase = (input, toLowerCase) => {
  LEADING_CAPITAL.lastIndex = 0;
  return input.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
};
var postProcess = (input, toUpperCase) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;
  return input.replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) => ["_", "-"].includes(input.charAt(offset + match.length)) ? match : toUpperCase(match)).replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier));
};
function camelCase(input, options) {
  if (!(typeof input === "string" || Array.isArray(input))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options
  };
  if (Array.isArray(input)) {
    input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
  } else {
    input = input.trim();
  }
  if (input.length === 0) {
    return "";
  }
  const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
  const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }
    return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
  }
  const hasUpperCase = input !== toLowerCase(input);
  if (hasUpperCase) {
    input = preserveCamelCase(input, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
  }
  input = input.replace(LEADING_SEPARATORS, "");
  input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);
  if (options.pascalCase) {
    input = toUpperCase(input.charAt(0)) + input.slice(1);
  }
  return postProcess(input, toUpperCase);
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_ansi_align = __toESM(require_ansi_align(), 1);

// node_modules/.pnpm/ansi-styles@6.2.1/node_modules/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET2 = 10;
var wrapAnsi162 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi2562 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m2 = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles3 = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames2 = Object.keys(styles3.modifier);
var foregroundColorNames2 = Object.keys(styles3.color);
var backgroundColorNames2 = Object.keys(styles3.bgColor);
var colorNames2 = [...foregroundColorNames2, ...backgroundColorNames2];
function assembleStyles2() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles3)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles3[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles3[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles3, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles3, "codes", {
    value: codes,
    enumerable: false
  });
  styles3.color.close = "\x1B[39m";
  styles3.bgColor.close = "\x1B[49m";
  styles3.color.ansi = wrapAnsi162();
  styles3.color.ansi256 = wrapAnsi2562();
  styles3.color.ansi16m = wrapAnsi16m2();
  styles3.bgColor.ansi = wrapAnsi162(ANSI_BACKGROUND_OFFSET2);
  styles3.bgColor.ansi256 = wrapAnsi2562(ANSI_BACKGROUND_OFFSET2);
  styles3.bgColor.ansi16m = wrapAnsi16m2(ANSI_BACKGROUND_OFFSET2);
  Object.defineProperties(styles3, {
    rgbToAnsi256: {
      value: (red, green, blue) => {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value: (hex) => {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles3.rgbToAnsi256(...styles3.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value: (code) => {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles3.ansi256ToAnsi(styles3.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles3.ansi256ToAnsi(styles3.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles3;
}
var ansiStyles2 = assembleStyles2();
var ansi_styles_default2 = ansiStyles2;

// node_modules/.pnpm/wrap-ansi@9.0.0/node_modules/wrap-ansi/index.js
var ESCAPES = /* @__PURE__ */ new Set([
  "\x1B",
  "\x9B"
]);
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var wrapAnsiCode = (code) => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
var wrapWord = (rows, word, columns) => {
  const characters = [...word];
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let visible = stringWidth(stripAnsi(rows.at(-1)));
  for (const [index, character] of characters.entries()) {
    const characterLength = stringWidth(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (ESCAPES.has(character)) {
      isInsideEscape = true;
      const ansiEscapeLinkCandidate = characters.slice(index + 1, index + 1 + ANSI_ESCAPE_LINK.length).join("");
      isInsideLinkEscape = ansiEscapeLinkCandidate === ANSI_ESCAPE_LINK;
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
      continue;
    }
    visible += characterLength;
    if (visible === columns && index < characters.length - 1) {
      rows.push("");
      visible = 0;
    }
  }
  if (!visible && rows.at(-1).length > 0 && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last > 0) {
    if (stringWidth(words[last - 1]) > 0) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const lengths = wordLengths(string);
  let rows = [""];
  for (const [index, word] of string.split(" ").entries()) {
    if (options.trim !== false) {
      rows[rows.length - 1] = rows.at(-1).trimStart();
    }
    let rowLength = stringWidth(rows.at(-1));
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength > 0 || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    if (options.hard && lengths[index] > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      continue;
    }
    if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows.push("");
    }
    if (rowLength + lengths[index] > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      continue;
    }
    rows[rows.length - 1] += word;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  const pre = [...preString];
  let preStringIndex = 0;
  for (const [index, character] of pre.entries()) {
    returnValue += character;
    if (ESCAPES.has(character)) {
      const { groups } = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(preString.slice(preStringIndex)) || { groups: {} };
      if (groups.code !== void 0) {
        const code2 = Number.parseFloat(groups.code);
        escapeCode = code2 === END_CODE ? void 0 : code2;
      } else if (groups.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
      }
    }
    const code = ansi_styles_default2.codes.get(Number(escapeCode));
    if (pre[index + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(code);
      }
    } else if (character === "\n") {
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
    preStringIndex += character.length;
  }
  return returnValue;
};
function wrapAnsi(string, columns, options) {
  return String(string).normalize().replaceAll("\r\n", "\n").split("\n").map((line) => exec(line, columns, options)).join("\n");
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_cli_boxes2 = __toESM(require_cli_boxes(), 1);
var NEWLINE = "\n";
var PAD = " ";
var NONE = "none";
var terminalColumns = () => {
  const { env: env2, stdout, stderr } = import_node_process2.default;
  if (stdout == null ? void 0 : stdout.columns) {
    return stdout.columns;
  }
  if (stderr == null ? void 0 : stderr.columns) {
    return stderr.columns;
  }
  if (env2.COLUMNS) {
    return Number.parseInt(env2.COLUMNS, 10);
  }
  return 80;
};
var getObject = (detail) => typeof detail === "number" ? {
  top: detail,
  right: detail * 3,
  bottom: detail,
  left: detail * 3
} : {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  ...detail
};
var getBorderWidth = (borderStyle) => borderStyle === NONE ? 0 : 2;
var getBorderChars = (borderStyle) => {
  const sides = [
    "topLeft",
    "topRight",
    "bottomRight",
    "bottomLeft",
    "left",
    "right",
    "top",
    "bottom"
  ];
  let characters;
  if (borderStyle === NONE) {
    borderStyle = {};
    for (const side of sides) {
      borderStyle[side] = "";
    }
  }
  if (typeof borderStyle === "string") {
    characters = import_cli_boxes.default[borderStyle];
    if (!characters) {
      throw new TypeError(`Invalid border style: ${borderStyle}`);
    }
  } else {
    if (typeof (borderStyle == null ? void 0 : borderStyle.vertical) === "string") {
      borderStyle.left = borderStyle.vertical;
      borderStyle.right = borderStyle.vertical;
    }
    if (typeof (borderStyle == null ? void 0 : borderStyle.horizontal) === "string") {
      borderStyle.top = borderStyle.horizontal;
      borderStyle.bottom = borderStyle.horizontal;
    }
    for (const side of sides) {
      if (borderStyle[side] === null || typeof borderStyle[side] !== "string") {
        throw new TypeError(`Invalid border style: ${side}`);
      }
    }
    characters = borderStyle;
  }
  return characters;
};
var makeTitle = (text, horizontal, alignment) => {
  let title = "";
  const textWidth = stringWidth(text);
  switch (alignment) {
    case "left": {
      title = text + horizontal.slice(textWidth);
      break;
    }
    case "right": {
      title = horizontal.slice(textWidth) + text;
      break;
    }
    default: {
      horizontal = horizontal.slice(textWidth);
      if (horizontal.length % 2 === 1) {
        horizontal = horizontal.slice(Math.floor(horizontal.length / 2));
        title = horizontal.slice(1) + text + horizontal;
      } else {
        horizontal = horizontal.slice(horizontal.length / 2);
        title = horizontal + text + horizontal;
      }
      break;
    }
  }
  return title;
};
var makeContentText = (text, { padding, width, textAlignment, height }) => {
  text = (0, import_ansi_align.default)(text, { align: textAlignment });
  let lines = text.split(NEWLINE);
  const textWidth = widestLine(text);
  const max = width - padding.left - padding.right;
  if (textWidth > max) {
    const newLines = [];
    for (const line of lines) {
      const createdLines = wrapAnsi(line, max, { hard: true });
      const alignedLines = (0, import_ansi_align.default)(createdLines, { align: textAlignment });
      const alignedLinesArray = alignedLines.split("\n");
      const longestLength = Math.max(...alignedLinesArray.map((s) => stringWidth(s)));
      for (const alignedLine of alignedLinesArray) {
        let paddedLine;
        switch (textAlignment) {
          case "center": {
            paddedLine = PAD.repeat((max - longestLength) / 2) + alignedLine;
            break;
          }
          case "right": {
            paddedLine = PAD.repeat(max - longestLength) + alignedLine;
            break;
          }
          default: {
            paddedLine = alignedLine;
            break;
          }
        }
        newLines.push(paddedLine);
      }
    }
    lines = newLines;
  }
  if (textAlignment === "center" && textWidth < max) {
    lines = lines.map((line) => PAD.repeat((max - textWidth) / 2) + line);
  } else if (textAlignment === "right" && textWidth < max) {
    lines = lines.map((line) => PAD.repeat(max - textWidth) + line);
  }
  const paddingLeft = PAD.repeat(padding.left);
  const paddingRight = PAD.repeat(padding.right);
  lines = lines.map((line) => {
    const newLine = paddingLeft + line + paddingRight;
    return newLine + PAD.repeat(width - stringWidth(newLine));
  });
  if (padding.top > 0) {
    lines = [...Array.from({ length: padding.top }).fill(PAD.repeat(width)), ...lines];
  }
  if (padding.bottom > 0) {
    lines = [...lines, ...Array.from({ length: padding.bottom }).fill(PAD.repeat(width))];
  }
  if (height && lines.length > height) {
    lines = lines.slice(0, height);
  } else if (height && lines.length < height) {
    lines = [...lines, ...Array.from({ length: height - lines.length }).fill(PAD.repeat(width))];
  }
  return lines.join(NEWLINE);
};
var boxContent = (content, contentWidth, options) => {
  const colorizeBorder = (border) => {
    const newBorder = options.borderColor ? getColorFunction(options.borderColor)(border) : border;
    return options.dimBorder ? source_default.dim(newBorder) : newBorder;
  };
  const colorizeContent = (content2) => options.backgroundColor ? getBGColorFunction(options.backgroundColor)(content2) : content2;
  const chars = getBorderChars(options.borderStyle);
  const columns = terminalColumns();
  let marginLeft = PAD.repeat(options.margin.left);
  if (options.float === "center") {
    const marginWidth = Math.max((columns - contentWidth - getBorderWidth(options.borderStyle)) / 2, 0);
    marginLeft = PAD.repeat(marginWidth);
  } else if (options.float === "right") {
    const marginWidth = Math.max(columns - contentWidth - options.margin.right - getBorderWidth(options.borderStyle), 0);
    marginLeft = PAD.repeat(marginWidth);
  }
  let result = "";
  if (options.margin.top) {
    result += NEWLINE.repeat(options.margin.top);
  }
  if (options.borderStyle !== NONE || options.title) {
    result += colorizeBorder(marginLeft + chars.topLeft + (options.title ? makeTitle(options.title, chars.top.repeat(contentWidth), options.titleAlignment) : chars.top.repeat(contentWidth)) + chars.topRight) + NEWLINE;
  }
  const lines = content.split(NEWLINE);
  result += lines.map((line) => marginLeft + colorizeBorder(chars.left) + colorizeContent(line) + colorizeBorder(chars.right)).join(NEWLINE);
  if (options.borderStyle !== NONE) {
    result += NEWLINE + colorizeBorder(marginLeft + chars.bottomLeft + chars.bottom.repeat(contentWidth) + chars.bottomRight);
  }
  if (options.margin.bottom) {
    result += NEWLINE.repeat(options.margin.bottom);
  }
  return result;
};
var sanitizeOptions = (options) => {
  var _a;
  if (options.fullscreen && ((_a = import_node_process2.default) == null ? void 0 : _a.stdout)) {
    let newDimensions = [import_node_process2.default.stdout.columns, import_node_process2.default.stdout.rows];
    if (typeof options.fullscreen === "function") {
      newDimensions = options.fullscreen(...newDimensions);
    }
    options.width ||= newDimensions[0];
    options.height ||= newDimensions[1];
  }
  options.width &&= Math.max(1, options.width - getBorderWidth(options.borderStyle));
  options.height &&= Math.max(1, options.height - getBorderWidth(options.borderStyle));
  return options;
};
var formatTitle = (title, borderStyle) => borderStyle === NONE ? title : ` ${title} `;
var determineDimensions = (text, options) => {
  options = sanitizeOptions(options);
  const widthOverride = options.width !== void 0;
  const columns = terminalColumns();
  const borderWidth = getBorderWidth(options.borderStyle);
  const maxWidth = columns - options.margin.left - options.margin.right - borderWidth;
  const widest = widestLine(wrapAnsi(text, columns - borderWidth, { hard: true, trim: false })) + options.padding.left + options.padding.right;
  if (options.title && widthOverride) {
    options.title = options.title.slice(0, Math.max(0, options.width - 2));
    options.title &&= formatTitle(options.title, options.borderStyle);
  } else if (options.title) {
    options.title = options.title.slice(0, Math.max(0, maxWidth - 2));
    if (options.title) {
      options.title = formatTitle(options.title, options.borderStyle);
      if (stringWidth(options.title) > widest) {
        options.width = stringWidth(options.title);
      }
    }
  }
  options.width ||= widest;
  if (!widthOverride) {
    if (options.margin.left && options.margin.right && options.width > maxWidth) {
      const spaceForMargins = columns - options.width - borderWidth;
      const multiplier = spaceForMargins / (options.margin.left + options.margin.right);
      options.margin.left = Math.max(0, Math.floor(options.margin.left * multiplier));
      options.margin.right = Math.max(0, Math.floor(options.margin.right * multiplier));
    }
    options.width = Math.min(options.width, columns - borderWidth - options.margin.left - options.margin.right);
  }
  if (options.width - (options.padding.left + options.padding.right) <= 0) {
    options.padding.left = 0;
    options.padding.right = 0;
  }
  if (options.height && options.height - (options.padding.top + options.padding.bottom) <= 0) {
    options.padding.top = 0;
    options.padding.bottom = 0;
  }
  return options;
};
var isHex = (color) => color.match(/^#(?:[0-f]{3}){1,2}$/i);
var isColorValid = (color) => typeof color === "string" && (source_default[color] ?? isHex(color));
var getColorFunction = (color) => isHex(color) ? source_default.hex(color) : source_default[color];
var getBGColorFunction = (color) => isHex(color) ? source_default.bgHex(color) : source_default[camelCase(["bg", color])];
function boxen(text, options) {
  options = {
    padding: 0,
    borderStyle: "single",
    dimBorder: false,
    textAlignment: "left",
    float: "left",
    titleAlignment: "left",
    ...options
  };
  if (options.align) {
    options.textAlignment = options.align;
  }
  if (options.borderColor && !isColorValid(options.borderColor)) {
    throw new Error(`${options.borderColor} is not a valid borderColor`);
  }
  if (options.backgroundColor && !isColorValid(options.backgroundColor)) {
    throw new Error(`${options.backgroundColor} is not a valid backgroundColor`);
  }
  options.padding = getObject(options.padding);
  options.margin = getObject(options.margin);
  options = determineDimensions(text, options);
  text = makeContentText(text, options);
  return boxContent(text, options.width, options);
}

// utils/common.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// node_modules/.pnpm/ora@8.1.1/node_modules/ora/index.js
var import_node_process8 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var import_node_process4 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var import_node_process3 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/mimic-function@5.0.1/node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@7.0.0/node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process11) => !!process11 && typeof process11 === "object" && typeof process11.removeListener === "function" && typeof process11.emit === "function" && typeof process11.reallyExit === "function" && typeof process11.listeners === "function" && typeof process11.kill === "function" && typeof process11.pid === "number" && typeof process11.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global2 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global2[kExitEmitter]) {
      return global2[kExitEmitter];
    }
    ObjectDefineProperty(global2, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
};
var SignalExitBase = class {
};
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process4.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process11) {
    super();
    this.#process = process11;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process11;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process11.kill(process11.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process11.reallyExit;
    this.#originalProcessEmit = process11.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = (opts == null ? void 0 : opts.alwaysLast) ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
var process4 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process4) ? new SignalExit(process4) : new SignalExitFallback());

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var terminal = import_node_process3.default.stderr.isTTY ? import_node_process3.default.stderr : import_node_process3.default.stdout.isTTY ? import_node_process3.default.stdout : void 0;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = import_node_process4.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = import_node_process4.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/.pnpm/ora@8.1.1/node_modules/ora/index.js
var import_cli_spinners = __toESM(require_cli_spinners(), 1);

// node_modules/.pnpm/is-unicode-supported@1.3.0/node_modules/is-unicode-supported/index.js
var import_node_process5 = __toESM(require("node:process"), 1);
function isUnicodeSupported() {
  if (import_node_process5.default.platform !== "win32") {
    return import_node_process5.default.env.TERM !== "linux";
  }
  return Boolean(import_node_process5.default.env.CI) || Boolean(import_node_process5.default.env.WT_SESSION) || Boolean(import_node_process5.default.env.TERMINUS_SUBLIME) || import_node_process5.default.env.ConEmuTask === "{cmd::Cmder}" || import_node_process5.default.env.TERM_PROGRAM === "Terminus-Sublime" || import_node_process5.default.env.TERM_PROGRAM === "vscode" || import_node_process5.default.env.TERM === "xterm-256color" || import_node_process5.default.env.TERM === "alacritty" || import_node_process5.default.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/log-symbols@6.0.0/node_modules/log-symbols/index.js
var main = {
  info: source_default.blue("\u2139"),
  success: source_default.green("\u2714"),
  warning: source_default.yellow("\u26A0"),
  error: source_default.red("\u2716")
};
var fallback = {
  info: source_default.blue("i"),
  success: source_default.green("\u221A"),
  warning: source_default.yellow("\u203C"),
  error: source_default.red("\xD7")
};
var logSymbols = isUnicodeSupported() ? main : fallback;
var log_symbols_default = logSymbols;

// node_modules/.pnpm/is-interactive@2.0.0/node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env)
  );
}

// node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
var import_node_process6 = __toESM(require("node:process"), 1);
function isUnicodeSupported2() {
  const { env: env2 } = import_node_process6.default;
  const { TERM, TERM_PROGRAM } = env2;
  if (import_node_process6.default.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env2.WT_SESSION) || Boolean(env2.TERMINUS_SUBLIME) || env2.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env2.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/stdin-discarder@0.2.2/node_modules/stdin-discarder/index.js
var import_node_process7 = __toESM(require("node:process"), 1);
var ASCII_ETX_CODE = 3;
var StdinDiscarder = class {
  #activeCount = 0;
  start() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      this.#realStart();
    }
  }
  stop() {
    if (this.#activeCount <= 0) {
      throw new Error("`stop` called more times than `start`");
    }
    this.#activeCount--;
    if (this.#activeCount === 0) {
      this.#realStop();
    }
  }
  #realStart() {
    if (import_node_process7.default.platform === "win32" || !import_node_process7.default.stdin.isTTY) {
      return;
    }
    import_node_process7.default.stdin.setRawMode(true);
    import_node_process7.default.stdin.on("data", this.#handleInput);
    import_node_process7.default.stdin.resume();
  }
  #realStop() {
    if (!import_node_process7.default.stdin.isTTY) {
      return;
    }
    import_node_process7.default.stdin.off("data", this.#handleInput);
    import_node_process7.default.stdin.pause();
    import_node_process7.default.stdin.setRawMode(false);
  }
  #handleInput(chunk) {
    if (chunk[0] === ASCII_ETX_CODE) {
      import_node_process7.default.emit("SIGINT");
    }
  }
};
var stdinDiscarder = new StdinDiscarder();
var stdin_discarder_default = stdinDiscarder;

// node_modules/.pnpm/ora@8.1.1/node_modules/ora/index.js
var import_cli_spinners2 = __toESM(require_cli_spinners(), 1);
var Ora = class {
  #linesToClear = 0;
  #isDiscardingStdin = false;
  #lineCount = 0;
  #frameIndex = -1;
  #lastSpinnerFrameTime = 0;
  #options;
  #spinner;
  #stream;
  #id;
  #initialInterval;
  #isEnabled;
  #isSilent;
  #indent;
  #text;
  #prefixText;
  #suffixText;
  color;
  constructor(options) {
    if (typeof options === "string") {
      options = {
        text: options
      };
    }
    this.#options = {
      color: "cyan",
      stream: import_node_process8.default.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options
    };
    this.color = this.#options.color;
    this.spinner = this.#options.spinner;
    this.#initialInterval = this.#options.interval;
    this.#stream = this.#options.stream;
    this.#isEnabled = typeof this.#options.isEnabled === "boolean" ? this.#options.isEnabled : isInteractive({ stream: this.#stream });
    this.#isSilent = typeof this.#options.isSilent === "boolean" ? this.#options.isSilent : false;
    this.text = this.#options.text;
    this.prefixText = this.#options.prefixText;
    this.suffixText = this.#options.suffixText;
    this.indent = this.#options.indent;
    if (import_node_process8.default.env.NODE_ENV === "test") {
      this._stream = this.#stream;
      this._isEnabled = this.#isEnabled;
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return this.#linesToClear;
        },
        set(newValue) {
          this.#linesToClear = newValue;
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return this.#frameIndex;
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          return this.#lineCount;
        }
      });
    }
  }
  get indent() {
    return this.#indent;
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    this.#indent = indent;
    this.#updateLineCount();
  }
  get interval() {
    return this.#initialInterval ?? this.#spinner.interval ?? 100;
  }
  get spinner() {
    return this.#spinner;
  }
  set spinner(spinner) {
    this.#frameIndex = -1;
    this.#initialInterval = void 0;
    if (typeof spinner === "object") {
      if (spinner.frames === void 0) {
        throw new Error("The given spinner must have a `frames` property");
      }
      this.#spinner = spinner;
    } else if (!isUnicodeSupported2()) {
      this.#spinner = import_cli_spinners.default.line;
    } else if (spinner === void 0) {
      this.#spinner = import_cli_spinners.default.dots;
    } else if (spinner !== "default" && import_cli_spinners.default[spinner]) {
      this.#spinner = import_cli_spinners.default[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return this.#text;
  }
  set text(value = "") {
    this.#text = value;
    this.#updateLineCount();
  }
  get prefixText() {
    return this.#prefixText;
  }
  set prefixText(value = "") {
    this.#prefixText = value;
    this.#updateLineCount();
  }
  get suffixText() {
    return this.#suffixText;
  }
  set suffixText(value = "") {
    this.#suffixText = value;
    this.#updateLineCount();
  }
  get isSpinning() {
    return this.#id !== void 0;
  }
  #getFullPrefixText(prefixText = this.#prefixText, postfix = " ") {
    if (typeof prefixText === "string" && prefixText !== "") {
      return prefixText + postfix;
    }
    if (typeof prefixText === "function") {
      return prefixText() + postfix;
    }
    return "";
  }
  #getFullSuffixText(suffixText = this.#suffixText, prefix = " ") {
    if (typeof suffixText === "string" && suffixText !== "") {
      return prefix + suffixText;
    }
    if (typeof suffixText === "function") {
      return prefix + suffixText();
    }
    return "";
  }
  #updateLineCount() {
    const columns = this.#stream.columns ?? 80;
    const fullPrefixText = this.#getFullPrefixText(this.#prefixText, "-");
    const fullSuffixText = this.#getFullSuffixText(this.#suffixText, "-");
    const fullText = " ".repeat(this.#indent) + fullPrefixText + "--" + this.#text + "--" + fullSuffixText;
    this.#lineCount = 0;
    for (const line of stripAnsi(fullText).split("\n")) {
      this.#lineCount += Math.max(1, Math.ceil(stringWidth(line, { countAnsiEscapeCodes: true }) / columns));
    }
  }
  get isEnabled() {
    return this.#isEnabled && !this.#isSilent;
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    this.#isEnabled = value;
  }
  get isSilent() {
    return this.#isSilent;
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    this.#isSilent = value;
  }
  frame() {
    const now = Date.now();
    if (this.#frameIndex === -1 || now - this.#lastSpinnerFrameTime >= this.interval) {
      this.#frameIndex = ++this.#frameIndex % this.#spinner.frames.length;
      this.#lastSpinnerFrameTime = now;
    }
    const { frames } = this.#spinner;
    let frame = frames[this.#frameIndex];
    if (this.color) {
      frame = source_default[this.color](frame);
    }
    const fullPrefixText = typeof this.#prefixText === "string" && this.#prefixText !== "" ? this.#prefixText + " " : "";
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    const fullSuffixText = typeof this.#suffixText === "string" && this.#suffixText !== "" ? " " + this.#suffixText : "";
    return fullPrefixText + frame + fullText + fullSuffixText;
  }
  clear() {
    if (!this.#isEnabled || !this.#stream.isTTY) {
      return this;
    }
    this.#stream.cursorTo(0);
    for (let index = 0; index < this.#linesToClear; index++) {
      if (index > 0) {
        this.#stream.moveCursor(0, -1);
      }
      this.#stream.clearLine(1);
    }
    if (this.#indent || this.lastIndent !== this.#indent) {
      this.#stream.cursorTo(this.#indent);
    }
    this.lastIndent = this.#indent;
    this.#linesToClear = 0;
    return this;
  }
  render() {
    if (this.#isSilent) {
      return this;
    }
    this.clear();
    this.#stream.write(this.frame());
    this.#linesToClear = this.#lineCount;
    return this;
  }
  start(text) {
    if (text) {
      this.text = text;
    }
    if (this.#isSilent) {
      return this;
    }
    if (!this.#isEnabled) {
      if (this.text) {
        this.#stream.write(`- ${this.text}
`);
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (this.#options.hideCursor) {
      cli_cursor_default.hide(this.#stream);
    }
    if (this.#options.discardStdin && import_node_process8.default.stdin.isTTY) {
      this.#isDiscardingStdin = true;
      stdin_discarder_default.start();
    }
    this.render();
    this.#id = setInterval(this.render.bind(this), this.interval);
    return this;
  }
  stop() {
    if (!this.#isEnabled) {
      return this;
    }
    clearInterval(this.#id);
    this.#id = void 0;
    this.#frameIndex = 0;
    this.clear();
    if (this.#options.hideCursor) {
      cli_cursor_default.show(this.#stream);
    }
    if (this.#options.discardStdin && import_node_process8.default.stdin.isTTY && this.#isDiscardingStdin) {
      stdin_discarder_default.stop();
      this.#isDiscardingStdin = false;
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: log_symbols_default.info, text });
  }
  stopAndPersist(options = {}) {
    if (this.#isSilent) {
      return this;
    }
    const prefixText = options.prefixText ?? this.#prefixText;
    const fullPrefixText = this.#getFullPrefixText(prefixText, " ");
    const symbolText = options.symbol ?? " ";
    const text = options.text ?? this.text;
    const separatorText = symbolText ? " " : "";
    const fullText = typeof text === "string" ? separatorText + text : "";
    const suffixText = options.suffixText ?? this.#suffixText;
    const fullSuffixText = this.#getFullSuffixText(suffixText, " ");
    const textToWrite = fullPrefixText + symbolText + fullText + fullSuffixText + "\n";
    this.stop();
    this.#stream.write(textToWrite);
    return this;
  }
};
function ora(options) {
  return new Ora(options);
}

// utils/common.ts
var isObject = (val) => val && typeof val === "object";
var mergeArrayWithDedupe = (a, b) => Array.from(/* @__PURE__ */ new Set([...a, ...b]));
function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key];
    const newVal = obj[key];
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal);
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal);
    } else {
      target[key] = newVal;
    }
  }
  return target;
}
function sortDependencies(packageJson) {
  const sorted = {};
  const depTypes = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};
      Object.keys(packageJson[depType]).sort().forEach((name) => {
        sorted[depType][name] = packageJson[depType][name];
      });
    }
  }
  return {
    ...packageJson,
    ...sorted
  };
}
function readJsonFile(filename) {
  return JSON.parse(import_fs.default.readFileSync(filename, { encoding: "utf-8" }));
}
function recursionDir(targetPath, fn) {
  if (!import_fs.default.existsSync(targetPath)) {
    return false;
  }
  const stats = import_fs.default.statSync(targetPath);
  fn({ path: targetPath, isDir: stats.isDirectory() });
  if (stats.isDirectory()) {
    for (const file of import_fs.default.readdirSync(targetPath).filter((name) => name !== ".DS_Store")) {
      recursionDir(import_path.default.resolve(targetPath, file), fn);
    }
  }
}
var mergePackage = (targetPath, newTargetPath) => {
  const filename = import_path.default.basename(targetPath);
  if (filename === "package.json" && import_fs.default.existsSync(newTargetPath)) {
    const existing = JSON.parse(import_fs.default.readFileSync(newTargetPath, "utf8"));
    const newPackage = JSON.parse(import_fs.default.readFileSync(targetPath, "utf8"));
    const pkg = sortDependencies(deepMerge(existing, newPackage));
    import_fs.default.writeFileSync(newTargetPath, JSON.stringify(pkg, null, 2) + "\n");
  }
};
var myTypeof = (data) => {
  var toString = Object.prototype.toString;
  var dataType = toString.call(data).replace(/\[object\s(.+)\]/, "$1").toLowerCase();
  return dataType;
};
var joinPath = (...basePath) => {
  return function(...paths) {
    return import_path.default.join(...basePath, ...paths);
  };
};
var deepAssign = (defaultObject, targetObject) => {
  defaultObject = Object.assign({}, defaultObject);
  Object.keys(targetObject).forEach((v) => {
    switch (myTypeof(targetObject[v])) {
      case "object":
        defaultObject[v] = deepAssign(defaultObject[v], targetObject[v]);
        break;
      case "array":
        defaultObject[v] = [...defaultObject[v], ...targetObject[v]];
        break;
      default:
        defaultObject[v] = targetObject[v];
        break;
    }
  });
  return defaultObject;
};
var isProjectExists = (projectName2) => {
  const cwd = process.cwd();
  const targetDirectory = import_path.default.join(cwd, projectName2);
  return import_fs.default.existsSync(targetDirectory);
};
var deleteDirectory = async (dirPath) => {
  const spinner = ora(source_default.blue(`Deleting existing project: ${import_path.default.basename(dirPath)}`)).start();
  try {
    if (import_fs.default.existsSync(dirPath)) {
      await import_fs.default.promises.rm(dirPath, { recursive: true });
    }
    spinner.succeed(handleCharkRgb(`Project: ${import_path.default.basename(dirPath)} deleted successfully`));
  } catch (error) {
    spinner.fail(handleCharkRgb(`Project: ${import_path.default.basename(dirPath)} deleted failed`, 255, 0, 0));
    throw error;
  }
};
var handleCharkRgb = (title, r = 0, g = 255, b = 0) => {
  return source_default.rgb(r, g, b)(title);
};

// utils/createTemplate.ts
var import_ejs = __toESM(require_ejs());
var import_fs2 = __toESM(require("fs"));
var import_fs_extra = __toESM(require_lib2());
var import_path2 = __toESM(require("path"));

// utils/defaultConfig.ts
var defaultConfig = {
  projectName: "default-project",
  templatesRoot: "./templates",
  templateName: "default-template",
  dirAlias: {
    base: "base",
    options: "options",
    ejs: "ejs"
  },
  ejsDataJsAlias: "ejsData.js",
  options: []
};

// utils/createTemplate.ts
var createTemplate = (config, fn) => {
  config = deepAssign(defaultConfig, config);
  const { projectName: projectName2, templatesRoot, dirAlias, templateName, ejsDataJsAlias, options } = config;
  const targetPath = import_path2.default.join(process.cwd(), projectName2);
  const templateBasePath = joinPath(import_path2.default.join(templatesRoot, templateName));
  const basePath = templateBasePath(dirAlias.base);
  const optionsPath = templateBasePath(dirAlias.options);
  const ejsPath = templateBasePath(dirAlias.ejs);
  const allConfig = {
    targetPath,
    basePath,
    optionsPath,
    ejsPath,
    ejsDataJsAlias,
    options,
    config,
    ejsData: {}
  };
  renderBase(allConfig);
  initOptionsEjsData(allConfig);
  renderOptions(allConfig);
  renderEjs(allConfig);
  endFolw(allConfig);
  if (typeof fn === "function") {
    fn(allConfig);
  }
};
var renderBase = (allConfig) => {
  const { basePath, targetPath } = allConfig;
  import_fs_extra.default.copySync(basePath, targetPath, {
    filter(src) {
      const basename = import_path2.default.basename(src);
      return basename !== "node_modules";
    }
  });
};
var initOptionsEjsData = (allConfig) => {
  const { optionsPath, ejsDataJsAlias, ejsData } = allConfig;
  if (!import_fs2.default.existsSync(optionsPath)) {
    return false;
  }
  recursionDir(optionsPath, (data) => {
    const filename = import_path2.default.basename(data.path);
    if (filename === ejsDataJsAlias) {
      const optionEjsData = require(data.path);
      Object.keys(optionEjsData).map((k) => {
        const curData = optionEjsData[k];
        switch (myTypeof(curData)) {
          case "function":
            ejsData[k] = new Function();
            break;
          case "array":
            ejsData[k] = [];
            break;
          default:
            ejsData[k] = "";
            break;
        }
      });
    }
  });
};
var renderOptions = (allConfig) => {
  const { options, optionsPath, targetPath, ejsDataJsAlias, ejsData } = allConfig;
  options == null ? void 0 : options.map((item) => {
    const curItemPath = import_path2.default.join(optionsPath, item);
    let fn;
    import_fs_extra.default.copySync(curItemPath, targetPath, {
      filter(src, dest) {
        const basename = import_path2.default.basename(src);
        switch (basename) {
          case "node_modules":
            return false;
          case "package.json":
            mergePackage(src, dest);
            return false;
          case ejsDataJsAlias:
            const optionEjsData = require(src);
            Object.keys(optionEjsData).map((key) => {
              let curData = optionEjsData[key];
              switch (myTypeof(curData)) {
                case "function":
                  fn = curData;
                  break;
                case "array":
                  ejsData[key] = [...ejsData[key], ...curData];
                  break;
                default:
                  ejsData[key] += curData;
                  break;
              }
            });
            return false;
          default:
            return true;
        }
      }
    });
    if (typeof fn === "function") {
      fn(allConfig);
    }
  });
};
var renderEjs = (allConfig) => {
  const { targetPath, ejsPath, ejsData } = allConfig;
  if (!import_fs2.default.existsSync(ejsPath)) {
    return false;
  }
  recursionDir(ejsPath, (data) => {
    const basename = import_path2.default.basename(data.path);
    if (basename === "node_modules") {
      return false;
    }
    try {
      import_ejs.default.renderFile(data.path, ejsData, (err, str) => {
        if (err) {
          return;
        }
        const renderEjsPath = import_path2.default.join(targetPath, import_path2.default.relative(ejsPath, data.path));
        let deleteEjsSuffix = renderEjsPath.split(".");
        deleteEjsSuffix.pop();
        import_fs2.default.writeFileSync(deleteEjsSuffix.join("."), str);
      });
    } catch (error) {
      console.log({ error }, "--renderEjs");
    }
  });
};
var endFolw = (allConfig) => {
  const { targetPath } = allConfig;
  const RootPackageJsonPath = import_path2.default.join(targetPath, "package.json");
  if (import_fs2.default.existsSync(RootPackageJsonPath)) {
    let _data = readJsonFile(RootPackageJsonPath);
    _data.name = import_path2.default.basename(targetPath);
    _data.version = "1.0.0";
    _data.private = _data.private ? false : _data.private;
    let str = JSON.stringify(_data, null, 2);
    import_fs2.default.writeFileSync(RootPackageJsonPath, str);
  }
};

// inquiry.ts
var argv = (0, import_minimist.default)(process.argv.slice(2), { string: ["_"] });
var projectName = argv._[0];
var defaultProjectName = projectName ?? "test-project";
var autoImport = (defaultConfig2) => {
  const { templatesRoot, dirAlias } = defaultConfig2;
  const templatesData = {};
  let projectNames = import_fs3.default.readdirSync(templatesRoot).filter((name) => name !== ".DS_Store");
  projectNames.forEach((value) => {
    templatesData[value] = { title: value };
    templatesData[value]["options"] = [];
    const optionsPath = import_path3.default.join(templatesRoot, value, dirAlias.options);
    if (import_fs3.default.existsSync(optionsPath)) {
      import_fs3.default.readdirSync(optionsPath).filter((name) => name !== ".DS_Store").forEach((v2) => {
        templatesData[value]["options"].push({
          title: v2,
          value: v2
        });
      });
    }
  });
  return templatesData;
};
var handleOptions = (autoLoad, defaultConfig2) => {
  let data = autoLoad ? autoImport(defaultConfig2) : readJsonFile(import_path3.default.join(__dirname, "./templatesData.json"));
  const options = [];
  let obj = {
    type: "select",
    name: "templateName",
    message: "Pick template",
    choices: []
  };
  Object.keys(data).map((k) => {
    const title = data[k]["title"];
    const value = k;
    obj.choices.push({ title, value });
  });
  options.push(obj);
  options.push({
    type: (prev) => {
      var _a;
      return ((_a = data[prev]["options"]) == null ? void 0 : _a.length) ? "multiselect" : null;
    },
    name: "options",
    message: "Pick options",
    choices: (prev) => data[prev]["options"]
  });
  return options;
};
var inquiry = async (autoLoad = false) => {
  const templatesRoot = import_path3.default.resolve(__dirname, "./templates");
  const initConfig = deepAssign(defaultConfig, {
    templatesRoot
  });
  const promptsOptions = handleOptions(autoLoad, initConfig);
  if (projectName) {
    const projectExists = isProjectExists(projectName);
    if (projectExists) {
      await handleProjectExists(projectName, "SHELL");
    }
  }
  const promptsArray = [
    {
      name: "projectName",
      type: projectName ? null : "text",
      message: "Project name:",
      initial: defaultProjectName,
      onState: (state) => projectName = String(state.value).trim() || defaultProjectName
    },
    ...promptsOptions
  ];
  let promptsResult;
  try {
    promptsResult = await (0, import_prompts.default)(promptsArray, {
      onSubmit: async (e) => {
        if (e.name === "projectName") {
          const projectExists = isProjectExists(projectName);
          if (projectExists) {
            await handleProjectExists(projectName);
          }
        }
      },
      onCancel: () => {
        throw new Error("User canceled the program");
      }
    });
  } catch (error) {
    console.log(handleCharkRgb("Termination procedure", 255, 0, 0));
    return null;
  }
  promptsResult.projectName = promptsResult.projectName ?? defaultProjectName;
  const config = deepAssign(initConfig, {
    projectName: promptsResult["projectName"],
    templateName: promptsResult["templateName"],
    options: promptsResult["options"]
  });
  return config;
};
var handleProjectExists = async (projectName2, type) => {
  const projectNameBoldCyan = source_default.bold(source_default.cyan(projectName2));
  const deleteRed = handleCharkRgb("delete", 255, 0, 0);
  const firstLine = `A project with the name "${projectNameBoldCyan}" already exists. Do you want to ${deleteRed} it?`;
  const secondLine = `The deletion operation cannot be replied, please exercise caution!`;
  const message = `${source_default.bold(firstLine)}

${handleCharkRgb(secondLine, 255, 0, 0)}`;
  const deletePrompt = await (0, import_prompts.default)({
    type: "confirm",
    name: "delete",
    message: boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "red"
    }),
    initial: false
  });
  if (deletePrompt.delete) {
    await deleteDirectory(import_path3.default.join(process.cwd(), projectName2));
  } else {
    if (type === "SHELL") {
      console.log(source_default.red("Termination procedure"));
    }
    throw new Error("User canceled the program");
  }
};

// index.ts
async function init() {
  let config = await inquiry(true);
  if (!config)
    return process.exit();
  const buddhaCodeBlock = `
                      _o0o_
                    __ooOoo__
                    o8888888o
                    88" . "88
                    (| -_- |)
                     O\\ = /O
                 ____/'---'\\____
                  .' \\\\| |// '.
                / \\\\||| : |||// \\
              / _||||| -:- |||||- \\
                | | \\\\\\ - /// | |
              | \\_| ''\\---/'' |_/ |
               \\ .-\\__ '-' ___/-. /
            ___'. .' /--.--\\ '. .'__
         ."" '< '.___\\_<|>_/___.' >'"".
        | | : ' - \\'.'\\ _ /'.'/ - ' : | |
          \\ \\ '-. \\_ __\\ /__ _/ .-' / /
  ======'-.____'-.___\\_____/___.-'____.-'======
                     '=---='

  =============================================
                   \u5535\u561B\u5462\u53ED\u54AA\u543D
                     \u9547\u538B\u90AA\u795F
`;
  createTemplate(config, ({ targetPath }) => {
    console.log(source_default.yellow(buddhaCodeBlock));
    console.log(handleCharkRgb(`\u606D\u559C\u4F60\u9879\u76EE\u6210\u529F\u521B\u5EFA\uFF01\u9879\u76EE\u8DEF\u5F84\u4E3A\uFF1A
  ${source_default.bold(source_default.cyan(targetPath))}`));
  });
}
init().catch((err) => {
  process.exit();
});
/*! Bundled license information:

ejs/lib/ejs.js:
  (**
   * @file Embedded JavaScript templating engine. {@link http://ejs.co}
   * @author Matthew Eernisse <mde@fleegix.org>
   * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
   * @project EJS
   * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
   *)
*/
