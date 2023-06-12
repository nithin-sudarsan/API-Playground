package com.example.swaggerBean.service;

import com.example.swaggerBean.Repository.SwaggerRepo;
import com.example.swaggerBean.RequiredModel.*;
import com.example.swaggerBean.models.Operation;
import com.example.swaggerBean.models.Parameter;
import com.example.swaggerBean.models.PathItem;
import com.example.swaggerBean.models.SwaggerBean;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.*;
import static org.slf4j.LoggerFactory.getLogger;

@Service
@RequiredArgsConstructor
public class SwaggerServiceImpl implements SwaggerService {
    private final SwaggerRepo swaggerRepo;
    private final Logger logger = getLogger(getClass());
    @Override
    public Product saveProduct(String json, String headers) throws IOException {
        return swaggerRepo.save(importJsonFile(json, headers));
    }

    @Override
    public List<Product> getAllProducts() {
        return swaggerRepo.findAll();
    }

    @Override
    public Optional<Product> getById(String id) {
        return swaggerRepo.findById(id);
    }

    @Override
    public Product importJsonFile(String json, String csvFile) throws IOException {
        final SwaggerBean swaggerBean;
        try {
            swaggerBean = new ObjectMapper(new YAMLFactory()).disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).disable(DeserializationFeature.USE_JAVA_ARRAY_FOR_JSON_ARRAY).readValue(json, SwaggerBean.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Map<String, String> headers= new HashMap<>();
        CSVParser csvParser = CSVParser.parse(csvFile, CSVFormat.DEFAULT);
        List<CSVRecord> records = csvParser.getRecords();
        for (CSVRecord record : records) {
            String key = record.get(0);
            String value = record.get(1);

            if (key.isEmpty() || value.isEmpty()) {
                continue; // Skip empty key-value pairs
            }

            headers.put(key, value);
        }

        Product product = new Product();
        product.setOpenapi(swaggerBean.getOpenapi());
        product.setInfo(swaggerBean.getInfo());
        product.setServers(swaggerBean.getServers());
        product.setComponents(swaggerBean.getComponents());
        List<NewPathItem> pathList = new ArrayList<>();
        int pathItemCount=0;
        for (Map.Entry<String, PathItem> entry : swaggerBean.getPaths().entrySet()) {
            for (Map.Entry<String, Operation> operation : getOperations(entry.getValue()).entrySet()) {
                var newPathItem = new NewPathItem();
                newPathItem.setEndpoint(entry.getKey());
                Map<String, List<ParamValues>> params = new HashMap<>();
                List<ParamValues> queryParams = new ArrayList<>();
                List<ParamValues> pathParams = new ArrayList<>();
                if (operation.getValue().getParameters() != null) {
                    for (Parameter param : operation.getValue().getParameters()) {
                        ParamValues paramValues = new ParamValues();
                        paramValues.setRequired(param.getRequired());
                        paramValues.setName(param.getName());
                        paramValues.setSchema(param.getSchema());
                        if (Objects.equals(param.getIn(), "query")) {
                            queryParams.add(paramValues);
                        } else {
                            pathParams.add(paramValues);
                        }
                    }
                    if (!queryParams.isEmpty()) {
                        params.put("Query", queryParams);
                    }
                    if (!pathParams.isEmpty()) {
                        params.put("Path", pathParams);
                    }
                }
                newPathItem.setParams(params);
                NewOperation newOperation = new NewOperation();
                newOperation.setTags(operation.getValue().getTags());
                newOperation.setSummary(operation.getValue().getSummary());
                newOperation.setDescription(operation.getValue().getDescription());
                newOperation.setOperationId(operation.getValue().getOperationId());
                newOperation.setRequestBody(operation.getValue().getRequestBody());
                newOperation.setResponses(operation.getValue().getResponses());

                newPathItem.setPathItem(newOperation);
                newPathItem.setHttpMethod(operation.getKey());
                newPathItem.setPath_id(pathItemCount);
                pathItemCount+=1;
                pathList.add(newPathItem);
            }
        }
        product.setPaths(pathList);
        product.setHeaders(headers);
        return product;
    }


    @Override
    public List<ProductInfo> getProductsInfo() {
        List<ProductInfo> productInfoList= new ArrayList<>();
        List<Product> productsList= swaggerRepo.findAll();
        for(Product product: productsList)
        {
            ProductInfo productInfo= new ProductInfo();
            productInfo.setId(product.getId());
            productInfo.setApiInfo(product.getInfo());
            productInfoList.add(productInfo);
        }
        return productInfoList;
    }

    private Map<String,Operation> getOperations(PathItem pathItem) {
        Map<String,Operation> operations =new HashMap<>();
        if (pathItem.getGet() != null) {
            operations.put("GET",pathItem.getGet());
        }
        if (pathItem.getPost() != null) {
            operations.put("POST",pathItem.getPost());
        }
        if (pathItem.getPut() != null) {
            operations.put("PUT",pathItem.getPut());
        }
        if (pathItem.getDelete() != null) {
            operations.put("DELETE",pathItem.getDelete());
        }
        return operations;
    }
}
