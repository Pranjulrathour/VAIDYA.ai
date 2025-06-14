
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
      className="relative rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300"
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'} absolute`} />
      <Moon className={`h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} absolute`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
