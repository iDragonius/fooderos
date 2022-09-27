import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    branchCatalogData,
    selectedCatalogs,
    setCatalogs,
} from '../../../../../store/slices/branchCatalogSlice'

const Catalogs = () => {
    const [selected, setSelected] = useState([])
    const dispatch = useDispatch()
    const catalogs = useSelector(branchCatalogData)
    const selectedCats = useSelector(selectedCatalogs)
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log(selectedCats)
        setSelected(selectedCats)
    }, [selectedCats])

    const selectCatalog = (e, priority) => {
        if (priority === 3) {
            if (e.target.checked) {
                const temp = []
                if (
                    !selected.includes(
                        e.target.parentNode.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                ) {
                    e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].checked = true
                    temp.push(
                        e.target.parentNode.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                }
                if (
                    !selected.includes(
                        e.target.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                ) {
                    e.target.parentNode.parentNode.childNodes[0].childNodes[1].checked = true
                    temp.push(
                        e.target.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                }
                temp.push(e.target.parentNode.childNodes[3].innerHTML)

                setSelected([...selected, ...temp])
                dispatch(setCatalogs([...selected, ...temp]))
            } else {
                let temp = [...selected]
                temp = temp.filter(
                    (data) =>
                        e.target.parentNode.childNodes[3].innerHTML !== data
                )

                const name = e.target.parentNode.childNodes[2].innerHTML
                for (
                    let i = 1;
                    i < e.target.parentNode.parentNode.childNodes.length;
                    i++
                ) {
                    if (
                        e.target.parentNode.parentNode.childNodes[i]
                            .childNodes[2].innerHTML !== name &&
                        e.target.parentNode.parentNode.childNodes[i]
                            .childNodes[1].checked
                    ) {
                        e.target.parentNode.parentNode.childNodes[0].childNodes[1].checked = true
                        dispatch(setCatalogs(temp))

                        setSelected(temp)
                        break
                    }
                    if (
                        e.target.parentNode.parentNode.childNodes.length - 1 ===
                        i
                    ) {
                        e.target.parentNode.parentNode.childNodes[0].childNodes[1].checked = false
                        temp = temp.filter(
                            (data) =>
                                e.target.parentNode.parentNode.childNodes[0]
                                    .childNodes[3].innerHTML !== data
                        )
                        for (
                            let i = 1;
                            i <
                            e.target.parentNode.parentNode.parentNode.childNodes
                                .length;
                            i++
                        ) {
                            if (
                                e.target.parentNode.parentNode.parentNode
                                    .childNodes[i].childNodes[0].childNodes[1]
                                    .checked
                            ) {
                                e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].checked = true
                                if (
                                    !temp.includes(
                                        e.target.parentNode.parentNode
                                            .parentNode.childNodes[0]
                                            .childNodes[3].innerHTML
                                    )
                                ) {
                                    temp.push(
                                        e.target.parentNode.parentNode
                                            .parentNode.childNodes[0]
                                            .childNodes[3].innerHTML
                                    )
                                }

                                break
                            }
                            e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].checked = false
                            temp = temp.filter(
                                (data) =>
                                    data !==
                                    e.target.parentNode.parentNode.parentNode
                                        .childNodes[0].childNodes[3].innerHTML
                            )
                        }
                        setSelected(temp)
                        dispatch(setCatalogs(temp))
                    }
                }
            }
        } else if (priority === 2) {
            let temp = [...selected]
            if (e.target.checked) {
                e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].checked = true
                if (
                    !temp.includes(
                        e.target.parentNode.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                ) {
                    temp.push(
                        e.target.parentNode.parentNode.parentNode.childNodes[0]
                            .childNodes[3].innerHTML
                    )
                }
                temp.push(e.target.parentNode.childNodes[3].innerHTML)
            } else {
                const name = e.target.parentNode.childNodes[2].innerHTML
                for (
                    let i = 1;
                    i <
                    e.target.parentNode.parentNode.parentNode.childNodes.length;
                    i++
                ) {
                    if (
                        e.target.parentNode.parentNode.parentNode.childNodes[i]
                            .childNodes[0].childNodes[1].checked &&
                        name !==
                            e.target.parentNode.parentNode.parentNode
                                .childNodes[i].childNodes[2].innerHTML
                    ) {
                        e.target.parentNode.parentNode.parentNode.childNodes[
                            i
                        ].childNodes[1].checked = true
                        break
                    }
                    if (
                        e.target.parentNode.parentNode.parentNode.childNodes
                            .length -
                            1 ===
                        i
                    ) {
                        e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[1].checked = false
                        temp = temp.filter(
                            (data) =>
                                data !==
                                e.target.parentNode.parentNode.parentNode
                                    .childNodes[0].childNodes[3].innerHTML
                        )
                    }
                }
                temp = temp.filter(
                    (data) =>
                        data !== e.target.parentNode.childNodes[3].innerHTML
                )
            }
            for (
                let i = 1;
                i < e.target.parentNode.parentNode.childNodes.length;
                i++
            ) {
                e.target.parentNode.parentNode.childNodes[
                    i
                ].childNodes[1].checked = e.target.checked

                if (e.target.checked) {
                    temp.push(
                        e.target.parentNode.parentNode.childNodes[i]
                            .childNodes[3].innerHTML
                    )
                } else {
                    temp = temp.filter(
                        (data) =>
                            data !==
                            e.target.parentNode.parentNode.childNodes[i]
                                .childNodes[3].innerHTML
                    )
                }
            }
            setSelected([...temp])
            dispatch(setCatalogs(temp))
        } else if (priority === 1) {
            let temp = [...selected]

            if (e.target.checked) {
                if (
                    !temp.includes(e.target.parentNode.childNodes[3].innerHTML)
                ) {
                    temp.push(e.target.parentNode.childNodes[3].innerHTML)
                }
                for (
                    let i = 1;
                    i < e.target.parentNode.parentNode.childNodes.length;
                    i++
                ) {
                    e.target.parentNode.parentNode.childNodes[
                        i
                    ].childNodes[0].childNodes[1].checked = true
                    if (
                        !temp.includes(
                            e.target.parentNode.parentNode.childNodes[i]
                                .childNodes[0].childNodes[3].innerHTML
                        )
                    ) {
                        temp.push(
                            e.target.parentNode.parentNode.childNodes[i]
                                .childNodes[0].childNodes[3].innerHTML
                        )
                    }
                    for (
                        let k = 1;
                        k <
                        e.target.parentNode.parentNode.childNodes[i].childNodes
                            .length;
                        k++
                    ) {
                        e.target.parentNode.parentNode.childNodes[i].childNodes[
                            k
                        ].childNodes[1].checked = true
                        if (
                            !temp.includes(
                                e.target.parentNode.parentNode.childNodes[i]
                                    .childNodes[k].childNodes[3].innerHTML
                            )
                        ) {
                            temp.push(
                                e.target.parentNode.parentNode.childNodes[i]
                                    .childNodes[k].childNodes[3].innerHTML
                            )
                        }
                    }
                }
            } else {
                temp = temp.filter(
                    (data) =>
                        data !== e.target.parentNode.childNodes[3].innerHTML
                )
                for (
                    let i = 1;
                    i < e.target.parentNode.parentNode.childNodes.length;
                    i++
                ) {
                    e.target.parentNode.parentNode.childNodes[
                        i
                    ].childNodes[0].childNodes[1].checked = false

                    temp = temp.filter(
                        (data) =>
                            data !==
                            e.target.parentNode.parentNode.childNodes[i]
                                .childNodes[0].childNodes[3].innerHTML
                    )

                    for (
                        let k = 1;
                        k <
                        e.target.parentNode.parentNode.childNodes[i].childNodes
                            .length;
                        k++
                    ) {
                        e.target.parentNode.parentNode.childNodes[i].childNodes[
                            k
                        ].childNodes[1].checked = false

                        temp = temp.filter(
                            (data) =>
                                data !==
                                e.target.parentNode.parentNode.childNodes[i]
                                    .childNodes[k].childNodes[3].innerHTML
                        )
                    }
                }
            }
            setSelected(temp)
            dispatch(setCatalogs(temp))
        }
    }
    return (
        <div className={' shadow-xl  bg-white pb-10'}>
            <h1
                className={
                    'px-10 border-b-[1px] text-[24px] py-6 font-semibold'
                }
            >
                Add Catalog
            </h1>
            <p className={'text-[#707478] text-[20px] mb-6 ml-10 mt-10'}>
                Please select catalog
            </p>
            <div
                className={
                    'ml-10 shadow-lg mb-32 text-[#37383a] text-[18px] w-max bg-white  mb-10 '
                }
            >
                {catalogs.map((catalog) => {
                    const catalogSubs = catalog.filter((data, i) => i !== 0)
                    return (
                        <div key={catalog[0].id} className={'w-[900px]'}>
                            <div
                                className={
                                    'py-3 px-6 border-[1px] flex items-center min-h-[80px]'
                                }
                            >
                                <img
                                    src={`http://192.168.202.52:81/storage/catagory/images/${catalog[0].image}`}
                                    alt=""
                                    className={'mr-4'}
                                    width={48}
                                    height={48}
                                />
                                <input
                                    type="checkbox"
                                    className={'mr-4'}
                                    defaultChecked={selectedCats.includes(
                                        String(catalog[0].id)
                                    )}
                                    onClick={(e) => selectCatalog(e, 1)}
                                />
                                <span> {catalog[0].name}</span>
                                <span className={'hidden'}>
                                    {catalog[0].id}
                                </span>
                            </div>
                            {catalogSubs[0].map((sub1, i) => {
                                const catalogSubSubs = sub1.filter(
                                    (data, i) => i !== 0
                                )
                                return (
                                    <div key={sub1[0].id}>
                                        <div
                                            className={
                                                'pl-16 py-3 px-6 border-[1px] flex items-center min-h-[80px]'
                                            }
                                        >
                                            <img
                                                src={`http://192.168.202.52:81/storage/catagory/images/${sub1[0].image}`}
                                                alt=""
                                                className={'mr-4'}
                                                width={48}
                                                height={48}
                                            />
                                            <input
                                                type="checkbox"
                                                className={'mr-4'}
                                                defaultChecked={selectedCats.includes(
                                                    String(sub1[0].id)
                                                )}
                                                onClick={(e) =>
                                                    selectCatalog(e, 2)
                                                }
                                            />
                                            <span>{sub1[0].name}</span>
                                            <span className={'hidden'}>
                                                {sub1[0].id}
                                            </span>
                                        </div>
                                        {catalogSubSubs.map((sub2) => {
                                            return (
                                                <div
                                                    key={sub2[0].id}
                                                    className={
                                                        ' pl-24 py-3 px-6 border-[1px] flex items-center min-h-[80px]'
                                                    }
                                                >
                                                    <img
                                                        src={`http://192.168.202.52:81/storage/catagory/images/${sub2[0].image}`}
                                                        alt=""
                                                        className={'mr-4'}
                                                        width={48}
                                                        height={48}
                                                    />
                                                    <input
                                                        type="checkbox"
                                                        className={'mr-4'}
                                                        defaultChecked={selectedCats.includes(
                                                            String(sub2[0].id)
                                                        )}
                                                        onClick={(e) =>
                                                            selectCatalog(e, 3)
                                                        }
                                                    />
                                                    <span>{sub2[0].name}</span>
                                                    <span className={'hidden'}>
                                                        {sub2[0].id}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Catalogs
