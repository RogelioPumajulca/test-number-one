<template>
  <body>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h1>Neo4j - DataQ1 - Maso</h1>
        <ul>Neo4j Data: {{ data }}</ul> 
        <button class="btn btn-primary">NoHaceNada</button>
      </div>
      <div class="col-sm-12 col-md-6">
        <h1>Neo4j - DataQ2- NoFunca</h1>
          <ul>
            <li v-for="record in records1" :key="record.id">
              {{ record.properties.name }}
            </li>
            <img src="@/assets/TestBD.png" alt="Example">
          </ul>
        <button class="btn btn-primary">TampocoHaceNada</button>

            

      </div>
    </div>
  </div>
  </body>
</template>

<script>
import { createDriver } from './services/neo4jService'; // Adjust the path based on your project structure

export default {
  data() {
    return {
      data: null,
      records1: [],
    };
  },
  mounted() {
    const driver = createDriver();
    const session = driver.session();
    session
      .run('MATCH (n) RETURN n LIMIT 25') // Your Cypher query
      .then(result => {
        this.data = result.records;
        this.records1 = result.records.map(record => record.get('n'));
      })
      .catch(error => {
        console.error('Something went wrong: ', error);
      })
      .finally(() => {
        session.close();
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>