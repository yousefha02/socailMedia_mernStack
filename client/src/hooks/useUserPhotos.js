import {useQuery} from 'react-query'

async function getUserPhotos(token,userId)
{
    const response = await fetch(`${process.env.REACT_APP_API}user/${userId}/photos`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useUserPhotos = (token,userId)=>
{
    return useQuery(['get-user-photos',userId],()=>getUserPhotos(token,userId))
}