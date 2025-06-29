import axios from "axios";

class OrderService{
    static BASE_URL = "https://localhost:7149/Order";

    static async addToCart(token, cartItem) {
        try {
            const response = await axios.post(`${this.BASE_URL}/add-to-cart`, cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getCart(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deleteCartItem(token, itemId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/delete-cart-item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getNumberOfItem(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-number-of-item`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async orderFood(token, orderForm) {
        try {
            const response = await axios.post(`${this.BASE_URL}/order-food`, orderForm, {
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

export default OrderService;