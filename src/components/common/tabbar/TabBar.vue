<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabBar',
}
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f8f8f8;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
</style>
