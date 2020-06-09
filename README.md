# Template Project : Authentication

This project implements straightforward signup and login features for an ionic app.
The styling is minimal.

## Hot to use it

The auth template works with Firebase. A node.js backend is also planned but is not yet done.

### Register with Firebase
As a developer, in order to test this out, you need to link this with a firebase project.
In order to set up a Firebase project (it is free), go to the
Firebase Console at https://console.firebase.google.com/

If you have never used Firebase, sign up for it.
On the console you can add a new project, there is a big button for that. Click that, you will be asked 
to set a project name. On the second step, google analytics wants to be set up,
you can just switch that off and continue. Or if you do have an analytics account, use it.

### Setting up your project
1. Download the project (git clone as usual)
2. Open it with your favorite IDE, like Visual Studio Code or WebStorm or Sublime..
3. In the src/environments folder there are two template files. Copy them to non-templated versions.
Those are excluded from git tracking as they contain the secret keys to your firebase, see below.

        environment.template.ts -> environment.ts
        environment.prod.template.ts -> environment.prod.ts 

4. Back to the browser. In your new firebase project dashboard, on the left hand side you can choose
the Authentication menu. Make sure that email/password authentication is enabled.
5. Now again in the firebase project dashboard go to Project Settings (this is located under the settings cog
 right next to the Project Overview menu item).
 Here you see the project ID and the Web API Key.
6. Copy these values into both environment.ts and environment.prod.ts under the respective properties.

### Running the project
If the environment.ts and environment.prod.ts have the proper keys, you can already start
the server. In your terminal of your IDE or in git bash, go to the project directory
and invoke

    ionic serve
    
Then a browser window will start and if all went well, you see the login screen of the app.
If you enter an email/password for signup, it will register the new user. You can see the new user in your firebase
dashboard under Authentication. A second signup with the same name will fail.
