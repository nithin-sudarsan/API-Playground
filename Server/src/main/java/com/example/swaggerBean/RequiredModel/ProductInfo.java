package com.example.swaggerBean.RequiredModel;

import com.example.swaggerBean.models.ApiInfo;
import lombok.Data;

@Data
public class ProductInfo {
    private String id;
    private ApiInfo apiInfo;
}
