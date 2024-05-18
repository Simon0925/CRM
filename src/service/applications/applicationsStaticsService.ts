import { host } from "../../config/config";

export async function applicationsStaticsService(filter: { from: string; to: string; }) {

    const token = localStorage.getItem('accessToken');
   
    try {
        const response = await fetch(`${host}/api/applications-statics?filterFrom=${filter.from}&filterTo=${filter.to}&token=${token}`);
        
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
