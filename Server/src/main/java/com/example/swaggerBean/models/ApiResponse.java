package com.example.swaggerBean.models;

import lombok.Data;

import java.util.Map;

@Data
public class ApiResponse {
    //xyz
    private String description;
    private Map<String, MediaType> content;
}
