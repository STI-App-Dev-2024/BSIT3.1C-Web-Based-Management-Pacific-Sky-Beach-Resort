import { COMPANY_LOGO, COMPANY_NAME, HOST } from "../constants/constants.js";

const emailRegistrationNotification = ({
  firstName,
  lastName,
  emailAddress,
  password,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to ${COMPANY_NAME}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #e3f2fd; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #e3f2fd; margin: 0; padding: 20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img
                  src=${COMPANY_LOGO}
                  alt="${COMPANY_NAME} Logo"
                  style="width: 150px; height: auto;"
                />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 24px; font-weight: bold; color: #0077b6; padding-bottom: 10px;">
                Welcome to ${COMPANY_NAME}!
              </td>
            </tr>
            <tr>
              <td style="font-size: 16px; color: #555555; line-height: 1.6; padding-bottom: 20px; text-align: left;">
                <p>Dear ${firstName} ${lastName},</p>
                <p>
                  We are thrilled to welcome you to ${COMPANY_NAME}. Your account has been successfully created by our HR team, and you are now part of our growing community.
                </p>
                <p>
                  Below are your login credentials to access your account:
                </p>
                <p><strong>Email Address:</strong> ${emailAddress}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>
                  Please use the link below to log in and explore your account. If you have any questions, feel free to reach out to your HR representative.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <a
                  href="${HOST}/login"
                  style="display: inline-block; background-color: #0077b6; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;"
                >
                  LOG IN
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size: 14px; color: #777777; line-height: 1.6; text-align: left;">
                <p>Best regards,</p>
                <p>The ${COMPANY_NAME} Team</p>
              </td>
            </tr>
            <tr>
              <td style="font-size: 12px; color: #999999; line-height: 1.4; padding-top: 20px; border-top: 1px solid #dddddd; text-align: center;">
                <p>
                  This is an automated message. Please do not reply to this email. For any inquiries, visit our website at
                  <a href="${HOST}" style="color: #0077b6; text-decoration: none; font-weight: bold;">${COMPANY_NAME}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export default emailRegistrationNotification;
