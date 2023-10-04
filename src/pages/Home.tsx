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

    // const temp = {
    //     price_change_percentage_24h: '25%',
    //     symbol: 'Bit',
    //     image: './shiba.png',
    // };

    const [pins, setPins] = useState([]);

    const currentPage = 0;
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

            <section className='flex gap-3 my-[5%]'>
                {pins.map((pin, index) => (
                    <div
                        className='bg-gray-300 rounded h-[4rem] w-[12rem] flex gap-5 items-center justify-center'
                        key={index}
                    >
                        <img src={pin.image} width='35px' height='35px' />
                        <h3 className='text-black text-[1rem]'>{pin.symbol}</h3>
                        <h3 className='text-black'>{pin.price_change_percentage_24h}</h3>
                    </div>
                ))}
            </section>


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
                            pins={pins}
                            setPin={setPins}
                        /> :
                        <Skeleton displayText='Skeleton' />
                }
            </section>

            {isLoading && <Loading />}

        </PageLayout>
    )
}

export default Home
