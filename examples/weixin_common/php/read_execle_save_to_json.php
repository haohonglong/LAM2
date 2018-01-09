<?php
date_default_timezone_set('Asia/Shanghai');
//引入Reader
define('ROOT','..');
define('PHPEXCEL',ROOT.'/php/PHPExcel-1.8.1');
define('ROOT_118',ROOT);
define('XLSX',ROOT_118.'/xlsx');
require_once(PHPEXCEL.'/Classes/PHPExcel.php');
require_once(PHPEXCEL.'/Classes/PHPExcel/IOFactory.php');
require_once(PHPEXCEL.'/Classes/PHPExcel/Reader/Excel5.php');
$fileExtensions = 'xlsx';
$basepath  = XLSX;
$names = [
    "2017-2018年度CSSCI来源期刊目录公示(1)",
    "2017年中国科技核心期刊目录（社会科学卷）",
    "第七版《中文核心期刊要目总览》官方正式公布(1)"
];
$num = 1;
$filepath = $basepath."/_00{$num}.xlsx";

if("xlsx" === $fileExtensions){
    $objReader = \PHPExcel_IOFactory::createReader('Excel2007');
}else{
    $objReader = \PHPExcel_IOFactory::createReader('Excel5');
}


$objPHPExcel = $objReader->load($filepath); //$filename可以是上传的文件，或者是指定的文件
$sheetCount = $objPHPExcel->getSheetCount();//获取所有工作表的个数
$excel_data = [];
$data =[];
for($i = 0; $i < $sheetCount; $i++)//遍历Excels的sheet页
{
    $sheet = $objPHPExcel->getSheet($i);
    //获取sheet页的名字：$sheetName = $sheet->getTitle();
    $highestRow = $sheet->getHighestRow(); // 取得总行数
    $highestColumn = $sheet->getHighestColumn(); // 取得总列数
    $maxColumns = \PHPExcel_Cell::columnIndexFromString($highestColumn);
    for($key = 1; $key <= $highestRow; $key++)
    {
        for($k = 0; $k < $maxColumns; $k++)
        {
            $excel_data[$key][$k] = $sheet->getCellByColumnAndRow($k, $key)->getValue();//获取数据
        }
    }
}

$data['title']=$names[$num-1];
foreach ($excel_data as $k1 => $item){
    $data['data'][] = [
        "id"=>$k1,
        "code"=>trim($item[0]),
        "name"=>trim($item[1]),
        "title"=>isset($item[2]) ? trim($item[2]) : "",
        "node"=>isset($item[3]) ? trim($item[3]) : "",
    ];
}
//var_dump($data);
$json =json_encode($data,JSON_UNESCAPED_UNICODE);
$jsondir = ROOT_118.'/json/';
if(!is_dir($jsondir)){mkdir($jsondir);}
$json_file = $jsondir."data_{$num}.json";
file_put_contents($json_file, $json);


