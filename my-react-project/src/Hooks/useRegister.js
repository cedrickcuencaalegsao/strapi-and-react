import axios from 'axios';

export const useRegister = () => {
    const signupUser = async (userData) => {
        try {
            const data = await axios.post(
                "http://localhost:1337/api/auth/local/register",
                userData
            );
            console.log(data.data);

            return { response: data?.data?.jwt, status: data?.status };
        } catch (error) {
            console.log(error);
            return {
                response: error?.response?.data?.error?.message,
                status: error?.response?.status,
            };
        }
    };

    return { signupUser };
}