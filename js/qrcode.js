/*!
 * qrcode.js - QR Code generator
 * 
 * This is a simplified version for demonstration purposes.
 * In a production environment, you would use a full QR code library.
 */

// Simple QR Code Generator (simplified for demonstration)
class SimpleQRCode {
    constructor(container, options) {
        this.container = container;
        this.options = options || {};
        this.generate();
    }
    
    generate() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create a simple visual representation
        const qrDiv = document.createElement('div');
        qrDiv.className = 'simple-qr-code';
        qrDiv.style.cssText = `
            display: inline-block;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
        `;
        
        // Create a grid pattern to simulate QR code
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(10, 15px);
            grid-gap: 2px;
        `;
        
        // Generate random pattern for demonstration
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.style.cssText = `
                width: 15px;
                height: 15px;
                background: ${Math.random() > 0.5 ? '#000' : '#fff'};
                border: 1px solid #eee;
            `;
            grid.appendChild(cell);
        }
        
        qrDiv.appendChild(grid);
        
        // Add text label
        const label = document.createElement('div');
        label.textContent = 'Table Order QR Code';
        label.style.cssText = `
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
        `;
        
        qrDiv.appendChild(label);
        
        // Add instruction text
        const instruction = document.createElement('div');
        instruction.textContent = 'Scan with your phone camera to order';
        instruction.style.cssText = `
            text-align: center;
            margin-top: 5px;
            font-size: 0.8em;
            color: #666;
        `;
        
        qrDiv.appendChild(instruction);
        
        this.container.appendChild(qrDiv);
    }
}

// Initialize QR code when modal is shown
document.addEventListener('DOMContentLoaded', function() {
    const qrModal = document.getElementById('qrModal');
    if (qrModal) {
        qrModal.addEventListener('shown.bs.modal', function() {
            const qrContainer = document.getElementById('qrCodeContainer');
            if (qrContainer) {
                // Clear previous QR code
                qrContainer.innerHTML = '';
                
                // Generate new QR code
                new SimpleQRCode(qrContainer);
            }
        });
    }
});