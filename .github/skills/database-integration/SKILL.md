---
name: database-integration
description: Guide migrating from mock data to real database (MongoDB or PostgreSQL), including schema design, connection setup, and data migration.
---

# Database Integration Skill

## Workflow

1. **Choose Database**: Evaluate MongoDB for flexible document schemas or PostgreSQL for relational data with complex queries.

2. **Design Schema**:
   - For skills: fields like id, userId, type, skillName, description, category, userContact, createdAt
   - For users: id, email, name, phone, createdAt, updatedAt

3. **Setup Connection**:
   - Install database driver (mongoose for MongoDB, pg for PostgreSQL)
   - Configure connection string with environment variables
   - Implement connection pooling and error handling

4. **Update API Routes**:
   - Replace in-memory arrays with database queries
   - Add proper error handling and validation
   - Implement pagination for large datasets

5. **Migrate Existing Data**:
   - Create migration script to transfer mock data to database
   - Test data integrity after migration

6. **Update Authentication**:
   - Store user data in database instead of session-only
   - Add user profile management

## Examples

### MongoDB Setup

```javascript
// lib/mongodb.js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
export default client;

// api/skills/route.js
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();
    const db = client.db("skillxchanger");
    const skills = await db.collection("skills").find({}).toArray();
    return NextResponse.json(skills);
  } finally {
    await client.close();
  }
}
```

### PostgreSQL Setup

```javascript
// lib/postgres.js
import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// api/skills/route.js
export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM skills");
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}
```

## Best Practices

- Use environment variables for connection strings
- Implement connection retry logic
- Add database indexes for performance
- Use transactions for data consistency
- Validate data at API level
