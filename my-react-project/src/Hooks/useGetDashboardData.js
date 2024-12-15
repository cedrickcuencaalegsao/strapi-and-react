import axios from "axios";

export const useGetDashboardData = () => {
    const email = sessionStorage.getItem('email');

    const getDashboardData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:1337/api/accounts?filters[email][$eq]=${email}`
            );

            return response?.data?.data || [];
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return [];
        }
    };

    return { getDashboardData };
};
