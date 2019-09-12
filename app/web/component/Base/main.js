const content = '<div id="app"><slot /></div>'
const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords" :content="keywords" v-if="vkeywords">
    <meta name="description" :content="description" v-if="vdescription">
    <title>{{ vtitle }}</title>
  </head>
  <body>
    ${content}
  </body>
</html>
`

export default {
  name: 'LeeBase',
  props: {
    title: String,
  },
  computed: {
    vtitle() {
      return this.$route.meta.title || this.title
    },
    vkeywords() {
      return this.$route.meta.keywords
    },
    vdescription() {
      return this.$route.meta.description
    }
  },
  template: EASY_ENV_IS_NODE ? template : content
}
