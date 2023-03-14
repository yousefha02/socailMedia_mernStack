import {useQuery} from 'react-query'

async function getUserPosts(token,userId)
{
    const response = await fetch(`${process.env.REACT_APP_API}user/${userId}/posts`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useUserPosts = (token,userId)=>
{
    return useQuery(['get-user-posts',userId],()=>getUserPosts(token,userId))
}