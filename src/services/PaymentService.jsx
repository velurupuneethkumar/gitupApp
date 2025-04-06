import axios from "axios";

const PAY_URL = "http://localhost:9696/edu-con/payment";
const ID_URL = "http://localhost:9696/edu-con/payment-id";
const SUB_URL = "http://localhost:9696/edu-con/payment-sub";

export const savePayment = (payment) =>{
    return axios.post(PAY_URL,payment);
}

export const getPaymentByBill = (id) =>{
    return axios.get(PAY_URL+'/'+id);
}

export const getAllBills = () =>{
    return axios.get(PAY_URL);
}

export const generateBilId = () =>{
    return axios.get(ID_URL);
}

export const getBillBySubscriberId = (id) =>{
    return axios.get(SUB_URL+'/'+id);
}

export const getBillByStudentId = () =>{
    return axios.get(SUB_URL);
}