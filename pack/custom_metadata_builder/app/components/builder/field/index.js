module.exports = function (ngModule) {
    require("!style!css!less!./field.less");
    require('./field')(ngModule);
};
