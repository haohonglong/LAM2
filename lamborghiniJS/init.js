//加载基础类

window[GRN_LHH].run(function(){
    'use strict';
    var System=this;
    System.root={
        'path':System.ROOT
    };
    System.import([
        '/Object.class',
        '/Component.class',
        '/Helper.class',
        '/Browser.class',
        '/Dom.class',
        '/Html.class',
        '/Template.class',
        '/Controller.class'
    ],System.classPath+'/base');
});