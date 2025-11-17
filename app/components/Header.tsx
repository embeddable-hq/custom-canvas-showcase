'use client';

import { useState, useEffect, useRef } from 'react';
import { cn, classes } from '../lib/utils';
import Image from 'next/image';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const helpContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpContainerRef.current &&
        !helpContainerRef.current.contains(event.target as Node)
      ) {
        setHelpDropdownOpen(false);
      }
    };

    if (helpDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [helpDropdownOpen]);

  const navItems = ['Shop', 'Gift cards', 'Analytics', 'Profile', 'About'];
  const selectedItem = 'Analytics';

  const userAvatarClass = 'w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white';

  return (
    <header className={cn(
      'flex justify-between items-center self-stretch',
      'bg-white border-b',
      classes.appPadding,
      classes.borderDivider
    )}>
      <div className="flex items-center">
        <div className="flex items-center justify-center gap-[var(--em-core-spacing-300,0.75rem)]">
         <Image src="/logo.svg" alt="Logo" width={24} height={24} />
         <span
           style={{
             color: 'var(--em-sem-text-default, #212129)',
             fontFamily: 'Inter, sans-serif',
             fontSize: 'var(--em-font-size-md, 1rem)',
             fontWeight: 'var(--em-font-weight-bold, 700)',
             lineHeight: 'var(--em-line-height-l, 1.1875rem)',
           }}
         >
           Shopocalypse
         </span>
        </div>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => (
          <button
            key={item}
            className={cn(
              'text-sm font-medium transition-opacity',
              item === selectedItem
                ? cn(
                    'flex items-center',
                    'h-6 p-[var(--em-core-spacing-300,0.75rem)]',
                    'gap-2.5 rounded-[var(--em-core-border-radius-200,0.5rem)]',
                    'bg-[var(--em-sem-chart-color-1,#FF5400)]',
                    'text-white opacity-100 font-semibold'
                  )
                : cn(
                    classes.textForeground,
                    'opacity-60 hover:opacity-80 disabled:cursor-default px-4 py-2'
                  )
            )}
            disabled={item !== selectedItem}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <div className={cn(
          'hidden md:flex',
          'justify-between items-center self-stretch',
          classes.appPadding
        )}>
          <span className={cn('text-sm', classes.textForegroundMuted)}>
            Switch users:
          </span>
          <div className="flex pl-1">
            <div className={userAvatarClass}></div>
            <div className={userAvatarClass}></div>
            <div className={userAvatarClass}></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative" ref={helpContainerRef}>
            <button
              className={cn(
                'w-10 h-10 rounded-full bg-[var(--foreground)] text-white',
                'flex items-center justify-center text-lg font-semibold',
                'transition-transform hover:scale-105'
              )}
              onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
              aria-label="Help"
            >
              <span>?</span>
            </button>
            {helpDropdownOpen && (
              <div className={cn(
                'absolute top-[calc(100%+0.5rem)] right-0',
                'bg-white border rounded-lg shadow-lg min-w-[10rem] z-[1000] overflow-hidden',
                classes.borderDivider
              )}>
                <button className={classes.dropdownItem}>
                  Documentation
                </button>
                <button className={classes.dropdownItem}>
                  Support
                </button>
                <button className={classes.dropdownItem}>
                  Feedback
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-2"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <span className={cn('w-6 h-0.5 transition-all bg-[var(--foreground)]')}></span>
          <span className={cn('w-6 h-0.5 transition-all bg-[var(--foreground)]')}></span>
          <span className={cn('w-6 h-0.5 transition-all bg-[var(--foreground)]')}></span>
        </button>
      </div>
    </header>
  );
}

