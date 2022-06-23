<?php

function getNbOccInPalin(string $string): array
{
  $tabOcc = [];
  for ($i = 0; $i < strlen($string) / 2; $i++) {
    if (!array_key_exists($string[$i], $tabOcc)) {
      $tabOcc[$string[$i]] = 0;
    }
    $tabOcc[$string[$i]] += 2;
  }
  return $tabOcc;
}
var_dump(getNbOccInPalin("RESSASSER"));
