<template>
  <ValidationObserver ref="observer">
    <form>
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:10">
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="매장명"
          required
        ></v-text-field>
      </ValidationProvider>
      <!-- <ValidationProvider v-slot="{ errors }" name="select" rules="required">
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="홀 개수"
          data-vv-name="select"
          required
        ></v-select>
      </ValidationProvider> -->
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="테이블 수"
          required
        ></v-text-field>
      </ValidationProvider>


      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </ValidationObserver>
</template>

<script>
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('table', {
    ...email,
    message: '테이블 수를 입력해주세요',
  })

  export default {
    name: 'ManStoreMain',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>
