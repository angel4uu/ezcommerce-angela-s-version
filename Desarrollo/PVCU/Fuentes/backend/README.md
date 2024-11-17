### NOTE for Nopel: This is a work in progress.

This initial version require to use a virtual environ if you want to get autocomplete and other features in your IDE.
In the future , I will implement a devcontainer for use in VSCode.


### Building and running your application

When you're ready, start your application by running:
`docker compose up -d --build`.

That up the server and implement migrations

For makemigrations, should exec manually:
`docker exec -it server python manage.py makemigrations`

For startapp, should exec manually:
`docker exec -it server python manage.py startapp <app_name>`

Your application will be available at http://localhost:8000.

### Deploying your application to the cloud :0

### Deploying to Heroku
First, create a Heroku account at https://signup.heroku.com/dc.

Then, install the Heroku CLI by following the instructions at
https://devcenter.heroku.com/articles/heroku-cli.

Next, log in to your Heroku account by running `heroku login`.

Then, create a new Heroku app by running `heroku create`.

Finally, push your code to Heroku by running `git push heroku main`.

Your application will be available at https://your-app-name.herokuapp.com.

### References
* [Docker's Python guide](https://docs.docker.com/language/python/)
