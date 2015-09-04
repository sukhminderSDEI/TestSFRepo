module.exports = function(ngModule){
    require("!style!css!less!./partnerActions.less");
    require('./partnerActions')(ngModule);
};