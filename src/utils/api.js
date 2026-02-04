import decryptResponse from './decrypt';

/**
 * Uploads a single file to the server and returns the file metadata including URL.
 * @param {File} file - The file object to upload.
 * @returns {Promise<{originalName: string, url: string, type: string}>}
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('images', file);

  try {
    const response = await fetch('https://api.probroker.in/cjidnvij/ceksfbuebijn/user/uploadImages', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    let data = responseData;

    // Handle encrypted response
    if (responseData.encrypted) {
      data = decryptResponse(responseData.encrypted);
    } else if (responseData.data && responseData.data.encrypted) {
      data = decryptResponse(responseData.data.encrypted);
    } else if (typeof responseData === 'string') {
      // Just in case the whole body is the encrypted string
      data = decryptResponse(responseData);
    }

    if (!data) {
      throw new Error('Failed to decrypt response');
    }

    // Ensure we have the url
    let fileUrl = null;
    let originalName = null;
    let type = "image";

    if (data.files && Array.isArray(data.files) && data.files.length > 0) {
        const fileData = data.files[0];
        fileUrl = fileData.url;
        originalName = fileData.originalName;
        type = fileData.type || "image";
    } else {
        // Fallback to previous structure just in case
        fileUrl = data.url || (data.data && data.data.url);
        originalName = data.originalName;
        type = data.type || "image";
    }
    
    if (!fileUrl) {
        console.error("No URL in response:", data);
        throw new Error('No URL returned from upload API');
    }

    return {
      originalName: originalName || file.name,
      url: fileUrl,
      type: type,
    };
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};
