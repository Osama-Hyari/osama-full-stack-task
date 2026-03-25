import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// WebSocket gateway for real-time notifications
@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // The WebSocket server instance
  @WebSocketServer()
  server: Server;

  // Called when a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Called when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Emit a notification to a specific client (by jobId or userId)
  notifyReportReady(jobId: string) {
    // Broadcast to all clients (customize as needed)
    this.server.emit('reportReady', { jobId });
  }
}
