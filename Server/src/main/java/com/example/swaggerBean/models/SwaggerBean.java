package com.example.swaggerBean.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Map;

@Data
@Document(collection = "swagger")
public class SwaggerBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @JsonProperty("openapi")
    protected String openapi;
    @JsonProperty("info")
    private ApiInfo info;
    @JsonProperty("servers")
    private Object servers;
    @JsonProperty("components")
    private Components components;
    @JsonProperty("paths")
    private Map<String, PathItem> paths;
}
