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
$filepath = $basepath.'/118.xlsx';

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
            $excel_data[$k][] = $sheet->getCellByColumnAndRow($k, $key)->getValue();//获取数据
        }
    }
}

foreach ($excel_data as $k1 => $item){
    foreach ($item as $k2 =>$v){
        if(0 === $k2){continue;}
        $data['data'][] = [
            "id"=>trim($excel_data[0][$k2]),
            "name"=>trim($excel_data[1][$k2]),
            "title"=>trim($excel_data[2][$k2]),
            "code"=>trim($excel_data[3][$k2]),
        ];
    }
}
//var_dump($data);
$json =json_encode($data,JSON_UNESCAPED_UNICODE);
$jsondir = ROOT_118.'/json/';
if (!is_dir($jsondir)) mkdir($jsondir);
$json_file = $jsondir.'data_1.json';
file_put_contents($json_file, $json);


