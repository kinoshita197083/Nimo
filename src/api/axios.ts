import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: `https://api.coingecko.com/api/v3/coins`
})


export const getCoinsByPage = async (pageParam: number, dataPerPage: number) => {

    const response = await axiosInstance.get(`/markets?vs_currency=usd&order=market_cap_rank_desc&per_page=${dataPerPage}&page=${pageParam++}&precision=2`);

    console.log(response);
    return response.data;
}

export const getAllCoins = async () => {

    const response = await axiosInstance.get(`/list`);

    console.log(response);
    return response.data;
}

export const getCoinDetail = async (coinId: string) => {

    const response = await axiosInstance.get(`/${coinId}`);

    console.log(response);
    return response.data;
}