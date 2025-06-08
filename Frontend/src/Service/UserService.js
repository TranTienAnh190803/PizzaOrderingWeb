import axios from "axios";

class UserService {
    static BASE_URL = "https://localhost:7149/User";

    static async register(registrationForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/register`, registrationForm);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async login(loginForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/login`, loginForm);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getProfile(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAvatar(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-avatar`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return null;
        }
    }


    // Authentication Check
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        if (token !== null)
            return true;
        return false;
    }

    static isAdmin() {
        const role = localStorage.getItem("role");
        if (this.isAuthenticated() && role === "ADMIN")
            return true;
        return false;
    }

    static isDeliveryMan() {
        const role = localStorage.getItem("role");
        if (this.isAuthenticated() && role === "DELIVERY") 
            return true;
        return false;
    }

    static isUser() {
        const role = localStorage.getItem("role");
        if (this.isAuthenticated() && role === "USER")
            return true;
        return false;
    }

    // Logout
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
}

export default UserService;