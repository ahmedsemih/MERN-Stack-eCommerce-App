import { useEffect, useState } from 'react';

import { getOrdersByUserId } from '../services/OrderServices';

const useGetUserHaveThis = (userId, productId) => {

    const [have, setHave] = useState(false);

    useEffect(() => {
        userId && productId &&
            getOrdersByUserId(userId)
                .then((result) => {
                    result.orders.forEach((order) => {
                        const result = (order.products.find(p => p === productId));
                        result !== undefined && setHave(true);
                    });
                });
    }, [userId, productId]);

    return [have];
}

export default useGetUserHaveThis;