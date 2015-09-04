module.exports = function (ngModule) {
    require("!style!css!less!./objects.less");
    require('./objects')(ngModule);
};

