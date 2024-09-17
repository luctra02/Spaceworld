package com.games.games.models

import jakarta.persistence.*

@Entity
@Table(name = "games")
class Favorites {

    @Id
    @GeneratedValue
    val id: Long = 0

    @Column(name = "name", nullable = false)
    lateinit var name: String

    @Column(name = "total_rating")
    var totalRating: Double? = null

    @Column(name = "total_rating_count")
    var totalRatingCount: Int = 0

    @Column(name = "url", nullable = false)
    var url: String = ""

    @OneToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "cover_id", referencedColumnName = "id")
    lateinit var cover: Cover
}

@Entity
@Table(name = "covers")
class Cover {

    @Id
    @GeneratedValue
    val id: Long = 0

    @Column(name = "image_id")
    lateinit var imageId: String
}