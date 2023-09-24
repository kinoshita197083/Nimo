import { render, screen } from '@testing-library/react';
import { useLoaderData } from 'react-router-dom';
import CoinDetails from '../pages/CoinDetails';
import '@testing-library/jest-dom';

// Mock the useLoaderData function
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: jest.fn(),
}));

// Mock the API call
jest.mock('../api/axios', () => ({
    getCoinDetail: jest.fn(),
}));

describe('CoinDetails Component', () => {
    it('should render coin details', async () => {
        // Mock the data returned by useLoaderData
        const mockCoinDetails = {
            market_cap_rank: 1,
            image: { small: 'image-url' },
            name: 'Bitcoin',
            symbol: 'BTC',
            market_data: {
                current_price: { usd: 50000 },
                market_cap: { usd: 1000000000 },
            },
        };

        // Mock the API call response
        const mockApiResponse = { data: mockCoinDetails };
        (useLoaderData as jest.Mock).mockReturnValue(mockCoinDetails);
        (require('../api/axios').getCoinDetail as jest.Mock).mockResolvedValue(mockApiResponse);

        render(<CoinDetails />);

        await screen.findByText('Rank #1');
        expect(screen.getByText('Bitcoin')).toBeInTheDocument();
        expect(screen.getByText('BTC')).toBeInTheDocument();
        expect(screen.getByText('$50000')).toBeInTheDocument();
        expect(screen.getByText('Market Cap')).toBeInTheDocument();
        expect(screen.getByText('24hr Trading Vol')).toBeInTheDocument();
    });
});
