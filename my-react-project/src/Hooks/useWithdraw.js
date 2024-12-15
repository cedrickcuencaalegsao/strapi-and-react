// src/Hooks/useWithdraw.js
import { useState } from 'react';
import axios from 'axios';

export const useWithdraw = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeWithdraw = async (withdrawData) => {
        setIsLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');

        try {
            const response = await axios.post(
                `http://localhost:1337/api/transactions`,
                {
                    data: {
                        ...withdrawData.data,
                        publishedAt: null
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setIsLoading(false);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error?.message || 'An error occurred during withdrawal';
            setError(errorMessage);
            setIsLoading(false);
            throw new Error(errorMessage);
        }
    };

    return {
        makeWithdraw,
        isLoading,
        error
    };
};