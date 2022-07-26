import { useEffect, useState } from 'react';
import { getUserById } from '../services/UserServices';

const useGetFavoriteStatus = (userId, productId) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (userId && userId !== null) {
            getUserById(userId)
                .then(result => {
                    result.user.favorites && result.user.favorites.forEach(f => {
                        if (f === productId) {
                            setStatus(true);
                        }
                    });
                });
        }
    }, [userId, productId]);
    return [status];
};

export default useGetFavoriteStatus;