import { ProductWine } from "../types"
import { APP_API_URL } from "../AppConfig"

export const fetchWines = async (sort: string, query: string): Promise<ProductWine[]> => {
    try {
        const response = await fetch(`${APP_API_URL}wines?sort=${sort}&query=${query}`)
        if(!response.ok) {
            throw new Error("Could not fetch wines from bakend");
        }
        const data: ProductWine[] = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching wines', error);
        throw error
    }
}