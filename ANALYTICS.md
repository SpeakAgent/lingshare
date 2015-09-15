LingShare Analytics
===================

This document discusses the analytics for Speak Agent as currently implemented for the STUDENT-facing app.


The analytics engine uses [Mixpanel](http://www.mixpanel.com) capture analytics and provide a view into the data. The mixpanel key is "c179c65048c4da1c7c011ffa0cc5b1ac".

The Mix Panel user ID is info@speakagent.com and Ben or Baron have the pwd.

Lingshare Events
================

These are the events that are defined in the Lingshare Mixpanel:

| Activity      | Event             | Description |
| ------------- | ----------------- | --------- |
| (all)         | application launched | Triggered when the application's mainController is invoked. |
| (all)         | user nav click    | Generated when the user clicks a link in the application navigation menu.
| (all)         | login             | Generated when the user authenticates to the app. **success** - true if the authentication attempt was successful, false if it failed. **username** - the username that was provided.  **cookieauth** - if the user authenticated using a session cookie or directly via the server.
| (all)         | logout            | Generated when the user clicks the logout option. **username** - username of the user logging out.
| flashcard     |  timer end        | Generated when the timer stops. **seconds** - number of seconds that the activity has been running.
| flashcard     | activity launched | Generated when the wordlist is successfully retrieved and the game can begin. **wordlist_id** - wordlist id from the api **wordlist** - title of the wordlist used for the game. **base_language** - base language for the game. **trans_language** - the second language for the game.
| flashcard     | activity complete | Generated when the round of gameplay is complete. **seconds** - number of seconds the game lasted. **score** the score at the end. **wordlist_id** - wordlist id from the api **wordlist** - title of the wordlist used for the game. **base_language** - base language for the game. **trans_language** - the second language for the game.
| flashcard     | lexeme event      | Generated when the user tries to match a lexeme to its image. **match** - indicates if the player matched the word and pictureo **lexeme_id** - unique id for the lexeme for this event. **lexeme_root** - root word for the flashcard. **lexeme_trans_root** - translated word for the flash card. **lexeme_pair_root** - root word for the item being matched by the user. **seconds** - elapsed seconds timer. **tries** number of tries it's taken for a successful match.
| matching      |  timer end        | Generated when the timer is stopped prior to the activity being completed. **seconds** - number of seconds that the activity has been running.
| matching      |  timer start      | Generated when the timer starts, which happens right after an "activity launched" event.
| matching      | activity launched | Generated when the word list is successfully pulled from the API and the matching game is started. **wordlist_id** - wordlist id from the api **wordlist** - title of the wordlist used for the game. **base_language** - base language for the game. **trans_language** - the second language for the game.
| matching      | activity complete | Generated when the round of gameplay is complete. **game_won** - did they win? **correct** - number of correct guesses. **wrong** - number of wrong guesses. **elapsed** - number of elapsed seconds. **score** - final score **wordlist_id** - wordlist id from the api **wordlist** - title of the wordlist used for the game. **base_language** - base language for the game. **trans_language** - the second language for the game.
| matching      | lexeme event      | Generated when the user tries to match a lexeme to its image. TWO events per match are generated, one for each memory card. **match** - indicates if the player matched the word and picture  **seconds** - elapsed seconds timer. **lexeme** - the lexeme for the card. **card_type** - image or word. **lexeme_pair** - the other lexeme which is paired with this card.


People Analytics
----------------

Mixpanel has a concept of people analytics, which is the ability to attach user profile information to the analytics captured by the front end. This is done in two steps: first, by linking the random ID generated for each visitor to a user id (typically done on login to the site) and second, by pushing user metrics from the user profile into a user profile record.

Currently, the lingshare apps do the first part, but we do not upload user profile data from the lexeme back-end. I did put some support in the backend code to allow the backend to communicate with mixpanel, though I do not think Katie is using it in her code, yet.

Because our users are more-or-less provisioned by us for the early releases, the value is not as high. As the customer base diversifies over time, and we open the app up to more users, it would certainly add more depth to the analytics, especially for the funnels, to help us understand "what kind of user is more likely to stop playing?"


Unique vs Non-Unique
--------------------

Users/participants are assigned a unique tracking code (distinct id) when they begin using the application. When the user logs in, this unique code is paired with their actual user id. In the case of the uniques, funnels are constructed based on the IDs and not the events. That is to say, if a user satisfies a funnel 4 times, it is a single count for the funnel.


Timer Start, Timer End, and Activity Complete
---------------------------------------------

The *timer start* / *timer end* events roughly correlate to *activity launched* and *activity complete* events.

Looking at the code for flashcard, there is no "timer start" event. This event has been added to the code right as the number of seconds is set to zero, so this should address the disconnect between timer start and activity launched metrics.


