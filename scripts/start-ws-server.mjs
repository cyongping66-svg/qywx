import { WebSocketServer } from 'ws';
import * as Y from 'yjs';

// 使用环境变量中的端口或默认端口 1234
const PORT = process.env.WS_PORT || 1234;

const wss = new WebSocketServer({ port: PORT });

// 创建一个共享文档
const doc = new Y.Doc();

// 创建一个 setupWSConnection 函数来处理连接
const setupWSConnection = (ws) => {
  ws.on('message', (message) => {
    // 处理收到的消息
    console.log('received: %s', message);
    
    // 更新共享文档
    const update = new Uint8Array(message);
    Y.applyUpdate(doc, update);
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
};

wss.on('connection', setupWSConnection);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);