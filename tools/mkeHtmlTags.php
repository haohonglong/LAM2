<?php
define('BASEPATH',dirname(__DIR__));

function g_tag($str)
{
    $tag ='[a-z]+';
    $attrs = '[a-z0-9_\-="].*?';
    $begin = "(<$tag)\s*($attrs)>";
    $end = "(<\/$tag>)";
    $content = "(\s*)";
    $container = "({$begin}{$content}|({$begin}{$content}{$end}*){$end})";
    preg_match_all("/$container/i", preg_replace("/[\t\n\r]+/","",trim($str)), $matches);
    $tags = [];
//        var_dump($matches[2][2]);exit;
    for($i=0,$str =$matches[2],$len=count($str);$i<$len;$i++){
        $tag = substr($str[$i],1);
        $str2 = $matches[3][$i];
        preg_match_all("/([a-z0-9_\-]+)=([\$\(\)a-z0-9_\-\"]*)/i", $str2, $matches2);
        $json =[];
        for($j=0,$str2 =$matches2,$len2=count($str2[1]);$j<$len2;$j++){
            $key = $str2[1][$j];
            $value = trim($str2[2][$j],'"');
            $json[$key] = $value;
        }

        $div = "E('$tag',".json_encode($json).")";

        $tags[]=[
            'tag'=>$div,
            'name'=>$tag,
        ];
//            echo $div;exit;

    }
    var_dump($tags);exit;
}

$path = BASEPATH.'';
$str = file_get_contents($path);

g_tag($str);