module.exports = function(ngModule){
    require("!style!css!less!./ocModal.less");
    require('./ocModal')(ngModule);
};
