"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var _payload$ctx$store$ge, _payload$model$fookie, _payload$ctx$store$ge2;

    var arr, _iterator, _step, f;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = [];
            arr.concat(((_payload$ctx$store$ge = payload.ctx.store.get("default_life_cycle_controls").filters[payload.method]) === null || _payload$ctx$store$ge === void 0 ? void 0 : _payload$ctx$store$ge.before) || []);
            arr.concat(((_payload$model$fookie = payload.model.fookie[payload.method]) === null || _payload$model$fookie === void 0 ? void 0 : _payload$model$fookie.filters) || []);
            arr.concat(((_payload$ctx$store$ge2 = payload.ctx.store.get("default_life_cycle_controls").filters[payload.method]) === null || _payload$ctx$store$ge2 === void 0 ? void 0 : _payload$ctx$store$ge2.after) || []);

            if (!arr.every(function (e) {
              return payload.ctx.filters.has(e);
            })) {
              _context.next = 24;
              break;
            }

            _iterator = _createForOfIteratorHelper(arr);
            _context.prev = 6;

            _iterator.s();

          case 8:
            if ((_step = _iterator.n()).done) {
              _context.next = 14;
              break;
            }

            f = _step.value;
            _context.next = 12;
            return payload.ctx.filters.get(f)(payload);

          case 12:
            _context.next = 8;
            break;

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](6);

            _iterator.e(_context.t0);

          case 19:
            _context.prev = 19;

            _iterator.f();

            return _context.finish(19);

          case 22:
            _context.next = 25;
            break;

          case 24:
            throw Error('Mssing filter');

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 16, 19, 22]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();