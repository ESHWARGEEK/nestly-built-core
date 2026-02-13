import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/saved", label: "Saved" },
  { to: "/digest", label: "Digest" },
  { to: "/settings", label: "Settings" },
  { to: "/proof", label: "Proof" },
];

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="flex h-14 items-center justify-between px-s4">
        <NavLink
          to="/"
          className="font-serif text-lg font-semibold tracking-tight text-foreground"
        >
          KodNest
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-s3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-system hover:text-foreground py-1"
              activeClassName="text-foreground border-b-2 border-primary"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t px-s4 py-s2 space-y-s1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block text-sm text-muted-foreground py-s1 transition-system hover:text-foreground"
              activeClassName="text-foreground border-l-2 border-primary pl-s2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
