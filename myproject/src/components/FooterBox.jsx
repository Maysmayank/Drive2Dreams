import React from 'react'

function FooterBox({ heading, item1, item2, item3 }) {
    return (
        <div className='flex flex-col gap-10'>
            <h1 className='text-3xl open-sans-paragraph'>{heading}</h1>
            <div className='flex flex-col gap-4  font-semibold' >
                <span>{item1}</span>
                <span>{item2}</span>
                <span>{item3}</span>
            </div>

        </div>
    )
}

export default FooterBox
