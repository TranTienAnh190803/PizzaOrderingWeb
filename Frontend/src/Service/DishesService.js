import axios from "axios";

class DishesService {
    static BASE_URL = "https://localhost:7149/Pizza";

    static async addPizza(token, pizzaForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/add-pizza`, pizzaForm, {
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

    static async getPizza() {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-pizza`);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async editPizza(token, pizzaForm, pizzaId) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/edit-pizza/${pizzaId}`, pizzaForm, {
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

    static async deletePizza(token, pizzaId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/delete-pizza/${pizzaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async uploadImage(token, formData) {
        try {
            const response = await axios.post(`${this.BASE_URL}/upload-image`, formData, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch (error) {
            return null;
        }
    }

    static async getSelectedPizza(token, pizzaId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-selected-pizza/${pizzaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllDishes() {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-all-dishes`);

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteDishes(token, dishesId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/delete-dish/${dishesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

export default DishesService;