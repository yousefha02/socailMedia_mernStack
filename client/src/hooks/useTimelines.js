import {useQuery} from 'react-query'

async function getUser(userId,token)
{
    const response = await fetch(`${process.env.REACT_APP_API}timelines/${userId}`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useTimelines = (userId,token)=>
{
    return useQuery('get-timelines',()=>getUser(userId,token))
}