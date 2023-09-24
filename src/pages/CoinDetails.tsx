/**
 * Couldn't find any types provided on CoinGecko website so I use 'any' type here
 * It's certainly not ideal, but the dataset is unrealistically long to hardcode the type
 */

import { useLoaderData } from 'react-router-dom'
import { getCoinDetail } from '../api/axios';

const CoinDetails = () => {

    const coinDetails: any = useLoaderData();
    const { market_cap_rank, image, name, symbol, market_data } = coinDetails;

    return (
        <div>
            <div className='flex flex-col min-h-screen min-w-screen px-[8%] py-[2%]'>
                <span className='bg-indigo-800 text-gray-100 w-[5rem] flex justify-center rounded my-[1%]'>Rank #{market_cap_rank}</span>
                <div className='flex gap-[1%] items-center'>
                    <img className='w-[35px]' src={image.small} />
                    <h2 className='text-[1.5rem]'>{name}</h2>
                    <p className='uppercase text-gray-400 text-[0.9rem]'>{symbol}</p>
                </div>
                <div className='flex-col'>
                    <h4 className='text-[2rem]'>${market_data?.current_price.usd}</h4>
                </div>

                <div className='flex gap-[3%]'>
                    <div className='flex flex-col w-[25rem]'>
                        <div className='flex items-center gap-[2%] w-[100%] my-[2%] border-b border-gray-500 p-[1%]'>
                            <h4 className='text-gray-500'>Market Cap</h4>
                            <h4 className='ml-auto text-[0.8rem]'>${market_data.market_cap.usd}</h4>
                        </div>

                    </div>

                    <div className='flex flex-col w-[25rem]'>
                        <div className='flex items-center gap-[2%] w-[100%] my-[2%] border-b'>
                            <h4 className='text-gray-500'>24hr Trading Vol</h4>
                            <h4 className='ml-auto text-[0.8rem]'>${market_data.market_cap.usd}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetails

// Loader Function
export const coinDetailLoader = async ({ params }: any) => {
    const { coinId } = params;

    const response = await getCoinDetail(coinId);

    return response
}
