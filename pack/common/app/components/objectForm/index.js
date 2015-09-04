module.exports = function(ngModule){
    require("!style!css!less!./objectForm.less");
    require('./question')(ngModule);
    require('./objectForm')(ngModule);
};