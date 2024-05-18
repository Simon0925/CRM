import { host } from "../../config/config";


export const applicationService = async (page: number, status: string,search:string,filter: { from: string; to: string; }) => {

    const token = localStorage.getItem('accessToken');
    
    try {
       

        const url = `${host}/api/applications?page=${page}&status=${status}&search=${search}&filterFrom=${filter.from}&filterTo=${filter.to}&token=${token}`;

        const response = await fetch(url);

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch application data');
        }

        if (response.status === 200)  return responseData;;

        
    } catch (error) {
        console.error('Error fetching application data:', error);
        throw error; 
    }
};
