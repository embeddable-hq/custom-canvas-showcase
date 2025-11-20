'use client';

import { cn, classes } from '../lib/utils';
import { spacing, borders, colors, components, button } from '../lib/tokens';
import Image from 'next/image';
import { users, type UserId } from './Sidebar';
import Dropdown from './Dropdown';
import UserAvatar from './UserAvatar';
import { documentationUrl, githubRepositoryUrl, contactEmail } from '../../utils/constants';

interface HeaderProps {
  onMenuClick: () => void;
  navItems: string[];
  selectedNavItem: string;
  selectedUserId: UserId;
  onUserSelect: (userId: UserId) => void;
}

export default function Header({ 
  onMenuClick, 
  navItems, 
  selectedNavItem,
  selectedUserId,
  onUserSelect,
}: HeaderProps) {

  const helpItems = [
    { 
      label: "Docs", 
      href: documentationUrl,
      icon: "/docs.svg"
    },
    { 
      label: "Github", 
      href: githubRepositoryUrl,
      icon: "/github.svg"
    },
    { 
      label: "Contact", 
      href: contactEmail ? `mailto:${contactEmail}` : undefined,
      icon: "/contact.svg"
    },
  ];

  return (
    <header className={cn(
      'flex justify-between items-center self-stretch w-full',
      'bg-white',
      classes.borderDivider
    )}
    style={{
      padding: 'var(--app-spacing, 1rem)',
    }}
    >
      <div className="flex items-center">
        <div className={cn("flex items-center justify-center", spacing.core.mdGap)}>
         <Image src="/logo.svg" alt="Logo" width={24} height={24} />
         <span style={components.textStyles.medium}>
           Shopocalypse
         </span>
        </div>
      </div>

      <nav className="hidden lg:flex gap-6 items-center">
        {navItems.map((item) => (
          <button
            key={item}
            className={cn(
              'text-sm font-medium',
              item === selectedNavItem
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
          <span className={cn('text-sm', classes.textForegroundMuted)}>
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

