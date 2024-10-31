/korbit-review
// Retrieve companies from localStorage, or initialize an empty array
const companies = JSON.parse(localStorage.getItem('companies')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderCompanies(); // Render company list on page load
    populateFields(); // Populate fields when editing a company
});

// Function to render companies
function renderCompanies() {
    const companyListDiv = document.getElementById('company-list');
    companyListDiv.innerHTML = ''; // Clear previous entries
    
    companies.forEach((company, index) => {
        const companyDiv = document.createElement('div');
        companyDiv.className = 'company-item';
        companyDiv.innerHTML = `
            <h2>${company.name}</h2>
            <p>CNPJ: ${company.cnpj}</p>
            <p>Address: ${company.address}</p>
            <p>Telephone: ${company.telephone}</p>
            <button onclick="editCompany(${index})">Edit Information</button>
            <button class="delete-button" onclick="deleteCompany(${index})">Delete Company</button>
        `;
        companyListDiv.appendChild(companyDiv);
    });
}

// Function to save company data
document.getElementById('save-company')?.addEventListener('click', () => {
    const name = document.getElementById('company-name').value.trim();
    const cnpj = document.getElementById('company-cnpj').value.trim();
    const address = document.getElementById('company-address').value.trim();
    const telephone = document.getElementById('company-telephone').value.trim();

    // Validate input fields
    if (name && cnpj && address && telephone) {
        const company = { name, cnpj, address, telephone }; // Create company object
        const index = new URLSearchParams(window.location.search).get('index');

        if (index) {
            companies[index] = company; // Update existing company
        } else {
            companies.push(company); // Add new company
        }
        
        // Save updated companies array to localStorage as a JSON string
        localStorage.setItem('companies', JSON.stringify(companies));
        window.location.href = 'index.html'; // Redirect to index page
    } else {
        alert('All fields are required!'); // Alert for validation
    }
});

// Function to populate fields when editing a company
function populateFields() {
    const index = new URLSearchParams(window.location.search).get('index');
    if (index) {
        const company = companies[index]; // Get company from the array
        document.getElementById('company-name').value = company.name;
        document.getElementById('company-cnpj').value = company.cnpj;
        document.getElementById('company-address').value = company.address;
        document.getElementById('company-telephone').value = company.telephone;
    }
}

// Function to edit company
function editCompany(index) {
    window.location.href = `company.html?index=${index}`; // Redirect to edit page with index
}

// Function to delete company
function deleteCompany(index) {
    if (confirm('Are you sure you want to delete this company?')) {
        companies.splice(index, 1); // Remove company from array
        localStorage.setItem('companies', JSON.stringify(companies)); // Update localStorage
        renderCompanies(); // Re-render the company list
    }
}

// Save contact data
document.getElementById('save-contact')?.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const cpf = document.getElementById('contact-cpf').value.trim();
    const address = document.getElementById('contact-address').value.trim();
    const telephone = document.getElementById('contact-telephone').value.trim();

    // Validate input fields
    if (name && cpf && address && telephone) {
        alert('Contact saved!'); // Alert for successful save
        window.history.back(); // Go back to previous page
    } else {
        alert('All fields are required!'); // Alert for validation
    }
});
