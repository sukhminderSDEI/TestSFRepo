module.exports = function (ngModule) {
    require("!style!css!less!./autoComplete.less");
    require('./autoComplete')(ngModule);
};