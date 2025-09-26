'use client';
import { useState } from 'react';
import { navItems } from '@/app/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '../ui/Button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className='bg-gray-800 border-gray-700 sticky top-0 z-50'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between h-16'>
                        <Link href='/' className='flex items-center space-x-2 text-xl font-semibold text-blue-400'>
                            <Image src="/assets/logo.png" alt="Logo" width={100} height={30} />
                        </Link>

                        {/* Desktop Navigation - Hidden on mobile */}
                        <div className='hidden md:flex space-x-6'>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <Link href={item.href} key={item.href}
                                        className={`flex items-center space-x-1 text-md font-bold hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`}>
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Desktop Buttons - Hidden on mobile */}
                        <div className='hidden md:flex flex-row space-x-3'>
                            <Button text="Sign In" size="small" shape='rounded-md' />
                            <Button text="Sign Up" size="small" shape='rounded-md' />
                        </div>

                        {/* Mobile Hamburger Button - Visible only on mobile */}
                        <button
                            onClick={toggleMobileMenu}
                            className='md:hidden p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors'
                            aria-label='Toggle menu'
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className='md:hidden'>
                        {/* Backdrop */}
                        <div
                            className='fixed inset-0 bg-black bg-opacity-50 z-40'
                            onClick={closeMobileMenu}
                        />

                        {/* Mobile Menu Panel */}
                        <div className='fixed top-16 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50'>
                            <div className='container mx-auto px-4 py-4'>
                                {/* Navigation Links */}
                                <div className='flex flex-col space-y-4 mb-6'>
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                href={item.href}
                                                key={item.href}
                                                onClick={closeMobileMenu}
                                                className={`py-3 px-4 text-lg font-bold hover:bg-gray-700 rounded-md transition-colors ${isActive ? 'text-blue-400 bg-gray-700' : 'text-gray-300'}`}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Mobile Buttons */}
                                <div className='flex flex-col space-y-3 border-t border-gray-700 pt-4'>
                                    <Button
                                        text="Sign In"
                                        size="medium"
                                        shape='rounded-md'
                                        onClick={closeMobileMenu}
                                        fullWidth
                                    />
                                    <Button
                                        text="Sign Up"
                                        size="medium"
                                        shape='rounded-md'
                                        onClick={closeMobileMenu}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Header;