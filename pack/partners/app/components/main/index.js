module.exports = function (ngModule) {
    require("!style!css!less!./main.less");
    require('./main')(ngModule);
    require('../partnerMatches')(ngModule); 
    require('../partnerList')(ngModule);
    require('../partnerActions')(ngModule);
    require('../partnerGroups')(ngModule);
    require('../partnerGroupEdit')(ngModule);
    require('../partnerAdd')(ngModule);
};