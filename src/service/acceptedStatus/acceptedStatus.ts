import { host } from "../../config/config";


interface acceptedStatusProps{
    id:number;
    accepted:boolean;
    accessToken:string
}

export const acceptedStatus = async (acceptedData: acceptedStatusProps) => {
    try {
        const response = await fetch(`${host}/api/accepted/${acceptedData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accepted: acceptedData.accepted, accessToken: acceptedData.accessToken }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.log('Success:', await response.text());
            return { success: true }; 
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating accepted status:', error);
        throw new Error('Failed to update accepted status');
    }
};
