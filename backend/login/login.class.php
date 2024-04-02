<?php

class Login extends Database
{
    public function login($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->connect()->prepare($sql);
        if ($stmt->execute([$email])) {
            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch();
                if (password_verify($password, $user['password'])) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
