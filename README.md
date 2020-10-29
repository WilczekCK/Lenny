( ͡° ͜ʖ ͡°) Lenny<br>
NuxtJS and KoaJS meme page (SSR)
===========
<h2>At the beginning...</h2>
<b>Built with:</b>
<ul>
  <li>Backend is built with KoaJS(Node). It's copied from v1 version (known as osumemes) - https://github.com/WilczekCK/meme-page/releases/tag/1</li>
  <li>Frontend is built with Vue(Nuxt), removed everything from v1 version. Started from scratch.</li>
  <li>Front and backend connected using https://github.com/lautiamkok/nuxt-koa from lautiamkok it was really helpful to understand how to do it :)</li>
</ul>
<h2>Configuration</h2>

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

<b>Database and fb authorization</b><br>
Head to the /server/config/ and edit index.js file, there you will find database and fb_auth object to fill informations in.<br>
Also, sql structure is in the root directory.

<b>Good to know!</b><br>
<ul>
  <li>Koa handles the controller and the model as an API. Nuxt handles the view and calls the API, e.g http://127.0.0.1:3000/ (from Nuxt) will call http://127.0.0.1:3000/api (from Koa)</li>
  <li>To give yourself an admin, set the role of user to 1</li>
  <li>Open Source, do what you want with it ;)</li>
  <li>Ads profile id (Adsense) available to provide in nuxt.config file</li>
</ul>
<h2>Whats missing?</h2>
<ul>
  <li>Google authorization</li>
  <li>AWS, right now images are saved in assets/uploads server.</li>
</ul>
