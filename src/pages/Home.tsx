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
import CancelIcon from '@mui/icons-material/Cancel';

const Home = () => {

    const [pins, setPins] = useState<Pin[]>([]);

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

    const handleClick = (symbol: string) => {
        const clone = [...pins];
        const filtered = clone.filter(pin => (
            pin.symbol !== symbol
        ))

        setPins(filtered);
    }

    return (
        <PageLayout>
            <header className="w-full">
                <h1 className="text-[2.5rem]">Market Data of Cryptocurrencies</h1>
                <h3 className="text-[1.2rem] text-gray-400">The global cryptocurrency market cap today</h3>
            </header>

            <section className='flex mt-[3%] overflow-auto h-[5rem]'>
                {pins.map((pin, index) => (
                    <div
                        className='bg-gray-300 rounded h-[4rem] px-[1%] flex gap-5 items-center justify-center shadow-md mx-[1%]'
                        key={index}
                    >
                        <img src={pin.image} width='35px' height='35px' />
                        <h3 className='text-black text-[1rem]'>{pin.symbol}</h3>
                        <h3 className='text-black'>{pin.price_change_percentage_24h}</h3>
                        <CancelIcon onClick={() => handleClick(pin.symbol)} style={{ cursor: 'pointer' }} />
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
