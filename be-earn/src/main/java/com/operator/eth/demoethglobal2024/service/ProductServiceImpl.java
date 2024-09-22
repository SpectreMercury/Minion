package com.operator.eth.demoethglobal2024.service;

import com.operator.eth.demoethglobal2024.dto.CommonPage;
import com.operator.eth.demoethglobal2024.dto.CommonResult;
import com.operator.eth.demoethglobal2024.dto.ProductDetailVo;
import com.operator.eth.demoethglobal2024.dto.ProductsVo;
import com.operator.eth.demoethglobal2024.repo.IProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService{

    private final IProductRepo productRepo;

    @Override
    public CommonPage<ProductsVo> fetchProductList(Integer page, Integer size) {
        return productRepo.fetchList(page, size);
    }

    @Override
    public CommonResult<ProductDetailVo> fetchProductDetails(Long investmentId) {
        return productRepo.fetchDetail(investmentId);
    }
}
