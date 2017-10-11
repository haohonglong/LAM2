if(!_ROOT_){
    var _ROOT_ = '../..';
}
(function(){
    var tag = "script",attrs=[],src;
    attrs.push('type="text/javascript"');
    src=_ROOT_+'/common/config/config.js';

    document.write('<',tag,' ',attrs.join(' '),'src=','"',src,'"','>','<','/',tag,'>');
})();
