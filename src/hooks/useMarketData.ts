import { useQuery } from 'react-query'
import { getCoinsByPage } from '../api/axios';

const useMarketData = (currentPage: number, limit: number) => {

    return useQuery({
        queryKey: [currentPage],
        queryFn: () => getCoinsByPage(currentPage, limit),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        // staleTime: 1000 * 60 * 15
        // refetchInterval: 1000
    }
    );
}

export default useMarketData