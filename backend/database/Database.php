<?php

class Database
{
    private $host = "localhost";
    private $user = "raivo";
    private $password = "rembo276";
    private $database = "library";

    public function connect()
    {
        try {
            $db = new PDO("mysql:host=$this->host;dbname=$this->database", $this->user, $this->password);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $db;
        } catch (\Throwable $e) {
            echo $e->getMessage();
        }
    }
}
