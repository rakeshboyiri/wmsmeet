import { Monitor, MicOff } from "lucide-react";
import { Avatar } from "./Avatar";
import { Participant } from "./ParticipantItem";
import { cn } from "@/lib/utils";

interface MeetingGridProps {
  participants: Participant[];
  isScreenSharing: boolean;
  screenSharerName?: string;
}

export const MeetingGrid = ({
  participants,
  isScreenSharing,
  screenSharerName,
}: MeetingGridProps) => {
  const getGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 4) return "grid-cols-2";
    if (count <= 6) return "grid-cols-2 md:grid-cols-3";
    return "grid-cols-3 md:grid-cols-4";
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 pt-20 pb-24">
      {/* Screen Share Area */}
      {isScreenSharing && (
        <div className="w-full max-w-5xl mb-6 animate-fade-in">
          <div className="bg-meeting-surface rounded-2xl aspect-video flex flex-col items-center justify-center border border-meeting-border">
            <Monitor className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-white font-medium">
              {screenSharerName || "Someone"} is presenting
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Screen sharing preview
            </p>
          </div>
        </div>
      )}

      {/* Participants Grid */}
      <div
        className={cn(
          "grid gap-4 w-full max-w-5xl",
          getGridClass(participants.length),
          isScreenSharing && "max-w-3xl"
        )}
      >
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={cn(
              "bg-meeting-surface rounded-2xl p-6 flex flex-col items-center justify-center border border-meeting-border relative",
              "transition-all duration-200",
              isScreenSharing ? "aspect-square" : "aspect-video",
              participant.isSpeaking && "ring-2 ring-success"
            )}
          >
            <Avatar
              name={participant.name}
              size={isScreenSharing ? "lg" : "xl"}
              isSpeaking={participant.isSpeaking}
            />
            <div className="mt-4 flex items-center gap-2">
              <span className="text-white font-medium">{participant.name}</span>
              {participant.isMuted && (
                <MicOff className="w-4 h-4 text-destructive" />
              )}
            </div>

            {/* Muted indicator */}
            {participant.isMuted && (
              <div className="absolute bottom-3 right-3 bg-destructive/80 rounded-full p-1.5">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
