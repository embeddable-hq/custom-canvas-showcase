'use client';

import { useState } from 'react';
import { cn, classes } from '../lib/utils';
import Image from 'next/image';
import { users, type UserId } from './Sidebar';
import Dropdown from './Dropdown';

function UserAvatar({ 
  user, 
  showTooltip = false,
  selected = false
}: { 
  user: typeof users[0]; 
  showTooltip?: boolean;
  selected?: boolean;
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative">
      <div
        className={cn(
          "flex w-7 h-7 justify-center items-center",
          "rounded-[var(--em-core-border-radius-500,624.9375rem)]",
          "cursor-pointer"
        )}
        style={{
          background: user.bgColor,
          border: selected 
            ? `var(--em-core-border-width-050, 2px) solid ${user.textColor}` 
            : 'none',
        }}
        onMouseEnter={() => showTooltip && setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <span
          className="text-center font-bold"
          style={{
            color: user.textColor,
            fontFamily: "Inter, sans-serif",
            fontSize: "1.02rem",
            fontStyle: "normal",
            fontWeight: "var(--em-font-weight-bold, 700)",
            lineHeight: "1.17rem",
          }}
        >
          {user.name[0]}
        </span>
      </div>
      {showPopup && showTooltip && (
        <div
          className={cn(
            "absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
            "bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-[1000]"
          )}
        >
          {user.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  onMenuClick: () => void;
  navItems: string[];
  selectedItem: string;
}

export default function Header({ onMenuClick, navItems, selectedItem }: HeaderProps) {
  const [selectedUserId, setSelectedUserId] = useState<UserId>("denis");

  const helpItems = [
    { label: "Documentation" },
    { label: "Support" },
    { label: "Feedback" },
  ];

  return (
    <header className={cn(
      'flex justify-between items-center self-stretch',
      'bg-white', 'p-8',
      classes.borderDivider
    )}>
      <div className="flex items-center">
        <div className="flex items-center justify-center gap-[var(--em-core-spacing-300,0.75rem)]">
         <Image src="/logo.svg" alt="Logo" width={24} height={24} />
         <span
           style={{
             color: 'var(--em-sem-text-default,#212129)',
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
              'text-sm font-medium',
              item === selectedItem
                ? cn(
                    'flex items-center',
                    'h-6 p-[var(--em-core-spacing-300,0.75rem)]',
                    'gap-2.5 rounded-[var(--em-core-border-radius-200,0.5rem)]',
                    'bg-[var(--em-sem-chart-color-1,#FF5400)]',
                    'text-white font-semibold'
                  )
                : cn(
                    classes.textForeground,
                    'disabled:cursor-default px-4 py-2'
                  )
            )}
            disabled={item !== selectedItem}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className={cn(
          'hidden md:flex',
          'justify-between items-center self-stretch',
        )}>
          <span className={cn('text-sm', classes.textForegroundMuted)}>
            Switch users:
          </span>
          <div className="flex pl-1 gap-1">
            {users.map((user) => (
              <div 
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className="cursor-pointer"
              >
                <UserAvatar 
                  user={user} 
                  showTooltip={true}
                  selected={user.id === selectedUserId}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Dropdown
            trigger={
              <button
                className={cn(
                  'w-10 h-10 rounded-full bg-[var(--em-btn-pr-background-default,#5C5C66)] text-white',
                  'flex items-center justify-center text-lg font-semibold',
                  'transition-transform hover:scale-105'
                )}
                aria-label="Help"
              >
                <span>?</span>
              </button>
            }
            items={helpItems}
            position="bottom"
            align="end"
          />
        </div>
        <button
          className="md:hidden flex flex-col gap-1 bg-[var(--em-btn-pr-background-default,#5C5C66)] border-none cursor-pointer rounded-full px-[var(--em-btn-pr-padding-top-bottom-small,0.375rem)] py-[var(--em-btn-pr-padding-left-right-small,0.375rem)]"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Image src="/hamburger.svg" alt="Menu" width={16} height={16} />
        </button>
      </div>
    </header>
  );
}

