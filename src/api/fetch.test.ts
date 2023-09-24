import MockAdapter from 'axios-mock-adapter';
import { axiosInstance, getCoinsByPage } from './axios';
import { dummy } from '../data/dummy';



describe('getCoinsByPage', () => {

    const mock = new MockAdapter(axiosInstance);

    beforeAll(() => {
        mock.reset(); // Reset the mock after each test
    });

    it('should fetch coins data by page correctly', async () => {
        const pageParam = 1;
        const dataPerPage = 10;

        const mockResponseData = dummy;

        mock.onGet(`/markets?vs_currency=usd&order=market_cap_desc&per_page=${dataPerPage}&page=${pageParam}&precision=2`).reply(200, mockResponseData);

        const result = await getCoinsByPage(pageParam, dataPerPage);

        expect(result).toEqual(mockResponseData);
    });

    it('should handle network errors', async () => {
        const pageParam = 1;
        const dataPerPage = 10;

        mock.onGet(`/markets?vs_currency=usd&order=market_cap_desc&per_page=${dataPerPage}&page=${pageParam}&precision=2`).networkError();

        try {
            await getCoinsByPage(pageParam, dataPerPage);
            expect(true).toBe(false);
        } catch (error) {
            if (error instanceof Error) expect(error.message).toContain('Network Error');
        }
    });
});
