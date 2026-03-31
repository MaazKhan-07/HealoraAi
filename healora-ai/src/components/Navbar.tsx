import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  role: string | null;
}

export function Navbar({ currentPage, onNavigate, role }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'landing') {
      onNavigate('landing');
    } else if (currentPage === 'landing') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setMobileOpen(false);
  };

  return (
    <nav className="navbar-blur sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group"
            data-testid="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center teal-glow-sm group-hover:bg-primary/30 transition-all">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
              <span className="text-primary">Heal</span>
              <span className="text-foreground">ora</span>
              <span className="text-primary ml-1 text-sm font-medium">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === 'landing' ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {role ? (
              <span
                className="hidden md:flex items-center gap-2 text-sm font-medium text-primary cursor-default"
                data-testid="nav-dashboard"
              >
                Dashboard
              </span>
            ) : null}
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
              data-testid="nav-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border/50 fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate('login'); setMobileOpen(false); }}
                className="text-left text-sm font-medium text-primary py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
