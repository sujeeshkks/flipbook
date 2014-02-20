<?php
/*

File		: ImageGenerator.php
Created		: 20/02/2014
Modified	: 20/02/2014
Author		: kpsujeesh@gmail.com
Description	: This file reads pages from the pdf file and convert it to jpeg format and the file path is sent back to the client

*/

include "Root.php";

$Page = $_POST["current"];
$FileName = $_POST["filename"];

if ((strlen($FileName) == 15) && (ctype_alnum($FileName)))
{
	$Page = $Page < 1 ? 0 : $Page - 1;
	$PdfPage = $RootPath . $FileName . '.pdf[' . $Page . ']'; //path of uploaded pdf file
	$Page+= 1;
	$ImageFile = $RootPath . "P" . $Page . ".jpg"; //path in which the images will be there
	$ImagePath = 'book/P' . $Page . '.jpg';
	$im = new Imagick();
	$im->setResolution(100, 100); //set the resolution of the image
	$im->readImage($PdfPage);
	$im->setImageFormat('jpeg');
	$im->writeImage($ImageFile); //generate the image
	$im->clear();
	$im->destroy();
	echo $ImagePath;
}

?>
