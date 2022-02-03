<template>
  <div class="bulma categories">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable" v-for="nav in navigation_extra">
          <a class="navbar-link">
            {{ nav.label }}
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" v-for="subnav in nav.navigation" :href="subnav.slug">
              {{ subnav.label }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'categories-nav',
  data: function() {
    const { settings } = window['GHOST_INITIAL_DATA']
    const { navigation_extra, lang } = settings
    return {
      navigation_extra,
      lang
    }
  }
}
</script>

<style type="scss" scoped>
.categories {
  max-width: 80vw;
  flex-grow: 1;
  align-items: center;
  margin-left: -10px;
  margin-right: 10px;
  padding: 10px 0 0;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: capitalize;
  white-space: nowrap;
  display: flex;

  @media (max-width: 700px) {
    padding: 4px 0;
  }
}

.bulma .navbar-menu {
  display: flex;
}
.bulma .navbar-item,
.bulma .navbar-link {
  padding: 12px 12px;
}
.bulma .navbar-item {
  width: 100px;
  height: 44px;
}
a {
  font-size: 1.3rem;
}
</style>
