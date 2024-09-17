package com.games.games.services

import com.games.games.models.User
import com.games.games.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

    @Autowired
    lateinit var userRepo: UserRepository

    fun createUser(username: String): User {
        val newUser = User().apply {
            this.username = username
        }
        return userRepo.save(newUser) // This returns the user with the auto-generated ID
    }
}