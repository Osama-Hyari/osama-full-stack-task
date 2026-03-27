import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "ws://72.62.48.101:4001";

export function useLoginEvents(onEvent: (event: any) => void) {
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
        console.log('Connected to login events socket');
    });

    socket.on('loginEvent', (data) => {
      onEvent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onEvent]);
}
