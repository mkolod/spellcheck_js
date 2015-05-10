Spellcheck.js
======

This is a JS port of [Peter Norvig's spell checker](http://norvig.com/spell-correct.html), originally written in Python. My goal was to make it purely functional - you won't see any loops or other imperative constructs here.


Getting Started
======

1. This project comes with a Node.js template to serve static content. In Chrome (but not Firefox), this will be necessary since JS is accessing locally stored files, and that's against standard security policies. If you'd like to use a different web server, go ahead.

2. If you're planning to use Node, you'll need to install Express.js:
    ```javascript   
    $npm install express
    ```

3. Start the web server
    ```javascript
    $node app.js
    ```
    
4. The default port is set to 3000, so your application will show up on localhost:3000.

5. Note that the page takes a long time to load the first time (about 30 seconds). This is because the spell checker algorithm is learning the word distributions from the attached document (big.txt). In order to prevent long initial loading times, you can persist the model associated with the reference "nWords" in spellcorrect.js, store its contents in a json file, remove the call to fetch data from big.txt and replace it with the call to fetch the json. This will skip the training step as you would have already done training ahead of time.


## License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
