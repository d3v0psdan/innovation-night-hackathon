<?php

it('sends a visitor from the landing promise to the sign-up card', function () {
    $page = visit('/')->on()->mobile();

    $page->assertSee('See your startup the way investors do.')
        ->assertSee('What investors see')
        ->click('Score my startup free')
        ->assertPathIs('/register')
        ->assertSee('Get your score');
});
