package com.jake.photogram.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
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
