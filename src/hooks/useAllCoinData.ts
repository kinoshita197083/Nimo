import { useQuery } from 'react-query'
import { getAllCoins } from '../api/axios';

const useAllCoinData = () => {

    return useQuery(
        ['all_coins'], () => getAllCoins,
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    );
}

export default useAllCoinData