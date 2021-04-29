"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var user, req, body, model, query, method, ctx, system_admin, count;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, req = _ref.req, body = _ref.body, model = _ref.model, query = _ref.query, method = _ref.method, ctx = _ref.ctx;

            if (!(user.id == undefined)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            system_admin = ctx.models.get('system_admin').model;
            _context.next = 6;
            return system_admin.count({
              where: {
                system_user: user.id
              }
            });

          case 6:
            count = _context.sent;
            return _context.abrupt("return", count >= 1);

          case 8:
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