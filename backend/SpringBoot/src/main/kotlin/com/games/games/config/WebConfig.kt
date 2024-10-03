package com.games.games.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

// Adjust the package name as needed

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") // Allow all endpoints
            .allowedOrigins("http://localhost:3000") // Allow your frontend URL
            .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") // Allow necessary HTTP methods
            .allowCredentials(true) // Allow credentials if needed
    }
}