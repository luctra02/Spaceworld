package com.games.games.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") // Allow all endpoints
            .allowedOrigins("*") // Allow local and production frontend URLs
            .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") // Allow necessary HTTP methods
            .allowCredentials(true) // Allow credentials if needed
    }
}
