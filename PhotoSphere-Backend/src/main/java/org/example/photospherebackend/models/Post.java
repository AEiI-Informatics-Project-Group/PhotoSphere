package org.example.photospherebackend.models;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column(name = "image_id")
    private Long imageId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "location_id")
    private Long locationId;
    @Column(name = "comment_id")
    private Long commentId;
    private String title;
    private String description;
    private Date date;
    @Column(name = "created_id")
    Timestamp created_at;
    @Column(name = "views_quantity")
    private int viewsQuantity;
    @Column(name = "likes_quantity")
    private int likesQuantity;
    @Column(name = "dislikes_quantity")
    private int dislikesQuantity;
    @Column(name = "sad_quantity")
    private int sadQuantity;
    @Column(name = "funny_quantity")
    private int funnyQuantity;
    @Column(name = "shock_quantity")
    private int shockQuantity;
    @Column(name = "private")
    private boolean privatized;

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Timestamp getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }

    public int getViewsQuantity() {
        return viewsQuantity;
    }

    public void setViewsQuantity(int viewsQuantity) {
        this.viewsQuantity = viewsQuantity;
    }

    public int getLikesQuantity() {
        return likesQuantity;
    }

    public void setLikesQuantity(int likesQuantity) {
        this.likesQuantity = likesQuantity;
    }

    public int getDislikesQuantity() {
        return dislikesQuantity;
    }

    public void setDislikesQuantity(int dislikesQuantity) {
        this.dislikesQuantity = dislikesQuantity;
    }

    public int getSadQuantity() {
        return sadQuantity;
    }

    public void setSadQuantity(int sadQuantity) {
        this.sadQuantity = sadQuantity;
    }

    public int getFunnyQuantity() {
        return funnyQuantity;
    }

    public void setFunnyQuantity(int funnyQuantity) {
        this.funnyQuantity = funnyQuantity;
    }

    public int getShockQuantity() {
        return shockQuantity;
    }

    public void setShockQuantity(int shockQuantity) {
        this.shockQuantity = shockQuantity;
    }

    public boolean isPrivatized() {
        return privatized;
    }

    public void setPrivatized(boolean privatized) {
        this.privatized = privatized;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
