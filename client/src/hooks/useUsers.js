import {useQuery} from 'react-query'

async function getUsers()
{
    const response = await fetch(`${process.env.REACT_APP_API}users`)
    return response.json()
}

export const useUsers = (token,userId)=>
{
    return useQuery('users',getUsers)
}