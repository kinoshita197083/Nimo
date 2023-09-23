import { useState } from 'react'
import { getAllCoins, getCoinsByPage } from '../api/axios'
import { useQuery } from 'react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import EnhancedTable from '../components/table';

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 100; // Data per page

    // React Query for caching, auto-retry, error handling & loading state handling
    const {
        isError,
        error,
        isLoading,
        data: cryptos
    } = useQuery([currentPage], () => getCoinsByPage(currentPage, limit), { keepPreviousData: true });

    const {
        data: pages
    } = useQuery(['numberOfPages'], getAllCoins, { keepPreviousData: true });

    const entries = pages?.length || 10000;
    const numberOfPages = Math.ceil(entries / limit);
    console.log(numberOfPages)

    const navigate = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        console.log(`Current Page is ${currentPage}`);
    };

    return (
        <main className='min-h-full min-w-full flex flex-col justify-center items-center px-[8%] py-[2%]'>
            <header className="w-full">
                <h1 className="text-[2.5rem]">Market Data of Cryptocurrencies</h1>
                <h3 className="text-[1.2rem] text-gray-400">The global cryptocurrency market cap today</h3>
            </header>

            {isError && <ErrorSnackbar error={error.message} />}

            <div className='w-full my-[5%]'>
                <EnhancedTable coins={cryptos} />
            </div>

            {(isLoading) && <WaveSkeleton />}

        </main>
    )
}

const WaveSkeleton = () => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

const ErrorSnackbar = ({ error }: { error: string }) => {

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
                message={error}
                key={'error_snackbar'}
            />
        </Box>
    )
}

export default Home
