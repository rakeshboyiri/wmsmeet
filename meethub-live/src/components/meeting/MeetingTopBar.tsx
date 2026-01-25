import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface MeetingTopBarProps {
  meetingId: string;
  meetingLink: string;
}

export const MeetingTopBar = ({ meetingId, meetingLink }: MeetingTopBarProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    toast.success("Meeting link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-meeting-bg/95 backdrop-blur-sm border-b border-meeting-border z-30">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-white">WMSMeet</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-mono">
            {meetingId}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-white hover:bg-meeting-surface-hover h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
