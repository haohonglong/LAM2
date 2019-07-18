<?php

$html = file_get_contents('./html/content.html');
libxml_use_internal_errors(true);
$dom = new DOMDocument();
@$dom->loadHTML('<?xml encoding="UTF-8">' . $html);

$arr = [];
$xpath = new DOMXPath($dom);
$divs = $xpath->query("//div[@class='paper-section']");
foreach ($divs as $k=> $div) {
	$arr[$k] = [
		"section"=>[
			"a"=>[]
		]
	];

	// if('paper-section' == $div->getAttribute('class')){

		$manya = $xpath->query('p/a',$div);
		foreach($manya as $a) {
			$arr[$k]["section"]["a"][]=[
				"href"=>$a->getAttribute('href'),
				"class"=>$a->getAttribute('class'),
				"txt"=>$a->nodeValue,
			];

		}


	// }

}
// var_dump($arr);
$html = json_encode($arr,JSON_UNESCAPED_UNICODE);
$html = str_replace('\\','',$html);
$html = str_replace('../','',$html);




file_put_contents('./data/data.json',$html);
