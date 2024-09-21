package com.operator.eth.demoethglobal2024.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailVo implements Serializable {

    private String apy;
    private String tvl;
    private String poolAddress;
    private String riskScore;
    private String token0Symbol;
    private String token1Symbol;

}
