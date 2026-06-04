import { apiClient } from "./client";
import type {
  BusinessResponse,
  UpdateBusinessResponse,
  CreateBusinessRequest,
  UpdateBusinessRequest,
  UploadResponse,
} from "./types";

export const businessApi = {
  create: (data: CreateBusinessRequest) =>
    apiClient.post<BusinessResponse>("/businesses", data),

  getMy: () => apiClient.get<BusinessResponse>(`/businesses/my`),

  getById: (id: string) => apiClient.get<BusinessResponse>(`/businesses/${id}`),

  update: (id: string, data: UpdateBusinessRequest) =>
    apiClient.put<UpdateBusinessResponse>(`/businesses/${id}`, data),

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
