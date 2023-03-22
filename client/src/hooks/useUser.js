import {useQuery} from 'react-query'

async function getUser(userId)
{
    const response = await fetch(`${process.env.REACT_APP_API}user/${userId}`)
    return response.json()
}

export const useUser = (userId)=>
{
    return useQuery(['get-user',userId],()=>getUser(userId))
}