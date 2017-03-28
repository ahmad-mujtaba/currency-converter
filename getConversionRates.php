<?php
    require_once("inc/httpGet.php");
    $ratesFile="data/latest.json";
    $writeToFile = false;
    $updateFileDuration = 4;     // in hours
    $forceUpdateCommand = "forceUpdate";
    
    if(file_exists($ratesFile)) {
        $lastModified = filemtime($ratesFile);
        $now = time();
        $timeSince = ($now-$lastModified) / 3600;
        
        if($timeSince > $updateFileDuration) {
            $writeToFile = true;
        }
        
        if(isset($_REQUEST[$forceUpdateCommand])) {
            $writeToFile = true;
        }                
    } else {
        $writeToFile = true;
    }
    
    if($writeToFile) {
        
        $data = httpGet("https://openexchangerates.org/latest.json", array("app_id" => "c7bff540bfe440c7b33404c905aa38bd"));
        $data = $data["content"];
        
        $fp=fopen($ratesFile,"w+");
        fwrite($fp, $data);
        fclose($fp);
        
    } else {
        $data = "";
        $dataSize = filesize($ratesFile);
        if($dataSize > 0) {
            $fp=fopen($ratesFile,"r");
            $data = fread($fp, $dataSize);
            fclose($fp);
        }
    }    
    echo $data;
?>