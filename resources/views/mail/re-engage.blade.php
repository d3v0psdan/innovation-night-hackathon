<x-mail::message>
# Hi {{ $firstName }}, your first tool is ready

You told us a few things {{ $daysAgo }} days ago and we lined up the tools that fit. You have not opened the first one yet, so here it is again.

**{{ $tool['title'] }}**. {{ $because }}

{{ $tool['blurb'] }} First action: {{ $tool['first_action'] }}

<x-mail::button :url="$url">
Open {{ $tool['title'] }}
</x-mail::button>

Reply to this email if something in the survey did not fit. A human reads it.

{{ config('app.name') }}
</x-mail::message>
