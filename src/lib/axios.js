import axios from "axios";

export const axiosBaseURL =  axios.create({
    baseURL: "http://localhost:3000",
});