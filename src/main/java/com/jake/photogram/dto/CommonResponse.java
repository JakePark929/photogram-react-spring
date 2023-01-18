package com.jake.photogram.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponse<T> {
    private int statusCode;
    private T data;

    public CommonResponse(int statusCode) {
        this.statusCode = statusCode;
    }
}
