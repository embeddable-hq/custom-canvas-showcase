'use client';

import { cn, classes } from '../lib/utils';
import { spacing, borders, colors, button } from '../lib/tokens';
import Image from 'next/image';
import { users, type UserId, getHelpItems } from '../../utils/constants';
import Dropdown from './Dropdown';
import UserAvatar from './UserAvatar';

interface HeaderProps {
  onMenuClick: () => void;
  navItems: string[];
  selectedNavItem: string;
  selectedUserId: UserId;
  onUserSelect: (userId: UserId) => void;
  className?: string;
}

export default function Header({ 
  onMenuClick, 
  navItems, 
  selectedNavItem,
  selectedUserId,
  onUserSelect,
  className,
}: HeaderProps) {

  const helpItems = getHelpItems();

  return (
    <header className={cn(
      'flex justify-between items-center self-stretch w-full',
      'bg-white',
      classes.borderDivider,
      classes.appPadding,
      className
    )}
    >
      <div className="flex items-center">
        <div className={cn("flex items-center justify-center", spacing.core.mdGap)}>
         <Image src="/logo.svg" alt="Logo" width={24} height={24} />
         <span className={classes.textMedium}>
           Shopocalypse
         </span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center">
        {navItems.map((item) => (
          <button
            key={item}
            className={cn(
              item === selectedNavItem
                ? cn(
                    'flex items-center',
                    'h-6',
                    spacing.core.md,
                    'gap-2.5',
                    borders.radius.sm,
                    colors.semantic.chartColor1,
                    classes.navMenuTextSelected
                  )
                : cn(
                    classes.navMenuTextUnselected,
                    'cursor-not-allowed',
                    spacing.core.md
                  )
            )}
            disabled={item !== selectedNavItem}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className={cn(
          'hidden lg:flex',
          'justify-between items-center self-stretch',
        )}>
          <span className={classes.switchUsersText}>
            Switch users:
          </span>
          <div className="flex pl-1 items-center justify-center">
            {users.map((user) => (
              <div 
                key={user.id}
                onClick={() => onUserSelect(user.id)}
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
        <div className="hidden lg:flex items-center gap-3">
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
          className={cn("lg:hidden", button.primary.small)}
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Image src="/hamburger.svg" alt="Menu" width={16} height={16} />
        </button>
      </div>
    </header>
  );
}

