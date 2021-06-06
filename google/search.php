
<?php
header('Access-Control-Allow-Origin: *');  
$nazwa= file_get_contents('./cities.json');
$url_data=$_GET;
if(count($url_data)!=0){
	$look_up=$url_data['name'];
} else{
	$look_up="";
}
$tablica_JSON=json_decode($nazwa, true);
$wynik=[];
foreach ($tablica_JSON as $city) {
    #echo 'city name: ' . $city['name'] . '<br />';
	$name=$city['name'];
	$ok = stripos($name, $look_up);
	
	if ($ok !== false) {
		
		array_push($wynik,$city);
		if(count($wynik)==10){
			break;
		}
	}
}
echo json_encode($wynik);
?>