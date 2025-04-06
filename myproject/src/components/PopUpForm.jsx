'use client';
import React, { useEffect, useState } from 'react';
import FormComponent from './Form';
import { Button } from './ui/button';
import Image from 'next/image';
import { Loader2, X } from 'lucide-react';

function PopUpForm() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [blackoutScreen, setBlackoutScreen] = useState(false);

    useEffect(() => {
        const formSubmitted = localStorage.getItem('form_submitted');
        if (!formSubmitted) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {        
        setIsFadingOut(true);
        setTimeout(() => { 
            setIsVisible(false);
            setIsFadingOut(false);
        }, 1000);
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-container') {
            handleClose();
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {blackoutScreen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
                    <div className='flex items-center gap-2'>
                        <Loader2 size={40} className='animate-spin' color='white'/>
                        <span className='text-white font-semibold text-xl'>Processing</span>
                    </div>
                </div>
            )}
            <div
                id="modal-container"
                onClick={handleOutsideClick}
                className={`${
                    isFadingOut ? 'fade-out' : ''
                } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
                <div
                    id="modal"
                    className={`${isFadingOut?'slide-out':''} bg-white rounded-md relative flex w-[90%] md:w-[60%]`}>
                    <X className="absolute top-5 right-4" onClick={handleClose}/>
                    <div className="w-full md:w-1/2 p-4 items-center justify-center flex flex-col bg-[#1c1c39] text-white">
                        <h1 className="font-bold mt-4 text-2xl">Let&apos;s Talk</h1>
                        <span className="text-sm">Explore Colleges with us</span>
                        <FormComponent 
                            classname="text-sm px-10" 
                            setBlackoutScreen={setBlackoutScreen} 
                            onClose={handleClose}
                            completeForm={true}
                        />
                    </div>
                    <div className="hidden md:block w-1/2">
                        <Image
                            src={'/contactform.jpg'}
                            className="object-cover w-full h-full rounded-r-md"
                            height={600}
                            width={400}
                            alt="Contact Form"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpForm;
