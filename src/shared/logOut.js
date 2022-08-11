import { useContext } from "react";

export default function logOut(){
    const {  setToken, setUser } =useContext(UserContext);

    setUser("")
    setToken("")
    localStorage.removeItem('linkrToken');
    navigate("/");
}