package com.jake.photogram.handler;

import com.jake.photogram.dto.ExceptionResponse;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.handler.exception.CustomValidationException;
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
    public ResponseEntity<?> validationException(CustomValidationException e) {
        if (e.getErrorMap() == null) {
            return new ResponseEntity<>(new ExceptionResponse<>(-1, e.getMessage()), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ExceptionResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<ExceptionResponse<?>> validationApiException(CustomValidationApiException e) {
        return new ResponseEntity<>(new ExceptionResponse<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomApiException.class)
    public ResponseEntity<ExceptionResponse<?>> apiException(CustomApiException e) {
        return new ResponseEntity<>(new ExceptionResponse<>(-1, e.getMessage(), null), HttpStatus.BAD_REQUEST);
    }
}
