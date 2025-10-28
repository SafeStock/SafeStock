package com.example.safestock.consumer;


import com.example.safestock.config.RabbitMQ.RabbitMQConfig;
import com.example.safestock.websocket.AlertaWebSocketHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class AlertaConsumer {

    private final AlertaWebSocketHandler websocketHandler;

    public AlertaConsumer(AlertaWebSocketHandler websocketHandler) {
        this.websocketHandler = websocketHandler;
    }

    // Escuta mensagens da fila e repassa via WebSocket
    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void consumirMensagem(String mensagem) {
        System.out.println("📩 [RabbitMQ] Mensagem recebida: " + mensagem);
        websocketHandler.enviarParaTodos(mensagem);
    }
}