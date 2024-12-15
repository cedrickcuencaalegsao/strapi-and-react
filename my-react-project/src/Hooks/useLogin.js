import axios from "axios";

export const useLogin = () => {
    const loginUser = async (userData) => {
        try {
            const data = await axios.post(
                "http://localhost:1337/api/auth/local",
                userData
            );
            return { response: data?.data?.jwt, status: data?.status, uuid: data?.data?.user?.id };
        } catch (err) {
            return {
                response: err.response.data.error.message,
                status: err.response?.status,
            };
        }
    };

    return { loginUser };
};
