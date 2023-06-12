package com.example.swaggerBean.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class Components {
    @JsonProperty("schemas")
    private Map<String, Object> schemas;
}