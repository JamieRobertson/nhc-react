Notting Hill Carnival App - React js
====================================
A basic mapping app to show soundsystems and transport status at the Notting Hill Carnival.  
Part of this purpose of this project to learn more about React and Blender 3d.  

### How to run in development

```bash
$ cd app/
$ npm install  # installs node_modules
$ npm start

# npm start is the same as running:
# $ node ./server.js

# Preview at `http://localhost:8080/` (or whatever else it says in terminal).  
```


### How to run in production on Heroku
```bash
# The Procfile will be run by Heroku - do you need to run build first?
# You should set NODE_ENV to production on Heroku cli

$ npm run build  # sets NODE_ENV to production
$ npm start      # (?)
```


### Resources already available
[Interactive google map](https://www.google.com/maps/d/embed?ll=51.519319%2C-0.205994&spn=0.017625%2C0.028281&output=embed&hl=en&t=m&msa=0&z=15&ie=UTF8&mid=1VYtB2NY6kUCKpAA0N5qPipH7giY) by Time out  

Test coordinates with a url like this:  
`https://www.google.se/maps/@[latitude],[longitude],21z`  


### Awesomplete plugin by [Lea Verou](http://lea.verou.me/projects/)
> A 2KB autocomplete with zero dependencies

https://www.npmjs.com/package/awesomplete  
http://leaverou.github.io/awesomplete/  