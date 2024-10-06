package com.games.games.services

import com.games.games.models.Game
import com.games.games.models.User
import com.games.games.repository.GameRepository
import com.games.games.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class FavoritesService {

    @Autowired
    lateinit var userRepo: UserRepository

    @Autowired
    lateinit var gameRepo: GameRepository

    @Transactional
    fun addGameToFavorites(userId: String, game: Game): User {
        // Retrieve the user by their ID
        val user = userRepo.findById(userId)
            .orElseThrow { RuntimeException("User not found with id: $userId") }

        // Check if the game already exists in the database
        val existingGame = gameRepo.findById(game.id)

        val gameToUse = if (existingGame.isPresent) {
            // If the game exists, use the existing game
            existingGame.get()
        } else {
            // If the game does not exist, create a new instance and save it
            gameRepo.save(game)
        }

        // Add the game to the user's favorite games
        user.favoriteGames += gameToUse

        // Save the updated user object
        userRepo.save(user)

        return user // Return the user or whatever you need
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