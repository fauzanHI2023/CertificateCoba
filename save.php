<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['name'])) {
        $name = $data['name'];

        // Buka atau buat file "data.txt" dan tambahkan nama yang diterima.
        $file = fopen("data.txt", "a");
        fwrite($file, $name . PHP_EOL);
        fclose($file);
    }
}
?>
