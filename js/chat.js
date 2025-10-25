// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatHeader = document.getElementById('chatHeader');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');

    // Chat connection status
    let isConnected = false;
    let socket = null;

    // Toggle chat widget visibility
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
        
        // Initialize chat connection when first opened
        if (!isConnected && chatWidget.classList.contains('open')) {
            initializeChat();
        }
    });

    // Close chat widget
    closeChat.addEventListener('click', function() {
        chatWidget.classList.remove('open');
    });

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initialize chat connection
    function initializeChat() {
        // Show connecting message
        addMessage("Connecting to support team...", 'bot');
        
        // In a real implementation, this would connect to a WebSocket server
        // For demonstration purposes, we'll simulate a connection
        setTimeout(() => {
            isConnected = true;
            const messages = chatMessages.querySelectorAll('.message');
            messages[messages.length - 1].remove(); // Remove connecting message
            
            addMessage("You are now connected to our support team. Please describe your issue.", 'bot');
            
            // Simulate support agent welcome message
            setTimeout(() => {
                addMessage("Hello! I'm Sam, a support agent. How can I help you today?", 'agent');
            }, 1000);
        }, 1500);
        
        // In a real implementation, you would use:
        /*
        try {
            // Connect to WebSocket server
            socket = new WebSocket('ws://localhost:5000/chat');
            
            socket.onopen = function(event) {
                isConnected = true;
                addMessage("You are now connected to our support team. Please describe your issue.", 'bot');
                
                // Send user info to server
                const userInfo = {
                    type: 'user_info',
                    userId: localStorage.getItem('userId') || 'guest',
                    timestamp: new Date().toISOString()
                };
                socket.send(JSON.stringify(userInfo));
            };
            
            socket.onmessage = function(event) {
                const data = JSON.parse(event.data);
                
                if (data.type === 'agent_message') {
                    addMessage(data.message, 'agent');
                } else if (data.type === 'system_message') {
                    addMessage(data.message, 'bot');
                }
            };
            
            socket.onclose = function(event) {
                isConnected = false;
                addMessage("Connection to support team has been lost. Please try again.", 'bot');
            };
            
            socket.onerror = function(error) {
                addMessage("Error connecting to support team. Please try again.", 'bot');
                console.error('Chat error:', error);
            };
        } catch (error) {
            addMessage("Unable to connect to support team. Please try again.", 'bot');
            console.error('Connection error:', error);
        }
        */
    }

    // Function to send message
    function sendMessage() {
        const message = userMessageInput.value.trim();
        if (message && isConnected) {
            // Add user message to chat
            addMessage(message, 'user');
            userMessageInput.value = '';

            // In a real implementation, send message through WebSocket
            // socket.send(JSON.stringify({type: 'user_message', message: message}));
            
            // For demonstration, simulate agent response
            simulateAgentResponse(message);
        } else if (message && !isConnected) {
            addMessage("Please wait while we connect you to a support agent...", 'bot');
            userMessageInput.value = message; // Keep message in input
        }
    }

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        
        // Add sender name for agent messages
        if (sender === 'agent') {
            const senderSpan = document.createElement('span');
            senderSpan.classList.add('sender-name');
            senderSpan.textContent = 'Support Agent: ';
            messageDiv.appendChild(senderSpan);
        }
        
        const messageText = document.createTextNode(text);
        messageDiv.appendChild(messageText);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simulate agent response (for demonstration purposes)
    function simulateAgentResponse(userMessage) {
        // In a real implementation, this would come from the WebSocket server
        setTimeout(() => {
            let response = "";
            
            if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
                response = "Hello there! How can I assist you today?";
            } else if (userMessage.toLowerCase().includes('menu')) {
                response = "Our menu is available on the Menu page of our website. Would you like me to help you with anything specific about our menu items?";
            } else if (userMessage.toLowerCase().includes('reservation') || userMessage.toLowerCase().includes('book')) {
                response = "You can make a reservation through our Booking page. If you're having trouble with that, I can help guide you through the process.";
            } else if (userMessage.toLowerCase().includes('hour') || userMessage.toLowerCase().includes('open')) {
                response = "We're open Monday to Saturday from 9:00 AM to 9:00 PM, and Sundays from 10:00 AM to 8:00 PM.";
            } else if (userMessage.toLowerCase().includes('contact')) {
                response = "You can reach us at +256761365727 or email us at dasahrestaurant@gmail.com. I'm also here to help!";
            } else {
                const responses = [
                    "I understand. Let me check that for you.",
                    "Thanks for that information. Can you tell me more about your issue?",
                    "I'm looking into this for you now. One moment please.",
                    "I can help you with that. Could you provide a few more details?",
                    "That's a good question. Let me see what I can do to assist you."
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
            
            addMessage(response, 'agent');
        }, 1000 + Math.random() * 2000);
    }

    // Add initial messages when chat opens for the first time
    let firstOpen = true;
    chatToggle.addEventListener('click', function() {
        if (firstOpen && !chatWidget.classList.contains('open')) {
            setTimeout(() => {
                const introMessage = document.createElement('div');
                introMessage.classList.add('message');
                introMessage.classList.add('bot-message');
                
                // Check if we're on the admin page
                if (window.location.pathname.includes('admin')) {
                    introMessage.innerHTML = "Welcome to Dasah Restaurant Admin Support! Please describe your issue and a support representative will assist you shortly.";
                } else {
                    introMessage.innerHTML = "Welcome to Dasah Restaurant Support! Please describe your issue and a support representative will assist you shortly.";
                }
                
                chatMessages.appendChild(introMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
            firstOpen = false;
        }
    });
});