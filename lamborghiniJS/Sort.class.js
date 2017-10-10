
window[GRN_LHH].run([window],function(window,undefined){
	var System=this;
	System.is(System,'Helper','Sort');

	var __this__=null;


	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-9
	 * 修改日期：2015-10-9
	 * 名称：sort
	 * 功能：排序的参数是对象时
	 * 说明：影响当前数组，不会返回新数组 排序方式 默认从小到大 ,要从大到小用 reverse()方法
	 * 注意：
	 * @param 	([])arr            				NO NULL :
	 * @param 	(String)key             		NO NULL :
	 * @return  ([])
	 * Example：
	 *
	 *
	 */
	function sort(arr,key){

		var sorts=function(a, b){
			if(System.isFloat(a) || System.isFloat(b)){
				return parseFloat(a) - parseFloat(b);
			}else{
				return parseInt(a) 	 - parseInt(b);
			}

		};

		arr.sort(function(x,y){

			if(System.isObject(x) && System.isObject(y)){
				return sorts(x[key],y[key]);

			}else{
				return sorts(x,y);
			}


		});
		return arr;
	}

	var Sort = System.Helper.extend({
		constructor: function(D) {
			__this__=this;
			var defaults={
				'data':null,
				'sortKey':null
			};

			var init = System.isObject(D) ? System.merge({},[D,defaults]) : defaults;

			this.init = init;

			this.data 		= init.data 		|| null;
			this.sortKey 	= init.sortKey  	|| null;
			this.arr=[];
		},
		'_className':'Sort',

		'setData':function(s){this.arr.push(s);},
		'getData':function(){return this.arr.join('');},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：reconstructed
		 * 功能：初始化自动分类
		 * 说明：
		 * 注意：
		 * @param 	([])data            				NO NULL :
		 * @return  (Sort)
		 * Example：
		 *
		 */
		'reconstructed':function(){



			return this;
		},

		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2016-9-5
		 * 名称：html
		 * 功能：输出html内容
		 * 说明：
		 * 注意：
		 * @param 	([])arr            				NULL :
		 * @return  (Sort)
		 * Example：
		 *
		 */
		'html':function(arr){
			var __this__ = this;
			arr = arr || this.data;

			arr.each(function(){
				var self=this;
				var a=System.Html.a(this['url'],{
					'target':'_blank'
					,'title':self['url']
					,'class':'before'
				},'{'+this.name+' ｜ '+this.pice+'}');
				__this__.setData(a);

			});
			return this;
		},



		/**
		 * @author: lhh
		 * 产品介绍：
		 * 创建日期：2015-10-9
		 * 修改日期：2015-10-9
		 * 名称：sorts
		 * 功能：初始化状态
		 * 说明：排序方式 默认从小到大
		 * 注意：
		 * @param 	(String)keyword             	NO NULL : 关键字
		 * @return  ([]) 返回克隆后的新数组
		 * Example：
		 *
		 */
		'sorts':function(sortKey){

			if(!System.isArray(this.data)){return this;}

			sortKey   = sortKey 	|| this.sortKey;

			var arr = this.data.clone();

			sort(arr,sortKey);//排序后


			return arr;
		},



		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Sort对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){}
	});


	Sort.swap=function(A,B){};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-5
	 * 修改日期：2016-9-5
	 * 名称：Sort.selectSort
	 * 功能：选择排序
	 * 说明：反序用reverse()方法
	 * 注意：在原数组上排序
	 * @param 	([])array             			NO NULL :要排序的数组
	 * @return  ([])
	 * Example
	 *
	 *
	 */
	Sort.selectionSort=function(array){
		var len=array.length,temp,minIndex;
		for(var i=0;i<len;i++){
			minIndex = i;
			for(var j=i+1;j<len;j++){
				if(array[j] < array[minIndex]){
					minIndex = j;
				}
			}
			if(i != minIndex){
				temp = array[i];
				array[i] = array[minIndex];
				array[minIndex] = temp;

			}
		}
		return array;

	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-5
	 * 修改日期：2016-9-5
	 * 名称：Sort.insertSort
	 * 功能：插入排序
	 * 说明：反序用reverse()方法
	 * 注意：在原数组上排序
	 * @param 	([])array             			NO NULL :要排序的数组
	 * @return  ([])
	 * Example
	 *
	 *
	 */
	Sort.insertSort=function(array){
		var len=array.length,temp;
		for(var i=1;i<len;i++){
			for(var j=i;j>0;j--){
				if(array[j]<array[j-1]){
					temp=array[j];
					array[j]=array[j-1];
					array[j-1]=temp;
				}else{

					break;
				}
			}
		}
		return array;

	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-5
	 * 修改日期：2016-9-5
	 * 名称：Sort.quicksort
	 * 功能：快速排序
	 * 说明：反序用reverse()方法
	 * 注意：在原数组上排序
	 * @param 	([])array             			NO NULL :要排序的数组
	 * @return  ([])
	 * Example
	 *
	 *
	 */
	Sort.quicksort=function(array){
		function sort(prev, numsize){
			var nonius = prev;
			var j = numsize -1;
			var flag = array[prev];
			if ((numsize - prev) > 1) {
				while(nonius < j){
					for(; nonius < j; j--){
						if (array[j] < flag) {
							array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
							break;
						}
					}
					for( ; nonius < j; nonius++){
						if (array[nonius] > flag){
							array[j--] = array[nonius];
							break;
						}
					}
				}
				array[nonius] = flag;
				sort(0, nonius);
				sort(nonius + 1, numsize);
			}
		}
		sort(0, array.length);

		return array;
	};
	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-5
	 * 修改日期：2016-9-5
	 * 名称：Sort.bubbleSort
	 * 功能：冒泡排序
	 * 说明：反序用reverse()方法
	 * 注意：在原数组上排序
	 * @param 	([])arr             			NO NULL :要排序的数组
	 * @return  ([])
	 * Example
	 *
	 *
	 */
	Sort.bubbleSort=function(arr){
		for(var i= 0, j,len=arr.length;i < len;i++){
			for (j = i+1; j < len; j++) {
				if(arr[i]>arr[j]){
					var tmp = arr[i];
					arr[i] = arr[j];
					arr[j] = tmp;
				}
			}
		}
		return arr;
	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-12-31
	 * 修改日期：2016-9-5
	 * 名称：Sort.bubbleSort_key
	 * 功能：冒泡排序
	 * 说明：反序用reverse()方法
	 * 注意：在原数组上排序
	 * @param 	([])arr             			NO NULL :要排序的数组
	 * @param 	(String)key             		NO NULL :排序关键字
	 * @return  ([])
	 * Example：
	 * 		[{'price':22}
	 * 		,{'price':5}
	 * 		,{'price':50}
	 * 		]
	 *
	 *
	 */
	Sort.bubbleSort_key=function(arr,key){
		for(var i= 0, j,len=arr.length;i < len;i++){
			for (j = i+1; j < len; j++) {
				if(arr[i][key]>arr[j][key]){
					var tmp = arr[i];
					arr[i] = arr[j];
					arr[j] = tmp;
				}
			}
		}
		return arr;
	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2016-9-5
	 * 修改日期：2016-9-5
	 * 名称：Sort.mergeSort
	 * 功能：归并排序
	 * 说明：
	 * 注意：
	 * @param 	([])array             			NO NULL :要排序的数组
	 * @return  ([])
	 * Example：
	 *
	 *
	 */
	Sort.mergeSort=function(array){
		var len = array.length;
	};

	/**
	 * @author: lhh
	 * 产品介绍：
	 * 创建日期：2015-10-9
	 * 修改日期：2016-8-23
	 * 名称：Sort.sort
	 * 功能：排序功能
	 * 说明：反序用reverse()方法
	 * 注意：
	 * @param 	([])arr             			NO NULL :
	 * @param 	(String)key             		NO NULL :
	 * @param 	(Function)sortFn             	   NULL :排序函数
	 * @param 	(Function)error       	   		   NULL :
	 * @return  ([])
	 * Example：
	 *
	 *
	 */
	Sort.sort=function(arr,key,sortFn,error){
		var sorts=function(a, b){
			if(System.isNumber(a) && System.isNumber(b)) {
				if (System.isFloat(a) || System.isFloat(b)) {
					return parseFloat(a) - parseFloat(b);
				} else {
					return parseInt(a) - parseInt(b);
				}
			}else{
				throw new Error('排序元素不是数字型');
				return;
			}
		};

		sortFn = sortFn || sorts;

		var n1,n2;
		arr.sort(function(x,y){
			if(System.isObject(x) && System.isObject(y)){
				n1 = x[key];
				n2 = y[key];
			}else{
				n1 = x;
				n2 = y;
			}

			return sortFn(
				String(n1).filterChar()
				,String(n2).filterChar()
			);
		});

		return arr;
	};
	System['Sort'] = Sort;
});




