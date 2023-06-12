package com.example.swaggerBean.RequiredModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPathItem {
    private int path_id;
    private String endpoint;
    private NewOperation pathItem;
    private Map<String, List<ParamValues>> params;
    private String httpMethod;
}
