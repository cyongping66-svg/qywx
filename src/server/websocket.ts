import { WebSocketServer } from 'ws';
import * as Y from 'yjs';

const wss = new WebSocketServer({ port: 1235 });
const docs = new Map<string, Y.Doc>();

wss.on('connection', (conn, req) => {
  const docName = req.url?.slice(1) || 'default';
  console.log('Client connected to room:', docName);

  // 獲取或創建文檔
  let doc = docs.get(docName);
  if (!doc) {
    doc = new Y.Doc();
    docs.set(docName, doc);
  }

  // 處理消息
  conn.on('message', (message: Buffer) => {
    try {
      // 更新共享文檔
      const update = new Uint8Array(message);
      Y.applyUpdate(doc, update);

      // 廣播更新給其他客戶端
      wss.clients.forEach((client) => {
        if (client !== conn && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });

  // 處理連接關閉
  conn.on('close', () => {
    console.log('Client disconnected from room:', docName);
  });

  // 發送當前文檔狀態
  const state = Y.encodeStateVector(doc);
  conn.send(state);
});