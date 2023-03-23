import {useQuery} from 'react-query'

async function getFollowers(userId)
{
    const response = await fetch(`${process.env.REACT_APP_API}followers/${userId}`)
    return response.json()
}

export const useFollowers = (userId)=>
{
    return useQuery(['get-Followers',userId],()=>getFollowers(userId))
}