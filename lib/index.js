"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    Op = _require.Op;

var express = require('express');

var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

var _require2 = require('./helpers'),
    hasFields = _require2.hasFields,
    clear = _require2.clear;

var cors = require('cors');

var modelParser = require('./helpers/modelParser');

var findRequiredRoles = require('./helpers/requiredRoles');

var check = require('./helpers/check');

var calcEffects = require('./helpers/calcEffect');

var calcFilter = require('./helpers/calcFilter');

var calcModify = require('./helpers/calcModify');

var client = require('prom-client');

var Fookie = /*#__PURE__*/function () {
  function Fookie() {
    var _this = this;

    _classCallCheck(this, Fookie);

    this.connection = null;
    this.models = new Map();
    this.roles = new Map();
    this.rules = new Map();
    this.effects = new Map();
    this.routines = new Map();
    this.filters = new Map();
    this.modifies = new Map();
    this.store = new Map();
    this.helpers = {
      calcEffects: calcEffects,
      check: check,
      findRequiredRoles: findRequiredRoles,
      clear: clear,
      hasFields: hasFields
    };
    var collectDefaultMetrics = client.collectDefaultMetrics;
    var Registry = client.Registry;
    var register = new Registry();
    collectDefaultMetrics({
      register: register
    });
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.post("/", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var payload;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //req
                payload = {
                  user: {},
                  method: req.body.method || "",
                  body: req.body.body || {},
                  model: req.body.model || "",
                  query: req.body.query || {},
                  token: req.headers.token || "",
                  options: req.body.options || {}
                }; //auth

                jwt.verify(payload.token, _this.store.get("secret"), /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, parsed) {
                    var User;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            User = _this.models.get('system_user').model;

                            if (err) {
                              _context.next = 5;
                              break;
                            }

                            _context.next = 4;
                            return User.findOne({
                              where: {
                                id: parsed.id
                              }
                            });

                          case 4:
                            payload.user = _context.sent;

                          case 5:
                            _context.t0 = res;
                            _context.next = 8;
                            return _this.run(payload);

                          case 8:
                            _context.t1 = _context.sent;

                            _context.t0.json.call(_context.t0, _context.t1);

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  _createClass(Fookie, [{
    key: "role",
    value: function role(name, _role) {
      this.roles.set(name, _role);
    }
  }, {
    key: "rule",
    value: function rule(name, _rule) {
      this.rules.set(name, _rule);
    }
  }, {
    key: "filter",
    value: function filter(name, _filter) {
      this.filters.set(name, _filter);
    }
  }, {
    key: "modify",
    value: function modify(name, before) {
      this.modifies.set(name, before);
    }
  }, {
    key: "model",
    value: function model(_model) {
      var Model = this.sequelize.define(_model.name, modelParser(_model).schema);
      _model.methods = new Map();

      _model.methods.set("get", /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
          var query, res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  query = _ref3.query;
                  _context3.next = 3;
                  return Model.findOne(query);

                case 3:
                  res = _context3.sent;
                  return _context3.abrupt("return", res);

                case 5:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5) {
          return _ref4.apply(this, arguments);
        };
      }());

      _model.methods.set("post", /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref5) {
          var body, document;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  body = _ref5.body;
                  document = Model.build(body);
                  _context4.next = 4;
                  return document.save();

                case 4:
                  return _context4.abrupt("return", _context4.sent);

                case 5:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }());

      _model.methods.set("getAll", /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref7) {
          var query;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  query = _ref7.query;
                  _context5.next = 3;
                  return Model.findAll(query);

                case 3:
                  return _context5.abrupt("return", _context5.sent);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x7) {
          return _ref8.apply(this, arguments);
        };
      }());

      _model.methods.set("delete", /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref9) {
          var query, document;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  query = _ref9.query;
                  _context6.next = 3;
                  return Model.findOne(query);

                case 3:
                  document = _context6.sent;

                  if (!(document instanceof Model)) {
                    _context6.next = 10;
                    break;
                  }

                  _context6.next = 7;
                  return document.destroy(query);

                case 7:
                  return _context6.abrupt("return", _context6.sent);

                case 10:
                  return _context6.abrupt("return", false);

                case 11:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x8) {
          return _ref10.apply(this, arguments);
        };
      }());

      _model.methods.set("patch", /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref11) {
          var query, body, document, f;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  query = _ref11.query, body = _ref11.body;
                  _context7.next = 3;
                  return Model.findOne(query);

                case 3:
                  document = _context7.sent;

                  for (f in body) {
                    document[f] = body[f];
                  }

                  _context7.next = 7;
                  return document.save();

                case 7:
                  return _context7.abrupt("return", _context7.sent);

                case 8:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x9) {
          return _ref12.apply(this, arguments);
        };
      }());

      _model.methods.set("schema", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", _model.schema);

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));

      _model.methods.set("count", /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref14) {
          var query;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  query = _ref14.query;
                  _context9.next = 3;
                  return Model.count(query);

                case 3:
                  return _context9.abrupt("return", _context9.sent);

                case 4:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));

        return function (_x10) {
          return _ref15.apply(this, arguments);
        };
      }());

      _model.methods.set("try", /*#__PURE__*/function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(payload) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return payload.ctx.helpers.calcModify(payload);

                case 2:
                  _context10.next = 4;
                  return payload.ctx.helpers.check(payload);

                case 4:
                  return _context10.abrupt("return", _context10.sent);

                case 5:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));

        return function (_x11) {
          return _ref16.apply(this, arguments);
        };
      }());

      this.sequelize.sync({
        alter: true
      });
      _model.model = Model;
      this.models.set(_model.name, _model);
      return _model;
    }
  }, {
    key: "effect",
    value: function () {
      var _effect2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(name, _effect) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this.effects.set(name, _effect);

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function effect(_x12, _x13) {
        return _effect2.apply(this, arguments);
      }

      return effect;
    }()
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(payload) {
        var model;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.log(payload);

                if (!(this.models.has(payload.model) && typeof this.models.get(payload.model).methods.get(payload.method) == 'function')) {
                  _context12.next = 23;
                  break;
                }

                model = this.models.get(payload.model);
                payload.model = model;
                payload.ctx = this;
                _context12.next = 7;
                return calcModify(payload);

              case 7:
                _context12.next = 9;
                return check(payload);

              case 9:
                if (!_context12.sent) {
                  _context12.next = 20;
                  break;
                }

                _context12.next = 12;
                return model.methods.get(payload.method)(payload);

              case 12:
                payload.result = _context12.sent;

                if (!payload.result) {
                  _context12.next = 17;
                  break;
                }

                _context12.next = 16;
                return calcFilter(payload);

              case 16:
                calcEffects(payload);

              case 17:
                return _context12.abrupt("return", payload.result);

              case 20:
                return _context12.abrupt("return", "NO AUTH");

              case 21:
                _context12.next = 24;
                break;

              case 23:
                return _context12.abrupt("return", "Model yok veya Method desteklenmiyor.");

              case 24:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function run(_x14) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "routine",
    value: function routine(name, time, func) {
      var _this2 = this;

      var routine = setInterval(function () {
        func(_this2);
      }, time);
      this.routines.set(name, routine);
    }
  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(url) {
        var config,
            _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                config = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
                this.sequelize = new Sequelize(url, {
                  logging: false,
                  define: {
                    freezeTableName: true
                  },
                  operatorsAliases: {
                    $eq: Op.eq,
                    // = 3
                    $ne: Op.ne,
                    // != 20
                    $is: Op.is,
                    // IS NULL
                    $not: Op.not,
                    // IS NOT TRUE
                    $or: Op.or,
                    // (someAttribute = 5) OR (someAttribute = 6)      
                    $col: Op.col,
                    // = "user"."organization_id"          
                    $gt: Op.gt,
                    // > 6
                    $gte: Op.gte,
                    // >= 6
                    $lt: Op.lt,
                    // < 10
                    $lte: Op.lte,
                    // <= 10
                    $between: Op.between,
                    // BETWEEN 6 AND 10
                    $notBetween: Op.notBetween,
                    // NOT BETWEEN 11 AND 15          
                    $in: Op["in"],
                    // IN [1, 2]
                    $notIn: Op.notIn,
                    // NOT IN [1, 2]          
                    $like: Op.like,
                    // LIKE '%hat'
                    $notLike: Op.notLike,
                    // NOT LIKE '%hat'
                    $startsWith: Op.startsWith,
                    // LIKE 'hat%'
                    $endsWith: Op.endsWith,
                    // LIKE '%hat'
                    $substring: Op.substring,
                    // LIKE '%hat%'
                    $iLike: Op.iLike,
                    // ILIKE '%hat' (case insensitive) (PG only)
                    $notILike: Op.notILike,
                    // NOT ILIKE '%hat'  (PG only)
                    $regexp: Op.regexp,
                    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
                    $notRegexp: Op.notRegexp,
                    // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
                    $iRegexp: Op.iRegexp,
                    // ~* '^[h|a|t]' (PG only)
                    $notIRegexp: Op.notIRegexp,
                    // !~* '^[h|a|t]' (PG only)          
                    $any: Op.any // ANY ARRAY[2, 3]::INTEGER (PG only)

                  }
                });
                _context13.prev = 2;
                _context13.next = 5;
                return this.sequelize.authenticate();

              case 5:
                _context13.next = 7;
                return this.prepareDefaults();

              case 7:
                console.log('Connection has been established successfully.');
                _context13.next = 13;
                break;

              case 10:
                _context13.prev = 10;
                _context13.t0 = _context13["catch"](2);
                console.error('Unable to connect to the database:', _context13.t0);

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this, [[2, 10]]);
      }));

      function connect(_x15) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "use",
    value: function () {
      var _use = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(cb) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return cb(this);

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function use(_x16) {
        return _use.apply(this, arguments);
      }

      return use;
    }()
  }, {
    key: "prepareDefaults",
    value: function () {
      var _prepareDefaults = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var model, system_model, models, _iterator, _step, m;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return this.model(require('./defaults/model/system_model.js'));

              case 2:
                model = _context15.sent;
                system_model = model.model;
                _context15.next = 6;
                return this.model(require('./defaults/model/system_user.js'));

              case 6:
                _context15.next = 8;
                return this.model(require('./defaults/model/system_admin.js'));

              case 8:
                _context15.next = 10;
                return system_model.findAll();

              case 10:
                models = _context15.sent;
                _iterator = _createForOfIteratorHelper(models);
                _context15.prev = 12;

                _iterator.s();

              case 14:
                if ((_step = _iterator.n()).done) {
                  _context15.next = 20;
                  break;
                }

                m = _step.value;
                _context15.next = 18;
                return this.model(modelParser(m));

              case 18:
                _context15.next = 14;
                break;

              case 20:
                _context15.next = 25;
                break;

              case 22:
                _context15.prev = 22;
                _context15.t0 = _context15["catch"](12);

                _iterator.e(_context15.t0);

              case 25:
                _context15.prev = 25;

                _iterator.f();

                return _context15.finish(25);

              case 28:
                //RULES
                this.rule('has_fields', require('./defaults/rule/has_fields'));
                this.rule('check_required', require('./defaults/rule/check_required'));
                this.rule('check_auth', require('./defaults/rule/check_auth'));
                this.rule('has_pwemail', require('./defaults/rule/has_pwemail'));
                this.rule('check_type', require('./defaults/rule/check_type'));
                this.rule('valid_attributes', require('./defaults/rule/valid_attributes')); //ROLES 

                this.role('everybody', require('./defaults/role/everybody'));
                this.role('nobody', require('./defaults/role/nobody'));
                this.role('system_admin', require('./defaults/role/system_admin'));
                this.role('system', require('./defaults/role/system')); //EFFECT

                this.effect('sync', require('./defaults/effect/sync')); //FILTERS

                this.filter('filter', require('./defaults/filter/filter'));
                this.filter('add_static_models', require('./defaults/filter/add_static_models')); //MODIFIES

                this.modify('password', require('./defaults/modify/password'));
                this.modify("set_defaults", require('./defaults/modify/set_defaults'));
                this.modify("attributes", require('./defaults/modify/attributes')); // PLUGINS

                this.use(require("./defaults/plugin/file_storage"));
                this.use(require("./defaults/plugin/health_check"));
                this.use(require("./defaults/plugin/login_register"));
                this.use(require("./defaults/plugin/default_life_cycle_controls"));
                this.store.set("validators", {
                  string: "isString",
                  number: "isNumber",
                  integer: "isInteger",
                  jsonb: "isObject",
                  json: "isObject",
                  date: "isDate",
                  time: "isTime"
                });

              case 49:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[12, 22, 25, 28]]);
      }));

      function prepareDefaults() {
        return _prepareDefaults.apply(this, arguments);
      }

      return prepareDefaults;
    }()
  }, {
    key: "listen",
    value: function listen(port) {
      this.app.listen(port, function () {
        console.log("FOOKIE ".concat(port, " is listening..."));
      });
    }
  }]);

  return Fookie;
}();

module.exports = Fookie;