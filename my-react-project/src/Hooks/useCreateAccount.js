import axios from "axios";

export const useCreateAccount = () => {
    const createAccount = async (newPost) => {
        try {
            const data = await axios.post("http://localhost:1337/api/accounts", newPost);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return { createAccount };
};
