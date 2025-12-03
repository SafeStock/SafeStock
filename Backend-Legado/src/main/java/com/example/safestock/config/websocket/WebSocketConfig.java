package com.example.safestock.config.websocket;

import com.example.safestock.websocket.AlertaWebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final AlertaWebSocketHandler alertaHandler;

    public WebSocketConfig(AlertaWebSocketHandler alertaHandler) {
        this.alertaHandler = alertaHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        String frontendUrl = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:5173");
        registry.addHandler(alertaHandler, "/ws/alertas")
                // 🔹 permite que o front React acesse o WebSocket
                .setAllowedOrigins(frontendUrl);
    }
}