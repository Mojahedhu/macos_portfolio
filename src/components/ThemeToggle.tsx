import { Sun, Moon, Monitor, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useThemeStore, { type Theme } from "@/store/theme";

// ── Theme options ────────────────────────────────────────────────────────────
const THEME_OPTIONS: {
  label: string;
  value: Theme;
  icon: (active?: boolean) => React.ReactNode;
}[] = [
  {
    label: "Light",
    value: "light",
    icon: (active?: boolean) =>
      active ? (
        <Sun size={14} fill="#ffc030" className="mr-2" />
      ) : (
        <Sun size={14} className="mr-2" />
      ),
  },
  {
    label: "Dark",
    value: "dark",
    icon: (active?: boolean) =>
      active ? (
        <Moon size={14} fill="#ff6157" className="mr-2" />
      ) : (
        <Moon size={14} className="mr-2" />
      ),
  },
  {
    label: "System",
    value: "system",
    icon: () => <Monitor size={14} className="mr-2" />,
  },
];

// ── Theme toggle ─────────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const ActiveIcon =
    theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="menu-icon text-foreground flex items-center"
        title="Toggle theme"
      >
        <ActiveIcon
          size={15}
          fill={
            theme === "dark" ? "#ff6157" : theme === "light" ? "#ffc030" : ""
          }
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-32.5">
        {THEME_OPTIONS.map(({ label, value, icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => {
              setTheme(value);
            }}
            className="cursor-pointer gap-2.5"
          >
            <span className="text-muted-foreground">
              {icon(theme === value)}
            </span>
            <span className="flex-1">{label}</span>
            {theme === value && <Check size={12} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
