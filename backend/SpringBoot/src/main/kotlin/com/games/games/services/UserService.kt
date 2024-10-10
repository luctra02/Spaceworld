package com.games.games.services

import com.games.games.models.User
import com.games.games.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

    @Autowired
    lateinit var userRepo: UserRepository

    fun createUser(userId: String, username: String): User {
        val newUser = User().apply {
            this.userId = userId // Set the userId manually
            this.username = username
            this.favoriteGames = mutableListOf() // Initialize favoriteGames as an empty list
        }
        return userRepo.save(newUser) // Save the user with the provided userId
    }

    fun findUser(userId: String): User{
        val user = userRepo.findById(userId).orElseThrow { RuntimeException("User not found with id: $userId") }
        return user;
    }

    fun updateUser(userId: String, username: String): User {
        val user = userRepo.findById(userId)
            .orElseThrow { IllegalArgumentException("User not found with ID: $userId") }

        user.username = username
        return userRepo.save(user) // Save the updated user object
    }

    fun findUsername(userId: String): String{
        val user = userRepo.findById(userId).orElseThrow { RuntimeException("User not found with id: $userId") }
        return user.username;
    }
}

