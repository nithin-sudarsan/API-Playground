package com.example.swaggerBean.models;

import lombok.Data;

@Data
public class PathItem {
    private Operation get;
    private Operation post;
    private Operation put;
    private Operation delete;
}
