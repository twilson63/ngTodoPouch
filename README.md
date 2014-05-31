# TodoApp Tutorial

This is another todo app tutorial, this is the setup branch of this tutorial,
if you have made it this far, then you are ready to get started.

The `setup` branch takes care of installing all of the build tools for an
Atomify Angular Application.  

There are a couple of things you need to do, to confirm your system is
setup correctly to continue this tutorial.

``` sh
# make sure node is installed (nodejs.org)
node -v
# make sure npm is installed
npm -v
# install bower globally.
npm install bower -g
# or sudo npm install bower -g
# install atomify globally
npm install atomify -g
# or sudo npm install atomify -g
```

If all of command worked then you are setup and ready to go.

Lets fire up the live-reload server.

```
npm start
```

If you browser opened to a page saying `Start Here` you have
successfully setup the build environment.

Congrats!

---

A little bit about the build environment, basically the build environment is
leveraging npm, bower and atomify and the wonderful collection of build tools in
the node ecosystem.  The build setup uses `package.json` and `bower.js` for backend
and front end dependency management processes respectively.

Then we are using atomify to dynamically build the javascript and css assets
to our www `directory`.  You can see the specifics in the package.json file:

```
...
"atomify": {
  "server": {
    "st": {
      "path": "./www",
      "cache": false
    },
    "open": "true",
    "path": "index.html",
    "lr": {
      "patterns": ["www/*.html", "www/*.js", "www/*.css"]
    }
  },
  "js": {
    "entry": "app/index.js",
    "output": "www/bundle.js",
    "watch": true,
    "debug": true
  },
  "css": {
    "entry": "app/index.css",
    "output": "www/bundle.css"
  }
}
...
```

This package.json section is instructing atomify to use the
index.js and index.css files in the app folder as the entry
points to start building the bundled javascript and css files.


`Atomify` includes live reload, this means that any changes you
make in your code base will automatically refresh in your browser.

We can try this out now.  open the app/index.js file and change `Start Here`
in the AppCtrl function to 'Todolists', save the file and navigate
to the page in the browser.  Hopefully, you see the changes automatically
reflected in your page.

---

## Go to Lesson 1

```
git checkout lesson1
```

Open README.md
