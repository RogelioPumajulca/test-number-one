<template>
  <div>
    <h1>Neo4j Data - TestR</h1>
    <ul>
      <li v-for="record in records" :key="record.id">
        {{ record.properties.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import neo4j from 'neo4j-driver'

export default {
  data() {
    return {
      records: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const driver = neo4j.driver(
        process.env.VUE_APP_NEO4J_URI,
        neo4j.auth.basic(process.env.VUE_APP_NEO4J_USER, process.env.VUE_APP_NEO4J_PASSWORD)
      )
      const session = driver.session()
      try {
        const result = await session.run('MATCH (n) RETURN n LIMIT 25')
        this.records = result.records.map(record => record.get('n'))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        await session.close()
        await driver.close()
      }
    }
  }
}
</script>
