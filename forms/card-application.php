<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/SMTP.php';

// Other form handling logic and validations...

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cardType = $_POST['cardType'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phno = $_POST['phno'];
    $id_type = $_POST['id_type'];
    $id_passport_no = $_POST['id_passport_no'];
    $product = $_POST['product'];
    $pickup_location = $_POST['pickup_location'];
    // ... (other form fields)

    // PHPMailer configuration
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;
    $mail->Username = 'email@xeleratedtech.com'; // SMTP username
    $mail->Password = 'xeleratedtech254.'; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587; // TCP port to connect to

    $mail->setFrom($email, $name); // Sender's email and name
    $mail->addAddress('email@xeleratedtech.com', 'Recipient Name'); // Recipient's email and name
    $mail->isHTML(true); // Set email format to HTML

    $mail->Subject = 'New Texol Card Application';
    $mail->Body = "Card Type: $cardType\n\nName: $name\n\nEmail: $email\n\nContact No: $phno\n\nID Type: $id_type\n\nID/Passport No: $id_passport_no\n\nProduct: $product\n\nPickup Location: $pickup_location\n\n"; // Modify the email content accordingly

    if (!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}
?>
