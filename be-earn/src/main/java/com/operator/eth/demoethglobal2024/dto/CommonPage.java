package com.operator.eth.demoethglobal2024.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommonPage<T> implements Serializable {

    private String code;
    private List<T> data;
    private Integer total;

}
