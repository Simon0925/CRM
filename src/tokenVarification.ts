import {host} from './config/config'


async function tokenVarification () {


    const token = localStorage.getItem('accessToken');
    if (!token) return null
    if (token) {
      try {
        const response = await fetch(`${host}/api/verify-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
      
        const responseData = await response.json();
       
        if (responseData.success) {
            return {areEqual:true}
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


export default tokenVarification