<template>
  <span>
    <span class="v-label theme--light">{{ label }}</span>

    <tiptap-vuetify
      v-model="input"
      v-bind="$attrs"
      class="mb-6 mt-3"
      :class="{ 'elevation-1': !flat, flat, readonly }"
      :editor-properties="{ ...editorProperties, editable: !readonly }"
      :extensions="extensions"
      v-on="$listeners"
    />
  </span>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Link,
  Image,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from 'tiptap-vuetify'
import { defineComponent } from '@nuxtjs/composition-api'
import FileSelector from '~/components/commons/FileSelector'

export default defineComponent({
  name: 'SyBTiptapFild',

  components: {
    TiptapVuetify,
    FileSelector
  },

  props: {
    editorProperties: {
      type: Object,
      default: () => ({})
    },
    flat: {
      type: [Boolean, Number, String],
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    readonly: {
      type: [Boolean, Number, String],
      default: false
    },
    value: {
      type: [Number, Object, String],
      default: ''
    },
    useImageExtensions: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      extensions: [
        History,

        // Font modifications
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        Bold,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3, 4, 5, 6]
            }
          }
        ],
        Code,
        CodeBlock,

        // Lists
        ListItem,
        BulletList,
        OrderedList,

        // Custom Image extension insertion
        [
          Image,
          {
            options: {
              imageSources: [
                { component: FileSelector, name: 'Carga de imágenes' }
              ],
              imageSourcesOverride: true
            }
          }
        ],

        // Table support
        Table,
        TableCell,
        TableHeader,
        TableRow,

        // Others
        Paragraph,
        HorizontalRule,
        HardBreak
      ]
    }
  },

  computed: {
    input: {
      get() {
        return this.value
      },
      set(input) {
        this.$emit('input', input)
      }
    }
  },

  mounted() {
    // If needed, add raw Image extension as fallback
    if (this.useImageExtensions) {
      this.extensions.push(Image)
    }
  }
})
</script>

<style lang="scss" scoped>
.flat ::v-deep {
  .v-card {
    box-shadow: none;
  }
}

.readonly ::v-deep {
  .v-toolbar {
    display: none;
  }
}
</style>

