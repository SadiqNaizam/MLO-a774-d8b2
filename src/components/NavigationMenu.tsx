import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, ShoppingCart, User, Search, Utensils } from 'lucide-react';

interface NavigationMenuProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ cartItemCount = 0, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log("Rendering NavigationMenu");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      console.log("Search submitted:", searchQuery);
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/orders", label: "My Orders" },
    // Add more links as needed
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-orange-600">
              <Utensils className="h-7 w-7 mr-2" />
              <span>FoodApp</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 ml-10">
              {navLinks.map(link => (
                <Link key={link.label} to={link.href} className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar (Optional - can be global or page-specific) */}
          {onSearch && (
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-grow max-w-xs ml-4">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search restaurants or food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
          )}

          {/* Icons and Mobile Menu Trigger */}
          <div className="flex items-center space-x-2">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile" className="hidden md:inline-flex">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-6 w-6" />
              </Button>
            </Link>
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map(link => (
                      <Link
                        key={`mobile-${link.label}`}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                     <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium"
                      >
                        Profile
                      </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavigationMenu;