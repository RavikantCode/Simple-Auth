export const PASSWORD_RESET_REQUEST_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #007bff;
            color: white;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Password Reset Request</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <a href="{{resetLink}}" class="btn">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support.</p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

export const PASSWORD_RESET_SUCCESS_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #28a745;
            color: white;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Password Reset Successful</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>If you did not perform this action or believe your account has been compromised, please contact our support team immediately.</p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

export const VERIFICATION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #007bff;
            color: white;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .verification-code {
            display: inline-block;
            padding: 15px 20px;
            margin: 20px 0;
            background-color: #28a745;
            color: white;
            font-size: 24px;
            font-weight: bold;
            border-radius: 5px;
            letter-spacing: 2px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Your Verification Code</h2>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up! Please use the following code to verify your email address:</p>
            <div class="verification-code">{{verification_code}}</div>
            <p>If you did not sign up, please ignore this email.</p>
            <p>This code will expire in 24 hours for security reasons.</p>
            <p>Thank you,<br>The Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`

export const WELCOME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SmartHire</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #007bff;
            color: white;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777777;
        }
        .cta-button {
            display: inline-block;
            padding: 15px 20px;
            margin: 20px 0;
            background-color: #28a745;
            color: white;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to SmartHire!</h2>
        </div>
        <div class="content">
            <p>Hello {{user_name}},</p>
            <p>We’re thrilled to have you on board! At SmartHire, we’re dedicated to connecting you with exciting job opportunities and resources to help you advance your career.</p>
            <p>To get started, we recommend you:</p>
            <ul>
                <li>Complete your profile for personalized job recommendations.</li>
                <li>Explore job listings that match your skills and interests.</li>
                <li>Enable notifications to stay updated on new opportunities.</li>
            </ul>
            <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:support@smarthire.com">support@smarthire.com</a>.</p>
            <p>Thank you for joining us, and welcome aboard!</p>
            <a href="https://www.smarthire.com" class="cta-button">Explore SmartHire</a>
            <p>Best regards,<br>The SmartHire Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 SmartHire. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
