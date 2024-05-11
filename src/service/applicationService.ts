import { host } from "../config/config";


export const applicationService = async (page: number, status: string,search:string) => {
    try {
        const response = await fetch(`${host}/api/applications?page=${page}&status=${status}&search=${search}`);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch application data');
        }

        if (response.status === 200) console.log(responseData.message);

        return responseData;
    } catch (error) {
        console.error('Error fetching application data:', error);
        throw error; 
    }
};
