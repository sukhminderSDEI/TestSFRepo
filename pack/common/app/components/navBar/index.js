module.exports = function (ngModule) {
    require("!style!css!less!./navBar.less");
    require('./navBar')(ngModule);
};