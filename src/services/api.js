const BASE_URL = 'https://picsum.photos';

/**
 * Fetch a list of photos from Lorem Picsum API
 * @param {number} page - The page number to fetch
 * @param {number} limit - Number of photos per page
 * @returns {Promise<Array>} Array of photo objects
 */
export const fetchPhotos = async (page = 1, limit = 30) => {
  try {
    const response = await fetch(`${BASE_URL}/v2/list?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

/**
 * Fetch details of a specific photo by ID
 * @param {string} id - The photo ID
 * @returns {Promise<Object>} Photo details object
 */
export const fetchPhotoById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/id/${id}/info`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photo details:', error);
    throw error;
  }
};

/**
 * Get the image URL for a specific photo
 * @param {string} id - The photo ID
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Image URL
 */
export const getImageUrl = (id, width = 400, height = 300) => {
  return `${BASE_URL}/id/${id}/${width}/${height}`;
};
