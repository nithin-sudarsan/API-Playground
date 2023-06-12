package com.example.swaggerBean.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Operation {
    @JsonProperty("tags")
    private List<String> tags;
    @JsonProperty("summary")
    private String summary;
    @JsonProperty("description")
    private String description;
    @JsonProperty("operationId")
    private String operationId;
    @JsonProperty("parameters")
    private List<Parameter> parameters;
    @JsonProperty("requestBody")
    private RequestBody requestBody;
    @JsonProperty("responses")
    private Map<String, ApiResponse> responses;

}
