import React from 'react';
import Link from 'next/link';

function FooterBox({ heading, item1, link1, item2, link2, item3, link3 }) {
    return (
        <div className='flex flex-col gap-10 '>
            <h1 className='text-3xl open-sans-paragraph'>{heading}</h1>
            <div className='flex flex-col gap-4 font-semibold'>
                {item1 && link1 && (
                    <Link href={link1} passHref>
                        <span className='hover:underline cursor-pointer'>{item1}</span>
                    </Link>
                )}
                {item2 && link2 && (
                    <Link href={link2} passHref>
                        <span className='hover:underline cursor-pointer'>{item2}</span>
                    </Link>
                )}
                {item3 && link3 && (
                    <Link href={link3} passHref>
                        <span className='hover:underline cursor-pointer'>{item3}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default FooterBox;