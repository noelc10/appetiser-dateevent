# Date Event

## Setup

In order to run the project, please follow the steps below:

`npm install`
`composer install`
`php artisan migrate:refresh --seed`

Then, copy the example .env file and fill the configuration according to your local environment setup.

After the commands above, open a 2 tabs/windows of your favorite CLI and run the commands below:

On the 1st tab/window of CLI:
`php artisan config:clear && php artisan cache:clear && php artisan config:cache && php artisan serve`

And on the 2nd tab/window of CLI:
`npm run watch`
