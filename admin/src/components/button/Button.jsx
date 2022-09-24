import React from 'react'

const MyComponent = ({
    label,
    padding,
    color = 'black',
    size = 'medium',
    variant = '',
}) => {
    return (
        <button style={{ padding: padding, backgroundColor: color }}>
            {label}
        </button>
    )
}

export default MyComponent
