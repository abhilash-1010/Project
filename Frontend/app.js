// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mock Data (Based on your spec) ---
    const mockListings = [
      {
        id: 1,
        title: "Discrete Mathematics Textbook - R. Rosen (3rd Edition)",
        price: 150,
        location: "CSE Block, BMSCE",
        seller: "Rohan G.",
        verified: true,
        img: "https://via.placeholder.com/300x200.png?text=Textbook"
      },
      {
        id: 2,
        title: "Used Mini-Fridge (Good Condition)",
        price: 2500,
        location: "Hostel Block 5",
        seller: "Priya S.",
        verified: true,
        img: "https://via.placeholder.com/300x200.png?text=Mini-Fridge"
      },
      {
        id: 3,
        title: "Engineering Drawing Tools Set",
        price: 300,
        location: "Mechanical Block",
        seller: "Ankit M.",
        verified: false,
        img: "https://via.placeholder.com/300x200.png?text=Drawing+Tools"
      },
      {
        id: 4,
        title: "Calculator (Casio fx-991MS)",
        price: 450,
        location: "Library Pickup",
        seller: "Rohan G.",
        verified: true,
        img: "https://via.placeholder.com/300x200.png?text=Calculator"
      }
    ];
  
    // --- Function to Render Listings ---
    function renderListings() {
      const grid = document.getElementById('listing-grid');
      if (!grid) return; // Only run if the grid exists on the page
  
      grid.innerHTML = ''; // Clear existing
      
      // Use slice to only show a few on the home page if we want
      const listingsToShow = (window.location.pathname.includes('index.html') || window.location.pathname === '/')
        ? mockListings.slice(0, 4) // Home page shows 4
        : mockListings; // Listings page shows all
  
      listingsToShow.forEach(item => {
        const card = document.createElement('a');
        card.href = 'item.html'; // All cards link to the static item page
        card.className = 'listing-card';
        
        card.innerHTML = `
          <img src="${item.img}" alt="${item.title}" class="listing-card-img">
          <div class="listing-card-content">
            <h3 class="listing-card-title">${item.title}</h3>
            <div class="listing-card-price">₹${item.price.toLocaleString('en-IN')}</div>
            <div class="listing-card-location">${item.location}</div>
            <div class="listing-card-seller">
              ${item.seller} ${item.verified ? '✓ Verified' : ''}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  
    // --- Mock Chat Functionality ---
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputField = document.getElementById('chat-input-field');
        const messageText = inputField.value;
        if (messageText.trim() === '') return;
  
        const messagesContainer = document.getElementById('chat-messages');
        
        // Create and append new message bubble
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
          <div class="message-bubble">${messageText}</div>
          <span class="timestamp">Now</span>
        `;
        messagesContainer.appendChild(newMessage);
  
        // Reset input and scroll to bottom
        inputField.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
        // TODO: Replace this with your WebSocket emit event
        console.log('Emitting message:', messageText);
      });
    }
  
    // --- Login/Register Form Toggle ---
    const toggleLink = document.getElementById('toggle-link');
    if (toggleLink) {
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');
  
      toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginForm.style.display === 'none') {
          // Show login
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
          toggleLink.textContent = "Don't have an account? Register";
        } else {
          // Show register
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
          toggleLink.textContent = 'Already have an account? Login';
        }
      });
    }
    
    // --- Wishlist Button Toggle ---
    const saveBtn = document.getElementById('save-btn');
    if(saveBtn) {
      saveBtn.addEventListener('click', () => {
        if(saveBtn.classList.contains('active')) {
          saveBtn.textContent = 'Save to Wishlist';
          saveBtn.classList.remove('active');
          saveBtn.classList.remove('btn-primary');
          saveBtn.classList.add('btn-secondary');
        } else {
          saveBtn.textContent = 'Saved ✓';
          saveBtn.classList.add('active');
          saveBtn.classList.add('btn-primary');
          saveBtn.classList.remove('btn-secondary');
        }
      });
    }
  
    // --- Initial Page Load ---
    renderListings();
  
  });