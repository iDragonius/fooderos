import React, { useState } from 'react'
import styles from './Types.module.scss'
import pastries from '../../../assets/img/icons/cake.svg'
import restaurants from '../../../assets/img/icons/restaurant.svg'

import grocery from '../../../assets/img/icons/shop.svg'
const Types = ({ activeType, setActiveType }) => {
    return (
        <div className={'flex w-full justify-center'}>
            <div
                className={
                    activeType === 'Restaurants'
                        ? styles.type + ' ' + styles.typeActive
                        : styles.type
                }
                onClick={() => setActiveType('Restaurants')}
            >
                <img src={restaurants} alt="restaurants" />
                <span>Restaurants</span>
            </div>
            <div
                className={
                    activeType === 'Grocery'
                        ? styles.type + ' ' + styles.typeActive
                        : styles.type
                }
                onClick={() => setActiveType('Grocery')}
            >
                <img src={grocery} alt="grocery" />
                <span>Grocery</span>
            </div>
            <div
                className={
                    activeType === 'Pastries'
                        ? styles.type + ' ' + styles.typeActive
                        : styles.type
                }
                onClick={() => setActiveType('Pastries')}
            >
                <img src={pastries} alt="pastries" />
                <span>Pastries</span>
            </div>
        </div>
    )
}

export default Types
