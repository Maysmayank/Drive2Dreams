import Link from "next/link"
export default function Bottomwarning({label,to,buttontext}){
    return<div>
        <div className='flex gap-2 font-sans'>
            {label}
            <Link href={to} passHref className='pointer underline cursor-pointer'>
            {buttontext}
            </Link>
        </div>
    </div>
}