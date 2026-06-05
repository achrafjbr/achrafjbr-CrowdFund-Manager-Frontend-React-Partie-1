import axios from "axios"
import {getToken} from "./tokenService"

export const getOwnerApi = async () => {
    const response = await axios.get(
        "http://localhost:8080/api/admin/owners",
        {
            headers :{
                Authorization : `Bearer ${getToken()}`,
            },
        },
    );
    console.log("response",response);
    return response.data
}