import {useQuery} from 'react-query'

async function getNotifications(token)
{
    const response = await fetch(`${process.env.REACT_APP_API}notifications`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useNotifications = (token)=>
{
    return useQuery('get-user-notifications',()=>getNotifications(token))
}