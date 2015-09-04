module.exports = function(ngModule){
    require("!style!css!less!./partnerList.less");
    require('./partnerList')(ngModule);
};