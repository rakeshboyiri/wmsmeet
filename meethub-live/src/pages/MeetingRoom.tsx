import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import socket from "@/socket";
import { toast } from "sonner";

import { createPeer, addPeer, peers } from "@/webrtc";
import { MeetingTopBar } from "@/components/meeting/MeetingTopBar";
import { MeetingGrid } from "@/components/meeting/MeetingGrid";
import { ControlBar } from "@/components/meeting/ControlBar";
import { ParticipantsSidebar } from "@/components/meeting/ParticipantsSidebar";
import { EndMeetingModal } from "@/components/meeting/EndMeetingModal";
import { Participant } from "@/components/meeting/ParticipantItem";

const MeetingRoom = () => {
  const { id: meetingId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, isHost } = state || {};

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // 🎥 Get media
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      (stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }
    );
  }, []);

  // 🔥 Join meeting
  useEffect(() => {
    if (!meetingId || !name) return navigate("/");

    socket.emit("join-meeting", { meetingId, name, isHost });

    socket.on("participants-update", (room) => {
      const list = Object.entries(room.participants).map(
        ([id, p]: any) => ({
          id,
          name: p.name,
          isMuted: p.muted,
          isHost: room.hostId === id,
        })
      );

      setParticipants(list);

      // create peers for others
      list.forEach((p) => {
        if (p.id === socket.id || peers[p.id]) return;

        const peer = createPeer(
          p.id,
          localStreamRef.current!,
          meetingId!
        );

        peers[p.id] = peer;

        peer.on("stream", (stream) => {
          const video = document.createElement("video");
          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;
          document.body.appendChild(video);
        });
      });
    });

    socket.on("webrtc-signal", ({ from, signal }) => {
      if (!peers[from]) {
        peers[from] = addPeer(
          signal,
          from,
          localStreamRef.current!,
          meetingId!
        );

        peers[from].on("stream", (stream) => {
          const video = document.createElement("video");
          video.srcObject = stream;
          video.autoplay = true;
          video.playsInline = true;
          document.body.appendChild(video);
        });
      } else {
        peers[from].signal(signal);
      }
    });

    socket.on("meeting-ended", () => {
      toast.error("Meeting ended");
      navigate("/");
    });

    return () => {
      socket.off("participants-update");
      socket.off("webrtc-signal");
    };
  }, []);

  const handleToggleMute = () => {
    localStreamRef.current?.getAudioTracks().forEach((t) => {
      t.enabled = !t.enabled;
    });
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-meeting-bg flex flex-col">
      <MeetingTopBar meetingId={meetingId || ""} meetingLink={window.location.href} />

      <video
        ref={localVideoRef}
        muted
        autoPlay
        playsInline
        className="w-64 rounded-xl"
      />

      <MeetingGrid participants={participants}  />

      <ControlBar
        isMuted={isMuted}
        isScreenSharing={false}
        isHost={isHost}
        participantCount={participants.length}
        onToggleMute={handleToggleMute}
        onToggleScreenShare={() => {}}
        onToggleParticipants={() => {}}
        onEndMeeting={() => socket.emit("end-meeting", { meetingId })}
      />

      <ParticipantsSidebar
        isOpen={false}
        participants={participants}
        isCurrentUserHost={isHost}
        onClose={() => {}}
        onRemoveParticipant={() => {}}
      />

      <EndMeetingModal
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
      />
    </div>
  );
};

export default MeetingRoom;