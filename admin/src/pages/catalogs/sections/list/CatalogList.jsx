import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    sortingFns,
    useReactTable,
} from '@tanstack/react-table'
import CatalogListHeader from '../../headers/catalogListHeader/CatalogListHeader'
import styles from '../../../store/sections/list/StoreList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { currData, deleteData } from '../../../../store/slices/storeSlice'
import { useLocation } from 'react-router-dom'
import { currLanguage } from '../../../../store/slices/userInfoSlice'
import { useStoresQuery } from '../../../../store/slices/api/storeApiSlice'
import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import { useCatalogsQuery } from '../../../../store/slices/api/catalogApiSlice'
import { catalogData } from '../../../../store/slices/catalogSlice'
import right from '../../../../assets/img/pages/right-arrow.png'
import bottom from '../../../../assets/img/pages/arrow-down-sign-to-navigate.png'
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

const CatalogList = () => {
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [expanded, setExpanded] = useState({})
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
            header: () => <span>Catalog Name</span>,
            accessorKey: 'name',
            cell: ({ row, getValue }) => (
                <div
                    style={{
                        paddingLeft: `${row.depth * 1.5}rem`,
                    }}
                >
                    <>
                        {row.getCanExpand() && (
                            <button
                                {...{
                                    onClick: row.getToggleExpandedHandler(),
                                    style: { cursor: 'pointer' },
                                }}
                            >
                                <div
                                    className={
                                        'w-8 h-8 rounded-full hover:bg-gray-100 flex justify-center items-center'
                                    }
                                >
                                    {row.getIsExpanded() ? (
                                        <img
                                            src={bottom}
                                            alt="asd"
                                            width={16}
                                            height={16}
                                        />
                                    ) : (
                                        <img
                                            src={right}
                                            alt="12"
                                            width={16}
                                            height={16}
                                        />
                                    )}
                                </div>
                            </button>
                        )}{' '}
                        {getValue()}
                    </>
                </div>
            ),
        },
        {
            accessorKey: 'store_name',
            cell: (info) => info.getValue(),
            header: () => <span>Store</span>,
        },
        {
            accessorKey: 'branch_count',
            cell: (info) => info.getValue(),
            header: () => <span>Branch Count</span>,
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

    const currentData = useSelector(catalogData)
    const table = useReactTable({
        data: currentData,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
            expanded,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onExpandedChange: setExpanded,
        getExpandedRowModel: getExpandedRowModel(),
        getSubRows: (row) => row.sub,
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
    const { data, refetch } = useCatalogsQuery({
        lang: localStorage.getItem('lang'),
        rest: locate.pathname.split('/')[2],
    })
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(deleteData())
    // }, [])
    // useEffect(() => {
    //     refetch()
    // }, [locate, currentLanguage])
    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])
    return (
        <div>
            <CatalogListHeader />
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
                                                                        src={`http://192.168.202.52:81/storage/catagory/images/${cell.getValue()}`}
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
                                                        'sort'
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
                                                                    <div
                                                                        className={
                                                                            'flex items-center'
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={
                                                                                'w-2 h-2 mr-2 rounded-full bg-green-600'
                                                                            }
                                                                        ></span>
                                                                        <p>
                                                                            Online
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className={
                                                                            'flex items-center'
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={
                                                                                'w-2 h-2 mr-2 rounded-full bg-red-600'
                                                                            }
                                                                        ></span>
                                                                        <p>
                                                                            Offline
                                                                        </p>
                                                                    </div>
                                                                )}
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
    if (column.id === 'store_name') {
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
    if (column.id === 'branch_count') {
        return (
            <div>
                <div className="flex  ">
                    <DebouncedInput
                        type="number"
                        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                        value={columnFilterValue?.[0] ?? ''}
                        onChange={(value) =>
                            column.setFilterValue((old) => [value, old?.[1]])
                        }
                        placeholder={`Min`}
                        className={styles.inpNum + ' mr-3'}
                    />
                    <DebouncedInput
                        type="number"
                        min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                        max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                        value={columnFilterValue?.[1] ?? ''}
                        onChange={(value) =>
                            column.setFilterValue((old) => [old?.[0], value])
                        }
                        placeholder={`Max`}
                        className={styles.inpNum}
                    />
                </div>
                <div className="h-1" />
            </div>
        )
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

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
    const ref = useRef()

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

export default CatalogList
