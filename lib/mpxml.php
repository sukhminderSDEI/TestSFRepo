<?php

DEFINE("INDENT", "    ");
DEFINE("NEWLINE", "\r\n");


$errorFound = false;
if (count($argv) < 4) {
	echo "Must enter 3 parameters: inputFile1.xml, inputFile2.xml, outputFile.xml\n";
	$errorFound = true;
}

if (!$errorFound) {
	$file1 = file_get_contents($argv[1]);
	$file2 = file_get_contents($argv[2]);
	$outputFileName = $argv[3];

	//Grab the header block and the footer block from the first file.  We aren't going to merge those.
	$foo = explode("<types>", $file1, 2);
	$header = trim( $foo[0] );
	$bar = explode("<version>", $file1, 2);
	$footer = (INDENT.'<version>'.trim($bar[1]));

	$xml1 = simplexml_load_string($file1);
	$xml2 = simplexml_load_string($file2);

	$arrNames = getNames($xml1, $xml2); //a sorted, unique, indexed array of all the metadata type names merged from both files

	//parse these into associative arrays where the key is the <name> value and the value is an indexed array of all the <member> values
	$arrXml1 = transformToArray($xml1);
	$arrXml2 = transformToArray($xml2);

	$arrMergeSort =  mergeAndSort($arrNames, $arrXml1, $arrXml2);

	$xmlOut = makeXML($arrNames, $arrMergeSort, $header, $footer);
	
	file_put_contents($outputFileName, $xmlOut);
}


function makeXML($arrNames, $arrMergeSort, $header, $footer) {
	$xmlOut = '';
	
	$xmlOut .= ($header . NEWLINE);

	//loop through the names
	foreach($arrNames as $name) {
		$xmlOut .= INDENT . '<types>' . NEWLINE;
		foreach($arrMergeSort[$name] as $member) {
			$xmlOut .= INDENT . INDENT . '<members>' . $member . '</members>' . NEWLINE;
		}		
		$xmlOut .= INDENT . INDENT . '<name>' . $name . '</name>' . NEWLINE;
		$xmlOut .= INDENT . '</types>' . NEWLINE;
	}

	$xmlOut .= $footer;

	return $xmlOut;
}

function mergeAndSort($arrNames, $arrXml1, $arrXml2) {
	$arrMerged = array();

	//loop through the names
	foreach($arrNames as $name) {
		$arrMembers = array();		
		
		if (array_key_exists($name, $arrXml1)) {
			foreach($arrXml1[$name] as $member) {			
				array_push($arrMembers, $member);
			}	
		}

		if (array_key_exists($name, $arrXml2)) {
			foreach($arrXml2[$name] as $member) {			
				array_push($arrMembers, $member);	
			}	
		}		
		
		$arrMembers = array_unique($arrMembers); //pull out the dupes
		//natcasesort($arrMembers); 	//sort
		asort($arrMembers); 

		$arrMerged[$name] = $arrMembers;

	}

	return $arrMerged;
}

function transformToArray($xml) {
	$arrOut = array();
	
	$name = '';
	$arrMembers = array();
	foreach($xml->types as $type) {
		$name = (String)$type->name[0];
		$arrMembers = array();
		foreach($type->members as $member) {
			array_push($arrMembers, (String)$member);
		}
		$arrOut[$name] = $arrMembers;
	}		

	return $arrOut;
}


function getNames($xml1, $xml2) {
	$arrNames = array();

	foreach($xml1->types as $type) {
		array_push($arrNames, (String)$type->name[0]);
	}	
	foreach($xml2->types as $type) {
		array_push($arrNames, (String)$type->name[0]);
	}		
	
	$arrNames = array_unique($arrNames); //pull out the dupes
	//natcasesort($arrNames); 	//sort
	asort($arrNames); 	//sort

	return $arrNames;
}


?>