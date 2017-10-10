//加载基础类

window[GRN_LHH].run(function(){
    'use strict';
    var System=this;
    System.root={
        'path':_ROOT_
    };
    System.import([
        '/BiObject.class',
        '/Component.class',
        '/Helper.class',
        '/Browser.class',
        '/Dom.class',
        '/Html.class',
        '/Template.class',
        '/Controller.class'
    ],System.classPath);
});