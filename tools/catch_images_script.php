<?php
/*
*/
/**
 * 功能：下载远程图片保存到本地
 * @note  当保存文件名称为空时则使用远程文件原来的名称
 * @param $url 远程图片地址
 * @param string $save_dir 保存到本地文件夹路径
 * @param string $filename 保存文件名称
 * @param int $type 使用的下载方式
 * @return array
 */
function getImage($url,$save_dir='',$filename='',$type=0){
    $image_types =['.gif','.jpg','.bmp','.jpeg'];
    if(trim($url)==''){
        return array('file_name'=>'','save_path'=>'','error'=>1);
    }
    if(trim($save_dir)==''){
        $save_dir='./';
    }

    if(trim($filename)==''){//保存文件名
        $ext=strrchr($url,'.');
        if(!in_array($ext,$image_types)){
            return array('file_name'=>'','save_path'=>'','error'=>3);
        }
        $filename=time().$ext;
    }
    if(0!==strrpos($save_dir,'/')){
        $save_dir.='/';
    }
    //创建保存目录
    if(!file_exists($save_dir)&&!mkdir($save_dir,0777,true)){
        return array('file_name'=>'','save_path'=>'','error'=>5);
    }
    //获取远程文件所采用的方法
    if($type){
        $ch=curl_init();
        $timeout=5;
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
        $img=curl_exec($ch);
        curl_close($ch);
    }else{
        ob_start();
        readfile($url);
        $img=ob_get_contents();
        ob_end_clean();
    }
    //$size=strlen($img);
    //文件大小
    $fp2=@fopen($save_dir.$filename,'a');
    fwrite($fp2,$img);
    fclose($fp2);
    unset($img,$url);
    return array('file_name'=>$filename,'save_path'=>$save_dir.$filename,'error'=>0);
}

/**
 * 抓取指定网页里所有图片
 * @param $site_name
 * @return mixed
 */
function get_img_url($site_name){
    $site_fd = fopen($site_name, "r");
    $site_content = "";
    while (!feof($site_fd)) {
        $site_content .= fread($site_fd, 1024);
    }
    /*利用正则表达式得到图片链接*/
    $reg_tag = '/<img.*?\"([^\"]*(jpg|bmp|jpeg|gif)).*?>/';
    $ret = preg_match_all($reg_tag, $site_content, $match_result);
    fclose($site_fd);
    return $match_result[1];
}

//测试
$src = "";
$images = get_img_url('http://www.bz1111.com/top/class108/15041/58376d52e6c996e7.htm');
foreach ($images as $k => $v){
    $i = $k+1;
    $i = $i < 10 ? '0'.$i : $i;
getImage($v,getcwd().'/images',$i.'.jpg',1);

}
