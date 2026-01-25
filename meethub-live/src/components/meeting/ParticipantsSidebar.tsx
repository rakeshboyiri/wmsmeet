import { X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticipantItem, Participant } from "./ParticipantItem";
import { cn } from "@/lib/utils";

interface ParticipantsSidebarProps {
  isOpen: boolean;
  participants: Participant[];
  isCurrentUserHost: boolean;
  onClose: () => void;
  onRemoveParticipant: (id: string) => void;
}

export const ParticipantsSidebar = ({
  isOpen,
  participants,
  isCurrentUserHost,
  onClose,
  onRemoveParticipant,
}: ParticipantsSidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-meeting-surface border-l border-meeting-border z-50",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-meeting-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold text-white">
              Participants ({participants.length})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-white hover:bg-meeting-surface-hover"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Participants List */}
        <div className="p-2 overflow-y-auto h-[calc(100%-65px)]">
          {participants.map((participant) => (
            <ParticipantItem
              key={participant.id}
              participant={participant}
              isCurrentUserHost={isCurrentUserHost}
              onRemove={onRemoveParticipant}
            />
          ))}
        </div>
      </div>
    </>
  );
};
