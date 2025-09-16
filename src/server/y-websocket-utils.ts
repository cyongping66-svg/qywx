import * as Y from 'yjs';
import { WebSocket, WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

const docs = new Map<string, Y.Doc>();

interface SetupOptions {
  docName?: string;
}

export const setupWSConnection = (
  ws: WebSocket,
  req: IncomingMessage,
  { docName = 'default' }: SetupOptions = {}
) => {
  // 獲取或創建文檔
  let doc = docs.get(docName);
  if (!doc) {
    doc = new Y.Doc();
    docs.set(docName, doc);
  }

  // 處理接收到的消息
  ws.on('message', (message: Buffer) => {
    try {
      // 更新共享文檔
      const update = new Uint8Array(message);
      Y.applyUpdate(doc!, update);

      // 廣播更新給所有連接的客戶端（除了發送者）
      wss.clients.forEach((client: WebSocket) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });

  // 處理連接關閉
  ws.on('close', () => {
    console.log('Client disconnected from room:', docName);
  });

  // 發送當前文檔狀態
  const state = Y.encodeStateVector(doc);
  ws.send(state);
};

// 保存對 WebSocketServer 的引用
let wss: WebSocketServer;
export const setWebSocketServer = (server: WebSocketServer) => {
  wss = server;
};