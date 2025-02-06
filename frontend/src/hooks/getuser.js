import { useState, useEffect } from 'react';
import axios from 'axios';

const getuser = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {//useEffect mein isliye daala h taaki ek baar chale mount hone par aur baar baar call karenge toh usestate k help se
    const getusers = async () => {//user mein toh store kara he liya h
      try {
        const res = await axios.get('http://localhost:5000/api/users', { withCredentials: true });
        
        // Since axios already returns the parsed data, no need for res.json()
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setUsers(res.data);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message); // Store the error message
      }
    };

    getusers();
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  return { users, errorMessage };//agar ek bar mil gaya h toh phir yahi se value mil jayegi
};

export default getuser;
