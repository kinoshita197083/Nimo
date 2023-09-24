/**
 * Define what the attributes the table head should have
 */

import { CoinMarket } from "../types/CoinMarket";


export interface HeadCell {
    id: keyof CoinMarket;
    label: string;
    numeric: boolean;
}

export const tableHeadCells: readonly HeadCell[] = [
    {
        id: 'market_cap_rank',
        numeric: false,
        label: 'Rank',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Coin',
    },
    {
        id: 'current_price',
        numeric: true,
        label: 'Price',
    },
    {
        id: 'price_change_percentage_24h',
        numeric: true,
        label: '24hr',
    },
    {
        id: 'total_volume',
        numeric: true,
        label: 'Volume',
    },
    {
        id: 'market_cap',
        numeric: true,
        label: 'Mkt Cap',
    },
];