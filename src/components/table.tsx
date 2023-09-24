/*
 * The Code is copied from MUI Doc
 * Most of the unnecessary parts have been removed
 * It's not a re-useable component due to the design of the table
 * Explanation: (Logo, Name, Ticker) have to group into one section to fit into one Column
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { HeadCell } from '../data/headCells';
import { useNavigate } from 'react-router-dom';
import { CoinMarket } from '../types/CoinMarket';


type Order = 'asc' | 'desc';

// const headCells = tableHeadCells;
// const rows = dummy.map(data => data);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
    data: CoinMarket[];
    headCells: readonly HeadCell[];
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

interface EnhancedTableHeadProps {
    headCells: any
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CoinMarket) => void;
    order: Order;
    orderBy: string;
    rowCount: number
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
    const { headCells, order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof CoinMarket) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead className='m-auto'>
            <TableRow>
                {headCells.map((headCell: HeadCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function EnhancedTable(props: EnhancedTableProps) {

    const { data, headCells, page, setPage } = props;

    const rows: CoinMarket[] = data.map(data => data);

    // act like <Link> that bring user to /${id}
    const navigate = useNavigate();

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof CoinMarket>('name');
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleRequestSort = (
        _: React.MouseEvent<unknown>,
        property: keyof CoinMarket,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows as any, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const handleClick = (id: string) => {
        navigate(`/coins/${id}`)
    }



    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, _) => {
                                const { id, name, symbol, current_price, image, price_change_percentage_24h, market_cap, market_cap_rank, total_volume } = row;

                                return (
                                    <TableRow
                                        hover
                                        onClick={() => handleClick(id.toString())}
                                        tabIndex={-1}
                                        key={id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="center" padding='checkbox'>{market_cap_rank}</TableCell>
                                        <TableCell align="center">
                                            <div className='flex justify-left items-center gap-[3%]'>
                                                <img src={image as string} width='20px' />
                                                <span>{name}</span>
                                                <span className='ml-[3%] text-gray-500 uppercase text-[0.6rem]'>{symbol}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{current_price}</TableCell>
                                        <TableCell align="right" style={{ color: +price_change_percentage_24h > 0 ? 'green' : 'red' }}>{price_change_percentage_24h}%</TableCell>
                                        <TableCell align="right">${total_volume}</TableCell>
                                        <TableCell align="right">${market_cap}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
