
let currentInputType = 'all';




document.getElementById('add-button').addEventListener('click', () => {
    document.getElementById('add-skill').classList.toggle('hidden');
    document.getElementById('add-item').classList.toggle('hidden');
});

document.getElementById('add-skill').addEventListener('click', () => setInputSection('skill'));
document.getElementById('add-item').addEventListener('click', () => setInputSection('item'));

function setInputSection(type) {
    document.getElementById('input-section').classList.remove('hidden');
    currentInputType = type;
}


document.getElementById('submit-button').addEventListener('click', () => {
    const userHeading = document.getElementById('user-heading').value;
    const userDescription = document.getElementById('user-description').value;

    if (userHeading && userDescription) {
        const displayDiv = document.createElement('div');
        displayDiv.className = `user-input-display ${currentInputType}`;

        
        displayDiv.innerHTML = `
            <a href="user-index.php" class="user-profile-link"><h4>${fullName}</h4></a>
            <h4>${userHeading}</h4>
            <p>${userDescription}</p>
            <button class="chat-button">Chat</button>
        `;

        document.getElementById('user-input-container').appendChild(displayDiv);
        document.getElementById('user-input-container').classList.remove('hidden');

        document.getElementById('user-heading').value = '';
        document.getElementById('user-description').value = '';

    
        displayDiv.querySelector('.chat-button').addEventListener('click', () => openChatModal(fullName));
    }
});


document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('.user-input-display').forEach(display => {
            if (category === 'all' || display.classList.contains(category)) {
                display.style.display = 'block';
            } else {
                display.style.display = 'none';
            }
        });

        if (category === 'all') {
            document.getElementById('input-section').classList.add('hidden');
        } else {
            document.getElementById('input-section').classList.remove('hidden');
        }

        const filteredListings = category === 'all'
            ? listings
            : listings.filter(listing => listing.type === category);

        renderListings(filteredListings);
    });
});


const listings = [
    { id: 1, type: 'item', user: 'Abhijeet Verma', userImg: 'https://via.placeholder.com/30', title: 'Book', description: 'I need chemistry book for 2 days.' },
    { id: 2, type: 'skill', user: 'Aryan Gupta', userImg: 'https://via.placeholder.com/30', title: 'Python', description: 'Want to learn pyhton' },
    { id: 3, type: 'item', user: 'Vikram Aditya', userImg: 'https://via.placeholder.com/30', title: 'Lab caot', description: 'need a lab coat for chemistry pratical' },
    { id: 4, type: 'skill', user: 'Nitin Goyal', userImg: 'https://via.placeholder.com/30', title: 'Dance', description: 'want to learn some dance steps.' },
];


function openChatModal(userName) {
    document.getElementById('chat-user').textContent = userName;
    document.getElementById('chat-modal').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('chat-modal').style.display = 'none';
});

document.getElementById('send-message').addEventListener('click', sendMessage);

function sendMessage() {
    const message = document.getElementById('chat-input').value;
    if (message) {
        const messageBox = document.createElement('div');
        messageBox.textContent = message;
        document.getElementById('chat-messages').appendChild(messageBox);
        document.getElementById('chat-input').value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.chat-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const userName = button.getAttribute('data-user');
            openChatModal(userName);
        });
    });
});

function createListingBox(listing) {
    return `
        <div class="listing-box ${listing.type}">
            <div class="user-info">
                <img src="${listing.userImg}" alt="${listing.user}">
                <span>${listing.user}</span>
            </div>
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <button class="chat-button" data-user="${listing.user}">Chat</button>
        </div>
    `;
}

function renderListings(listingsToRender) {
    const container = document.getElementById('listing-container');
    container.innerHTML = listingsToRender.map(createListingBox).join('');
}


renderListings(listings);
