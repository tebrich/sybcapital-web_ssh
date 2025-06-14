cat << 'EOF' > FileSelector.vue
<template>
  <input type="file" @change="onFileChange" />
</template>

<script>
export default {
  name: 'FileSelector',
  methods: {
    onFileChange(e) {
      const file = e.target.files[0] || null;
      this.$emit('file-selected', file);
    }
  }
}
</script>
EOF

