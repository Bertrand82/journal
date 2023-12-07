import React from 'react';

class ImageUploader extends React.Component {
  handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      const img = new Image();
      img.src = upload.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800; // Adjust this value based on your requirements
        const maxHeight = 600; // Adjust this value based on your requirements
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          // Upload the blob (resized image) to the server here
          // For example, using fetch or XMLHttpRequest
          // Example:
          // const formData = new FormData();
          // formData.append('file', blob, 'filename.jpg');
          // fetch('YOUR_UPLOAD_URL', {
          //   method: 'POST',
          //   body: formData
          // })
          //   .then(response => {
          //     // Handle response
          //   })
          //   .catch(error => {
          //     // Handle error
          //   });
        }, file.type);
      };
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={this.handleImageUpload} />
      </div>
    );
  }
}

export default ImageUploader;