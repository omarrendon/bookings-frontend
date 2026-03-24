import { apiClient } from "./client";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  UploadResponse,
} from "./types";

export const productsApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<Product[]>(`/businesses/${businessId}/products`),

  getById: (businessId: string, productId: string) =>
    apiClient.get<Product>(`/businesses/${businessId}/products/${productId}`),

  create: (businessId: string, data: CreateProductRequest) =>
    apiClient.post<Product>(`/businesses/${businessId}/products`, data),

  update: (businessId: string, productId: string, data: UpdateProductRequest) =>
    apiClient.put<Product>(
      `/businesses/${businessId}/products/${productId}`,
      data,
    ),

  delete: (businessId: string, productId: string) =>
    apiClient.delete<void>(
      `/businesses/${businessId}/products/${productId}`,
    ),

  uploadGallery: (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    return apiClient.upload<UploadResponse[]>("/products/upload-gallery", formData);
  },
};
