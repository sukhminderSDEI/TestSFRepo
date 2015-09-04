module.exports = function (ngModule) {
    require("!style!css!less!./fields.less");
    require('./fields')(ngModule);
};