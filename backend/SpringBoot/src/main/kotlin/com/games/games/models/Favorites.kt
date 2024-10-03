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

    @OneToMany(cascade = [CascadeType.ALL])
    @JoinColumn(name = "user_id")
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

    @Column(name = "image_id", nullable = false)
    var image_id: String = ""
}
