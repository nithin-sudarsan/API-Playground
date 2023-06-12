package com.example.swaggerBean.RequiredModel;

import com.example.swaggerBean.models.ApiResponse;
import com.example.swaggerBean.models.RequestBody;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewOperation {
    @JsonProperty("tags")
    private List<String> tags;
    @JsonProperty("summary")
    private String summary;
    @JsonProperty("description")
    private String description;
    @JsonProperty("operationId")
    private String operationId;
    @JsonProperty("requestBody")
    private RequestBody requestBody;
    @JsonProperty("responses")
    private Map<String, ApiResponse> responses;

}
