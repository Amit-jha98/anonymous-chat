export interface SendMessagePayload {
  text: string;
}

export interface WaitingPayload {
  message?: string;
}

export interface MatchPayload {
  roomId: string;
}

export interface ReceiveMessagePayload {
  text: string;
  timestamp: number;
}

export interface DisconnectPayload {
  reason?: string;
}
