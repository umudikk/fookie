"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose = require("mongoose");
var queryString = require("query-string");
var rawQueryParser = require("api-query-params");
var mongoosePaginate = require("mongoose-paginate-v2");
var events_1 = require("events");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API(options) {
        var _this = _super.call(this) || this;
        _this.connection = null;
        _this.requester = null;
        _this.models = new Map();
        _this.roles = new Map();
        _this.urlParser = queryString;
        _this.rawQueryParser = rawQueryParser;
        _this.paginate = mongoosePaginate;
        _this.roles.set('everybody', function () {
            return true;
        });
        _this.roles.set('nobody', function () {
            return false;
        });
        return _this;
    }
    API.prototype.connect = function (url, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, mongoose.connect(url, config)];
                    case 1:
                        _a.connection = _b.sent();
                        return [2 /*return*/, this.connection];
                }
            });
        });
    };
    API.prototype.newRole = function (roleName, roleFunction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.roles.set(roleName, roleFunction);
                return [2 /*return*/];
            });
        });
    };
    API.prototype.setModel = function (modelName, schema) {
        return __awaiter(this, void 0, void 0, function () {
            var roles, model;
            return __generator(this, function (_a) {
                roles = this.roles;
                schema.plugin(this.paginate);
                schema.statics.GET = function (_a) {
                    var user = _a.user, filter = _a.filter;
                    return __awaiter(this, void 0, void 0, function () {
                        var document;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.findOne(filter)];
                                case 1:
                                    document = _b.sent();
                                    if (document instanceof mongoose.Model) {
                                        return [2 /*return*/, document.filter(user)];
                                    }
                                    else {
                                        return [2 /*return*/, false];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                schema.statics.POST = function (_a) {
                    var user = _a.user, body = _a.body;
                    return __awaiter(this, void 0, void 0, function () {
                        var document, tmp;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    document = new this(body);
                                    if (!document.checkAuth(user, 'post', body)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, document.save()];
                                case 1:
                                    tmp = _b.sent();
                                    return [2 /*return*/, tmp];
                                case 2: return [2 /*return*/, false];
                            }
                        });
                    });
                };
                schema.statics.DELETE = function (_a) {
                    var user = _a.user, filter = _a.filter;
                    return __awaiter(this, void 0, void 0, function () {
                        var document, obj;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.findOne(filter)];
                                case 1:
                                    document = _b.sent();
                                    if (!(document instanceof mongoose.Model)) return [3 /*break*/, 5];
                                    obj = document.toObject();
                                    delete obj._id;
                                    if (!document.checkAuth(user, 'delete', obj)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, document.remove()];
                                case 2: return [2 /*return*/, _b.sent()];
                                case 3: return [2 /*return*/, false];
                                case 4: return [3 /*break*/, 6];
                                case 5: return [2 /*return*/, false];
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                };
                schema.statics.PATCH = function (_a) {
                    var user = _a.user, filter = _a.filter, body = _a.body;
                    return __awaiter(this, void 0, void 0, function () {
                        var document, obj, i;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this.findOne(filter)];
                                case 1:
                                    document = _b.sent();
                                    if (!(document instanceof mongoose.Model)) return [3 /*break*/, 5];
                                    obj = document.toObject();
                                    delete obj._id;
                                    if (!document.checkAuth(user, 'patch', obj)) return [3 /*break*/, 3];
                                    for (i in body) {
                                        document[i] = body[i];
                                    }
                                    return [4 /*yield*/, document.save()];
                                case 2: return [2 /*return*/, _b.sent()];
                                case 3: return [2 /*return*/, false];
                                case 4: return [3 /*break*/, 6];
                                case 5: return [2 /*return*/, false];
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                };
                schema.statics.PAGINATION = function (_a) {
                    var user = _a.user, filter = _a.filter, body = _a.body;
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            return [2 /*return*/, this.paginate(filter, body)];
                        });
                    });
                };
                schema.methods.filter = function (user) {
                    var objectDocument = this.toObject();
                    var keys = Object.keys(objectDocument);
                    keys = keys.filter(function (key) { return key != '_id'; });
                    for (var i in keys) {
                        var requiredRoles = this.schema.tree[keys[i]].auth['get'];
                        if (requiredRoles.every(function (role) { return roles.has(role); })) {
                            var canAccess = requiredRoles.some(function (role) { return roles.get(role)(user, objectDocument); });
                            canAccess ? console.log('canAcess yes') : delete objectDocument[keys[i]];
                        }
                        else {
                            throw new Error('invalid roles');
                        }
                    }
                    return objectDocument;
                };
                schema.methods.checkAuth = function (user, method, body) {
                    var keys = Object.keys(body);
                    for (var i in keys) {
                        var requiredRoles = this.schema.tree[keys[i]].auth[method];
                        if (requiredRoles.every(function (i) { return roles.has(i); })) {
                            return requiredRoles.some(function (i) { return roles.get(i)(user, body); });
                        }
                        else {
                            return false;
                        }
                    }
                };
                model = mongoose.model(modelName, schema);
                this.models.set(modelName, model);
                return [2 /*return*/];
            });
        });
    };
    API.prototype.exec = function (user, Model, method, filter, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Model[method]({
                            user: user,
                            body: body,
                            filter: filter
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    API.prototype.run = function (user, method, query, body) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedUrl, modelName, mongooseQuery, Model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedUrl = this.urlParser.parseUrl(query);
                        modelName = parsedUrl.url.replace('/', '');
                        mongooseQuery = this.rawQueryParser(parsedUrl.query);
                        if (!this.models.has(modelName)) return [3 /*break*/, 2];
                        Model = this.models.get(modelName);
                        return [4 /*yield*/, this.exec(user, Model, method, mongooseQuery.filter, body)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return API;
}(events_1.EventEmitter));
exports["default"] = API;
