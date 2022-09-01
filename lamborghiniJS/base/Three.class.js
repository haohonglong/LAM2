/**
 * 三维
 */
(function(IT,factory){
	'use strict';
	var System = IT['LAM_20150910123700_'];

	if(!System){
		return;
	}else{
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(System) :
		typeof define === 'function' && define.amd ? define(factory(System)) :
		(System['Html5']['Three'] = factory(System));
	}

})(this,function(System){
	'use strict';
	System.is(System.Html5,'Shape','Three',System.classPath+'/base');

	var __this__=null;

	/**
	 *
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2014.6.4
	 * 修改日期：2019.9.13
	 * 名称： Shape
	 * 功能：
	 * 说明：
	 * 注意：
	 * @param 	(DocumentElement)theShape             NO NULL : canvas dom节点
	 * @return (void)
	 * Example：

	 */
	var Three = System.Html5.Shape.extend({
		constructor: function(theShape,init){
			this.base(theShape,init);
			__this__=this;

		},
		'_className':'Three',
		'__constructor':function(){},
        /**
         * @author: lhh
         * 产品介绍：
         * 创建日期：2018-9-13
         * 修改日期：2018-9-13
         * 名称： cube
         * 功能：绘制立方体
         * 说明：一个面由两个等边三角形构成，三个面构成立方体
         * 注意：
         * @param 	(Array)D.positions      NO NULL : 位置
         * @param 	(Array)D.colors         NO NULL : 立方体可见的三个面颜色
         * @param 	(String)D.strokeStyle   NO NULL : 属性设置或返回用于笔触的颜色、渐变或模式。
         * @returns {Three}
         */
        'cube':function (D) {
            var defaults={
                'positions':[
                    [200,100,100,200,300,200],
                    [200,100,300,200,400,100],
                    [100,200,300,200,200,300],
                    [300,200,200,300,400,300],
                    [400,100,300,200,500,200],
                    [300,200,400,300,500,200]
                ],
                'colors':['#ff9300','#f60','#c45100'],//top,left,right
                'strokeStyles':['#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5']
            };
            D = System.isPlainObject(D) ? System.merge({},[D,defaults]) : defaults;
            var strokeStyle = '#e5e5e5';
            if(D.positions[0]){this.triangle({'strokeStyle':D.strokeStyles[0] || strokeStyle,'position':D.positions[0]}).closePath().stroke().fill(D.colors[0]);}
            if(D.positions[1]){this.triangle({'strokeStyle':D.strokeStyles[1] || strokeStyle,'position':D.positions[1]}).closePath().stroke().fill(D.colors[0]);}
            if(D.positions[2]){this.triangle({'strokeStyle':D.strokeStyles[2] || strokeStyle,'position':D.positions[2]}).closePath().stroke().fill(D.colors[1]);}
            if(D.positions[3]){this.triangle({'strokeStyle':D.strokeStyles[3] || strokeStyle,'position':D.positions[3]}).closePath().stroke().fill(D.colors[1]);}
            if(D.positions[4]){this.triangle({'strokeStyle':D.strokeStyles[4] || strokeStyle,'position':D.positions[4]}).closePath().stroke().fill(D.colors[2]);}
            if(D.positions[5]){this.triangle({'strokeStyle':D.strokeStyles[5] || strokeStyle,'position':D.positions[5]}).closePath().stroke().fill(D.colors[2]);}
            return this;
        },


		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Three对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});

	return Three;
});


