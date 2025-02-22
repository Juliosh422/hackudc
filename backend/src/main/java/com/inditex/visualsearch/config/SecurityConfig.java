package com.inditex.visualsearch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Desactiva CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()  // Permitir acceso a la API
                        .anyRequest().permitAll()  // Permitir acceso a cualquier URL
                )
                .formLogin(form -> form.disable())  // Deshabilita el formulario de login
                .httpBasic(httpBasic -> httpBasic.disable());  // Deshabilita autenticación básica

        return http.build();
    }
}
