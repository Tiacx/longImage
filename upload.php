<?php
$data = $_POST['data'];
$data = substr($data, strpos($data, ',')+1);
$imageUrl = './uploads/'. date('YmdHis', time()) . '_' . rand(100,999) .'.png';

file_put_contents($imageUrl, base64_decode($data));

echo json_encode([
	'error' => 0,
	'data' => [
		'imageUrl' => $imageUrl
	],
	'message' => 'ok'
]);
?>