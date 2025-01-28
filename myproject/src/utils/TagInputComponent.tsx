import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import * as z from 'zod';

const tagSchema = z.string().min(3, "Tag cannot be empty");

function TagInputComponent({label,setState,state,tagsSchema}:any) {
   
    const [inputValue, setInputValue] = useState(''); // State to manage the input value
    const [error, setError] = useState(''); // State to manage validation error

    function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                
                tagSchema.parse(inputValue.trim()); // Validate the input value
                setState((prevTags: any) => [...prevTags, inputValue.trim()]);
                setInputValue('');

                setError(''); // Clear error on successful validation
            } catch (err) {
                
                if (err instanceof z.ZodError) {
                    setError(err.errors[0].message); // Set error message
                }
            }
        }
    }
    
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value)
    }
    
    function handleDelete(e:any,index:number){
        e.preventDefault();
        setState((prevTags:any)=>prevTags.filter((_:any,i:number)=>index!=i))
    }

  return (

    <div>
       <h2>{label}</h2> 

      <input value={inputValue} placeholder='Enter the info' onKeyDown={handleOnKeyDown} onChange={handleChange} className='mt-1 w-full bg-transparent border px-3 py-1 rounded-md outline-1' />
        {
            error&&<p className="text-red-500 text-sm">{error}</p>
        }
        <div className='mt-4'>
            {
                state.length===0?(""):(
                    state.map((tag:string,index:number)=>(
                        <div key={index} className='flex items-center mb-3'>
                            <Button onClick={(e)=>handleDelete(e,index)} className='text-sm bg-transparent h-6'>x</Button>
                            <p>{tag}</p>
                        </div>
                        
                    ))
                )
            }
        </div>
    </div>

  )
}

export default TagInputComponent
