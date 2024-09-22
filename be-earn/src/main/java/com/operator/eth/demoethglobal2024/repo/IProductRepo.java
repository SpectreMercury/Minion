package com.operator.eth.demoethglobal2024.repo;

import com.operator.eth.demoethglobal2024.dto.CommonPage;
import com.operator.eth.demoethglobal2024.dto.CommonResult;
import com.operator.eth.demoethglobal2024.dto.ProductDetailVo;
import com.operator.eth.demoethglobal2024.dto.ProductsVo;

public interface IProductRepo {

    CommonPage<ProductsVo> fetchList(int page, int size);

    CommonResult<ProductDetailVo> fetchDetail(Long investmentId);
}
