import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from 'services/supabase';

const authContext = createContext()

export const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState(true)

    console.log(user)

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if(error) {
            console.log(error)
        } 

        setUser(null)
    }

    useEffect(() => {
        const user = supabase.auth.user()
        setUser(user)

        const auth = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user)
            } 

            if (event === 'SIGNED_OUT') {
                setUser(null)
            } 

          })

          return () => auth.unsubscribe()

    }, [])

    return (
        <authContext.Provider value={{user, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}




