import {useQuery} from 'react-query'

async function getFollowings(userId)
{
    const response = await fetch(`${process.env.REACT_APP_API}followings/${userId}`)
    return response.json()
}

export const useFollowings = (userId)=>
{
    return useQuery(['get-followings',userId],()=>getFollowings(userId))
}