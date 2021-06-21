# List of existing commands

| Command          | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `composer install`     | installs pckages                                                                           |
| `php artisan migrate` | migrate Models to Database |
| `php artisan serve`      | starts server                                 |
| `php artisan quote:daily | sends daily registration to specific emaily|
| php artisan migrate:install | initialize migrations folder and database|

### To access Admin auth in database change one of users roles to admin there is no other way


### List of routes

| HTTP Method | Route              | Description                                                               |
| ----------- | ------------------ | ------------------------------------------------------------------------- |
| `GET`       | `/email/verify/{id}`      | verifies the email                                      |
| `GET`       | `/customers?page={int}&perPage={int}&filter={string}&filterSearch={string}` | gets the customers from database and page to send which page to get and perPAge in each page how many cutomers to send and filter to which type to filter {email,id,name} and filter search the string to search for in databse  |
| `GET`       | `/average?time={int}&type={hors,months,weeks,years}`   | get average og registration in specific period of time and time to get avergae in which period of time and type to get average is what the time typeof|
| `POST`      | `/login`     | login to the site only admin can login|
| `POST`      | `/register`  | register to db|
| `POST`      | `/logout`    | logout of the site|

## To Run Project localy
`composer install`
`php artisan migrate:install`
`php artisan migrate`
`php artisan serve`


## Run the service locally

For adding environment variables, add `.env` file at the root of the project like below and change the default values if needed:
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:TYHI7IQAHINcNA1KHz7NvhF0Ke66zTdK6EbTQAQYa/U=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=codechallenge
DB_USERNAME=root
DB_PASSWORD=password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=postmaster@sandbox6dc9cec7b7eb43ed9bc51634718c2234.mailgun.org
MAIL_PASSWORD=53f505225de12905552fc8aada156b9a-24e2ac64-96d6acd9
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=mohamad.h.aamer@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=vgVYwmlbu9FoVO8aKlItnkbq0rq1HxHaASUiWpUJolWv3HuXC3XVPtl7aXV0Ymjn

MAILGUN_DOMAIN=sandbox6dc9cec7b7eb43ed9bc51634718c2234.mailgun.org
MAILGUN_SECRET=91fd40e3683a396a570be8585ea96a08-24e2ac64-49595242
MAILGUN_PASSWORD=53f505225de12905552fc8aada156b9a-24e2ac64-96d6acd9

