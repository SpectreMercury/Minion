package com.operator.eth.demoethglobal2024.remote.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoolDto implements Serializable {
    private String id;
    private Token token0;
    private Token token1;
    private int feeTier;
    private String liquidity;
    private String sqrtPrice;
    private String feesUSD;
    private String totalValueLockedUSD;
    private String volumeUSD;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Token implements Serializable {
        private String id;
        private String symbol;
        private String name;
    }
}
