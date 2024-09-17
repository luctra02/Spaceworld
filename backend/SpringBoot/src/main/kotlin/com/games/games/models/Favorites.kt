package com.games.games.models

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userId: Long = 0

    @Column(name = "username", nullable = false)
    var username: String = ""

    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    var favoriteGames: List<Game> = mutableListOf()
}

@Entity
@Table(name = "games")
class Game {

    @Id
    val id: Long = 0

    @Column(name = "name", nullable = false)
    var name: String = ""

    @Column(name = "total_rating")
    var totalRating: Double? = null

    @Column(name = "total_rating_count")
    var totalRatingCount: Int = 0

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0

    @Column(name = "image_id", nullable = false)
    var imageId: String = ""
}
