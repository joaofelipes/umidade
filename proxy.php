<?php
$apiKey = '27c94f97935cf5b9915b3ff05d7dcc87';
$apiRoot = 'https://api.darksky.net/forecast/';
 
#$apiKey = 'XXXXXXKEEPSECRETXXXXXX';
#$apiRoot = 'https://bristol.api.urbanthings.io/api/2.0/';
 
if(!isset($_GET['location'])) die(); // if we don't have any endpoint parameter we return an empty page
 
// Build up the URL as https://bristol.api.urbanthings.io/api/2.0/END/POINT/?apiKey=XXXXXXKEEPSECRETXXXXXX
$url = $apiRoot . $apiKey . "/" . $_GET['location'];
 
// Now add any additional GET parameters https://bristol.api.urbanthings.io/api/2.0/END/POINT/?apiKey=XXXXXXKEEPSECRETXXXXXX&param1=value&param2=value
foreach ($_GET as $key => $value) {
    if ($key != 'location') {
        $url = $url . '&' . $key . '=' . $value;
    }
}

$url = preg_replace("'&'", '?', $url, 1);

$arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);  
 
// Send the request to the API and return the result to the client
$outData = file_get_contents($url, false,  stream_context_create($arrContextOptions));
#print_r($outData);
header('Content-Type: application/json');
echo $outData;
?>