"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.store.set("default_life_cycle_controls", {
              modifies: {
                post: {
                  before: [],
                  after: []
                },
                get: {
                  before: [],
                  after: []
                },
                getAll: {
                  before: [],
                  after: []
                },
                patch: {
                  before: [],
                  after: []
                },
                "delete": {
                  before: [],
                  after: []
                },
                count: {
                  before: [],
                  after: []
                },
                schema: {
                  before: [],
                  after: []
                },
                "try": {
                  after: [],
                  before: []
                }
              },
              rules: {
                post: {
                  before: ["has_fields", "check_type"],
                  after: []
                },
                get: {
                  before: ["valid_attributes"],
                  after: []
                },
                getAll: {
                  before: ["valid_attributes"],
                  after: []
                },
                patch: {
                  before: ["has_fields", "check_type"],
                  after: []
                },
                "delete": {
                  before: [],
                  after: []
                },
                count: {
                  before: [],
                  after: []
                },
                schema: {
                  before: [],
                  after: []
                },
                "try": {
                  after: [],
                  before: []
                }
              },
              filters: {
                post: {
                  before: [],
                  after: []
                },
                get: {
                  before: [],
                  after: []
                },
                getAll: {
                  before: [],
                  after: []
                },
                patch: {
                  before: [],
                  after: []
                },
                "delete": {
                  before: [],
                  after: []
                },
                count: {
                  before: [],
                  after: []
                },
                schema: {
                  before: [],
                  after: []
                },
                "try": {
                  after: [],
                  before: []
                }
              },
              effects: {
                post: {
                  before: [],
                  after: []
                },
                get: {
                  before: [],
                  after: []
                },
                getAll: {
                  before: [],
                  after: []
                },
                patch: {
                  before: [],
                  after: []
                },
                "delete": {
                  before: [],
                  after: []
                },
                count: {
                  before: [],
                  after: []
                },
                schema: {
                  before: [],
                  after: []
                },
                "try": {
                  after: [],
                  before: []
                }
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();