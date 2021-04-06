<?php
/**
 * @return array
 */
function getUpdates()
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
function getUpdatesDetails($id)
{
    $updateInfo = [
        1 => [
            "update" => "In update 2.3 we released some major new updates! \n\n - New Minigames \n- Fixed glitch in game \n- Changed colors \n- Added variables \n- Added vc"
        ],
        2 => [
            "update" => "In update 2.2 we released some major new updates! \n\n - Added video of game \n- Added new sized menu \n- Responsive for mobile \n- Fixed blue colors \n- Added text"
        ],
        3 => [
            "update" => "In update 2.1 we released some major new updates! \n\n - Added learn more \n- Fixed glitch in game \n- Changed colors \n- Fixed glitch with Menu \n- Added vc"
        ],
        4 => [
            "update" => "In update 2.0 we released some major new updates! \n\n - Added login page \n- Added another game \n- Added an extra menu \n- Added JavaScript Menu \n- Added text"
        ],
        5 => [
            "update" => "In update 1.4 we released some major new updates! \n\n - Added Simonsays \n- Fixed glitch in game \n- Changed colors \n- Added Mobile Menu \n- Added text"
        ],
        6 => [
            "update" => "In update 1.3 we released some major new updates! \n\n - Added Beerpong \n- Fixed error when loading \n- Made web responsive \n- Added Menu \n- Added vc"
        ],
        7 => [
            "update" => "In update 1.2 we released some major new updates! \n\n - Added Blackjack \n- Fixed glitch in game \n- Added extra version \n- Removed Menu \n- Added text"
        ],
        8 => [
            "update" => "In update 1.1 we released some major new updates! \n\n - New Minigames \n- Added blue colors \n- Changed colors \n- Added Menu \n- Added vc"
        ]
    ];
    return $updateInfo[$id];
}