// Function to handle adding content
document.getElementById('add-btn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // File uploads
    const imageFile = document.getElementById('image-upload').files[0];
    const docFile = document.getElementById('doc-upload').files[0];

    // Validate title and content
    if (!title || !content) {
        alert('Please fill in the title and content');
        return;
    }

    // Prepare content object
    const contentData = {
        title: title,
        content: content,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        doc: docFile ? URL.createObjectURL(docFile) : null
    };

    // Save content to localStorage
    let existingContents = JSON.parse(localStorage.getItem('cmsContents')) || [];
    existingContents.push(contentData);
    localStorage.setItem('cmsContents', JSON.stringify(existingContents));

    alert('Content Added successfully!');

    // Clear the inputs after submission
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image-upload').value = '';
    document.getElementById('doc-upload').value = '';

    // Optionally display added content
    displayAddedContent();
});

// Function to display added content
function displayAddedContent() {
    const contentList = document.getElementById('content-list');
    contentList.innerHTML = ''; // Clear previous content

    const existingContents = JSON.parse(localStorage.getItem('cmsContents')) || [];
    existingContents.forEach(content => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.innerHTML = `<h3>${content.title}</h3><p>${content.content}</p>`;

        // Display image if exists
        if (content.image) {
            const imageElement = document.createElement('img');
            imageElement.src = content.image;
            imageElement.alt = 'Uploaded Image';
            imageElement.style.maxWidth = '200px';
            contentItem.appendChild(imageElement);
        }

        // Display document link if exists
        if (content.doc) {
            const docLink = document.createElement('a');
            docLink.href = content.doc;
            docLink.textContent = 'Download DOCX';
            docLink.target = '_blank';
            contentItem.appendChild(docLink);
        }

        contentList.appendChild(contentItem);
    });
}

// Function to go back to the home page
document.getElementById('back-btn').addEventListener('click', function() {
    window.location.href = 'index.html'; // Navigate back to Home
});

// Function to handle navigation to Home
function goToHome() {
    window.location.href = 'index.html'; // Navigate back to Home
}

// Display existing content on page load
document.addEventListener('DOMContentLoaded', displayAddedContent);
