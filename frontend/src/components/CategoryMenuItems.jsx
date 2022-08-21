import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@chakra-ui/react';

import { getCategoryByGenre } from '../services/CategoryServices';

const CategoryMenuItems = ({ genreId }) => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCategoryByGenre(genreId)
            .then((result) => {
                setCategories(result.category);
            });
    },[genreId]);

    const handleClick = (id) => {
        navigate('/search', { state: { categoryId: id } });
    };

    return (
        <>
            {
                categories.length > 0 && categories.map((category) => {
                    return category.status && <MenuItem key={category._id} onClick={() => handleClick(category._id)} >{category.name}</MenuItem>
                })
            }
        </>
    )
}

export default CategoryMenuItems;