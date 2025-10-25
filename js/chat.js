// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatHeader = document.getElementById('chatHeader');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');

    // Toggle chat widget visibility
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
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

    // Function to send message
    function sendMessage() {
        const message = userMessageInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            userMessageInput.value = '';

            // Send message to support team (in a real implementation, this would connect to a backend service)
            sendToSupportTeam(message);
        }
    }

    // Function to add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to send message to support team
    function sendToSupportTeam(message) {
        // In a real implementation, this would connect to a backend service
        // For now, we'll simulate a response from support after a delay
        setTimeout(() => {
            // Simulate support team response
            const responses = [
                "Thank you for your message. Our support team will respond shortly.",
                "We've received your message and a support representative will assist you soon.",
                "Thanks for contacting us. We're looking into your request and will get back to you as soon as possible.",
                "Your message has been sent to our support team. We'll respond within 24 hours.",
                "We appreciate your patience. A support agent will be with you shortly."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 2000);
        
        // In a real implementation, you would use something like:
        /*
        fetch('/api/chat/support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                userId: getUserId(), // Get user ID from session/storage
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response from support team
            if (data.success) {
                addMessage("Your message has been sent to our support team.", 'bot');
            } else {
                addMessage("Sorry, there was an issue sending your message. Please try again.", 'bot');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            addMessage("Sorry, there was an issue sending your message. Please try again.", 'bot');
        });
        */
    }

    // Function to get user ID (in a real app, this would come from authentication)
    function getUserId() {
        // This is a placeholder - in a real app you would get this from localStorage or session
        return localStorage.getItem('userId') || 'guest_' + Date.now();
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