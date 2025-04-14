import axios from "axios";
const logout=async ()=>{
    try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });

    } catch (error) {
        console.log(error)
    }
 }
 export default logout;