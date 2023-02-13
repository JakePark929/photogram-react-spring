package com.jake.photogram.service;

import com.jake.photogram.damain.Comment;
import com.jake.photogram.damain.Image;
import com.jake.photogram.damain.User;
import com.jake.photogram.dto.req.CommentRequest;
import com.jake.photogram.handler.exception.CustomApiException;
import com.jake.photogram.repository.CommentRepository;
import com.jake.photogram.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Transactional
    public Comment writeComment(Long userId, CommentRequest request) {
        // Tip (객체를 만들 때 id 값만 담아서 insert 할 수 있다.)
        // 대신 return 시에 image 객체와 user 객체는 id 값만 가지고 있는 빈 객체를 리턴받는다.
        Image image = new Image();
        image.setId(request.getImageId());
        User userEntity = userRepository.findById(userId).orElseThrow(()->{
            throw new CustomApiException("유저 아이디를 찾을 수 없습니다.");
        });

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setImage(image);
        comment.setUser(userEntity);
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long id) {
        try {
            commentRepository.deleteById(id);
        } catch (Exception e) {
            throw new CustomApiException(e.getMessage());
        }
    }
}
