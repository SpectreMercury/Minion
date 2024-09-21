package com.operator.eth.demoethglobal2024.repo;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.operator.eth.demoethglobal2024.data.entity.InvestmentInfo;
import com.operator.eth.demoethglobal2024.data.mapper.InvestmentInfoMapper;
import com.operator.eth.demoethglobal2024.dto.CommonPage;
import com.operator.eth.demoethglobal2024.dto.CommonResult;
import com.operator.eth.demoethglobal2024.dto.ProductDetailVo;
import com.operator.eth.demoethglobal2024.dto.ProductsVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ProductRepo extends ServiceImpl<InvestmentInfoMapper, InvestmentInfo> implements IProductRepo{

    private final InvestmentInfoMapper investmentInfoMapper;

    @Override
    public CommonPage<ProductsVo> fetchList(int page, int size) {
        LambdaQueryWrapper<InvestmentInfo> queryWrapper = new LambdaQueryWrapper<InvestmentInfo>()
                .orderByDesc(InvestmentInfo::getTvl, InvestmentInfo::getApy);
        return convert(this.page(new Page<>(page, size), queryWrapper));
    }

    @Override
    public CommonResult<ProductDetailVo> fetchDetail(Long investmentId) {
        InvestmentInfo investmentInfo = investmentInfoMapper.selectById(investmentId);
        if (null == investmentInfo) {return CommonResult.<ProductDetailVo>builder().build();}
        return CommonResult.<ProductDetailVo>builder().data(convertDetail(investmentInfo)).build();
    }

    private ProductDetailVo convertDetail(InvestmentInfo investmentInfo) {
        return ProductDetailVo.builder()
                .apy(Optional.ofNullable(investmentInfo.getApy()).map(BigDecimal::toPlainString).orElse(BigDecimal.ZERO.toPlainString()))
                .tvl(Optional.ofNullable(investmentInfo.getTvl()).map(BigDecimal::toPlainString).orElse(BigDecimal.ZERO.toPlainString()))
                .riskScore(investmentInfo.getRiskScore().toPlainString())
                .token0Symbol(investmentInfo.getToken0Symbol())
                .token1Symbol(investmentInfo.getToken1Symbol())
                .poolAddress(investmentInfo.getPoolAddress())
                .build();
    }

    // 生成一个Java方法，把Page<InvestmentInfo>转换为CommonPage<ProductsVo>
    private CommonPage<ProductsVo> convert(Page<InvestmentInfo> srcPage){
        if (Objects.isNull(srcPage) || srcPage.getRecords() == null || srcPage.getRecords().isEmpty()){
            return new CommonPage<>();
        }
        List<ProductsVo> list = srcPage.getRecords().stream().map(x ->
                ProductsVo.builder()
                        .id(x.getId().toString())
                        .apy(Optional.ofNullable(x.getApy()).map(BigDecimal::toPlainString).orElse(BigDecimal.ZERO.toPlainString()))
                        .tvl(Optional.ofNullable(x.getTvl()).map(BigDecimal::toPlainString).orElse(BigDecimal.ZERO.toPlainString()))
                        .pair(x.getToken0Symbol() + "/" + x.getToken1Symbol())
                        .riskScore(x.getRiskScore().toPlainString())
                        .volumeFiat(Optional.ofNullable(x.getVolumeFiat()).map(BigDecimal::toPlainString).orElse(BigDecimal.ZERO.toPlainString()))
                        .build()
        ).toList();
        CommonPage<ProductsVo> commonPage = new CommonPage<>();
        commonPage.setData(list);
        commonPage.setCode("000000");
        commonPage.setTotal(srcPage.getRecords().size());
        return commonPage;
    }




}


