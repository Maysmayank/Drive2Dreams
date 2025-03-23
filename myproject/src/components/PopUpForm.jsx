'use client';
import React, { useEffect, useState } from 'react';
import FormComponent from './Form';
import { Button } from './ui/button';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

function PopUpForm() {
    const [isVisible, setIsVisible] = useState(true); // Controls modal visibility
    const [isFadingOut, setIsFadingOut] = useState(false); // Tracks fade-out animation
    const [blackoutScreen,setBlackoutScreen]=useState(false)
    const handleClose = () => {        
        setIsFadingOut(true); // Trigger fade-out animation
        setTimeout(() => { 
            setIsVisible(false); // Wait for animation to finish, then hide modal
            setIsFadingOut(false); // Reset fade-out state
            localStorage.setItem('hasSeenPopup', 'true'); // Mark popup as seen

        }, 1000); // Match the duration of the fadeOut animation (1s)
    
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-container') {
            handleClose(); // Trigger fade-out when clicking outside the modal
        }
    };



    if (!isVisible) return null; // Don't render modal if `isVisible` is false

    return (
        <>
         {/* Blackout screen */}
         {blackoutScreen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 ">
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
                } bg-slate-700 fixed flex inset-0 bg-opacity-40 justify-center items-center w-[100%] h-[100%] z-50`}>
                <div
                    id="modal"
                    className={`${isFadingOut?'slide-out':''} absolute rounded-xl flex items-center`}>
                    <Button className="absolute top-5 right-4" onClick={handleClose}>
                        X
                    </Button>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col md:w-[60%] bg-[#1c1c39] rounded-tl-xl rounded-bl-xl text-white">
                            <div className="flex pt-8 flex-col items-center">
                                <h1 className="font-bold ">Let&apos;s Talk</h1>
                                <span>Explore Colleges with us</span>
                            </div>
                            <FormComponent classname="text-sm px-10" setBlackoutScreen={setBlackoutScreen} onClose={handleClose}/>
                        </div>
                        <div className="hidden md:block">
                            <Image
                                src={'/contactform.jpg'}
                                className="object-fill w-full h-full rounded-tr-xl rounded-br-xl"
                                height={400}
                                width={400}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpForm;
