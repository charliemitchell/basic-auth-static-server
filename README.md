# basic-auth-static-server

Usage `npx basic-auth-static-server /path/to/your/static-website`

Everything is based on environment variables, works out of the box with heroku.

No environmanet variables are needed for this to work, however...

### In order to use Basic Auth you need to set the following.

`BASIC_AUTH_USERNAME`

`BASIC_AUTH_PASSWORD`

`STATIC_INDEX_FILE` is optional, default is `index.html`

### The port is determined by 

`PORT` default is 3000

---

When there is no Basic Auth variables set, the server will not implement it
