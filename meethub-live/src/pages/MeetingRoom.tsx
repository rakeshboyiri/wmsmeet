import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { MeetingTopBar } from "@/components/meeting/MeetingTopBar";
import { MeetingGrid } from "@/components/meeting/MeetingGrid";
import { ControlBar } from "@/components/meeting/ControlBar";
import { ParticipantsSidebar } from "@/components/meeting/ParticipantsSidebar";
import { EndMeetingModal } from "@/components/meeting/EndMeetingModal";
import { Participant } from "@/components/meeting/ParticipantItem";

// Mock participants for demo
const mockParticipants: Participant[] = [
  { id: "2", name: "Sarah Johnson", isMuted: true, isHost: false },
  { id: "3", name: "Mike Chen", isMuted: false, isHost: false },
  { id: "4", name: "Emily Davis", isMuted: true, isHost: false },
];

const MeetingRoom = () => {
  const { id: meetingId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { name = "Guest User", isHost = false } = location.state || {};

  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isParticipantsPanelOpen, setIsParticipantsPanelOpen] = useState(false);
  const [isEndMeetingModalOpen, setIsEndMeetingModalOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name, isMuted: false, isHost },
    ...mockParticipants,
  ]);

  const meetingLink = `https://wmsmeet.app/meeting/${meetingId}`;

  // Simulate participant activity
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipants((prev) =>
        prev.map((p) => ({
          ...p,
          isSpeaking: !p.isMuted && Math.random() > 0.7,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate someone joining
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newParticipant: Participant = {
        id: "5",
        name: "Alex Wilson",
        isMuted: false,
        isHost: false,
      };
      setParticipants((prev) => [...prev, newParticipant]);
      toast.info("Alex Wilson joined the meeting");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    setParticipants((prev) =>
      prev.map((p) => (p.id === "1" ? { ...p, isMuted: !isMuted } : p))
    );
    toast.success(isMuted ? "Microphone unmuted" : "Microphone muted");
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast.success(
      isScreenSharing ? "Screen sharing stopped" : "Screen sharing started"
    );
  };

  const handleRemoveParticipant = (participantId: string) => {
    const participant = participants.find((p) => p.id === participantId);
    setParticipants((prev) => prev.filter((p) => p.id !== participantId));
    toast.info(`${participant?.name} was removed from the meeting`);
  };

  const handleEndMeeting = () => {
    toast.success("Meeting ended for everyone");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-meeting-bg flex flex-col">
      <MeetingTopBar meetingId={meetingId || ""} meetingLink={meetingLink} />

      <MeetingGrid
        participants={participants}
        isScreenSharing={isScreenSharing}
        screenSharerName={isScreenSharing ? name : undefined}
      />

      <ControlBar
        isMuted={isMuted}
        isScreenSharing={isScreenSharing}
        isHost={isHost}
        participantCount={participants.length}
        onToggleMute={handleToggleMute}
        onToggleScreenShare={handleToggleScreenShare}
        onToggleParticipants={() =>
          setIsParticipantsPanelOpen(!isParticipantsPanelOpen)
        }
        onEndMeeting={() => setIsEndMeetingModalOpen(true)}
      />

      <ParticipantsSidebar
        isOpen={isParticipantsPanelOpen}
        participants={participants}
        isCurrentUserHost={isHost}
        onClose={() => setIsParticipantsPanelOpen(false)}
        onRemoveParticipant={handleRemoveParticipant}
      />

      <EndMeetingModal
        isOpen={isEndMeetingModalOpen}
        onClose={() => setIsEndMeetingModalOpen(false)}
        onConfirm={handleEndMeeting}
      />
    </div>
  );
};

export default MeetingRoom;
