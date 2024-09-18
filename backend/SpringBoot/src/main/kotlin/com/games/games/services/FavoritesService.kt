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
    lateinit var UserRepo: UserRepository

    @Transactional
    fun addGameToFavorites(userId: Long, game: Game): User {
        // Retrieve the user by their ID
        val user = UserRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Add the new game to the user's favoriteGames list
        user.favoriteGames += game

        // Save the updated user object
        return UserRepo.save(user)
    }

    // Function to retrieve all favorite games for a given userId
    fun getGamesByUserId(userId: Long): List<Game> {
        val user = UserRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Return the list of favorite games
        return user.favoriteGames
    }

    fun deleteGameByUserId(userId: Long, gameId: Long){
        val user = UserRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Find the game to delete from the user's favoriteGames list
        val updatedGames = user.favoriteGames.filterNot { it.id == gameId }

        // Update the user's favorite games list without the deleted game
        user.favoriteGames = updatedGames

        // Save the updated user entity
        UserRepo.save(user)
    }

}