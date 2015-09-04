module.exports = function(ngModule){
    require("!style!css!less!./taskList.less");
    require('./taskList')(ngModule);
};