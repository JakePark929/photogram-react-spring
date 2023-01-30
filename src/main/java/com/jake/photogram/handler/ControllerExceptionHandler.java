package com.jake.photogram.handler;

import com.jake.photogram.dto.ExceptionResponse;
import com.jake.photogram.handler.ex.CustomValidationApiException;
import com.jake.photogram.handler.ex.CustomValidationException;
import com.jake.photogram.util.Script;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(CustomValidationException.class)
//    public ExceptionResponse<?> validationException(CustomValidationException e) {
    public String validationException(CustomValidationException e) {
//        return new ExceptionResponse<>(-1, e.getMessage(), e.getErrorMap());
        return Script.back(e.getErrorMap().toString());
    }

    @ExceptionHandler(CustomValidationApiException.class)
    public ResponseEntity<ExceptionResponse<?>> validationApiException(CustomValidationApiException e) {
        return new ResponseEntity<>(new ExceptionResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }
}
