import { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContexts";


export function useTheme() {
    const value = useContext(ThemeContext);

    return value;
}