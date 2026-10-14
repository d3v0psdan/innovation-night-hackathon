<?php

// Every onboarding question lives here. Keys and option values are the real ScaleupMap ones.
return [
    [
        'key' => 'journey_stage',
        'label' => 'Where is your venture right now?',
        'options' => [
            'looking_for_idea' => 'Looking for an idea',
            'building_mvp' => 'Building an MVP',
            'early_traction' => 'Early traction',
            'raising_first_round' => 'Raising a first round',
            'scaling_post_seed' => 'Scaling after seed',
            'pivoting' => 'Pivoting',
        ],
    ],
    [
        'key' => 'goal',
        'label' => 'What do you most need help with this month?',
        'options' => [
            'validate_direction' => 'I am unsure about direction',
            'win_customers' => 'Traction and customers',
            'raise_funding' => 'Raising feels overwhelming',
            'find_funding' => 'Finding investors and funding',
            'investor_blind_spots' => 'Blind spots investors will see',
            'execution_focus' => 'I need weekly focus',
        ],
    ],
    [
        'key' => 'team_size',
        'label' => 'How big is your team?',
        'options' => [
            'solo' => 'Just me',
            '2_5' => '2 to 5 people',
            '6_10' => '6 to 10 people',
            '11_plus' => '11 or more',
        ],
    ],
];
