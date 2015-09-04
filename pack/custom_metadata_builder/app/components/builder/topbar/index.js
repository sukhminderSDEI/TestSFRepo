module.exports = function (ngModule) {
    require("!style!css!less!./topbar.less");
    require('./topbar')(ngModule);
};