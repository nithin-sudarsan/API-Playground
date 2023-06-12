package com.example.swaggerBean.RequiredModel;

import com.example.swaggerBean.models.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String openapi;
    private ApiInfo info;
    private Object servers;
    private Components components;
    private List<NewPathItem> paths;
    private Object headers;
}
