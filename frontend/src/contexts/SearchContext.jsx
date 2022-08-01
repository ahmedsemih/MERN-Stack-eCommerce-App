import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    const [search, setSearch] = useState("");
    const [canSearch,setCanSearch]=useState(true);
    const values = {
        search,
        setSearch,
        canSearch,
        setCanSearch
    };

    return <SearchContext.Provider value={values} >{children}</SearchContext.Provider>
};

export const useSearchContext = () => useContext(SearchContext);