import React, { useEffect, useMemo, useState } from 'react'
import ProductListHeader from '../../headers/productListHeader/ProductListHeader'
import StoreListHeader from '../../../store/headers/storeListHeader/StoreListHeader'
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    sortingFns,
    useReactTable,
} from '@tanstack/react-table'
import styles from '../../../store/sections/list/StoreList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { currData, deleteData } from '../../../../store/slices/storeSlice'
import { useLocation } from 'react-router-dom'
import { currLanguage } from '../../../../store/slices/userInfoSlice'
import { useStoresQuery } from '../../../../store/slices/api/storeApiSlice'
import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import { useShowProductsQuery } from '../../../../store/slices/api/productApiSlice'
import { productsData } from '../../../../store/slices/productSlice'
import More from './more/More'
import Status from './status/Status'

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({
        itemRank,
    })

    return itemRank.passed
}

const fuzzySort = (rowA, rowB, columnId) => {
    let dir = 0

    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank,
            rowB.columnFiltersMeta[columnId]?.itemRank
        )
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

const ProductList = () => {
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const isSuccess = true
    const columns = useMemo(() => [
        {
            header: () => <span>#</span>,
            accessorKey: 'id',
            cell: (info) => info.getValue(),
        },
        {
            header: () => <span>Image</span>,
            accessorKey: 'image',
            cell: (info) => info.getValue(),
        },
        {
            header: () => <span>Product Name</span>,
            accessorKey: 'name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'store',
            cell: (info) => info.getValue(),
            header: () => <span>Store</span>,
        },

        {
            cell: (info) => info.getValue(),

            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'more',
            header: '',
        },
    ])
    const currentData = useSelector(productsData)
    const table = useReactTable({
        data: currentData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    })
    const locate = useLocation()
    const currentLanguage = useSelector(currLanguage)

    const { data: result, refetch } = useShowProductsQuery({
        lang: localStorage.getItem('lang'),
        rest: locate.pathname.split('/')[2],
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(deleteData())
    }, [])
    useEffect(() => {
        refetch()
    }, [locate, currentLanguage])
    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])
    return (
        <div>
            <ProductListHeader />
            <div className={'px-10 mt-8'}>
                {isSuccess && (
                    <div className="p-2">
                        <div className="h-2" />
                        <table className={'mx-auto w-full'}>
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className={'px-6'}
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                            <div
                                                                {...{
                                                                    className:
                                                                        header.column.getCanSort()
                                                                            ? 'cursor-pointer  text-left text-[18px] pt-6 pb-6  w-full '
                                                                            : '',
                                                                    onClick:
                                                                        header.column.getToggleSortingHandler(),
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext()
                                                                )}
                                                                {{
                                                                    asc: ' 🔼',
                                                                    desc: ' 🔽',
                                                                }[
                                                                    header.column.getIsSorted()
                                                                ] ?? null}
                                                            </div>
                                                            {header.column.getCanFilter() ? (
                                                                <div>
                                                                    <Filter
                                                                        column={
                                                                            header.column
                                                                        }
                                                                        table={
                                                                            table
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <tr key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    if (
                                                        cell.column.id ===
                                                        'image'
                                                    ) {
                                                        return (
                                                            <td
                                                                key={cell.id}
                                                                className={
                                                                    'border-[1px] px-6 py-5 '
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        'flex justify-center'
                                                                    }
                                                                >
                                                                    <img
                                                                        width={
                                                                            60
                                                                        }
                                                                        src={`http://192.168.202.52:81/storage/product/images/${cell.getValue()}`}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                    if (
                                                        cell.column.id ===
                                                        'more'
                                                    ) {
                                                        return (
                                                            <td
                                                                key={cell.id}
                                                                className={
                                                                    'border-[1px] px-6 py-5 '
                                                                }
                                                            >
                                                                <More />
                                                            </td>
                                                        )
                                                    }

                                                    if (
                                                        cell.column.id ===
                                                        'status'
                                                    ) {
                                                        return (
                                                            <td
                                                                key={cell.id}
                                                                className={
                                                                    'border-[1px] px-6 py-5  '
                                                                }
                                                            >
                                                                {cell.getValue() ===
                                                                1 ? (
                                                                    <Status
                                                                        checked={
                                                                            true
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <Status
                                                                        checked={
                                                                            false
                                                                        }
                                                                    />
                                                                )}
                                                            </td>
                                                        )
                                                    }
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className={
                                                                'border-[1px] px-6 py-5'
                                                            }
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {currentData.length < 11 ? (
                            <div></div>
                        ) : (
                            <button
                                className={
                                    'w-full bg-[#eee] flex justify-center items-center py-4 mt-10 mb-[72px]'
                                }
                                onClick={(e) => {
                                    table.setPageSize(
                                        6 + table.getState().pagination.pageSize
                                    )
                                }}
                            >
                                Load More
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function Filter({ column, table }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)
    const columnFilterValue = column.getFilterValue()
    const sortedUniqueValues = useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    if (column.id === 'tagId') {
        return <div />
    }
    if (column.id === 'name') {
        return (
            <>
                <datalist id={column.id + 'list'}>
                    {sortedUniqueValues.slice(0, 5000).map((value) => (
                        <option value={value} key={value} />
                    ))}
                </datalist>
                <DebouncedInput
                    type="text"
                    value={columnFilterValue ?? ''}
                    onChange={(value) => column.setFilterValue(value)}
                    placeholder={`Search... `}
                    className={styles.inp}
                    list={column.id + 'list'}
                />
                <div className="h-1" />
            </>
        )
    }
    if (column.id === 'tags') {
        return (
            <>
                <datalist id={column.id + 'list'}>
                    {sortedUniqueValues.slice(0, 5000).map((value) => (
                        <option value={value} key={value} />
                    ))}
                </datalist>
                <DebouncedInput
                    type="text"
                    value={columnFilterValue ?? ''}
                    onChange={(value) => column.setFilterValue(value)}
                    placeholder={`Search... `}
                    className={styles.inp}
                    list={column.id + 'list'}
                />
                <div className="h-1" />
            </>
        )
    }

    if (column.id === 'status') {
        return <div />
    }
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default ProductList
