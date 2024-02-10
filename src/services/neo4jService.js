// Import the neo4j driver
import neo4j from 'neo4j-driver'

// Function to create and return the Neo4j driver instance
export const createDriver = () => {
  const uri = 'bolt://localhost:7687'; // Your Neo4j instance bolt URI
  const user = 'neo4j'; // Default username
  const password = 'S1st3m@s'; // Your database password

  return neo4j.driver(uri, neo4j.auth.basic(user, password));
};