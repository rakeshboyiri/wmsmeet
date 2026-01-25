import { Mic, MicOff, Monitor, MonitorOff, Users, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ControlBarProps {
  isMuted: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
  participantCount: number;
  onToggleMute: () => void;
  onToggleScreenShare: () => void;
  onToggleParticipants: () => void;
  onEndMeeting: () => void;
}

export const ControlBar = ({
  isMuted,
  isScreenSharing,
  isHost,
  participantCount,
  onToggleMute,
  onToggleScreenShare,
  onToggleParticipants,
  onEndMeeting,
}: ControlBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-meeting-bg/95 backdrop-blur-sm border-t border-meeting-border">
      <div className="flex items-center justify-center gap-3 py-4 px-6">
        {/* Mute Button */}
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "rounded-full w-14 h-14 transition-all duration-200",
            isMuted
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              : "bg-meeting-surface hover:bg-meeting-surface-hover text-white"
          )}
          onClick={onToggleMute}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        {/* Screen Share Button */}
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "rounded-full w-14 h-14 transition-all duration-200",
            isScreenSharing
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-meeting-surface hover:bg-meeting-surface-hover text-white"
          )}
          onClick={onToggleScreenShare}
        >
          {isScreenSharing ? (
            <MonitorOff className="w-6 h-6" />
          ) : (
            <Monitor className="w-6 h-6" />
          )}
        </Button>

        {/* Participants Button */}
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full w-14 h-14 bg-meeting-surface hover:bg-meeting-surface-hover text-white relative transition-all duration-200"
          onClick={onToggleParticipants}
        >
          <Users className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
            {participantCount}
          </span>
        </Button>

        {/* End Meeting Button (Host Only) */}
        {isHost && (
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full w-14 h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-200"
            onClick={onEndMeeting}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
};
