package com.games.games.services

import com.games.games.models.Game
import com.games.games.models.User
import com.games.games.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class FavoritesService {

    @Autowired
    lateinit var userRepo: UserRepository

    @Transactional
    fun addGameToFavorites(userId: String, game: Game): User {
        // Retrieve the user by their ID
        val user = userRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Add the new game to the user's favoriteGames list
        user.favoriteGames += game

        // Save the updated user object
        return userRepo.save(user)
    }

    // Function to retrieve all favorite games for a given userId
    fun getGamesByUserId(userId: String): List<Game> {
        val user = userRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Return the list of favorite games
        return user.favoriteGames
    }

    fun deleteGameByUserId(userId: String, gameId: Long){
        val user = userRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Find the game to delete from the user's favoriteGames list
        val updatedGames = user.favoriteGames.filterNot { it.id == gameId }

        // Update the user's favorite games list without the deleted game
        user.favoriteGames = updatedGames

        // Save the updated user entity
        userRepo.save(user)
    }

}