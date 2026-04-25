import { apiClient } from "./client";
import type {
  CreateProductRequest,
  UpdateProductRequest,
  UploadGalleryResponse,
  DeleteImageResponse,
  DeleteProductResponse,
  ProductsListResponse,
  ProductResponse,
} from "./types";

export const productsApi = {
  getByBusiness: (businessId: string) =>
    apiClient.get<ProductsListResponse>(`/products/${businessId}`),

  getById: (productId: string) =>
    apiClient.get<ProductResponse>(`/products/${productId}`),

  create: (data: CreateProductRequest) =>
    apiClient.post<ProductResponse>(`/products/`, data),

  update: (productId: string, data: UpdateProductRequest) =>
    apiClient.put<ProductResponse>(`/products/${productId}`, data),

  delete: (productId: string) =>
    apiClient.delete<DeleteProductResponse>(`/products/${productId}`),

  deleteImage: (imageId: number) =>
    apiClient.delete<DeleteImageResponse>(`/products/images/${imageId}`),

  uploadGallery: (productId: string, files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    return apiClient.upload<UploadGalleryResponse>(
      `/products/${productId}/upload-gallery`,
      formData,
    );
  },
};
