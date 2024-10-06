package com.games.games.models

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User {

    @Id
    @Column(name = "user_id")
    var userId: String? = null

    @Column(name = "username", nullable = false)
    var username: String = ""

    // Changed cascade from ALL to REMOVE to avoid cascading deletes.
    @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JoinTable(
        name = "favorites", // This is the join table
        joinColumns = [JoinColumn(name = "user_id")], // Column for User
        inverseJoinColumns = [JoinColumn(name = "game_id")] // Column for Game
    )
    var favoriteGames: List<Game> = mutableListOf()
}

@Entity
@Table(name = "games")
class Game {

    @Id
    @Column(name = "id")
    val id: Long = 0

    @Column(name = "name", nullable = false)
    var name: String = ""

    @Column(name = "total_rating")
    var total_rating: Double? = null

    @Column(name = "total_rating_count")
    var total_rating_count: Int = 0

    @Column(name = "url", nullable = false)
    var url: String = ""

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "cover_id", referencedColumnName = "id")
    var cover: Cover? = null
}

@Entity
@Table(name = "covers")
class Cover {

    @Id
    @Column(name = "id")
    val id: Long = 0

    @Column(name = "image_id")
    var image_id: String = ""
}
