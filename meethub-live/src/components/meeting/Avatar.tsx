import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  isSpeaking?: boolean;
  isMuted?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-20 h-20 text-2xl",
  xl: "w-32 h-32 text-4xl",
};

const colors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-pink-500",
];

const getColorFromName = (name: string) => {
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar = ({
  name,
  size = "md",
  isSpeaking = false,
  className,
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white transition-all duration-200",
        sizeClasses[size],
        getColorFromName(name),
        isSpeaking && "ring-4 ring-success ring-offset-2 ring-offset-meeting-bg",
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};
