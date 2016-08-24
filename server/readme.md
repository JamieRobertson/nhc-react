nhc Server
----------
This provides an API for the nhc app.  
It calculates offsets based on coordinates and updates the travel statuses of the station markers.


### How to import / export with mongoDB

```bash
# import the db
$ mongorestore --archive=db/dump/name.of.archive --db nhc

# dump db
$ mongodump --archive=db/dump/name.of.archive --db nhc
```

