import React, { useState } from 'react'

export default function AddProduct(): JSX.Element {
  const [bodyFile, setBodyFile] = useState(null);
  const [headerFile, setHeaderFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleBodyFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setBodyFile(selectedFile);
  };

  const handleHeaderFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setHeaderFile(selectedFile);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (!bodyFile || !headerFile) {
      // Handle error when files are not selected
      return;
    }

    const formData = new FormData();
    formData.append('file', bodyFile);
    formData.append('headers', headerFile);

    // Make the fetch request with the formData containing both files
    fetch('http://localhost:8081/api/product/import', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log("Uploaded" + response);
        setUploadSuccess(true); // Set the success status to true
        setTimeout(() => {
          setUploadSuccess(false); // Reset the success status after 3 seconds
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen font-manrope bg-dash-color">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {uploadSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Product added successfully!</span>
            </div>
          )}
          <h1 className="text-5xl font-bold">Welcome!</h1>
          <p className="py-6">Enter JSON and CSV files for the product you want to add.</p>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="pr-4" htmlFor="bodyFile">File : </label>
              <input
                type="file"
                id="bodyFile"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleBodyFileChange}
              />
            </div>
            <div className="pt-4">
              <label className="pr-1" htmlFor="headerFile">Headers: </label>
              <input
                type="file"
                id="headerFile"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleHeaderFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

