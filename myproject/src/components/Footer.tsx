import React from 'react'
import FooterBox from '../components/FooterBox'
import { Linkedin } from 'lucide-react'
import { InstagramLogoIcon, Link1Icon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
function Footer() {
  return (
    <div className='relative'>
      <div className='bg-black min-h-[60px] flex flex-col items-center justify-center text-center pt-10'>
        <div className='flex items-center justify-center w-full text-white'>
            <div className='grid mb-10 md:grid-cols-3  gap-16  w-[85%]'>
              
              <FooterBox heading={"Discover More"} item1={"Who are We?"} item2={"Collaborators"} item3={"Asssistance"}/>

              <FooterBox heading={"Popular Links"} item1={"Contact"} item2={"Student HelpDesk"} item3={""}/>

            <div className='flex flex-col gap-4 mt-10'>
            
            <h1 className='text-3xl open-sans-paragraph inline'>Socials <Link1Icon className='inline translate-y h-6 w-5'/></h1>
            
            <div className='flex flex-row w-full items-center justify-center  gap-5  font-semibold' >
                <Link target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/company/drive2dreams/"} passHref > <LinkedInLogoIcon className='hover:scale-110' height={40} width={35}/>
                </Link>
                <Link target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/careerway.official?igsh=cTBuZTRzcGE2MHJo"} passHref > <InstagramLogoIcon className='hover:scale-110' height={40} width={35}/>
                </Link>
                
                
                
            </div>

        </div>

            </div>
        </div>
      <span className='text-white text-sm font-medium'>
        © 2024 Drive2Dreams. All rights reserved.
      </span>
      </div>
    </div>
  )
}

export default Footer
