package com.example.swaggerBean.models;

import lombok.Data;

@Data
public class Parameter {
    private String name;
    private String in;
    private Boolean required;
    private Object schema;
}
