import { request } from "@/libs/axios";

export class ProductServices {
  static postProduct(data: any) {
    return request({
      url: `/product/add-user-product/${data.userId}`,
      method: "POST",
      data: data.body,
    });
  }
  static getProducts(id: any) {
    return request({
      url: `/product/get-user-products/${id}`,
      method: "GET",
    });
  }

  static deleteProducts(data: any) {
    return request({
      url: `/product/delete-user-product/${data[0]?.productId}/${data[0]?.userId}`,
      method: "DELETE",
    });
  }
  static updateProduct(data: any) {
    return request({
      url: `/product/edit-user-product/${data.productId}/${data.userId}`,
      method: "PATCH",
      data: data.body,
    });
  }
}
