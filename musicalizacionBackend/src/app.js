document.addEventListener('DOMContentLoaded', () => {
  handlePreviewControls();
  handleAcceptChanges();
});

function handlePreviewControls() {
  const volumeVoice = document.getElementById('volumeVoice').value;
  const volumeMusic = document.getElementById('volumeMusic').value;
  const toggleVoice = document.getElementById('toggleVoice');
  const toggleMusic = document.getElementById('toggleMusic');
  const updatePreviewButton = document.getElementById('updatePreview');

  toggleVoice.addEventListener('change', updatePreview);
  toggleMusic.addEventListener('change', updatePreview);
  document.getElementById('volumeVoice').addEventListener('input', updatePreview);
  document.getElementById('volumeMusic').addEventListener('input', updatePreview);

  function updatePreview() {
    fetch('/updatePreview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toggleVoice: toggleVoice.checked,
        toggleMusic: toggleMusic.checked,
        volumeVoice,
        volumeMusic,
      }),
    })
      .then(response => response.text())
      .then(response => console.log(response))
      .catch(error => console.error('Error:', error));
  }
}

function handleAcceptChanges() {
  const acceptChangesButton = document.getElementById('acceptChanges');

  acceptChangesButton.addEventListener('click', () => {
    // Add logic to accept changes and generate final video link
    console.log('Changes accepted!');
  });
}



