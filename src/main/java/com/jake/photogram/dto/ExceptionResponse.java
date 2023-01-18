package com.jake.photogram.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionResponse<T> {
    private int code; // 1(성공), -1(실패)
    private String message;
    private T data;
}
