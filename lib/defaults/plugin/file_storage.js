"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var multer = require('multer');

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var storage;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(1);
            storage = multer.diskStorage({
              destination: function destination(req, file, cb) {
                cb(null, '/uploads');
              },
              filename: function filename(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now());
              }
            });
            ctx.upload = multer({
              storage: storage
            });
            ctx.model({
              name: "system_file",
              display: "name",
              schema: {
                name: {
                  type: "string",
                  required: true
                },
                mimeType: {
                  type: "string"
                },
                path: {
                  type: "string"
                },
                "byte": {
                  type: "integer"
                }
              },
              fookie: {
                get: {
                  role: ["system_admin"]
                },
                getAll: {
                  role: ["system_admin"]
                },
                patch: {
                  role: ["system_admin"],
                  effect: ["form_data"]
                },
                post: {
                  role: ["system_admin"],
                  effect: ["form_data"]
                },
                "delete": {
                  role: ["system_admin"],
                  effect: ["form_data"]
                },
                schema: {
                  role: ["everybody"]
                }
              }
            });
            ctx.effect("form_data", function (payload) {
              payload.ctx.upload(payload.req, null, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          console.log(err);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();