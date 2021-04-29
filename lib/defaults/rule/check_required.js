"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var user, req, model, query, method, body, ctx, search, keys, _i, _keys, key;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, req = _ref.req, model = _ref.model, query = _ref.query, method = _ref.method, body = _ref.body, ctx = _ref.ctx;
            search = ["", null, undefined];
            keys = Object.keys(model.schema);
            _i = 0, _keys = keys;

          case 4:
            if (!(_i < _keys.length)) {
              _context.next = 12;
              break;
            }

            key = _keys[_i];

            if (!model.schema[key].required) {
              _context.next = 9;
              break;
            }

            if (!search.includes(body[key])) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", false);

          case 9:
            _i++;
            _context.next = 4;
            break;

          case 12:
            return _context.abrupt("return", true);

          case 13:
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