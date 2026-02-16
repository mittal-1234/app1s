'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/saved', label: 'Saved' },
    { href: '/digest', label: 'Digest' },
    { href: '/settings', label: 'Settings' },
    { href: '/proof', label: 'Proof' }
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="nav-container">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <button
                className="mobile-nav-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {isMobileMenuOpen ? (
                        <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                        <path d="M4 12h16M4 6h16M4 18h16" />
                    )}
                </svg>
            </button>

            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
