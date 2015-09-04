module.exports = function (ngModule) {
    require("!style!css!less!./builder.less");
    require('./builder')(ngModule);
};
