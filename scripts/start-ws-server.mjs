import { WebSocketServer } from 'ws';
import * as Y from 'yjs';

const wss = new WebSocketServer({ port: 1235 });

// 創建一個共享文檔
const doc = new Y.Doc();

// 創建一個 setupWSConnection 函數來處理連接
const setupWSConnection = (ws) => {
  ws.on('message', (message) => {
    // 處理收到的訊息
    console.log('received: %s', message);
    
    // 更新共享文檔
    const update = new Uint8Array(message);
    Y.applyUpdate(doc, update);
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
};

wss.on('connection', setupWSConnection);

console.log('WebSocket server is running on ws://localhost:1235');