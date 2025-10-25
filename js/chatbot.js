// Chatbot functionality for quick assistance
document.addEventListener('DOMContentLoaded', function() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotHeader = document.getElementById('chatbotHeader');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userMessageInput = document.getElementById('userMessageInput');
    const sendChatbotMessageBtn = document.getElementById('sendChatbotMessage');

    // Toggle chatbot widget visibility
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotWidget.classList.toggle('open');
        });
    }

    // Close chatbot widget
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function() {
            chatbotWidget.classList.remove('open');
        });
    }

    // Send message on button click
    if (sendChatbotMessageBtn) {
        sendChatbotMessageBtn.addEventListener('click', sendChatbotMessage);
    }

    // Send message on Enter key
    if (userMessageInput) {
        userMessageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }

    // Function to send message
    function sendChatbotMessage() {
        const message = userMessageInput.value.trim();
        if (message) {
            // Add user message to chat
            addChatbotMessage(message, 'user');
            userMessageInput.value = '';

            // Process message and generate response
            processUserMessage(message);
        }
    }

    // Function to add message to chatbot
    function addChatbotMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message');
        messageDiv.classList.add(sender);
        
        const messageText = document.createTextNode(text);
        messageDiv.appendChild(messageText);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Process user message and generate response
    function processUserMessage(userMessage) {
        // Simulate thinking delay
        setTimeout(() => {
            let response = "";
            
            // Simple keyword-based responses
            if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
                response = "Hello! I'm your restaurant assistant. How can I help you today?";
            } else if (userMessage.toLowerCase().includes('menu')) {
                response = "You can view our full menu on the Menu page. We have breakfast, lunch, dinner, drinks, and desserts options. Would you like to know about a specific category?";
            } else if (userMessage.toLowerCase().includes('breakfast')) {
                response = "Our breakfast menu includes pancakes, omelets, breakfast burritos, and fresh coffee. Would you like to know more about any specific item?";
            } else if (userMessage.toLowerCase().includes('lunch')) {
                response = "For lunch, we offer burgers, salads, sandwiches, and daily specials. Our chef's special today is the grilled salmon with seasonal vegetables.";
            } else if (userMessage.toLowerCase().includes('dinner')) {
                response = "Our dinner menu features steaks, seafood, pasta, and vegetarian options. We also have an extensive wine list to complement your meal.";
            } else if (userMessage.toLowerCase().includes('reservation') || userMessage.toLowerCase().includes('book')) {
                response = "You can make a reservation through our Booking page or by calling us at +256761365727. How many people will be in your party?";
            } else if (userMessage.toLowerCase().includes('hour') || userMessage.toLowerCase().includes('open')) {
                response = "We're open Monday to Saturday from 9:00 AM to 9:00 PM, and Sundays from 10:00 AM to 8:00 PM.";
            } else if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('address')) {
                response = "We're located at 123 Street, New York, USA. You can find us easily using GPS navigation.";
            } else if (userMessage.toLowerCase().includes('contact')) {
                response = "You can reach us at +256761365727 or email us at dasahrestaurant@gmail.com. You can also send us a message through our Contact page.";
            } else if (userMessage.toLowerCase().includes('wifi')) {
                response = "Yes, we offer free WiFi to all our customers. The password is available at the counter.";
            } else if (userMessage.toLowerCase().includes('vegetarian')) {
                response = "We have several vegetarian options including our famous veggie burger, quinoa salad, and vegetable stir-fry. Would you like to know more?";
            } else if (userMessage.toLowerCase().includes('vegan')) {
                response = "We offer vegan options such as our plant-based burger, vegan pasta, and fresh salads. Please let us know about any specific dietary restrictions when ordering.";
            } else if (userMessage.toLowerCase().includes('allerg')) {
                response = "We take allergies seriously. Please inform your server about any allergies when ordering, and we'll ensure your meal is prepared safely.";
            } else if (userMessage.toLowerCase().includes('price') || userMessage.toLowerCase().includes('cost')) {
                response = "Our menu prices range from $8 for breakfast items to $25 for our premium dinner entrees. Would you like information about a specific item?";
            } else if (userMessage.toLowerCase().includes('special') || userMessage.toLowerCase().includes('deal')) {
                response = "We offer daily specials and happy hour discounts from 3-5 PM daily. Follow us on social media for exclusive deals and promotions!";
            } else if (userMessage.toLowerCase().includes('ar') || userMessage.toLowerCase().includes('augment')) {
                response = "You can preview our dishes in 3D using our AR menu feature! Look for the 'AR Preview' button next to menu items that support this feature.";
            } else if (userMessage.toLowerCase().includes('voice') || userMessage.toLowerCase().includes('speak')) {
                response = "You can order using voice commands! Click the microphone icon and say what you'd like to order, such as 'Order one Chicken Burger'.";
            } else if (userMessage.toLowerCase().includes('qr') || userMessage.toLowerCase().includes('scan')) {
                response = "Scan the QR code at your table to access our digital menu and place your order directly from your phone!";
            } else if (userMessage.toLowerCase().includes('accessibility') || userMessage.toLowerCase().includes('disability')) {
                response = "We're committed to accessibility for all customers. Our menu includes high-contrast options, audio descriptions, and screen reader support. Please let us know how we can assist you!";
            } else {
                const responses = [
                    "I can help you with that. Could you provide a few more details?",
                    "Thanks for your question. Let me check that for you.",
                    "I understand. One moment while I look up that information.",
                    "That's a great question. Let me see what I can do to assist you.",
                    "I'm here to help! Can you tell me more about what you're looking for?",
                    "I'd be happy to assist with that. What specific information do you need?"
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
            
            addChatbotMessage(response, 'bot');
        }, 500 + Math.random() * 1000);
    }

    // Add initial welcome message
    setTimeout(() => {
        if (chatbotMessages && chatbotMessages.children.length === 0) {
            addChatbotMessage("Hello! 👋 I'm your restaurant assistant. How can I help you today? You can ask me about our menu, hours, reservations, or any other questions!", 'bot');
        }
    }, 1000);
});