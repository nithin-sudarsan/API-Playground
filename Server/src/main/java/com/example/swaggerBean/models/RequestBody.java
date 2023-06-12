package com.example.swaggerBean.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Map;

@Data
public class RequestBody {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, MediaType> content;
    private Boolean required;

}
