package com.games.games.controller

import com.games.games.models.User
import com.games.games.services.UserService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/api")
class UserController {

    @Autowired
    lateinit var userService: UserService

    // Create a new user (POST request)
    @PostMapping("/users")
    fun createUser(@RequestBody userRequest: User): User {
        // Pass the userId and username to the service to create the user
        return userService.createUser(userRequest.userId!!, userRequest.username)
    }

    // Find a user by userId (GET request)
    @GetMapping("/users/{userId}")
    fun findUser(@PathVariable userId: String): User {
        // Pass the userId to the service to find the user
        return userService.findUser(userId)
    }
    @PutMapping("/users/username/{userId}")
    fun updateUser(@PathVariable userId: String, @Valid @RequestBody username: String): User {
        // Pass the userId to the service to find the user
        return userService.updateUser(userId, username)
    }

    @GetMapping("/users/username/{userId}")
    fun findUsername(@PathVariable userId: String): String {
        return userService.findUsername(userId)
    }
}
