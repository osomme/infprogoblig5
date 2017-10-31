<?php
  $verdi = $_GET["kid"];
  $verdi2 = $_GET["navn"];
  $verdi3 = $_GET["epost"];

  $skrivTilFil = $verdi . "¤" . $verdi2 . "¤" . $verdi3 . "\n";

  // echo $skrivTilFil;
  $fil = fopen("data/paameldinger.dat", "a");
  fwrite($fil, $skrivTilFil);
  fclose($fil);

  echo "Oppmelding registrert.";

 ?>
