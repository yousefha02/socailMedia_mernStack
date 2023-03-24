import {useQuery} from 'react-query'

async function getNotifications(token)
{
    const response = await fetch(`${process.env.REACT_APP_API}seen-notifications`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useSeenNot = (token)=>
{
    return useQuery('seen-notifications',()=>getNotifications(token))
}