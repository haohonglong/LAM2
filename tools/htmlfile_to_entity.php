<?php

/**
 * 功能：指定文件里所有html转成实体字符
 * @note
 */
$suffix = '.html';
$name="test";
$path = dirname(__DIR__)."/documentation/views/";
$file = file_get_contents($path.$name.$suffix);
$file = htmlentities($file);
file_put_contents($path.$name.'_b'.$suffix,$file);
exit;