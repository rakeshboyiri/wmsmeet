import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import socket from "@/socket";

const JoinMeeting = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("");

  useEffect(() => {
    socket.on("meeting-exists", ({ meetingId }) => {
      navigate(`/meeting/${meetingId}`, {
        state: { name, isHost: false },
      });
    });

    socket.on("meeting-not-found", () => {
      toast.error("Meeting not found");
    });

    return () => {
      socket.off("meeting-exists");
      socket.off("meeting-not-found");
    };
  }, [name, navigate]);

  const handleJoin = () => {
    if (!name || !meetingId) {
      toast.error("Fill all fields");
      return;
    }
    socket.emit("check-meeting", { meetingId });
  };

  return (
    <div className="p-6">
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Meeting ID" onChange={(e) => setMeetingId(e.target.value)} />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinMeeting;
