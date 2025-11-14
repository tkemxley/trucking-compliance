import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_username = os.environ.get('SMTP_USERNAME', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.notification_email = os.environ.get('NOTIFICATION_EMAIL', '')
    
    async def send_compliance_request_notification(self, request_data: dict):
        """Send email notification when a new compliance request is submitted"""
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['Subject'] = f"New Compliance Request from {request_data['companyName']}"
            message['From'] = self.smtp_username
            message['To'] = self.notification_email
            
            # Create HTML body
            html_body = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background-color: #2563eb; color: white; padding: 20px; border-radius: 5px 5px 0 0; }}
                        .content {{ background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }}
                        .field {{ margin-bottom: 15px; }}
                        .label {{ font-weight: bold; color: #1f2937; }}
                        .value {{ color: #4b5563; margin-top: 5px; }}
                        .footer {{ background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 5px 5px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">🚛 New Compliance Request</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">Company Name:</div>
                                <div class="value">{request_data.get('companyName', 'N/A')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Contact Person:</div>
                                <div class="value">{request_data.get('contactPerson', 'N/A')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Phone:</div>
                                <div class="value">{request_data.get('phone', 'N/A')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value">{request_data.get('email', 'N/A')}</div>
                            </div>
                            <div class="field">
                                <div class="label">USDOT/MC Number:</div>
                                <div class="value">{request_data.get('usdotMc', 'Not provided')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="value">{request_data.get('message', 'No message provided')}</div>
                            </div>
                            <div class="field">
                                <div class="label">Submitted At:</div>
                                <div class="value">{datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated notification from GT IRP Service Inc website.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Attach HTML body
            html_part = MIMEText(html_body, 'html')
            message.attach(html_part)
            
            # Send email using SMTP connection
            smtp = aiosmtplib.SMTP(hostname=self.smtp_host, port=self.smtp_port)
            await smtp.connect()
            await smtp.starttls()
            await smtp.login(self.smtp_username, self.smtp_password)
            await smtp.send_message(message)
            await smtp.quit()
            
            logger.info(f"Email notification sent successfully to {self.notification_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            # Don't raise exception - we still want to save the request even if email fails
            return False

email_service = EmailService()
