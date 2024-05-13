import { host } from "../config/config";

export async function expensesStaticsService() {
    try {
        const response = await fetch(`${host}/api/expenses-statics`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error fetching expenses statics:", error);
        throw error;
    }
}
