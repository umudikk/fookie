"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var roles, keys, _roles, _iterator, _step, role, res, modifies;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            roles = ["system"];
            keys = Object.keys(payload.body);
            roles = roles.concat(payload.model.fookie[payload.method].role || []);

            if (["post", "patch"].includes(payload.method)) {
              roles = (_roles = roles).concat.apply(_roles, _toConsumableArray(keys.map(function (key) {
                return payload.model.schema[key].write;
              }) || []));
            }

            if (!(roles.length == 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", true);

          case 6:
            if (!roles.every(function (e) {
              return payload.ctx.roles.has(e);
            })) {
              _context.next = 34;
              break;
            }

            _iterator = _createForOfIteratorHelper(roles);
            _context.prev = 8;

            _iterator.s();

          case 10:
            if ((_step = _iterator.n()).done) {
              _context.next = 23;
              break;
            }

            role = _step.value;
            _context.next = 14;
            return payload.ctx.roles.get(role)(payload);

          case 14:
            res = _context.sent;

            if (!res) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", true);

          case 17:
            modifies = [];

            try {
              modifies = payload.model.fookie[payload.method].reject[role];
            } catch (error) {}

            _context.next = 21;
            return Promise.all(modifies.map(function (m) {
              return payload.ctx.modifies.get(m)(payload);
            }));

          case 21:
            _context.next = 10;
            break;

          case 23:
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](8);

            _iterator.e(_context.t0);

          case 28:
            _context.prev = 28;

            _iterator.f();

            return _context.finish(28);

          case 31:
            return _context.abrupt("return", false);

          case 34:
            throw Error('Missing role');

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 25, 28, 31]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();