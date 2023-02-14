package com.jake.photogram.handler;

import com.jake.photogram.dto.CommonResponse;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.handler.exception.CustomException;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.handler.exception.CustomValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<CommonResponse<?>> validationException(CustomValidationException e) {
//        return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
        if (e.getErrorMap() == null) {
            return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage()), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
        }
    }

//    public String validationException(CustomValidationException e) {
//        if (e.getErrorMap() == null) {
//            return Script.back(e.getMessage());
//        } else {
//            return Script.back(e.getErrorMap().toString());
//        }
//    }

    @ExceptionHandler(CustomValidationApiException.class)
    public ResponseEntity<CommonResponse<?>> validationApiException(CustomValidationApiException e) {
        return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomApiException.class)
    public ResponseEntity<CommonResponse<?>> apiException(CustomApiException e) {
        return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<CommonResponse<?>> exception(CustomException e) {
        return new ResponseEntity<>(new CommonResponse<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
    }
}
