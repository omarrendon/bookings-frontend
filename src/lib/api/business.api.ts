import { apiClient } from "./client";
import type {
  Business,
  BusinessResponse,
  CreateBusinessRequest,
  UpdateBusinessRequest,
  UploadResponse,
} from "./types";

export const businessApi = {
  create: (data: CreateBusinessRequest) =>
    apiClient.post<BusinessResponse>("/businesses", data),

  getById: (id: string) => apiClient.get<BusinessResponse>(`/businesses/${id}`),

  update: (id: string, data: UpdateBusinessRequest) =>
    apiClient.put<BusinessResponse>(`/businesses/${id}`, data),

  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.upload<UploadResponse>(
      "/businesses/upload-image",
      formData,
    );
  },

  uploadGallery: (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    return apiClient.upload<UploadResponse[]>(
      "/businesses/upload-gallery",
      formData,
    );
  },
};
