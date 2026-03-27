import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Adjust the URL if your backend runs elsewhere
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "ws://72.62.48.101:4001";

export function useTransactionEvents(onEvent: (event: any) => void) {
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      // Connected to backend
      console.log('Connected to transaction events socket');
    });

    socket.on('transactionEvent', (data) => {
      onEvent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onEvent]);
}
