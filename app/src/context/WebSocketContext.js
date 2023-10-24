import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [websocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      console.log('connected');
    };
    
    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  );
};
