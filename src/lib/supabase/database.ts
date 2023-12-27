import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

dotenv.config({ path: 'env' })

if (!process.env.DATABASE_URL)
  console.log('No database URL')

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const database = drizzle(client, { schema })

const migrateDB = async () => {
  try {
    console.log('migrating client')
    await migrate(database, { migrationsFolder: 'migrations' })
    console.log('Successfully migrated')
  } catch (error) {
    console.log('Error migrating client')
  }
}

migrateDB()
export default database