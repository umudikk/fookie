"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var _payload$ctx$store$ge, _payload$model$fookie, _payload$ctx$store$ge2;

    var arr;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arr = [];
            arr.concat(((_payload$ctx$store$ge = payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method]) === null || _payload$ctx$store$ge === void 0 ? void 0 : _payload$ctx$store$ge.before) || []);
            arr.concat(((_payload$model$fookie = payload.model.fookie[payload.method]) === null || _payload$model$fookie === void 0 ? void 0 : _payload$model$fookie.modifies) || []);
            arr.concat(((_payload$ctx$store$ge2 = payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method]) === null || _payload$ctx$store$ge2 === void 0 ? void 0 : _payload$ctx$store$ge2.after) || []);

            if (!arr.every(function (e) {
              return payload.ctx.modifies.has(e);
            })) {
              _context2.next = 8;
              break;
            }

            arr.forEach( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(m) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return payload.ctx.modifies.get(m)(payload);

                      case 2:
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
            _context2.next = 9;
            break;

          case 8:
            throw Error('Mssing modify');

          case 9:
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