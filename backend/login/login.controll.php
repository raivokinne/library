<?php

class LoginController extends Login
{
    private $email;
    private $password;

    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = $password;
    }

    public function loginUser()
    {
        if ($this->emptyInput() == true) {
            echo json_encode(["error" => "Empty input"]);
            exit();
        }

        if ($this->invalidEmail() == true) {
            echo json_encode(["error" => "Invalid email"]);
            exit();
        }

        if ($this->login($this->email, $this->password) == true) {
            echo json_encode(["error" => "Invalid credentials"]);
            exit();
        }

        $this->login($this->email, $this->password);
    }

    public function emptyInput()
    {
        if (empty($this->email) || empty($this->password)) {
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
}
