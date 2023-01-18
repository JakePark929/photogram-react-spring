package com.jake.photogram.handler;

import com.jake.photogram.dto.ExceptionResponse;
import com.jake.photogram.handler.ex.CustomValidationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(CustomValidationException.class)
    public ExceptionResponse<?> validationException(CustomValidationException e) {
        return new ExceptionResponse<>(-1, e.getMessage(), e.getErrorMap());
    }
}
