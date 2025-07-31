export enum MessageType { CHAT='CHAT', JOIN='JOIN', LEAVE='LEAVE' }

export interface ChatMessage {
    type: MessageType;
    sender: string;   // kullanıcı veya uzman adı
    content: string;  // mesaj içeriği
    ticketId: string; // hangi oda
}
