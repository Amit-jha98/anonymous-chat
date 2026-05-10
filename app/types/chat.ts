export type ChatStatus = "idle" | "waiting" | "connected" | "disconnected";

export type Sender = "you" | "stranger";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
}

export interface MatchPayload {
  roomId: string;
}

export interface ReceiveMessagePayload {
  text: string;
  timestamp: number;
}

export interface WaitingPayload {
  message?: string;
}

export interface DisconnectPayload {
  reason?: string;
}
