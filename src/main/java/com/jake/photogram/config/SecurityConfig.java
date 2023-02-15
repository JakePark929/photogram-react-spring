package com.jake.photogram.config;

import com.jake.photogram.config.oauth.OAuth2DetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final OAuth2DetailsService oAuth2DetailsService;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable() // postman 등의 요청에서 토큰값을 확인하는 설정
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/user/**", "image/**", "/subscribe/**", "comment/**", "/api/**"
                        ).authenticated()
                        .anyRequest().permitAll()
                )
                .formLogin()
                    .loginPage("/auth/sign-in") // GET
                    .loginProcessingUrl("/auth/sign-in") // POST
                    .defaultSuccessUrl("/", true)
                .and()
                .oauth2Login() // form 로그인도 하는데, oauth2 로그인도 할거임
                    .userInfoEndpoint()// oauth2 로그인을 하면 최종 응답을 회원정보를 바로 받을 수 있다.
                    .userService(oAuth2DetailsService)
                    .and()
                .and()
                .build();
    }

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
