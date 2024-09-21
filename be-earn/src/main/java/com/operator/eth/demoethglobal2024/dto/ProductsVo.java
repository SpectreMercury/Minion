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
public class ProductsVo implements Serializable {

    private String id;
    private String pair;
    private String apy;
    private String tvl;
    private String riskScore;
    private String volumeFiat;

}
