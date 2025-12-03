package com.example.safestock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SafestockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafestockApplication.class, args);
	}

}
