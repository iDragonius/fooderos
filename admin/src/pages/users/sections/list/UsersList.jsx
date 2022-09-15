import React, { useEffect, useState } from 'react'
import UserListHeader from '../../headers/userListHeader/UserListHeader'
import Select from 'react-select'
import {
    useSt1Mutation,
    useSt2Mutation,
    useTestProductQuery,
    useTestVariantsQuery,
} from '../../../../store/slices/api/productApiSlice'
import { useSelector } from 'react-redux'

const UsersList = () => {
    const { data, isSuccess } = useTestProductQuery()
    const [id, setId] = useState(0)
    const { data: variants, isSuccess: is, refetch } = useTestVariantsQuery(id)
    const [products, setProducts] = useState([])
    const [changeComb] = useSt2Mutation()
    const [changeOpt] = useSt1Mutation()

    useEffect(() => {
        if (isSuccess) {
            const temp = []
            data.product.map((dat) => {
                temp.push({ label: dat.name, value: dat.product_id })
            })
            setProducts([...temp])
        }
    }, [isSuccess])
    const changeOption = async (id, checked) => {
        console.log({
            id,
            status: checked ? 1 : 0,
        })
        await changeComb({
            id,
            status: checked ? 1 : 0,
        }).then(() => {
            refetch()
        })
    }
    const changeCombination = async (id, checked) => {
        await changeOpt({
            id,
            status: checked ? 1 : 0,
        }).then(() => {
            refetch()
        })
    }
    return (
        <div className={'w-full'}>
            <UserListHeader />
            <div className={'p-5'}></div>
            <div className={'flex'}>
                <div className={'w-[500px]'}>
                    <Select
                        className={'w-1/3 ml-20'}
                        options={products}
                        onChange={(data) => {
                            setId(data.value)
                        }}
                    />
                    <div>
                        {is && (
                            <div className={'mb-5'}>
                                {variants.product_id.map((variant) => (
                                    <div
                                        className={
                                            variant.status
                                                ? 'mb-5 ml-10 bg-green-500 p-4 w-max'
                                                : 'mb-5 ml-10 bg-red-500 p-4 w-max'
                                        }
                                    >
                                        <span>{variant.id}</span>
                                        <input
                                            className={'ml-4'}
                                            type="checkbox"
                                            defaultChecked={variant.status}
                                            onChange={(e) =>
                                                changeCombination(
                                                    variant.id,
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        {variant.combination.map((comb) => (
                                            <div>
                                                <span>
                                                    {
                                                        comb.locales_option[0]
                                                            .name
                                                    }{' '}
                                                </span>
                                                {comb.locales_value[0].name}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {is && (
                        <div>
                            {variants.options.map((option) => (
                                <div>
                                    <div className={'flex '}>
                                        <div> {option.locales[0].name}</div>
                                    </div>

                                    {option.values.map((value) => (
                                        <div className={'ml-10 py-2'}>
                                            {value.values[0].name}
                                            <input
                                                className={'ml-4'}
                                                type="checkbox"
                                                defaultChecked={value.status}
                                                onChange={(e) =>
                                                    changeOption(
                                                        value.values[0]
                                                            .variant_option_value_id,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UsersList
