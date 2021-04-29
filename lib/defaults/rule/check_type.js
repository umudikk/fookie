"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validate = require("validate.js");

module.exports = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var user, req, model, query, method, body, ctx, validators, _i, _Object$keys, isValid;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, req = _ref.req, model = _ref.model, query = _ref.query, method = _ref.method, body = _ref.body, ctx = _ref.ctx;
            validators = ctx.store.get("validators");
            _i = 0, _Object$keys = Object.keys(model.schema);

          case 3:
            if (!(_i < _Object$keys.length)) {
              _context.next = 11;
              break;
            }

            field = _Object$keys[_i];
            isValid = validate[validators[model.schema[field].type]](body[field]);

            if (isValid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", false);

          case 8:
            _i++;
            _context.next = 3;
            break;

          case 11:
            return _context.abrupt("return", true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();