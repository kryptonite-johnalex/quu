<?php
    // My modifications to mailer script
    // Added input sanitizing to prevent injection

include_once('db_connect.php');

$script_list = $_POST['script_list'];

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if(!empty($script_list)) {

        $sql = "SELECT * FROM quu_script_list WHERE category_id = " . key($script_list);
        $result = $conn->query($sql);

        $email_content = '';

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $email_content .= '<p><input class="w3-check" type="checkbox" value="'.$row['category_num'].'" checked><label> '.$row['category_list'].'</label></p>';
            }
        }

        $conn->close();
    }


    echo $email_content;

    $recipient = "johnalexladra@gmail.com";

    // Set the email subject.
    $subject = "Note Script";

    // Defining variables
    $name = 'TEST';
    $email = 'ladrajohnalex@gmail.com';

    // Build the email content.
    // $email_content .= "QUU Incident Number: $incident_num\n";
    // $email_content .= "QUU Wrap Code: $wrap_code\n";
    // $email_content .= "Street and Suburb: $street\n\n";
    // $email_content .= "Reasons:\n$reason\n";


    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>
