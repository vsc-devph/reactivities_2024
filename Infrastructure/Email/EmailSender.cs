using System.Net;
using System.Net.Mail;
using Application.Email;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;
        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress(_config["Email:GmailSender"]);
            message.Subject = emailSubject;
            message.To.Add(new MailAddress(userEmail));
            message.Body = msg;
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient(_config["Email:Server"])
            {
                EnableSsl = true,
                Port = Int32.Parse(_config["Email:Port"]),
                Credentials = new NetworkCredential(_config["Email:GmailSender"], _config["Email:GmailPassKey"])
            };
            // var emailContent = new EmailDto
            // {
            //     Subject = emailSubject,
            //     Sender = "vsc.devph@gmail.com",
            //     Receiver = userEmail,
            //     Message = msg,
            //     Port = 587,
            //     Server = "smtp.resend.com"
            // }; 
            await smtpClient.SendMailAsync(message);
        }

    }
}