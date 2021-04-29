"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var user, method, model, result, body, ctx, keys, _iterator, _step, key, requiredRoles, auth, _iterator2, _step2, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, method = _ref.method, model = _ref.model, result = _ref.result, body = _ref.body, ctx = _ref.ctx;
            keys = [];
            if (result instanceof model.model) keys = Object.keys(result.toJSON());else keys = Object.keys(result);
            _iterator = _createForOfIteratorHelper(keys);
            _context.prev = 4;

            _iterator.s();

          case 6:
            if ((_step = _iterator.n()).done) {
              _context.next = 39;
              break;
            }

            key = _step.value;
            requiredRoles = model.schema[key] ? model.schema[key][body.method || "read"] || [] : [];

            if (!requiredRoles.every(function (i) {
              return ctx.roles.has(i);
            })) {
              _context.next = 36;
              break;
            }

            auth = false;
            _iterator2 = _createForOfIteratorHelper(requiredRoles);
            _context.prev = 12;

            _iterator2.s();

          case 14:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 24;
              break;
            }

            i = _step2.value;
            _context.t0 = auth;

            if (_context.t0) {
              _context.next = 21;
              break;
            }

            _context.next = 20;
            return ctx.roles.get(i)({
              user: user,
              method: method,
              model: model,
              result: result,
              body: body,
              ctx: ctx
            });

          case 20:
            _context.t0 = _context.sent;

          case 21:
            auth = _context.t0;

          case 22:
            _context.next = 14;
            break;

          case 24:
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](12);

            _iterator2.e(_context.t1);

          case 29:
            _context.prev = 29;

            _iterator2.f();

            return _context.finish(29);

          case 32:
            if (requiredRoles.length == 0) auth = true;

            if (!auth) {
              result[key] = undefined;
            }

            _context.next = 37;
            break;

          case 36:
            throw Error('Mssing Roles');

          case 37:
            _context.next = 6;
            break;

          case 39:
            _context.next = 44;
            break;

          case 41:
            _context.prev = 41;
            _context.t2 = _context["catch"](4);

            _iterator.e(_context.t2);

          case 44:
            _context.prev = 44;

            _iterator.f();

            return _context.finish(44);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 41, 44, 47], [12, 26, 29, 32]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();