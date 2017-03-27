<?php
function httpGet($url, $params, $user_agent="Google") {
    
    $curl_options = array(
        CURLOPT_USERAGENT      => $user_agent,
        CURLOPT_ENCODING       => "",           // accepts all
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_AUTOREFERER    => true,
        CURLOPT_CONNECTTIMEOUT => 120,
        CURLOPT_TIMEOUT        => 120,
        CURLOPT_MAXREDIRS      => 10,
        CURLOPT_SSL_VERIFYPEER => false         // make requests over TLS/SSL
    );
    
    

    $ch      = curl_init($url.getQueryString($params));
    curl_setopt_array($ch, $curl_options);
    $content = curl_exec($ch);
    $err     = curl_errno($ch);
    $errmsg  = curl_error($ch);
    $header  = curl_getinfo($ch);
    curl_close($ch);

    $data = array();    
    $data['errno']   = $err;
    $data['errmsg']  = $errmsg;
    $data['content'] = $content;
    $data['info'] = $header;
    
    return $data;
}

function getQueryString($params) {
    $query = "";
    foreach($params as $parameter => $value) {
        $query.="&".urlencode($parameter)."=".urlencode($value);
    }
    if($query !== "") {
        $query = substr($query, 1);
    }
    return $query !== "" ? "?".$query : "";
}

?>
