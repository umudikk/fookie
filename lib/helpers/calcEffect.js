"use strict";

module.exports = function (payload) {
  var _payload$ctx$store$ge, _payload$model$fookie, _payload$ctx$store$ge2;

  var arr = [];
  arr.concat(((_payload$ctx$store$ge = payload.ctx.store.get("default_life_cycle_controls").effects[payload.method]) === null || _payload$ctx$store$ge === void 0 ? void 0 : _payload$ctx$store$ge.before) || []);
  arr.concat(((_payload$model$fookie = payload.model.fookie[payload.method]) === null || _payload$model$fookie === void 0 ? void 0 : _payload$model$fookie.effects) || []);
  arr.concat(((_payload$ctx$store$ge2 = payload.ctx.store.get("default_life_cycle_controls").effects[payload.method]) === null || _payload$ctx$store$ge2 === void 0 ? void 0 : _payload$ctx$store$ge2.after) || []);

  if (arr.every(function (e) {
    return payload.ctx.effects.has(e);
  })) {
    arr.forEach(function (eff) {
      payload.ctx.effects.get(eff)(payload);
    });
  } else {
    throw Error("Missing Effect");
  }
};