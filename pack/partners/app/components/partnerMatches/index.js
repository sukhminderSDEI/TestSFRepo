module.exports = function (ngModule) {
    require("!style!css!less!./partnerMatches.less");
    require('./partnerMatches')(ngModule);
};