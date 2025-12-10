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
        System.out.println("✅ [FakeMailConfig] Registrando bean dummy JavaMailSender para profile prod/dev");
        return new JavaMailSenderImpl(); // Bean dummy, não envia emails
    }
}
