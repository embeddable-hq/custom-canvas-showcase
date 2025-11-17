'use client';

import { useState, useEffect, useRef } from 'react';
import { cn, classes } from '../lib/utils';

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
      'bg-white border-b sticky top-0 z-[100]',
      classes.appPadding,
      classes.borderDivider
    )}>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-6 h-6">
          {/* Placeholder icon - replace with your icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.textForeground}
          >
            <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.3" />
            <path
              d="M12 8V16M8 12H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => (
          <button
            key={item}
            className={cn(
              'text-sm font-medium px-4 py-2 transition-opacity',
              classes.textForeground,
              item === selectedItem
                ? 'opacity-100 font-semibold border-b-2 border-[var(--foreground)] pb-1.5'
                : 'opacity-60 hover:opacity-80 disabled:cursor-default'
            )}
            disabled={item !== selectedItem}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3">
          <span className={cn('text-sm', classes.textForegroundMuted)}>
            Switch users:
          </span>
          <div className="flex gap-2">
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
          <span className={cn('w-6 h-0.5 transition-all', classes.textForeground)}></span>
          <span className={cn('w-6 h-0.5 transition-all', classes.textForeground)}></span>
          <span className={cn('w-6 h-0.5 transition-all', classes.textForeground)}></span>
        </button>
      </div>
    </header>
  );
}

