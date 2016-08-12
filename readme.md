Notting Hill Carnival App - React js
====================================


### Getting started

run: 
```bash
   npm start
```

...which runs: 

```bash
   webpack-dev-server --progress --colors --inline
```

Note the `--inline` flag. This means webpack __does not__ run in an iframe.  
This is important because React dev tools cannot inspect an iframe.  

Then preview on localhost (or whatever else it says in terminal).