'use client';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <h2 className="sidebar-title">Navigation</h2>
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-link">Dashboard</a>
            <a href="#" className="sidebar-link">Settings</a>
            <a href="#" className="sidebar-link">Reports</a>
            <a href="#" className="sidebar-link">Tools</a>
          </nav>
        </div>
      </aside>
    </>
  );
}

