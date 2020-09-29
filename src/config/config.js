import { useEffect, useState } from "react"

export default () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      let token = localStorage.getItem('userToken');
      if(token!==null){
          setIsAuthenticated(true)
      }
    }, [])

    return{
        isAuthenticated: isAuthenticated
    }
}