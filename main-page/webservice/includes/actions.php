<?php
/**
 * @return array
 */
function getDishes()
{
    return [
        [
            "id" => 1,
            "name" => "Update 2.3",
            "imageTag" => "Game"
        ],
        [
            "id" => 2,
            "name" => "Update 2.2",
            "imageTag" => "xbox"
        ],
        [
            "id" => 3,
            "name" => "Update 2.1",
            "imageTag" => "playstation"
        ],
        [
            "id" => 4,
            "name" => "Update 2.0",
            "imageTag" => "blackjack",
        ],
        [
            "id" => 5,
            "name" => "Update 1.4",
            "imageTag" => "beerpong",
        ],
        [
            "id" => 6,
            "name" => "Update 1.3",
            "imageTag" => "gameboy",
        ],
        [
            "id" => 7,
            "name" => "Update 1.2",
            "imageTag" => "videogame",
        ],
        [
            "id" => 8,
            "name" => "Update 1.1",
            "imageTag" => "gaming",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getDishDetails($id)
{
    $tags = [
        1 => [
            "recipe" => "In update 2.3 we released some major new updates! \n\n - New Minigames \n- Fixed glitch in game \n- Changed colors \n- Added variables \n- Added vc",
            "tags" => ['Italian', 'Pizza']
        ],
        2 => [
            "recipe" => "In update 2.2 we released some major new updates! \n\n - Added video of game \n- Added new sized menu \n- Responsive for mobile \n- Fixed blue colors \n- Added text",
            "tags" => ['Fries', 'French']
        ],
        3 => [
            "recipe" => "In update 2.1 we released some major new updates! \n\n - Added learn more \n- Fixed glitch in game \n- Changed colors \n- Fixed glitch with Menu \n- Added vc",
            "tags" => ['Turkish', 'Döner', "Kebab"]
        ],
        4 => [
            "recipe" => "In update 2.0 we released some major new updates! \n\n - Added login page \n- Added another game \n- Added an extra menu \n- Added JavaScript Menu \n- Added text",
            "tags" => ['Italian', 'Lasagne']
        ],
        5 => [
            "recipe" => "In update 1.4 we released some major new updates! \n\n - Added Simonsays \n- Fixed glitch in game \n- Changed colors \n- Added Mobile Menu \n- Added text",
            "tags" => ['American', 'German', 'Burger', 'Hamburger']
        ],
        6 => [
            "recipe" => "In update 1.3 we released some major new updates! \n\n - Added Beerpong \n- Fixed error when loading \n- Made web responsive \n- Added Menu \n- Added vc",
            "tags" => ['American', 'Chicken', 'Wings']
        ],
        7 => [
            "recipe" => "In update 1.2 we released some major new updates! \n\n - Added Blackjack \n- Fixed glitch in game \n- Added extra version \n- Removed Menu \n- Added text",
            "tags" => ['Ice', 'Ice Cream', 'Dessert']
        ],
        8 => [
            "recipe" => "In update 1.1 we released some major new updates! \n\n - New Minigames \n- Added blue colors \n- Changed colors \n- Added Menu \n- Added vc",
            "tags" => ['American', 'Hotdog']
        ]
    ];

    return $tags[$id];
}