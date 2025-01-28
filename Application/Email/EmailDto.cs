namespace Application.Email
{
    public class EmailDto
    {
        public string Subject { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Message { get; set; }
        public string Server { get; set; }
        public int Port { get; set; }
        public string SecurityType { get; set; }
    }
}