'use client';

import { useState, useEffect, useRef } from 'react';
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

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-icon">
          <Image
            src="/next.svg"
            alt="Logo"
            width={24}
            height={24}
            className="dark:invert"
          />
        </div>
      </div>

      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${item === selectedItem ? 'nav-item-selected' : ''}`}
            disabled={item !== selectedItem}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="header-right">
        <div className="header-right-section">
          <span className="switch-users-label">Switch users:</span>
          <div className="user-avatars">
            <div className="user-avatar small"></div>
            <div className="user-avatar small"></div>
            <div className="user-avatar small"></div>
          </div>
        </div>
        <div className="header-right-section">
          <div className="help-container" ref={helpContainerRef}>
            <button
              className="help-button"
              onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
              aria-label="Help"
            >
              <span className="help-icon">?</span>
            </button>
            {helpDropdownOpen && (
              <div className="help-dropdown">
                <button className="dropdown-item">Documentation</button>
                <button className="dropdown-item">Support</button>
                <button className="dropdown-item">Feedback</button>
              </div>
            )}
          </div>
        </div>
        <button
          className="hamburger-button"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
        </button>
      </div>
    </header>
  );
}

