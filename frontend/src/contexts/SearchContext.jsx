import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    const [search, setSearch] = useState("");
    const values = {
        search,
        setSearch
    };

    return <SearchContext.Provider value={values} >{children}</SearchContext.Provider>
};

export const useSearchContext = () => useContext(SearchContext);