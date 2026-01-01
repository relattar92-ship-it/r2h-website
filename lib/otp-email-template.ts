/**
 * Lightning Silver OTP Email Template
 * For R2H.AI VIP Engineering Platform
 */

export function generateOTPEmailTemplate(otp: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R2H.AI Secure Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020305; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #020305; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="max-width: 500px; background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%); border: 1px solid rgba(192,192,192,0.2); border-radius: 24px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff; letter-spacing: 4px;">
                                R2H<span style="color: #C0C0C0;">.AI</span>
                            </h1>
                            <p style="margin: 10px 0 0 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 3px;">
                                Secure Access
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #cccccc; line-height: 1.6;">
                                Your verification code is:
                            </p>
                            
                            <!-- OTP Code -->
                            <div style="background: linear-gradient(135deg, rgba(192,192,192,0.1) 0%, rgba(229,228,226,0.05) 100%); border: 1px solid rgba(192,192,192,0.3); border-radius: 16px; padding: 30px; text-align: center; margin: 20px 0;">
                                <span style="font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #E5E4E2; font-family: 'SF Mono', 'Fira Code', monospace;">
                                    ${otp}
                                </span>
                            </div>
                            
                            <p style="margin: 20px 0 0 0; font-size: 14px; color: #888888; line-height: 1.6;">
                                This code is for your <strong style="color: #C0C0C0;">VIP Engineering Workspace</strong>.
                            </p>
                            
                            <p style="margin: 20px 0 0 0; font-size: 12px; color: #666666;">
                                This code expires in <strong>5 minutes</strong>. If you didn't request this code, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px 30px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
                            <p style="margin: 0; font-size: 11px; color: #555555;">
                                © 2025 R2H AI Engineering • Dubai, UAE
                            </p>
                            <p style="margin: 10px 0 0 0; font-size: 10px; color: #444444;">
                                This is an automated message. Do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

export function generateOTPEmailPlainText(otp: string): string {
    return `
R2H.AI - Secure Access

Your verification code is: ${otp}

This code is for your VIP Engineering Workspace.
This code expires in 5 minutes.

If you didn't request this code, please ignore this email.

© 2025 R2H AI Engineering • Dubai, UAE
    `.trim();
}
