package com.example.swaggerBean.service;

import com.example.swaggerBean.RequiredModel.Product;
import com.example.swaggerBean.RequiredModel.ProductInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface SwaggerService {
    Product saveProduct(String json,String csvFile) throws IOException;
    List<Product> getAllProducts();
    Optional<Product> getById(String id);
    Product importJsonFile(String json, String csvFile) throws IOException;
    List<ProductInfo> getProductsInfo();
}
