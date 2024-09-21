package com.operator.eth.demoethglobal2024.web;

import com.operator.eth.demoethglobal2024.dto.CommonPage;
import com.operator.eth.demoethglobal2024.dto.CommonResult;
import com.operator.eth.demoethglobal2024.dto.ProductDetailVo;
import com.operator.eth.demoethglobal2024.dto.ProductsVo;
import com.operator.eth.demoethglobal2024.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController("/product/api/v1")
public class ProductController {

    @Autowired
    @Qualifier("productServiceImpl")
    private IProductService productService;

    @CrossOrigin(origins = "*")
    @GetMapping("/list")
    public CommonPage<ProductsVo> productList(@RequestParam(required = false) Integer page,
                                              @RequestParam(required = false) Integer size) {

        return productService.fetchProductList(defaultPageInfo(page, 0), defaultPageInfo(size,10));
    }

    private Integer defaultPageInfo(Integer src, Integer defaultValue){
        return Objects.isNull(src) || src == 0 ? defaultValue : src;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/detail")
    public CommonResult<ProductDetailVo> productList(@RequestParam Long investmentId) {

        return productService.fetchProductDetails(investmentId);
    }

}
