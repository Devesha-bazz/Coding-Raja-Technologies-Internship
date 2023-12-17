function generateResume() {
  const formData = new FormData(document.getElementById('resumeForm'));
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const templateSelector = document.getElementById('template');
  const selectedTemplate = templateSelector.options[templateSelector.selectedIndex].value;

  // Use the selected template to customize the resume preview
  const previewHtml = getTemplateHtml(selectedTemplate, data);

  // Create a new div element to hold the preview HTML
  const previewContainer = document.createElement('div');
  previewContainer.innerHTML = previewHtml;

  // Display the preview
  document.getElementById('resumePreview').innerHTML = '';
  document.getElementById('resumePreview').appendChild(previewContainer);
}

function downloadResume() {
  const downloadFormat = document.getElementById('downloadFormat').value;

  if (downloadFormat === 'pdf') {
    // Download as PDF
    const pdf = new jsPDF();
    const resumeElement = document.getElementById('resumePreview');

    html2canvas(resumeElement).then(canvas => {
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 10, 10, 190, 250);
      pdf.save('resume.pdf');
    });
  } else if (downloadFormat === 'jpg' || downloadFormat === 'png') {
    // Download as JPG or PNG
    const resumeElement = document.getElementById('resumePreview');
    const imageOptions = { quality: 1, width: 800, height: 600 };

    html2canvas(resumeElement, imageOptions).then(canvas => {
      const imageData = canvas.toDataURL(`image/${downloadFormat}`);
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `resume.${downloadFormat}`;
      link.click();
    });
  }
  // Add additional download options as needed
}

function getTemplateHtml(template, data) {
  // Customize the HTML based on the selected template
  switch (template) {
    case 'template1':
      return `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.email}</h6>
            <p class="card-text">Education: ${data.degree} in ${data.stream}<br>
              University: ${data.university}</p>
            <h6 class="card-subtitle mb-2 text-muted">Achievements:</h6>
            <p class="card-text">${data.achievements}</p>
            <h6 class="card-subtitle mb-2 text-muted">Work Experience:</h6>
            <p class="card-text">${data.experience}</p>
            <h6 class="card-subtitle mb-2 text-muted">Skills:</h6>
            <p class="card-text">${data.skills}</p>
          </div>
        </div>
      `;
    case 'template2':
      return `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.email}</h6>
            <p class="card-text">Education: ${data.degree} in ${data.stream}<br>
              University: ${data.university}</p>
            <h6 class="card-subtitle mb-2 text-muted">Achievements:</h6>
            <p class="card-text">${data.achievements}</p>
            <h6 class="card-subtitle mb-2 text-muted">Work Experience:</h6>
            <p class="card-text">${data.experience}</p>
            <h6 class="card-subtitle mb-2 text-muted">Skills:</h6>
            <p class="card-text">${data.skills}</p>
          </div>
        </div>
      `;
    // Add more cases for additional templates
    default:
      return '<p>No template selected.</p>';
  }
}
