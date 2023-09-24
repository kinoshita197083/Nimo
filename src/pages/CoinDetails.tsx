/**
 * Dynamic Route based on coinId
 * 
 * Couldn't find any types provided on CoinGecko website so I use 'any' type here
 * It's certainly not ideal, but the dataset is unrealistically long to hardcode the type
 */

import { useLoaderData } from 'react-router-dom'
import { getCoinDetail } from '../api/axios';
import { Breadcrumbs, Tooltip } from '@mui/material';
import Link from '@mui/material/Link';
import InfoIcon from '@mui/icons-material/Info';
import PageLayout from '../components/pageLayout';

const CoinDetails = () => {

    const coinDetails: any = useLoaderData();
    const { market_cap_rank, image, name, symbol, market_data } = coinDetails;
    const tooltip = "Market capitalization, or market cap, is one measurement of a company's size. It's the total value of a company's outstanding shares of stock, which include publicly traded shares plus restricted shares held by company officers and insiders.";

    return (
        <PageLayout>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: 'gray', fontSize: '1.5rem', marginBlock: '3%' }}>
                <Link underline="hover" color="inherit" href="/" style={{ color: 'white' }}>
                    Market
                </Link>
                <Link
                    style={{ color: 'white' }}
                >
                    Coin Detail
                </Link>
            </Breadcrumbs>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[3%] min-h-[30rem]'>
                <div className='flex flex-col w-full'>
                    <section className='mb-[5%]'>
                        <span className='bg-indigo-800 text-gray-100 w-[5rem] flex justify-center rounded my-[1%]'>Rank #{market_cap_rank}</span>
                        <div className='flex gap-[1%] items-center'>
                            <img className='w-[35px]' src={image.small} />
                            <h2 className='text-[1.5rem]'>{name}</h2>
                            <p className='uppercase text-gray-400 text-[0.9rem]'>{symbol}</p>
                        </div>

                        <div className='flex-col'>
                            <h4 className='text-[2rem]'>${market_data?.current_price.usd}</h4>
                        </div>
                    </section>


                    <section className='grid grid-cols-1 gap-[3%]'>
                        <div className='flex flex-col lg:min-w-[25rem]'>
                            <div className='flex items-center gap-[2%] lg:w-[80%] md:w-[80%] w-full my-[2%] border-b border-gray-500 p-[1%]'>
                                <h4 className='text-gray-500'>Market Cap</h4>
                                <Tooltip title={tooltip}>
                                    <InfoIcon className='cursor-pointer' />
                                </Tooltip>
                                <h4 className='ml-auto text-[0.8rem]'>${market_data.market_cap.usd}</h4>
                            </div>
                            <div className='flex items-center gap-[2%] lg:w-[80%] md:w-[80%] w-full my-[2%] border-b border-gray-500 p-[1%]'>
                                <h4 className='text-gray-500'>Fully Diluted Valuation</h4>
                                <h4 className='ml-auto text-[0.8rem]'>${market_data.fully_diluted_valuation.usd}</h4>
                            </div>

                        </div>

                        <div className='flex flex-col lg:min-w-[25rem]'>
                            <div className='flex items-center gap-[2%] lg:w-[80%] md:w-[80%] w-full my-[2%] border-b border-gray-500 p-[1%]'>
                                <h4 className='text-gray-500'>24hr Trading Vol</h4>
                                <h4 className='ml-auto text-[0.8rem]'>${market_data.market_cap.usd}</h4>
                            </div>
                        </div>
                    </section>
                </div>

                <div className='bg-gray-300 w-full lg:h-full h-[30rem] rounded-[0.7rem] mb-[10%] lg:mb-0 p-[8%]'>
                    <h3 className='text-gray-700'>Test</h3>
                </div>

            </div>


        </PageLayout>
    )
}

export default CoinDetails

// Loader Function
export const coinDetailLoader = async ({ params }: any) => {
    const { coinId } = params;

    const response = await getCoinDetail(coinId);

    return response
}
