# MESSAGES APP 
The application is working properly as tested and implements a messaging system with mockup users in code.

You should have node.js installed to run the app with "npm start". That will run app.js which is in the root.

NOTE: the server listens on port 3000. so after running "npm start" go with your browser to "localhost:3000"

the application uses pug rendering to render the pug files into html

views/index.pug  is the main screen. app.js listens on the url / (root) to render it. Tt extends layout.pug which has a link to a CSS file for proper formating.

The JSON file  which serves as a logfile can be found in public/messageslogfile.json

users and classes and functions can be found in public/javascripts/submitmessages.js

the table in the mainscreen is populated from messageslogfile.json through code you can find in in public/javascripts/myscripts.js

And lastly make sure all folders are copied to the working environment otherwise the application will not work.
