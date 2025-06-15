import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useSession } from '@/contexts/SessionContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Bot, 
  FileText, 
  ClipboardList, 
  LogOut, 
  Search, 
  Bell,
  Menu,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { ReactNode, useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { useTheme } from '@/contexts/ThemeContext';

interface NavLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavLinkItem: React.FC<NavLinkProps> = ({ to, icon: Icon, label }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `group flex items-center justify-center h-14 w-14 rounded-xl transition-all duration-300 relative ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-7 w-7" />
                {isActive && (
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                )}
              </>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-blue-600 text-white border-blue-700">
          <p className="font-medium text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!session) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 dark:text-white font-medium">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/dashboard/chatbot", icon: Bot, label: "AI Assistant" },
    { to: "/dashboard/tasks", icon: ClipboardList, label: "Daily Tasks" },
  ];

  const desktopNavLinks = [
    ...navLinks,
    { to: "/dashboard/reports", icon: FileText, label: "Health Reports" },
  ];

  const mobileNavLinks = [
    ...navLinks,
    { to: "/dashboard/reports", icon: FileText, label: "Health Reports" },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-black text-blue-600 dark:text-white font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 bg-white dark:bg-gray-900 flex-col items-center py-6 space-y-6 border-r border-blue-200 dark:border-gray-800 shadow-lg">
        {/* Logo */}
        <div className="flex items-center justify-center w-16 h-16 p-1 mb-4">
          <img 
            src="/ASSETS/LOGO (2).png" 
            alt="VAIDYA.ai Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col items-center space-y-4">
          {desktopNavLinks.map((link) => (
            <NavLinkItem key={link.to} {...link} />
          ))}
        </nav>
        
        {/* Bottom Actions */}
        <div className="flex flex-col items-center mt-auto space-y-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="flex items-center justify-center h-14 w-14 rounded-xl transition-all duration-300 bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500"
                  title="Settings"
                  aria-label="Open settings"
                >
                  <Settings className="h-7 w-7" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-blue-600 text-white border-blue-700">
                <p className="font-medium text-sm">Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <ThemeToggle />
          
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center h-14 w-14 rounded-xl transition-all duration-300 bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500"
                  title="Sign Out"
                  aria-label="Sign out of your account"
                >
                  <LogOut className="h-7 w-7" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-blue-600 text-white border-blue-700">
                <p className="font-medium text-sm">Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-blue-200 dark:border-gray-800 py-2 px-4 shadow-lg z-50">
        <div className="flex items-center justify-around">
          {mobileNavLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-900 text-blue-600 dark:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon className="h-7 w-7" />
                  <span className="text-xs font-medium mt-1">{link.label}</span>
                  {isActive && (
                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-gray-900 text-blue-600 dark:text-white"
          >
            <Menu className="h-7 w-7" />
            <span className="text-xs font-medium mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="bottom" className="bg-white dark:bg-gray-900 border-t border-blue-200 dark:border-gray-800 rounded-t-3xl">
          <SheetHeader className="border-b border-blue-200 dark:border-gray-800 pb-4">
            <SheetTitle className="text-blue-600 dark:text-white text-center">Menu</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-4 py-6">
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500"
            >
              <LogOut className="h-7 w-7" />
              <span className="text-sm font-medium mt-2">Sign Out</span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-7 w-7" /> : <Sun className="h-7 w-7" />}
              <span className="text-sm font-medium mt-2">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>
            <button
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500"
            >
              <Settings className="h-7 w-7" />
              <span className="text-sm font-medium mt-2">Settings</span>
            </button>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button 
                variant="outline" 
                className="w-full bg-white dark:bg-gray-900 text-blue-600 dark:text-white border-2 border-blue-600 dark:border-blue-500 rounded-xl"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-black border-b border-blue-200 dark:border-gray-800 shadow-sm">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center">
            <img 
              src="/ASSETS/LOGO (2).png" 
              alt="VAIDYA.ai" 
              className="h-8 w-auto object-contain" 
              />
            </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 relative max-w-xl mx-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 dark:text-gray-400" />
            <Input 
              placeholder="Search for patients, reports, health data..."
              className="w-full bg-blue-50 dark:bg-gray-900 pl-11 h-10 rounded-xl border-blue-200 dark:border-gray-700 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 focus:bg-white dark:focus:bg-gray-800 focus:shadow-md focus:border-blue-400 dark:focus:border-blue-500 text-sm text-blue-900 dark:text-white"
            />
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-10 w-10 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Bell className="h-4 w-4 text-blue-900 dark:text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">3</span>
            </Button>
            
            <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Avatar className="h-8 w-8 border-2 border-blue-200 dark:border-gray-700">
                <AvatarImage src={session?.user?.user_metadata?.avatar_url} alt={session?.user?.email} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800 text-blue-700 dark:text-white font-semibold text-sm">
                  {session?.user?.email?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-blue-900 dark:text-white">{session?.user?.user_metadata?.full_name || 'User'}</p>
                <p className="text-xs text-blue-500 dark:text-gray-400">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto pb-20 md:pb-6">
          <div className="h-full rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-blue-200/50 dark:border-gray-800/50">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
