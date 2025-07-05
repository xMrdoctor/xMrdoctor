<?php
// contact.php
// PHP script to handle contact form submissions

// More code will be added here later for:
// 1. Retrieving form data (name, email, message)
// 2. Validating the data
// 3. Sanitizing the data
// 4. Sending the email
// 5. Providing feedback to the user

<?php
// Start session to store status messages
session_start();

// Define your email address
$your_email = "your_email@example.com"; // IMPORTANT: Replace with your actual email address

// Define messages
$messages = [
    'success' => "Thank you! Your message has been sent successfully.",
    'error_generic' => "Oops! Something went wrong and we couldn't send your message. Please try again later.",
    'error_validation' => "Please fill in all fields correctly.",
    'error_method' => "Invalid request method.",
    'error_send' => "There was an error trying to send your message. Please try again."
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message_body = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Basic validation
    if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message_body)) {
        $_SESSION['form_status_message'] = $messages['error_validation'];
        $_SESSION['form_status_class'] = 'error';
        $_SESSION['form_data'] = $_POST; // Keep form data to repopulate
        header('Location: ../index.html#contact');
        exit;
    }

    // Email subject
    $subject = "New Contact Form Submission from " . $name;

    // Email headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Email content
    $email_content = "You have received a new message from your website contact form.\n\n";
    $email_content .= "Name: " . $name . "\n";
    $email_content .= "Email: " . $email . "\n\n";
    $email_content .= "Message:\n" . $message_body . "\n";

    // Attempt to send the email
    // IMPORTANT: For mail() to work, your server must be configured to send emails.
    // This often doesn't work on local development environments (like XAMPP, MAMP) without configuration.
    if (mail($your_email, $subject, $email_content, $headers)) {
        $_SESSION['form_status_message'] = $messages['success'];
        $_SESSION['form_status_class'] = 'success';
        // Clear form data on success
        if (isset($_SESSION['form_data'])) {
            unset($_SESSION['form_data']);
        }
    } else {
        // This error is more likely if mail() function fails on the server
        $_SESSION['form_status_message'] = $messages['error_send'];
        $_SESSION['form_status_class'] = 'error';
        $_SESSION['form_data'] = $_POST;
    }

    header('Location: ../index.html#contact');
    exit;

} else {
    // Not a POST request
    $_SESSION['form_status_message'] = $messages['error_method'];
    $_SESSION['form_status_class'] = 'error';
    header('Location: ../index.html#contact');
    exit;
}
?>
