import axios from "axios";

export const useGetTransaction = () => {
    const id = sessionStorage.getItem('uuid');
    const token = sessionStorage.getItem('token');

    const getTransactions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:1337/api/transactions?filters[uuid][$eq]=${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response?.data?.data || [];
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return [];
        }
    };

    return { getTransactions };
};