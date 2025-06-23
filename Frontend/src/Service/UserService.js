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

    static async uploadAvatar(token, imageFile) {
        try {
            if (!imageFile)
                return;
            const formData = new FormData();
            formData.append("formFile", imageFile);

            const response = await axios.patch(`${this.BASE_URL}/upload-avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async editProfile(token, profile) {
        try {
            const response = await axios.put(`${this.BASE_URL}/edit-profile`, profile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteAccount(token, userId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/delete-account/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async changePassword(token, passwordForm) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/change-password`, passwordForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async registerDeliveryMan(token, registrationForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/register-delivery-man`, registrationForm, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllDeliveryMan(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-all-delivery-man`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getSelectedDeliveryMan(token, userId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-selected-delivery-man/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
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