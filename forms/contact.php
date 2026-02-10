<?php
/**
 * Portfolio Contact Form
 * Updated for Sinekhaya Gontsana's professional portfolio
 * Requires PHP Email Form library: https://bootstrapmade.com/php-email-form/
 */

<?php
/**
 * Portfolio Contact Form (Simple submission)
 */

$receiving_email_address = 'gontsanasinekhaya@gmail.com';

$php_email_form_path = '../vendor/php-email-form/php-email-form.php';
if (file_exists($php_email_form_path)) {
    include($php_email_form_path);
} else {
    die('Unable to load the "PHP Email Form" library! Check your path.');
}

// Validation
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? 'Portfolio Contact Form Submission');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../../index.html?status=error");
    exit;
}

// Initialize PHP Email Form
$contact = new PHP_Email_Form;
$contact->to         = $receiving_email_address;
$contact->from_name  = $name;
$contact->from_email = $email;
$contact->subject    = $subject;

// Optional SMTP
/*
$contact->smtp = [
    'host'     => 'smtp.example.com',
    'username' => 'your_smtp_username',
    'password' => 'your_smtp_password',
    'port'     => '587'
];
*/

$contact->add_message($name, 'Name');
$contact->add_message($email, 'Email');
$contact->add_message($message, 'Message', 10);

// Send email and redirect back with status
if ($contact->send()) {
    header("Location: ../../index.html?status=success");
} else {
    header("Location: ../../index.html?status=error");
}
exit;