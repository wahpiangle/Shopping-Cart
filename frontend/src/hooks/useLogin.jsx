import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async(email, password) =>{
        setLoading(true)
        setError(null)

        const response = await fetch('https://shoppe-api.onrender.com/api/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user email & token to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //set user to context
            dispatch({type: 'LOGIN', payload: json})

            setLoading(false)
            return json
        }
    }

    return { login, loading, error}
}