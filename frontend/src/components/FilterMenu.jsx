import React, { useEffect } from 'react';
import { Box, Text, Button, Divider, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RadioGroup, Radio, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';

import { getProductByColor, getProductByGender, getProductByPrice, getProductsByQueries } from '../services/ProductServices';
import { useSearchContext } from '../contexts/SearchContext';

const FilterMenu = ({ openFilter, setProducts, setSortBy }) => {

    const {canSearch,setCanSearch}=useSearchContext();

    const [minPrice, setMinPrice] = useState(30);
    const [maxPrice, setMaxPrice] = useState(250);
    const [gender, setGender] = useState("all");
    const [color, setColor] = useState("all");

    useEffect(()=>{
        setColor("all");
        setGender("all");
        setMinPrice(30);
        setMaxPrice(250);
    },[canSearch]);

    const onChangePriceRange = (val) => {
        setCanSearch(false)
        setMinPrice(val[0]);
        setMaxPrice(val[1]);
    };

    const onChangeColor = () => {
        setCanSearch(false);
    };

    const onChangeGender = (e) => {
        setCanSearch(false);
        setGender(e.target.value)
    };

    const onClickSearch = () => {
        setSortBy("recommended");
        if (gender !== "all" && color !== "all") {
            getProductsByQueries(minPrice, maxPrice, gender, color)
                .then(result => {
                    setProducts(result.products);
                });
        } else if (gender !== "all" && color === "all") {
            getProductByGender(gender, minPrice, maxPrice)
                .then((result) => {
                    setProducts(result.products);
                });
        } else if (color !== "all" && gender === "all") {
            getProductByColor(color, minPrice, maxPrice)
                .then((result) => {
                    setProducts(result.products);
                });
        } else {
            getProductByPrice(minPrice, maxPrice)
                .then((result) => {
                    setProducts(result.products);
                });
        }
    };

    return (
        <Box
            display={openFilter ? 'block' : 'none'} minHeight={725} maxHeight={850} p={3} backgroundColor='#fff' maxWidth={400}>
            <Box px={2}>
                <Text fontSize={20} my={3} fontWeight={500} >Price Range</Text>
                <RangeSlider
                    onChangeEnd={onChangePriceRange}
                    defaultValue={[minPrice, maxPrice]}
                    max={250}
                    min={30}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack bg='facebook.500' />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} ><Box color='facebook.500' fontWeight={800} >$</Box></RangeSliderThumb>
                    <RangeSliderThumb index={1} ><Box color='facebook.500' fontWeight={800} >$</Box></RangeSliderThumb>
                </RangeSlider>
                <Box display='flex' my={3} alignItems='center' justifyContent='space-between'>
                    <Text fontSize={16} fontWeight={600} >{minPrice} $ - {maxPrice} $</Text>

                </Box>
                <Divider mb={3} />
            </Box>
            <Box
                display='flex'
                flexDirection='column'
            >
                <Text fontSize={20} mb={3} fontWeight={500} >Size</Text>
                <Checkbox colorScheme='facebook' value='XS' fontWeight={600} >XS</Checkbox>
                <Checkbox colorScheme='facebook' value='S' fontWeight={600} >S</Checkbox>
                <Checkbox defaultChecked colorScheme='facebook' value='M' fontWeight={600} >M</Checkbox>
                <Checkbox colorScheme='facebook' value='L' fontWeight={600} >L</Checkbox>
                <Checkbox colorScheme='facebook' value='XL' fontWeight={600} >XL</Checkbox>
                <Divider my={3} />
            </Box>
            <Box mt={3}>
                <Text fontSize={20} mb={3} fontWeight={500} >Gender</Text>
                <RadioGroup display='flex' justifyContent='space-between' flexDirection={{ base: 'column', md: 'row' }} onChange={setGender} onClick={onChangeGender} value={gender} >
                    <Radio colorScheme='facebook' value='all' fontWeight={600} >All</Radio>
                    <Radio colorScheme='facebook' value='man' fontWeight={600} >Man</Radio>
                    <Radio colorScheme='facebook' value='woman' fontWeight={600} >Woman</Radio>
                    <Radio colorScheme='facebook' value='unisex' fontWeight={600} >Unisex</Radio>
                </RadioGroup>
                <Divider my={3} />
            </Box>
            <Box display='flex'
                flexDirection='column' pb={3}>
                <Text fontSize={20} mb={3} fontWeight={500} >Color</Text>
                <RadioGroup display='flex' flexDirection='column' onChange={setColor} onClick={onChangeColor} value={color} >
                    <Radio mb={2} colorScheme='facebook' value='all' fontWeight={600} >All</Radio>
                    <Radio mb={2} colorScheme='facebook' value='blue' fontWeight={600} >Blue</Radio>
                    <Radio mb={2} colorScheme='blackAlpha' value='white' fontWeight={600} >White</Radio>
                    <Radio mb={2} colorScheme='green' value='green' fontWeight={600} >Green</Radio>
                    <Radio mb={2} colorScheme='gray' value='black' fontWeight={600} >Black</Radio>
                    <Radio mb={2} colorScheme='red' value='red' fontWeight={600} >Red</Radio>
                </RadioGroup>
                <Button mt={5} colorScheme='facebook' onClick={onClickSearch} >Search</Button>
            </Box>
        </Box>
    )
}

export default FilterMenu;