const rooms = require("../utils/rooms");

module.exports = (io, socket) => {

  // CREATE MEETING
  socket.on("create-meeting", () => {
    const meetingId = Math.random().toString(36).substring(2, 11);

    rooms[meetingId] = {
      hostId: socket.id,
      participants: {},
    };

    socket.emit("meeting-created", { meetingId });
    console.log("Meeting created:", meetingId);
  });

  // CHECK MEETING
  socket.on("check-meeting", ({ meetingId }) => {
    console.log("hello");
    if (rooms[meetingId]) {
      socket.emit("meeting-exists", { meetingId });
      console.log("Joined meet at "+meetingId);
    } else {
        
        console.log(meetingId);
      socket.emit("meeting-not-found");
    }
  });

  // JOIN MEETING (🔥 IMPORTANT)
  socket.on("join-meeting", ({ meetingId, name, isHost }) => {
    socket.join(meetingId);

    if (!rooms[meetingId]) {
      rooms[meetingId] = {
        hostId: socket.id,
        participants: {},
      };
    }

    rooms[meetingId].participants[socket.id] = {
      name,
      muted: false,
    };

    if (isHost) {
      rooms[meetingId].hostId = socket.id;
    }

    io.to(meetingId).emit("participants-update", rooms[meetingId]);
  });

  // TOGGLE MUTE
  socket.on("toggle-mute", ({ meetingId, muted }) => {
    if (rooms[meetingId]?.participants[socket.id]) {
      rooms[meetingId].participants[socket.id].muted = muted;
      io.to(meetingId).emit("participants-update", rooms[meetingId]);
    }
  });

  // END MEETING
  socket.on("end-meeting", ({ meetingId }) => {
    if (rooms[meetingId]?.hostId === socket.id) {
      io.to(meetingId).emit("meeting-ended");
      delete rooms[meetingId];
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    for (const meetingId in rooms) {
      if (rooms[meetingId].participants[socket.id]) {
        delete rooms[meetingId].participants[socket.id];
        io.to(meetingId).emit("participants-update", rooms[meetingId]);
      }
    }
  });

  socket.on("webrtc-signal", ({ meetingId, targetId, signal }) => {
    io.to(targetId).emit("webrtc-signal", {
      senderId: socket.id,
      signal,
    });
  });

  socket.on("webrtc-offer", (data) => {
    socket.to(data.meetingId).emit("webrtc-offer", data);
  });
  socket.on("webrtc-answer", (data) => {
    socket.to(data.meetingId).emit("webrtc-answer", data);
  });
  socket.on("webrtc-ice-candidate", (data) => {
    socket.to(data.meetingId).emit("webrtc-ice-candidate", data);
  });

};
