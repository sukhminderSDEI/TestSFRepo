module.exports = function(ngModule){
    require("!style!css!less!./docAttachment.less");
    require('./docAttachment')(ngModule);
};