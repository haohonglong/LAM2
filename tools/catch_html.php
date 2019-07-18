<?php
$str = file_get_contents('https://www.paperpass.com/reportdemo/htmls/detail_report/paper_1.html');


$content = <<<HTML
	<div class="paper-section" tpl-section="warp">(([\s\S])*?)<\/div>
HTML;
$content = preg_replace("/[\t\n\r]+/","",trim($content));
// echo $content;exit;
preg_match_all("/$content/i",preg_replace("/[\t\n\r]+/","",trim($str)), $matches);
// var_dump($matches);exit;
$html="";
foreach ($matches[0] as  $item) {
	$html.=$item;
}

file_put_contents('./html/content.html',$html);
