import Peer from "simple-peer/simplepeer.min.js";
import socket from "@/socket";

export const peers: Record<string, Peer.Instance> = {};

/**
 * Create peer (caller)
 */
export const createPeer = (
  targetId: string,
  stream: MediaStream,
  meetingId: string
) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    socket.emit("webrtc-signal", {
      to: targetId,
      signal,
      meetingId,
    });
  });

  return peer;
};

/**
 * Answer peer (receiver)
 */
export const addPeer = (
  incomingSignal: any,
  callerId: string,
  stream: MediaStream,
  meetingId: string
) => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });

  peer.on("signal", (signal) => {
    socket.emit("webrtc-signal", {
      to: callerId,
      signal,
      meetingId,
    });
  });

  peer.signal(incomingSignal);
  return peer;
};
