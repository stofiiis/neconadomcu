-- SQL script to create database and stories table

CREATE DATABASE IF NOT EXISTS storydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE storydb;

CREATE TABLE IF NOT EXISTS stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    story TEXT NOT NULL,
    anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
