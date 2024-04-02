<?php

class CartController extends Cart
{
    private $quantity;
    private $user_id;
    private $book_id;
    private $return_date;
    private $available;

    public function __construct($quantity, $user_id, $book_id, $return_date = null, $available)
    {
        $this->quantity = $quantity;
        $this->user_id = $user_id;
        $this->book_id = $book_id;
        $this->return_date = $return_date;
        $this->available = $available;
    }

    public function addToCart()
    {
        $this->save($this->user_id, $this->book_id, $this->quantity, $this->return_date, $this->available);
    }

    public function removeFromCart()
    {
        $this->delete($this->user_id, $this->book_id);
    }
}
