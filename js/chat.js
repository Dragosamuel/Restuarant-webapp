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

            // Process message and generate response
            setTimeout(() => {
                generateResponse(message);
            }, 500);
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

    // Function to generate response based on user message
    function generateResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = '';

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
            response = "Hello! How can I assist you today? You can ask me about our menu, reservations, or opening hours.";
        } else if (lowerCaseMessage.includes('hour') || lowerCaseMessage.includes('open') || lowerCaseMessage.includes('time')) {
            response = "We are open Monday to Saturday from 9:00 AM to 9:00 PM, and on Sundays from 10:00 AM to 8:00 PM.";
        } else if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('food')) {
            response = "You can view our full menu on our <a href='menu.html' target='_blank'>Menu page</a>. We offer a variety of dishes including vegetarian options.";
        } else if (lowerCaseMessage.includes('reservation') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('table')) {
            response = "You can make a reservation through our <a href='booking.html' target='_blank'>Booking page</a> or by calling us at +256761365727.";
        } else if (lowerCaseMessage.includes('vegetarian') || lowerCaseMessage.includes('vegan')) {
            response = "Yes, we offer several vegetarian and vegan options. Please let us know about any dietary restrictions when making your reservation.";
        } else if (lowerCaseMessage.includes('location') || lowerCaseMessage.includes('address') || lowerCaseMessage.includes('where')) {
            response = "We are located at Bugema University, Kampala, Uganda. You can find us on Google Maps or use a ride-sharing app to get here.";
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('phone') || lowerCaseMessage.includes('email')) {
            response = "You can reach us at +256761365727 or email us at dasahrestaurant@gmail.com. You can also use our <a href='contact.html' target='_blank'>Contact form</a>.";
        } else if (lowerCaseMessage.includes('faq') || lowerCaseMessage.includes('question') || lowerCaseMessage.includes('help')) {
            response = "You can find answers to common questions on our <a href='faq.html' target='_blank'>FAQ page</a>.";
        } else if (lowerCaseMessage.includes('thank')) {
            response = "You're welcome! Is there anything else I can help you with?";
        } else {
            response = "I'm sorry, I didn't understand that. You can check our <a href='faq.html' target='_blank'>FAQ page</a> for more information or ask me about our menu, reservations, or opening hours.";
        }

        // Add bot response to chat
        const responseDiv = document.createElement('div');
        responseDiv.classList.add('message');
        responseDiv.classList.add('bot-message');
        responseDiv.innerHTML = response;
        chatMessages.appendChild(responseDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add initial messages when chat opens for the first time
    let firstOpen = true;
    chatToggle.addEventListener('click', function() {
        if (firstOpen && !chatWidget.classList.contains('open')) {
            setTimeout(() => {
                const introMessage = document.createElement('div');
                introMessage.classList.add('message');
                introMessage.classList.add('bot-message');
                introMessage.innerHTML = "Welcome to Dasah Restaurant! I'm here to help answer your questions. What would you like to know?";
                chatMessages.appendChild(introMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 600);
            firstOpen = false;
        }
    });
});