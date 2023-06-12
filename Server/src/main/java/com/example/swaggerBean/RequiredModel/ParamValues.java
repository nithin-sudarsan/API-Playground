package com.example.swaggerBean.RequiredModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParamValues {
    private String name;
    private Boolean required;
    private Object schema;
}
