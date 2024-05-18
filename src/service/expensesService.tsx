import { host } from "../config/config";


export const expensesService = async (page: number, status: string,filter: { from: string; to: string; }) => {

    const token = localStorage.getItem('accessToken');

    try {

        const url = `${host}/api/expenses?page=${page}&status=${status}&filterFrom=${filter.from}&filterTo=${filter.to}&token=${token}`;


        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
      
        return data;
    } catch (error) {
        console.error('Error fetching application data:', error);
        throw error; 
    }

};