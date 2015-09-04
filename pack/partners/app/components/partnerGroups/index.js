module.exports = function(ngModule){
    require("!style!css!less!./partnerGroups.less");
    require('./partnerGroups')(ngModule);
};