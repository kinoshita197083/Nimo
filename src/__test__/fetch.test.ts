import MockAdapter from 'axios-mock-adapter';
import { axiosInstance, getAllCoins, getCoinDetail, getCoinsByPage } from '../api/axios';
import { dummy } from '../data/dummy';

describe('Test All axios fetches', () => {

    const mock = new MockAdapter(axiosInstance);

    beforeAll(() => {
        mock.reset(); // Reset the mock after each test
    });

    it('should fetch coins data by page correctly', async () => {
        let pageParam = 1;
        const dataPerPage = 10;

        const mockResponseData = dummy;

        mock.onGet(`/markets?vs_currency=usd&order=market_cap_rank_desc&per_page=${dataPerPage}&page=${pageParam}&precision=2`).reply(200, mockResponseData);

        const result = await getCoinsByPage(pageParam, dataPerPage);

        expect(result).toEqual(mockResponseData);
    });

    it('getCoinsByPage - should handle network errors', async () => {
        let pageParam = 1;
        const dataPerPage = 10;

        mock.onGet(`/markets?vs_currency=usd&order=market_cap_rank_desc&per_page=${dataPerPage}&page=${pageParam}&precision=2`).networkError();

        try {
            await getCoinsByPage(pageParam, dataPerPage);
            expect(true).toBe(false);
        } catch (error) {
            if (error instanceof Error) expect(error.message).toContain('Network Error');
        }
    });

    it('should fetch All available coins correctly', async () => {

        const mockResponseData = dummy;

        mock.onGet(`/list`).reply(200, mockResponseData);

        const result = await getAllCoins();

        expect(result).toEqual(mockResponseData);
    });

    it('getAllCoins - should handle network errors', async () => {

        mock.onGet(`/list`).networkError();

        try {
            await getAllCoins();
            expect(true).toBe(false);
        } catch (error) {
            if (error instanceof Error) expect(error.message).toContain('Network Error');
        }
    });

    it('should get specific coin detail by its id', async () => {

        const coinId = 'testCoin';

        const mockResponse = {
            test: 'mockedData'
        };

        mock.onGet(`/${coinId}`).reply(200, mockResponse);

        const result = await getCoinDetail(coinId);

        expect(result).toEqual(mockResponse)
    })
});

