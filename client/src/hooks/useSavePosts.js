import {useQuery} from 'react-query'

async function getUserSavePosts(token)
{
    const response = await fetch(`${process.env.REACT_APP_API}save-posts`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useSavePosts = (token)=>
{
    return useQuery('get-user-saved',()=>getUserSavePosts(token))
}