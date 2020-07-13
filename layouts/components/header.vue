<template lang="pug">
    .header
      .header__wrapper
        nuxt-link(to="/").header__wrapper__menuItem--logo
          img(src="~/assets/img/logo.png")
          span!="Semes<br>Koa + Nuxt meme template"
        .header__wrapper__menuItem--searchBar
          input(type="text" placeholder="Browse by #tags")
          a(href="/api/login").header__wrapper__menuItem--accountManagement="Login using facebook"
</template>

<script>
export default {
}
</script>
