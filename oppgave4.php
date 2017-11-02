<?php
    $stedXML = $_GET["sted"];

    header("Content-type: text/xml");
    $fil = fopen($stedXML, "r");

    while ($linje = fgets($fil)) {
        echo $linje;
    }
?>
