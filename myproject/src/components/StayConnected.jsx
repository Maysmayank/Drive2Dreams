import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function StayConnected() {
    return (
        <div className='w-[90%] md:w-[80%] mt-16 md:px-10 m-auto mb-20' >
            <div className='grid  grid-cols-1 md:grid-cols-2'>
                <div className=''>
                    <Image src="/StayTouch.jpg" width={500} height={600}  alt="" />
                </div>

                <div className='flex flex-col mt-10'>
                    <div className='flex flex-col px-10 gap-10 items-center justify-center'>
                        <h1 className='text-6xl pl-7 md:pl-0'>Stay in Touch</h1>

                        <p className='text-center'> Your thoughts and concerns matter to us! If you have any inquiries, feedback, or need assistance, our team is here to support you
                            we will ensure you receive prompt and helpful responses.</p>

                        <Link href='/contact'>
                        <button className='bg- stay-connected-btn bg-[#151149] p-2 px-8 text-white'>Ask us</button>

                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default StayConnected
