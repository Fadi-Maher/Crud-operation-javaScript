// Select elements
let addNewBtn = document.querySelector(".addNew");
let closeFormBtn = document.querySelector(".close");
let contactform = document.querySelector(".addNewContact");
let overlay = document.querySelector(".overlay");
let contactList = [];
let isEditing = false; // Flag to track editing status
let editIndex = -1; // Track the index of the contact being edited

// Function to render contacts in the table
const renderContacts = () => {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear existing contacts
    contactList.forEach((contact, index) => {
        tbody.innerHTML += `
            <tr data-id="${index}">
                <td>${index + 1}</td>
                <td>${contact.contactName}</td>
                <td>${contact.contactPhone}</td>
                <td>${contact.contactEmail}</td>
                <td>${contact.contactAddress}</td>
                <td><i class="fa fa-edit edit" data-id="${index}"></i></td>  
                <td><i class="fa fa-trash delete" data-id="${index}"></i></td>  
            </tr>
        `;
    });
};

// Open form modal when "Add New" button is clicked
addNewBtn.addEventListener('click', () => {
    overlay.style.display = "block"; // Show overlay
    contactform.style.display = "block"; // Show modal
    resetForm(); // Reset the form inputs
});

// Close form modal when close button is clicked
closeFormBtn.addEventListener('click', () => {
    overlay.style.display = "none"; // Hide overlay
    contactform.style.display = "none"; // Hide modal
    resetForm(); // Reset the form inputs
});

// Function to save new contact or update existing contact
document.querySelector(".save-btn").addEventListener('click', () => {
    const name = document.getElementById("contact_form_name").value;
    const phone = document.getElementById("contact_form_phone").value;
    const email = document.getElementById("contact_form_email").value;
    const address = document.getElementById("contact_form_address").value;

    if (isEditing) {
        // Update existing contact
        contactList[editIndex] = { contactName: name, contactPhone: phone, contactEmail: email, contactAddress: address };
        isEditing = false; // Reset editing status
    } else {
        // Add new contact to list
        contactList.push({ contactName: name, contactPhone: phone, contactEmail: email, contactAddress: address });
    }
    
    renderContacts(); // Render updated contact list

    // Close modal
    overlay.style.display = "none"; // Hide overlay
    contactform.style.display = "none"; // Hide modal
});

// Function to reset the form inputs
const resetForm = () => {
    document.getElementById("contact_form_name").value = '';
    document.getElementById("contact_form_phone").value = '';
    document.getElementById("contact_form_email").value = '';
    document.getElementById("contact_form_address").value = '';
    isEditing = false; // Reset editing status
    editIndex = -1; // Reset edit index
};

// Edit and delete functionality
document.getElementById("tbody").addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('edit')) {
        const index = target.getAttribute('data-id');
        fillFormForEdit(index);
    } else if (target.classList.contains('delete')) {
        const index = target.getAttribute('data-id');
        contactList.splice(index, 1); // Remove contact
        renderContacts(); // Render updated contact list
    }
});

// Function to fill the form with the contact details for editing
const fillFormForEdit = (index) => {
    const contact = contactList[index];
    document.getElementById("contact_form_name").value = contact.contactName;
    document.getElementById("contact_form_phone").value = contact.contactPhone;
    document.getElementById("contact_form_email").value = contact.contactEmail;
    document.getElementById("contact_form_address").value = contact.contactAddress;

    overlay.style.display = "block"; // Show overlay
    contactform.style.display = "block"; // Show modal

    isEditing = true; // Set editing status
    editIndex = index; // Store the index of the contact being edited
};

// Search functionality
document.getElementById("searchInput").addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredContacts = contactList.filter(contact => 
        contact.contactName.toLowerCase().includes(searchTerm) ||
        contact.contactPhone.includes(searchTerm) ||
        contact.contactEmail.toLowerCase().includes(searchTerm) ||
        contact.contactAddress.toLowerCase().includes(searchTerm)
    );

    let tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear existing contacts
    filteredContacts.forEach((contact, index) => {
        tbody.innerHTML += `
            <tr data-id="${index}">
                <td>${index + 1}</td>
                <td>${contact.contactName}</td>
                <td>${contact.contactPhone}</td>
                <td>${contact.contactEmail}</td>
                <td>${contact.contactAddress}</td>
                <td><i class="fa fa-edit edit" data-id="${index}"></i></td>  
                <td><i class="fa fa-trash delete" data-id="${index}"></i></td>  
            </tr>
        `;
    });
});
