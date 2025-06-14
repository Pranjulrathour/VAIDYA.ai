
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-900 transition-all duration-300"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'} absolute`} />
      <Moon className={`h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} absolute`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
