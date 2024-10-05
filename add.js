document.getElementById('UpLoadImage').addEventListener('click', function() {
    // Create an input element for file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg'; // Accept only PNG and JPEG files

    // When the user selects a file
    input.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            // When the file is read successfully
            reader.onload = function(e) {
                const imgElement = document.querySelector('.upload-preview-gif img'); // Select the image element
                imgElement.src = e.target.result; // Set the image source to the uploaded file
                imgElement.alt = file.name; // Optionally, set alt text to the file name
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    // Trigger the file selection dialog
    input.click();
});




document.getElementById('uploadFilesBtn').addEventListener('click', function() {
    // Trigger click event on the hidden file input element
    document.getElementById('fileInput').click();
});

// Optional: Handle the file selection event
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        alert(`Selected file: ${file.name}`);
        // You can add further code here to handle file upload
    }
});



// Function to handle adding content
document.getElementById('add-btn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

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


function goToNextContainer() {
    // Hide the first container
    document.getElementById("title-container").style.display = "none";
    document.getElementById("doc-container").style.display = "block";
}


// Function to go from container1 to container2
function goToNextContainer() {
    document.getElementById('title-container').style.display = 'none';
    document.getElementById('doc-container').style.display = 'block';
}

// Function to go from container2 back to container1
function goToPreviousContainer() {
    document.getElementById('doc-container').style.display = 'none';
    document.getElementById('title-container').style.display = 'block';
}

// Function to go from container2 to container3
function goToNextContainer3() {
    document.getElementById('doc-container').style.display = 'none';
    document.getElementById('final-container').style.display = 'block';
}

// Function to go from container3 to container2
function goToPreviousContainer2() {
    document.getElementById('final-container').style.display = 'none';
    document.getElementById('doc-container').style.display = 'block';
}
