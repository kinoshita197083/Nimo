import { CoinType } from "../components/table";

interface HeadCell {
    disablePadding: boolean;
    id: keyof CoinType;
    label: string;
    numeric: boolean;
}

export const tableHeadCells: readonly HeadCell[] = [
    {
        id: 'market_cap_rank',
        numeric: false,
        disablePadding: false,
        label: 'Rank',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Coin',
    },
    {
        id: 'current_price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'price_change_percentage_24h',
        numeric: true,
        disablePadding: false,
        label: '24hr',
    },
    {
        id: 'total_volume',
        numeric: true,
        disablePadding: false,
        label: 'Volume',
    },
    {
        id: 'market_cap',
        numeric: true,
        disablePadding: false,
        label: 'Mkt Cap',
    },
];