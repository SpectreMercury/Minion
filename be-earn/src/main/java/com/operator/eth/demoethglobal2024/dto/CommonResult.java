package com.operator.eth.demoethglobal2024.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {

    private T data;
    private String code;
    private String msg;

    public static <T> CommonResult<T> success(T data) {
        return CommonResult.<T>builder().code("000000").data(data).build();
    }

}
