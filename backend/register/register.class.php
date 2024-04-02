<?php

class Register extends Database
{
    public function register($data = [])
    {
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $this->connect()->prepare($sql);
        if ($stmt->execute([$data['name'], $data['email'], $hashedPassword])) {
            return true;
        } else {
            return false;
        }
    }

    public function checkUserExist($data = [])
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$data['email']]);
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }
}
