import { createContext, useState, useEffect } from "react";
import { useContext } from "react";



export const useUnicornContext = () => {
    return useContext(UnicornContext);
};

export const UnicornContext = createContext()

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([])

    const getUnicorns = async () => {
        const response = await fetch('https://crudcrud.com/api/b6c7047d3ae145a2a116bed7821e82fb/unicorns')
        const data = await response.json()
        setUnicorns(data)
    }

    useEffect(() => {
        getUnicorns()
    }, [])

    const editUnicorn = () => {
        console.log("editar unicornio")
    }
    
    return (
        <UnicornContext.Provider value={{ unicorns, getUnicorns, editUnicorn }}>
            {children}
        </UnicornContext.Provider>
    )
    
}