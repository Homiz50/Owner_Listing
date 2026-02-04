import React, { useState, useEffect } from 'react';

const ImageUploader = ({ images = [], onImagesChange, maxImages = 10, name = "images" }) => {
  const [error, setError] = useState('');
  // const [isUploading, setIsUploading] = useState(false); // No longer needed as we don't upload immediately

  // Clean up object URLs when component unmounts (legacy support)
  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    setError('');
    
    // Store files locally with preview
    const newImages = files.map(file => ({
        file: file,
        originalName: file.name,
        type: file.type || "image",
        preview: URL.createObjectURL(file)
    }));

    onImagesChange({ target: { name, value: [...images, ...newImages] } });
    
    // Reset input value to allow selecting the same file again if needed
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    const imageToRemove = newImages[index];
    if (imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
    }
    
    newImages.splice(index, 1);
    onImagesChange({ target: { name, value: newImages } });
    setError('');
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>Choose Images</span>
            <input 
                type="file" 
                multiple 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                className="hidden" 
                onChange={handleFileChange}
            />
            </label>
            <span className="text-xs text-gray-500">{images.length} / {maxImages} images selected</span>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-md border border-red-100">{error}</p>}

        {images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                <img 
                  src={image.preview || image.url || (typeof image === 'string' ? image : URL.createObjectURL(image))} 
                  alt={`preview ${index}`} 
                  className="w-full h-full object-cover" 
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-100 transition-opacity duration-200 shadow-md hover:bg-red-600"
                  title="Remove image"
                  type="button"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
