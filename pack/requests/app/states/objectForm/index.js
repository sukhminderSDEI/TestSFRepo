module.exports = function(ngModule){
    require("!style!css!less!./objectForm.less");
    require('./objectForm')(ngModule);
};