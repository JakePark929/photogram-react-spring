package com.jake.photogram.repository;

import com.jake.photogram.damain.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    // subscribe native query
    @Modifying // INSERT, UPDATE, DELETE를 네이티브 쿼리로 작성하려면 해당 어노테이션 필요!!
    @Query(value = "INSERT INTO subscribe(fromUserId, toUserId, createDate) VALUES(:fromUserId, :toUserId, now())", nativeQuery = true)
    void mSubscribe(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId); // 1(변경된 행의 개수가 리턴됨), 0(변경된 행 없음), -1(오류)

    @Modifying
    @Query(value = "DELETE FROM subscribe WHERE fromUserId = :fromUserId AND toUserId = :toUserId", nativeQuery = true)
    void mUnSubscribe(@Param("fromUserId") Long fromUserId, @Param("toUserId") Long toUserId); // 1(변경된 행의 개수가 리턴됨), 0(변경된 행 없음), -1(오류)

    // 구독정보
    @Query(value = "SELECT COUNT(*) FROM subscribe WHERE fromUserId = :principalId AND toUserId = :pageUserId", nativeQuery = true)
    int mSubScribeState(@Param("pageUserId") Long pageUserId, @Param("principalId") Long principalId);

    // 구독자 수
    @Query(value = "SELECT COUNT(*) FROM subscribe WHERE fromUserId = :pageUserId", nativeQuery = true)
    int mSubscribeCount(@Param("pageUserId") Long pageUserId);

    @Query(value = "SELECT COUNT(*) FROM subscribe WHERE toUserId = :pageUserId", nativeQuery = true)
    int mSubscribedCount(@Param("pageUserId") Long pageUserId);
}
