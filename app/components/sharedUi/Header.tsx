'use client'
import { navItems } from  '@/app/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
    const pathname = usePathname();

    return (
        <>
          <nav className='bg-gray-800  border-gray-700 sticky top-0 z-50'>
            <div className=' container mx-auto mx-4'>
                <div className='flex items-center justify-between h-16'>
                    <Link href='/' className='flex items-center space-x-2 text-xl font-dsemibold text-blue-400'>
                            <Image src="/assets/logo.png" alt="Logo" width={100} height={30}></Image>
                    </Link>

                    <div className='flex space-x-6'>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link href={item.href} key={item.href}
                                className={`flex items-center space-x-6 text-md font-bold hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-300'}`}>  
                                <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
          </nav>
        </>
    )
}

export default Header;