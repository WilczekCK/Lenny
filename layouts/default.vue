<template lang="pug">
  transition
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          img(src="~/assets/img/logo.png")
          span!="Semes<br>Koa + Nuxt meme template"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
        a.header__wrapper__menuItem--accountManagement="Login using facebook"
      nuxt
</template>

<script>

export default {
  transition: {
    name: 'page',
    mode: 'out-in'
  }
}
</script>

<style>
.page-enter-active, .page-leave-active {
 transition: all .30s ease-out;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}

.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
