import api from "../utils/api";
import { API_ENDPOINTS } from "../config";

export interface Photo {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const photoService = {
  // Get all photos
  getAllPhotos: async () => {
    const response = await api.get<Photo[]>(API_ENDPOINTS.photos);
    return response.data;
  },

  // Get a single photo by ID
  getPhotoById: async (id: string) => {
    const response = await api.get<Photo>(`${API_ENDPOINTS.photos}/${id}`);
    return response.data;
  },

  // Upload a new photo
  uploadPhoto: async (formData: FormData) => {
    const response = await api.post<Photo>(API_ENDPOINTS.photos, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update a photo
  updatePhoto: async (id: string, data: Partial<Photo>) => {
    const response = await api.put<Photo>(
      `${API_ENDPOINTS.photos}/${id}`,
      data
    );
    return response.data;
  },

  // Delete a photo
  deletePhoto: async (id: string) => {
    const response = await api.delete(`${API_ENDPOINTS.photos}/${id}`);
    return response.data;
  },
};
