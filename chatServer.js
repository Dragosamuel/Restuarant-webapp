// Chat Server for Real-time Support Chat
const WebSocket = require('ws');
const http = require('http');
const express = require('express');

// Chat server functionality
class ChatServer {
    constructor(server) {
        // Create WebSocket server
        this.wss = new WebSocket.Server({ server, path: '/chat' });
        this.clients = new Map(); // Store connected clients
        this.agents = new Set();  // Store support agents
        this.init();
    }

    init() {
        this.wss.on('connection', (ws, req) => {
            console.log('New client connected to chat');
            
            // Generate unique ID for client
            const clientId = this.generateId();
            ws.clientId = clientId;
            
            // Store client connection
            this.clients.set(clientId, ws);
            
            // Handle incoming messages
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleMessage(ws, message);
                } catch (error) {
                    console.error('Error parsing message:', error);
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Invalid message format'
                    }));
                }
            });
            
            // Handle client disconnect
            ws.on('close', () => {
                console.log('Client disconnected from chat');
                this.handleDisconnect(ws);
            });
            
            // Handle errors
            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.handleDisconnect(ws);
            });
            
            // Send welcome message
            ws.send(JSON.stringify({
                type: 'system_message',
                message: 'Connected to support team. Please wait while we connect you with an agent.'
            }));
        });
    }
    
    handleMessage(ws, message) {
        switch (message.type) {
            case 'user_info':
                // Store user information
                ws.userId = message.userId || 'guest';
                ws.timestamp = message.timestamp;
                console.log(`User ${ws.userId} joined chat`);
                break;
                
            case 'user_message':
                // Handle user message
                this.handleUserMessage(ws, message.message);
                break;
                
            case 'agent_register':
                // Register support agent
                this.registerAgent(ws, message.agentId);
                break;
                
            case 'agent_message':
                // Handle agent message
                this.handleAgentMessage(ws, message.message, message.recipientId);
                break;
                
            default:
                ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Unknown message type'
                }));
        }
    }
    
    handleUserMessage(ws, message) {
        console.log(`User message: ${message}`);
        
        // Find available agent
        const availableAgent = this.findAvailableAgent();
        
        if (availableAgent) {
            // Send message to agent
            availableAgent.send(JSON.stringify({
                type: 'user_message',
                clientId: ws.clientId,
                userId: ws.userId,
                message: message,
                timestamp: new Date().toISOString()
            }));
            
            // Send confirmation to user
            ws.send(JSON.stringify({
                type: 'system_message',
                message: 'Message sent to support agent. Please wait for a response.'
            }));
        } else {
            // No agent available
            ws.send(JSON.stringify({
                type: 'system_message',
                message: 'All support agents are currently busy. Please wait, someone will be with you shortly.'
            }));
            
            // Queue message for when agent becomes available
            this.queueMessage(ws, message);
        }
    }
    
    handleAgentMessage(ws, message, recipientId) {
        console.log(`Agent message to ${recipientId}: ${message}`);
        
        // Find recipient client
        const recipient = this.clients.get(recipientId);
        
        if (recipient && recipient.readyState === WebSocket.OPEN) {
            // Send message to client
            recipient.send(JSON.stringify({
                type: 'agent_message',
                message: message,
                timestamp: new Date().toISOString()
            }));
        } else {
            // Recipient not found or disconnected
            ws.send(JSON.stringify({
                type: 'error',
                message: 'Client not found or disconnected'
            }));
        }
    }
    
    registerAgent(ws, agentId) {
        ws.agentId = agentId;
        this.agents.add(ws);
        console.log(`Agent ${agentId} registered`);
        
        // Send confirmation
        ws.send(JSON.stringify({
            type: 'system_message',
            message: 'Agent registered successfully'
        }));
        
        // Notify agent of any queued messages
        this.sendQueuedMessages(ws);
    }
    
    findAvailableAgent() {
        // For simplicity, return the first available agent
        for (const agent of this.agents) {
            if (agent.readyState === WebSocket.OPEN) {
                return agent;
            }
        }
        return null;
    }
    
    queueMessage(ws, message) {
        // In a real implementation, you would store messages in a queue
        // For now, we'll just log it
        console.log(`Queued message from ${ws.clientId}: ${message}`);
    }
    
    sendQueuedMessages(agentWs) {
        // In a real implementation, you would send queued messages to the agent
        agentWs.send(JSON.stringify({
            type: 'system_message',
            message: 'No queued messages at this time'
        }));
    }
    
    handleDisconnect(ws) {
        // Remove client from collections
        if (ws.clientId) {
            this.clients.delete(ws.clientId);
        }
        
        if (ws.agentId) {
            this.agents.delete(ws);
        }
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    broadcast(message) {
        // Broadcast message to all clients
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}

module.exports = ChatServer;