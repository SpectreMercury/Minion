package com.operator.eth.demoethglobal2024.data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class InvestmentInfo {

    private Long id;
    private String poolAddress;
    private Integer poolStatus;
    private BigDecimal liquidity;
    private BigDecimal dailyFee;
    private BigDecimal feeTier;

    private BigDecimal apy;
    private BigDecimal tvl;
    private BigDecimal riskScore;
    private String token0Address;
    private String token1Address;
    private BigDecimal token0Digit;
    private BigDecimal token1Digit;
    private String token0Symbol;
    private String token1Symbol;
    private BigDecimal volumeFiat;

    private Date dbCreateTime;
    private Date dbUpdateTime;
    private Boolean deleted;
}
