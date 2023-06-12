package com.example.swaggerBean.controllers;

import com.example.swaggerBean.RequiredModel.Product;
import com.example.swaggerBean.RequiredModel.ProductInfo;
import com.example.swaggerBean.service.SwaggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/product")
@CrossOrigin(origins = "http://localhost:5173")
public class SwaggerController {
    private final SwaggerService swaggerService;

    @PostMapping("/import")
    public Product importJson(@RequestParam("file") MultipartFile file, @RequestParam("headers") MultipartFile header_file ) {
        String requestBody=null;
        String csvFile=null;
        Map<String, String> headers= new HashMap<>();
        try {
            byte[] bytes = file.getBytes();
            requestBody = new String(bytes, StandardCharsets.UTF_8);

            byte[] csv_bytes=header_file.getBytes();
            csvFile=new String(csv_bytes, StandardCharsets.UTF_8);

        }
        catch (Exception e) {
            System.out.println("Could not upload files: "+ e.getMessage());
        }
        try {
            return swaggerService.saveProduct(requestBody,csvFile);
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping
    public List<Product> getProducts(){return swaggerService.getAllProducts();}
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable String id){
        return swaggerService.getById(id);
    }
    @GetMapping("/info")
    public List<ProductInfo> getProductsInfo(){
        return swaggerService.getProductsInfo();
    }
}
