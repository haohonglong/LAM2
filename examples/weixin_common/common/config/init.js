//加载基础类

LAMJS.run(function() {
    'use strict';
    var System=this;
    System.import([
        '/BiObject.class',
        '/Component.class',
        '/Helper.class',
        '/Template.class'
    ],System.classPath);
});