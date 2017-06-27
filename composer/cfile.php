<?php
function deldir($dir) {
  //先删除目录下的文件：
  $dh=opendir($dir);
  while ($file=readdir($dh)) {
    if($file!="." && $file!="..") {
      $fullpath=$dir."/".$file;
      if(!is_dir($fullpath)) {
          unlink($fullpath);
      } else {
          deldir($fullpath);
      }
    }
  }
 
  closedir($dh);
  //删除当前文件夹：
  if(rmdir($dir)) {
    return true;
  } else {
    return false;
  }
}

function cfile($files=[
	'js',
	'css/img',
	'images',
	'plugin/js',
	'plugin/css',
	'doc'],
	$root='item'){
	$root_dir = str_replace('\\', '/', __DIR__);
	// echo $root_dir."\n";
	// exit;
	if(is_dir($root)){
		deldir($root);
	}

	foreach ($files as $v) {
		$path=$root_dir.'/'.$root.'/'.$v;
		// echo $path;exit;
		//第三个参数是“true”表示能创建多级目录，iconv防止中文目录乱码
		$res=mkdir(iconv("UTF-8", "GBK", $path),0777,true); 
		if (!$res){
			echo "目录 $path 创建失败";
			exit;
		}



	}
	
}

cfile([
	'js',
	'css/img',
	'images',
	'plugin/js',
	'plugin/css',
	'common/css',
	'common/js',
	'doc'],'item');

