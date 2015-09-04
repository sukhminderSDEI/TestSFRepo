module.exports = function (ngModule) {
    require("!style!css!less!./records.less");
    require('./records')(ngModule);
};