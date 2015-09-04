module.exports = function (ngModule) {
    require("!style!css!less!./partnerProfile.less");
    require('./partnerProfile')(ngModule);
};