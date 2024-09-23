package com.games.games.controller

import com.games.games.models.Game
import com.games.games.models.User
import com.games.games.services.FavoritesService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/api/favorites")
class FavoritesController {

    @Autowired
    lateinit var favoritesService: FavoritesService

    @PostMapping("/{userId}")
    fun addGameToFavorites(@PathVariable userId: String,  @Valid @RequestBody game: Game) : User {
        return favoritesService.addGameToFavorites(userId, game);
    }

    // Get all favorite games by user ID
    @GetMapping("/{userId}")
    fun getFavoriteGamesByUserId(@PathVariable userId: String): List<Game> {
        return favoritesService.getGamesByUserId(userId)
    }

    @DeleteMapping("/{userId}/delete/{gameId}")
    fun deleteGameByUserId(@PathVariable userId: String, @PathVariable gameId: Long){
        return favoritesService.deleteGameByUserId(userId, gameId)
    }
}