'use client';

import { cn, classes } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[999]"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={cn(
          'flex w-[15.5rem] min-w-[var(--min-width-sidenav,15.5rem)] flex-col items-start',
          'bg-white border-r transition-transform',
          'fixed md:relative left-0 top-0 h-screen md:h-full z-[1000]',
          'shadow-lg md:shadow-none',
          classes.appPaddingL,
          'gap-[var(--em-core-spacing-400,1rem)]',
          classes.borderDivider,
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="pt-8 w-full">
          <h2 className="text-lg font-semibold mb-4 pl-2">Navigation</h2>
          <nav className="flex flex-col gap-2 w-full">
            <a href="#" className={classes.sidebarLink}>
              Dashboard
            </a>
            <a href="#" className={classes.sidebarLink}>
              Settings
            </a>
            <a href="#" className={classes.sidebarLink}>
              Reports
            </a>
            <a href="#" className={classes.sidebarLink}>
              Tools
            </a>
          </nav>
        </div>
      </aside>
    </>
  );
}

