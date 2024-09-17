package com.games.games.repository

import com.games.games.models.Favorites
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface FavoritesRepository : JpaRepository<Favorites, Long> {
}