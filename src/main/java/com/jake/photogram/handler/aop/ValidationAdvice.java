package com.jake.photogram.handler.aop;

import com.jake.photogram.handler.exception.CustomValidationApiException;
import com.jake.photogram.handler.exception.CustomValidationException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

// proceedingJoinPoint : 내부까지 접근할 수 있는 객체
// return 그 함수로 돌아가라
@Slf4j
@Component // RestController, Service 모든 것들이 Component 를 상속해서 만들어져 있음.
@Aspect
public class ValidationAdvice {
    @Around("execution(* com.jake.photogram.controller.api.*Controller.*(..))") // 시작부터 끝날때 까지 관여
    public Object apiAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        // proceedingJoinPoint => profile 함수의 모든 곳에 접근할 수 있는 변수
        // profile 함수보다 먼저 실행
        Object[] args = proceedingJoinPoint.getArgs();
        for (Object arg : args) {
            if(arg instanceof BindingResult bindingResult) {

                if (bindingResult.hasErrors()) {
                    Map<String, String> errorMap = new HashMap<>();
                    for (FieldError error : bindingResult.getFieldErrors()) {
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    }
                    throw new CustomValidationApiException("유효성 검사 실패함", errorMap);
                }
            }
        }
        return proceedingJoinPoint.proceed(); // profile 함수가 실행됨.
    }

    @Around("execution(* com.jake.photogram.controller.*Controller.*(..))")
    public Object advice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();
        for (Object arg : args) {
            if(arg instanceof BindingResult bindingResult) {
                if (bindingResult.hasErrors()) {
                    Map<String, String> errorMap = new HashMap<>();
                    for (FieldError error : bindingResult.getFieldErrors()) {
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    }
                    return new CustomValidationException("유효성 검사 실패함", errorMap);
                }
            }
        }
        return proceedingJoinPoint.proceed();
    }
}
