import { useQuery } from 'react-query'
import { getCoinsByPage } from '../api/axios';

const useMarketData = (currentPage: number, limit: number) => {

    return useQuery(
        [currentPage], () => getCoinsByPage(currentPage, limit),
        { keepPreviousData: true },
    );
}

export default useMarketData