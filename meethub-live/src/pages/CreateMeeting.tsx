import { useEffect, useState } from "react";
import { Video, ArrowLeft, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import socket from "@/socket";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const meetingLink = meetingId
    ? `${window.location.origin}/meeting/${meetingId}`
    : "";

  useEffect(() => {
    socket.on("meeting-created", ({ meetingId }) => {
      setMeetingId(meetingId);
      toast.success("Meeting created");
    });

    return () => {
      socket.off("meeting-created");
    };
  }, []);

  const handleCreateMeeting = () => {
    socket.emit("create-meeting");
  };

  const handleJoinAsHost = () => {
    if (!name.trim()) {
      toast.error("Enter your name");
      return;
    }

    navigate(`/meeting/${meetingId}`, {
      state: { name, isHost: true },
    });
  };

  return (
    <div className="p-6">
      {!meetingId ? (
        <Button onClick={handleCreateMeeting}>
          <Video className="mr-2" /> Create Instant Meeting
        </Button>
      ) : (
        <>
          <Label>Meeting Link</Label>
          <Input readOnly value={meetingLink} />

          <Label>Your Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <Button onClick={handleJoinAsHost}>
            Join as Host <ArrowRight />
          </Button>
        </>
      )}
    </div>
  );
};

export default CreateMeeting;
