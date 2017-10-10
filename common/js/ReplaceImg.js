/*
 * my_libs 0.1 pre
 * 
 * 
 *
 * Copyright Software 
 * 
 * 
 */
	
	
function ReplaceImg(img){
	/*
		{
		'prev':'ele',
		'next':'ele',
		'single_img':'ele',
		'single_img_src':'js',
		'list_img':'ele',
		'list_img_title':'alt|title',
		'imgs_list_src':'js',
		'title':'ele'
		}
	*/
	var __this__=this;
	this.single_img=$(img.single_img);
	this.single_img_src=img.single_img_src||'src';
	this.list_img=$(img.list_img);
	this.list_img_title=img.list_img_title;
	this.imgs_list_src=img.imgs_list_src||'src';
	this.title=img.title;
	
	var loop_check=function(index){
		var listl_img_index=0;
		var imgs=img.list_img;
		for(var i=0; i<imgs.length; i++){
			listl_img_index = parseInt($(imgs[i]).attr('index'));
			if(index==listl_img_index){
				__this__.single_img.attr({'src':$(imgs[i]).attr(__this__.imgs_list_src),'index':index});
				$(__this__.title).text($(imgs[i]).attr(__this__.list_img_title));
				break;
			}
		}
	};
	this.prev=function(){
		$(img.prev).click(function(){
			var single_img_nex_index=parseInt($(img.single_img).attr('index'))-1;//自定义索引
			loop_check(single_img_nex_index);
			
		});
	};
	this.next=function(){
		$(img.next).click(function(){
			var single_img_nex_index=parseInt($(img.single_img).attr('index'))+1;//自定义索引
			loop_check(single_img_nex_index);
			
		});
	};
}
	







$('#prev').click(function(){
	var big_img,small_img,nex_big_img_index,small_img_index;
	big_img=$('#bigImgBox img');
	small_img=$("#allLiImg img");
	nex_big_img_index=parseInt($(big_img[0]).attr('index'))-1;
	for(var i=0; i<small_img.length; i++)
	{
		small_img_index = parseInt($(small_img[i]).attr('index'));
		if(nex_big_img_index==small_img_index){
			big_img.attr({'src':$(small_img[i]).attr('url'),'index':nex_big_img_index});
			$('#ImgDesc').text($(small_img[i]).attr('alt'));
			break;
		}
	}
});
$('#next').click(function(){
	var big_img,small_img,nex_big_img_index,small_img_index;
	big_img=$('#bigImgBox img');
	small_img=$("#allLiImg img");
	nex_big_img_index=parseInt($(big_img[0]).attr('index'))+1;
	for(var i=0; i<small_img.length; i++)
	{
		small_img_index = parseInt($(small_img[i]).attr('index'));
		if(nex_big_img_index==small_img_index){
			big_img.attr({'src':$(small_img[i]).attr('url'),'index':nex_big_img_index});
			$('#ImgDesc').text($(small_img[i]).attr('alt'));
			break;
		}
	}
	
});




