import { useQuery } from 'react-query'
import { getAllCoins } from '../api/axios';

const useAllCoinData = () => {

    return useQuery({
        queryKey: ['all_coins'],
        queryFn: () => getAllCoins,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        // staleTime: 1000 * 60 * 15
        // refetchInterval: 1000
    });
}

export default useAllCoinData