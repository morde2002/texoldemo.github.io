<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Section I (Company Information)
    $companyName = $_POST['company-name'];
    $incorporationDate = $_POST['date'];
    $companyAddress = $_POST['address'];
    $townCity = $_POST['town/city'];

    // Section II (Contact Details)
    $authorizingName = $_POST['authorizingname'];
    $contactPhone = $_POST['phno'];
    $contactEmail = $_POST['email'];

    // Section III (Vehicle Details)
    $driverName = $_POST['drivername'];
    $vehicleMake = $_POST['vehiclemake'];
    $vehicleRegNo = $_POST['vehicleregno'];
    $pickupLocation = $_POST['pickup_location'];

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
    $mail->setFrom($contactEmail);
    $mail->addAddress('noreply@texolenergies.com', 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'Corporate Card Application Form Submission';

    // Email Body
    $mail->Body = "
        <h1>Corporate Loyalty Card Application Form Submission</h1>
        <h2>SECTION I (Company Information)</h2>
        <p><strong>Company Name:</strong> $companyName</p>
        <p><strong>Date of Incorporation:</strong> $incorporationDate</p>
        <p><strong>Physical Address:</strong> $companyAddress</p>
        <p><strong>Town/City:</strong> $townCity</p>

        <h2>Section II (Contact Details)</h2>
        <p><strong>Contact/Authorizing Name:</strong> $authorizingName</p>
        <p><strong>Contact Phone No:</strong> $contactPhone</p>
        <p><strong>Contact Email:</strong> $contactEmail</p>

        <h2>SECTION III (Vehicle Details)</h2>
        <p><strong>Driver Name:</strong> $driverName</p>
        <p><strong>Vehicle Make:</strong> $vehicleMake</p>
        <p><strong>Vehicle Registration Number:</strong> $vehicleRegNo</p>
        <p><strong>Preferred Pick up Location:</strong> $pickupLocation</p>
    ";

    // Send email
    if ($mail->send()) {
        echo '<h1>You Have Successfully Registered for the Texol Corporate Card
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
