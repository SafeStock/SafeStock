package com.example.safestock.service;


import com.example.safestock.config.RabbitMQ.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class AlertaRabbitMQService {

    private final RabbitTemplate rabbitTemplate;

    public AlertaRabbitMQService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarAlerta(String mensagem) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                "alerta.novo",
                mensagem
        );
        System.out.println("📩 Mensagem enviada ao RabbitMQ: " + mensagem);
    }
}