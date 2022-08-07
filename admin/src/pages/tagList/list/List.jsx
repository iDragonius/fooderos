import { useEffect, useMemo, useReducer, useState } from 'react'

import './index.css'
import styles from './List.module.scss'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    sortingFns,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

import { rankItem, compareItems } from '@tanstack/match-sorter-utils'

import { makeData } from './makeData'
import More from '../more/More'

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const fuzzySort = (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank,
            rowB.columnFiltersMeta[columnId]?.itemRank
        )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

function List() {
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo(() => [
        {
            header: () => <span>#</span>,
            accessorKey: 'tagId',
            cell: (info) => info.getValue(),
        },
        {
            header: () => <span>Tag Name</span>,
            accessorKey: 'tagName',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'tagType',
            cell: (info) => info.getValue(),
            header: () => <span>Tag Type</span>,
        },
        {
            accessorKey: 'storeCount',
            header: () => <span>Store Count</span>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'more',
            header: '',
        },
    ])

    const [data, setData] = useState(() => makeData(1000))

    const table = useReactTable({
        data,
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

    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    return (
        <div className="p-2">
            <div className="h-2" />
            <table className={'mx-auto'}>
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
                                                        header.column.columnDef
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
                                                            table={table}
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
                        console.log()
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    if (cell.column.id === 'more') {
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
                                    return (
                                        <td
                                            key={cell.id}
                                            className={'border-[1px] px-6 py-5'}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
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
        </div>
    )
}

function Filter({ column, table }) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)
    const head = table.getFlatHeaders()
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
    if (column.id === 'tagName') {
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
    if (column.id === 'tagType') {
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
    if (column.id === 'storeCount') {
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
    if (column.id === 'status') {
        return <div />
    }
}

// A debounced input react component
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

export default List
