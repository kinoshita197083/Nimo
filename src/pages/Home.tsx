import { useState } from 'react'
import EnhancedTable from '../components/table';
// import { dummy } from '../data/dummy';
import { tableHeadCells } from '../data/headCells';
import Loading from '../components/loading';
import CustomSnackbar from '../components/snackbar';
import Skeleton from '../components/skeleton';
import useMarketData from '../hooks/useMarketData';
import useAllCoinData from '../hooks/useAllCoinData';
import PageLayout from '../components/pageLayout';

const Home = () => {

    const [currentPage] = useState(0);
    const limit = 50; // Data per page

    // React Query for caching, auto-retry, error handling & loading state handling
    const { data: cryptos, isLoading, isError, error } = useMarketData(currentPage, limit);
    const { data: numOfCoinsOnCoinGecko } = useAllCoinData();

    // Calculate how many pages are available that user can navigate
    const entries = numOfCoinsOnCoinGecko?.length || 10000;
    const numberOfPages = Math.ceil(entries / limit);
    console.log(numberOfPages)

    let errorMessage = (error as Error)?.message || 'Error';

    return (
        <PageLayout>
            <header className="w-full">
                <h1 className="text-[2.5rem]">Market Data of Cryptocurrencies</h1>
                <h3 className="text-[1.2rem] text-gray-400">The global cryptocurrency market cap today</h3>
            </header>

            {isError &&
                <CustomSnackbar
                    message={errorMessage === 'Network Error' ? 'API Limit Exceeded' : errorMessage}
                />}

            <section className='w-full my-[5%]'>
                {
                    cryptos ?
                        <EnhancedTable
                            data={cryptos}
                            // data={dummy}
                            headCells={tableHeadCells}
                        /> :
                        <Skeleton displayText='Skeleton' />
                }
            </section>

            {isLoading && <Loading />}

        </PageLayout>
    )
}

export default Home
