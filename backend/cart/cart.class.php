<?php

class Cart extends Database
{
    public function save($user_id, $book_id, $quantity, $return_date = null, $available)
    {
        $stmt = "UPDATE books SET availability = ? WHERE book_id = ?";

        $bookQuery = $this->connect()->prepare($stmt);

        if ($bookQuery->execute([$available, $book_id])) {
            $stmt = "INSERT INTO carts (user_id, book_id, quantity, return_date) VALUES (?, ?, ?, ?)";

            $cartQuery = $this->connect()->prepare($stmt);

            if ($cartQuery->execute([$user_id, $book_id, $quantity, $return_date])) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function delete($user_id, $book_id)
    {
        $stmt = "DELETE FROM carts WHERE user_id = ? AND book_id = ?";

        $cartQuery = $this->connect()->prepare($stmt);

        if ($cartQuery->execute([$user_id, $book_id])) {
            return true;
        } else {
            return false;
        }
    }
}
