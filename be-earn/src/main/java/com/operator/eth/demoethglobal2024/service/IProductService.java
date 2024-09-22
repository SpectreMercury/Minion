package com.operator.eth.demoethglobal2024.service;

import com.operator.eth.demoethglobal2024.dto.CommonPage;
import com.operator.eth.demoethglobal2024.dto.CommonResult;
import com.operator.eth.demoethglobal2024.dto.ProductDetailVo;
import com.operator.eth.demoethglobal2024.dto.ProductsVo;

public interface IProductService {


    CommonPage<ProductsVo> fetchProductList(Integer integer, Integer integer1);

    CommonResult<ProductDetailVo> fetchProductDetails(Long investmentId);
}
