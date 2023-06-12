package com.example.swaggerBean.Repository;

import com.example.swaggerBean.RequiredModel.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SwaggerRepo extends MongoRepository<Product, String > {
}
