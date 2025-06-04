namespace Backend.DTOs
{
    public class JWTToken
    {
        public string token { get; set; }

        public string role { get; set; }

        public JWTToken(string token, string role)
        {
            this.token = token;
            this.role = role;
        }
    }
}
