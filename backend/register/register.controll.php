<?php

class RegisterController extends Register
{
    private $name;
    private $email;
    private $password;
    private $confirm_password;

    public function __construct($name, $email, $password, $confirm_password)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->confirm_password = $confirm_password;
    }

    public function registerUser()
    {
        if ($this->emptyInput() == true) {
            echo json_encode(["error" => "Empty input"]);
            exit();
        }

        if ($this->invalidEmail() == true) {
            echo json_encode(["error" => "Invalid email"]);
            exit();
        }

        if ($this->passwordMatch() == true) {
            echo json_encode(["error" => "Passwords do not match"]);
            exit();
        }

        if ($this->checkUser() == true) {
            echo json_encode(["error" => "User already exist"]);
            exit();
        }

        if ($this->shortPassword() == true) {
            echo json_encode(["error" => "Password must be at least 8 characters"]);
            exit();
        }

        $this->register([
            "name" => $this->name,
            "email" => $this->email,
            "password" => $this->password
        ]);
    }

    public function emptyInput()
    {
        if (empty($this->name) || empty($this->email) || empty($this->password) || empty($this->confirm_password)) {
            return true;
        } else {
            return false;
        }
    }

    public function invalidEmail()
    {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    public function shortPassword()
    {
        if (strlen($this->password) < 8) {
            return true;
        } else {
            return false;
        }
    }

    public function passwordMatch()
    {
        if ($this->password !== $this->confirm_password) {
            return true;
        } else {
            return false;
        }
    }

    public function checkUser()
    {
        if ($this->checkUserExist(['email' => $this->email]) == true) {
            return true;
        } else {
            return false;
        }
    }
}
