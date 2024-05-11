import { host } from "../../config/config";


export const edit = async (data: any) => {
    try {
        const response = await fetch(`${host}/api/edit-expenses`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to update user data');
        }

       

        if (response.status === 200) return true

        return responseData;
    } catch (error) {
        console.log(error);
    }
};
