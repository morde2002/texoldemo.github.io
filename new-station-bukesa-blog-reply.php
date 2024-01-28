<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $comment = $_POST["comment"];
    
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'mail.texolenergies.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'blog-quotes@texolenergies.com';
    $mail->Password = 'I#C1p586qRrQx]';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->Timeout = 10;
    
    $mail->setFrom($email);
    $mail->addAddress('blog-quotes@texolenergies.com', 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'New Fuel Station in Bukesa comment Submission';
    
    
    $mail->Body = "
        <h1>Contact Details:</h1>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        
        <h1>Comments:</h1>
        <p>$comment</p>
        
    ";
    if($mail->send()){
           header('Location: commented-successfully-bukesa.html'); // Redirect to 'thank you' page. Make sure you have it
       } else {

           $errorMessage = 'Oops, something went wrong. Mailer Error: ' . $mail->ErrorInfo;
       }
} 
?>