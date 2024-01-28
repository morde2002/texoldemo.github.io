<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Common fields
    $surname = $_POST['surname'];
    $othernames = $_POST['othernames'];
    $email = $_POST['email'];
    $phno = $_POST['phno'];
    $date = $_POST['date'];
    $address = $_POST['address'];
    $id_type = $_POST['id_type'];
    $id_passport_no = $_POST['id_passport_no'];
    $pickup_location = $_POST['pickup_location'];

    // Instantiate PHPMailer
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'mail.texolenergies.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@texolenergies.com';
    $mail->Password = 'I#C1p586qRrQx]';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->Timeout = 10;

    // Set common email parameters
    $mail->setFrom($email);
    $mail->addAddress('noreply@texolenergies.com', 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'Boda Card Application Form Submission';

    // Customize email content
    $mail->Body = "
        <h1>Boda Loyalty Card Application Form Submission</h1>
        <p><strong>Surname:</strong> $surname</p>
        <p><strong>Other names:</strong> $othernames</p>
        <p><strong>Phone No:</strong> $phno</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>D.O.B :</strong> $date</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>ID Type :</strong> $id_type</p>
        <p><strong>ID/Passport No:</strong> $id_passport_no</p>
        <p><strong>Pick up Location :</strong> $pickup_location</p>
    ";

    // Send email
    if ($mail->send()) {
        echo '<h1>You Have Successfully Registered for the Texol Boda Card
            <br>You will be contacted when your card is eligble and ready for pickup</h1>';
        echo '<a href="fuel-card-application.html" class="btn btn-primary">Return to Form</a>';
        echo '<script>
                setTimeout(function() {
                    window.location.href = "fuel-card-application.html";
                }, 4000);
              </script>';
    } else {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
}
?>
