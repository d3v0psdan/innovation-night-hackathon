<?php

// Every landing tool, keyed by route name. Paths mirror the real ScaleupMap product.
return [
    'destination.score' => ['path' => '/dashboard/score', 'title' => 'ScaleupMap Score', 'icon' => 'ChartBar', 'blurb' => 'See your venture the way investors do and fix the blind spots first.', 'first_action' => 'Answer the 12 score questions about your venture. About 10 minutes.'],
    'destination.memo' => ['path' => '/dashboard/memo', 'title' => 'Investment memo', 'icon' => 'FileText', 'blurb' => 'Turn your venture into the one page investors ask for.', 'first_action' => 'Fill in the problem, solution and traction sections. About 20 minutes.'],
    'destination.investors' => ['path' => '/entities', 'title' => 'Investor directory', 'icon' => 'UsersThree', 'blurb' => 'Browse investors and grants that match your stage.', 'first_action' => 'Filter by your stage and save three investors to your shortlist.'],
    'destination.map' => ['path' => '/coach', 'title' => 'Journey map', 'icon' => 'MapTrifold', 'blurb' => 'Map where you are and the next three moves before you build more.', 'first_action' => 'Place your venture on the map and pick your next milestone.'],
    'destination.sprint' => ['path' => '/coach/north-star-sprint', 'title' => 'North Star Sprint', 'icon' => 'Lightning', 'blurb' => 'One metric, one week, a daily plan to move it.', 'first_action' => 'Pick the one metric that matters this week and set a target.'],
    'dashboard' => ['path' => '/dashboard', 'title' => 'Dashboard', 'icon' => 'Compass', 'blurb' => 'Every tool in one place.', 'first_action' => 'Open the tool that matches what you are working on today.'],
];
