<?php
/*

File		: ImageLoader.php
Created		: 20/02/2014
Modified	: 20/02/2014
Author		: kpsujeesh@gmail.com
Description	: This file finds the number of pages in the pdf file using cpdf utility and sent back to the client.

*/

$FileName = $_POST["filename"];

if ((strlen($FileName) == 15) && (ctype_alnum($FileName)))
{
	$FileName = $FileName . ".pdf";
	$cmd = 'resources\cpdf -info book\\' . $FileName; //the command which needs to be executed to find out the metadata about file
	$Details = [];
	exec($cmd, $Details);
	$Pages = explode(": ", $Details[4]) [1]; //This will return number of pages from the output produced by cpdf
	echo $Pages;
}

?>
