package com.example.safestock.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
@Profile({"prod", "dev"})
public class FakeMailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSenderImpl(); 
    }
}
