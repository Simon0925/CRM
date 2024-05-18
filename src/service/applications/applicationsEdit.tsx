import { host } from "../../config/config";

interface EditUser {
    id: number;
    note: string;
    profit: number;
    status: string;
    token: string | null; 
}


export const applicationsEdit = async (editApplication: EditUser) => {


    try {
        const response = await fetch(`${host}/api/applications-edit/${editApplication.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editApplication)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update user data');
        }

        if (response.status === 200) console.log(data.message)

        return data;
    } catch (error) {
        console.log(error)
    }
}
