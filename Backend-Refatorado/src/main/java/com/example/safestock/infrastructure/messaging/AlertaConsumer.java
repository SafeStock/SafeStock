package com.example.safestock.infrastructure.messaging;

import com.example.safestock.infrastructure.websocket.AlertaWebSocketHandler;
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
        System.out.println("🐰 ====================================");
        System.out.println("📩 [RabbitMQ CONSUMER] Mensagem recebida:");
        System.out.println("📄 Conteúdo: " + mensagem);
        System.out.println("⏰ Timestamp: " + java.time.LocalDateTime.now());
        System.out.println("🌐 Enviando via WebSocket...");
        
        try {
            websocketHandler.enviarParaTodos(mensagem);
            System.out.println("✅ WebSocket: Mensagem enviada com sucesso!");
        } catch (Exception e) {
            System.err.println("❌ WebSocket: Erro ao enviar - " + e.getMessage());
        }
        
        System.out.println("🐰 ====================================");
    }
}
