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

    static async getUserOrder(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-user-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async userGetSelectedOrder(token, orderId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/get-selected-order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async acceptOrder(token, orderId, deliveryManId) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/accept-order/${orderId}?deliveryManId=${deliveryManId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async cancelOrder(token, orderId) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/cancel-order/${orderId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async deliveryVerifying(token, orderId) {
        try {
            const response = await axios.patch(`${this.BASE_URL}/delivery-verifying/${orderId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async getAllOrders(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/get-all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async adminGetSelectedOrder(token, orderId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/admin/get-selected-order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async viewWork(token) {
        try {
            const response = await axios.get(`${this.BASE_URL}/view-work`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async dmGetSelectedOrder(token, orderId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/delivery-man/get-selected-order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async ordersFiltering(token, orderState) {
        try {
            const response = await axios.get(`${this.BASE_URL}/orders-filtering/${orderState}`, {
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