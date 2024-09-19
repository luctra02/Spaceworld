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

    @PostMapping("/users")
    fun createUser(@Valid @RequestBody userRequest: User): User {

        // Pass the userId and username to the service to create the user
        return userService.createUser(userRequest.userId!!, userRequest.username)
    }

}
