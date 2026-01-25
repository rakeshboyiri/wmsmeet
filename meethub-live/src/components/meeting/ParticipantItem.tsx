import { Mic, MicOff, Crown, UserMinus } from "lucide-react";
import { Avatar } from "./Avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isHost: boolean;
  isSpeaking?: boolean;
}

interface ParticipantItemProps {
  participant: Participant;
  isCurrentUserHost: boolean;
  onRemove?: (id: string) => void;
}

export const ParticipantItem = ({
  participant,
  isCurrentUserHost,
  onRemove,
}: ParticipantItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-colors",
        "hover:bg-meeting-surface-hover group"
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar
          name={participant.name}
          size="sm"
          isSpeaking={participant.isSpeaking}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            {participant.name}
            {participant.isHost && (
              <Crown className="w-3.5 h-3.5 text-amber-400" />
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {participant.isMuted ? (
          <MicOff className="w-4 h-4 text-destructive" />
        ) : (
          <Mic className="w-4 h-4 text-success" />
        )}

        {isCurrentUserHost && !participant.isHost && onRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(participant.id)}
          >
            <UserMinus className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
