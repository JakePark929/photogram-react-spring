package com.jake.photogram.service;

import com.jake.photogram.dto.res.SubscribeListResponse;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.repository.SubscribeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final EntityManager em; // Repository 는 EntityManager 를 구현해서 만들어져 있는 구현체

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

    @Transactional(readOnly = true)
    public List<SubscribeListResponse> subscribeList(Long pageUserId, Long principalId) {
        // 쿼리 준비
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT u.id, u.username, u.profileImageUrl, ");
        sb.append("if((SELECT 1 FROM subscribe WHERE fromUserId = " + principalId + " AND toUserId = u.id), 1, 0) subscribeState, ");
        sb.append("if((u.id = " + principalId + "), 1, 0) equalUserState ");
        sb.append("FROM user u INNER JOIN subscribe s ON u.id = s.toUserId ");
        sb.append("WHERE s.fromUserId = " + pageUserId); // 세미콜론 첨부하면 안됨
        // 1. 물음표 principalId
        // 2. 물음표 principalId
        // 3. 물음표 pageUserId
        log.info("sb: {}", sb);

        // 쿼리 완성
        Query query = em.createNativeQuery(sb.toString(), SubscribeListResponse.class);
        List<SubscribeListResponse> response = query.getResultList();

        // 쿼리 실행
        log.info("query: {}", query.getResultList().toString());

        return response;
    }
}
