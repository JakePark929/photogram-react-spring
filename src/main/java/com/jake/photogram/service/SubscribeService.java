package com.jake.photogram.service;

import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;

    @Transactional
    public void subscribe(Long fromUserId, Long toUserId) {
        try {
            subscribeRepository.mSubscribe(fromUserId, toUserId);
        } catch (Exception e) {
            throw new CustomApiException("이미 구독을 하였습니다.");
        }
    }

    @Transactional
    public void unSubscribe(Long fromUserId, Long toUserId) {
        subscribeRepository.mUnSubscribe(fromUserId, toUserId);
    }
}
