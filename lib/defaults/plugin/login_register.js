"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require("jsonwebtoken");

var _require = require("js-sha512"),
    sha512 = _require.sha512;

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    var system_user, system_admin, adminCount, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            system_user = ctx.models.get("system_user");
            system_admin = ctx.models.get("system_admin");
            _context3.next = 4;
            return system_admin.model.count({});

          case 4:
            adminCount = _context3.sent;

            if (!(adminCount == 0)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 8;
            return system_user.model.create({
              email: "admin",
              password: sha512("admin")
            });

          case 8:
            user = _context3.sent;
            _context3.next = 11;
            return system_admin.model.create({
              system_user: user.id
            });

          case 11:
            system_user.methods.set("login", /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                var body, email, password, user, token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        body = _ref2.body;
                        email = body.email, password = body.password;
                        _context.next = 4;
                        return system_user.model.findOne({
                          where: {
                            email: email,
                            password: sha512(password)
                          }
                        });

                      case 4:
                        user = _context.sent;

                        if (!(user instanceof system_user.model)) {
                          _context.next = 10;
                          break;
                        }

                        token = jwt.sign({
                          id: user.id
                        }, ctx.store.get("secret"));
                        return _context.abrupt("return", token);

                      case 10:
                        return _context.abrupt("return", false);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());
            system_user.methods.set("register", /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref4) {
                var body, email, password, user;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        body = _ref4.body;
                        email = body.email, password = body.password;
                        _context2.next = 4;
                        return system_user.model.findOne({
                          email: email,
                          password: sha512(password)
                        });

                      case 4:
                        user = _context2.sent;

                        if (!(user instanceof system_user.model)) {
                          _context2.next = 9;
                          break;
                        }

                        return _context2.abrupt("return", false);

                      case 9:
                        _context2.next = 11;
                        return system_user.model.create({
                          email: email,
                          password: sha512(password)
                        });

                      case 11:
                        user = _context2.sent;
                        return _context2.abrupt("return", true);

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x3) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();