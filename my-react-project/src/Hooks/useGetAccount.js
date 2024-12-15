import axios from "axios";

export const useGetAccount = () => {
    const email = sessionStorage.getItem('email');
    const getAccounts = async (user_id) => {
        try {
            const data = await axios.get(
                `http://localhost:1337/api/accounts?filters[email][$eq]=${email}`
            );
            return data?.data?.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { getAccounts };
};