<template>
  <div id="app">
    <b-container>
      <h1>Http</h1>
      <hr>
      <b-form>
        <b-form-group
          id="fieldset-1"
          description="Let us know your name."
          label="Enter your name"
          label-for="input-1"
          :invalid-feedback="invalidFeedback"
          :valid-feedback="validFeedback"
          :state="nameState"
        >
          <b-form-input id="input-1" v-model="user.name" :state="nameState" trim></b-form-input>
        </b-form-group>
        <b-form-group
          id="fieldset-1"
          description="We wont send you anything at all."
          label="Enter your email"
          label-for="input-2"
          :invalid-feedback="invalidFeedback"
          :valid-feedback="validFeedback"
          :state="emailState"
        >
          <b-form-input
            id="input-2"
            v-model="user.email"
            :state="emailState"
            type="email"
            trim
          >
          </b-form-input>
        </b-form-group>
        <b-button @click="submit" variant="primary">Submit</b-button>
      </b-form>
      <hr>
      <section>
        <h2>Registered users</h2>
        <b-list-group class="list">
          <b-list-group-item :key="i" v-for="(u, i) in users">
            {{`${u.name} - ${u.email}`}}
          </b-list-group-item>
        </b-list-group>
      </section>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
      users: [],
    };
  },
  computed: {
    nameState() {
      return this.user.name.length >= 4;
    },
    emailState() {
      return this.user.email.length >= 8;
    },
    invalidFeedback() {
      let msg;

      if (this.user.name.length > 4) {
        msg = '';
      } else if (this.user.name.length > 0) {
        msg = 'Enter at least 4 characters';
      } else {
        msg = 'Please enter something';
      }

      return msg;
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : '';
    },
  },
  methods: {
    async submit() {
      try {
        await this.$http.post(null, this.user);
      } catch (err) {
        console.error(err);
      }
    },
    async fetch() {
      try {
        await this.$http()
          .then((res) => {
            this.users = Object.values(res.data);
          });
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetch();
  },
  updated() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
@import '~bootstrap';
@import '~bootstrap-vue';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list {
  margin-top: 1rem;
}
</style>
