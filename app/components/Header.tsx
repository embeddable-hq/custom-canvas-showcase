'use client';

import { useState } from 'react';
import { cn, classes } from '../lib/utils';
import { spacing, borders, colors, components } from '../lib/tokens';
import Image from 'next/image';
import { users, type UserId } from './Sidebar';
import Dropdown from './Dropdown';
import UserAvatar from './UserAvatar';

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
        <div className={cn("flex items-center justify-center", spacing.core.mdGap)}>
         <Image src="/logo.svg" alt="Logo" width={24} height={24} />
         <span style={components.textStyles.medium}>
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
                    'h-6',
                    spacing.core.md,
                    'gap-2.5',
                    borders.radius.sm,
                    colors.semantic.chartColor1,
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
          <div className="flex pl-1 items-center justify-center">
            {users.map((user) => (
              <div 
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className="cursor-pointer flex items-center justify-center"
              >
                <UserAvatar 
                  user={user} 
                  showTooltip={true}
                  size="large"
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
                  `w-10 h-10 rounded-full ${colors.button.primaryBackground} text-white`,
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
          className={cn("md:hidden flex flex-col gap-1 border-none cursor-pointer rounded-full", colors.button.primaryBackground, spacing.button.paddingSmall)}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Image src="/hamburger.svg" alt="Menu" width={16} height={16} />
        </button>
      </div>
    </header>
  );
}

