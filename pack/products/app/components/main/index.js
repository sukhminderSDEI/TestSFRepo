module.exports = function (ngModule) {
    require("!style!css!less!./main.less");
    require('./main')(ngModule);
};