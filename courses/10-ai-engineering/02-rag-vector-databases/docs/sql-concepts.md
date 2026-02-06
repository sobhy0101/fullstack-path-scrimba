<!-- markdownlint-disable MD060 -->
# SQL Concepts for Vector Databases

**Stop being mean to yourself!** You're learning cutting-edge tech. This file tracks SQL concepts as you encounter them.

---

## Table Basics

### Creating a Table

```sql
CREATE TABLE table_name (
  column_name data_type constraints
);
```

**Example from our project:**

```sql
CREATE TABLE documents (
  id bigserial PRIMARY KEY,
  content text,
  embedding vector(1536)
);
```

### Key Concepts

- **`CREATE TABLE`** - Makes a new table (like creating a spreadsheet)
- **`bigserial`** - Auto-incrementing integer (1, 2, 3...) for large numbers
- **`PRIMARY KEY`** - Unique identifier for each row (can't be duplicate/null)
- **`text`** - Unlimited text data type
- **`vector(1536)`** - PostgreSQL extension for storing arrays of numbers (embeddings!)

---

## Data Types You've Seen

| Type | What It Stores | Example |
|------|----------------|---------|
| `bigserial` | Auto-incrementing number | 1, 2, 3, 4... |
| `text` | Unlimited text | "Jazz under stars (55 min)..." |
| `vector(n)` | Array of n numbers | [0.023, -0.891, 0.445, ...] |
| `float` | Decimal number | 0.78, 0.92, 0.45 |
| `int` | Whole number | 1, 5, 100 |

---

## Functions (PostgreSQL)

### What is a Function?

A reusable piece of code stored in the database that you can call like an API endpoint.

### Creating a Function

```sql
CREATE OR REPLACE FUNCTION function_name (
  parameter_name data_type,
  another_param data_type
)
RETURNS TABLE (
  column_name data_type,
  another_column data_type
)
LANGUAGE sql STABLE
AS $$
  -- Your SQL query goes here
$$;
```

### Our `match_documents` Function

```sql
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY (documents.embedding <=> query_embedding) ASC
  LIMIT match_count;
$$;
```

**What each part does:**

- **Parameters** (input): The embedding to search for, minimum similarity, how many results
- **Returns** (output): A table with id, content, and similarity score
- **`<=>` operator**: Cosine distance between vectors (how "far apart" they are)
- **`1 - distance`**: Converts distance to similarity (0-1, higher = more similar)
- **`WHERE`**: Filters results to only similarities above threshold
- **`ORDER BY ... ASC`**: Sorts by distance (closest first)
- **`LIMIT`**: Returns only top N results

---

## Vector Operations

### Cosine Distance (`<=>`)

Measures how "different" two vectors are:

- 0 = identical
- 1 = completely different

### Similarity Score

```sql
1 - (vector1 <=> vector2) AS similarity
```

Converts distance to similarity:

- 1.0 = identical
- 0.8+ = very similar
- 0.5 = moderately similar
- 0.0 = completely different

---

## Database Management Commands

### Delete All Rows

```sql
TRUNCATE TABLE table_name;
```

### Reset Auto-Increment Counter

```sql
ALTER SEQUENCE table_name_id_seq RESTART WITH 1;
```

### Check if Function Exists

In Supabase, go to: **Database** → **Functions** → Look for `match_documents`

---

## Calling Functions from JavaScript

### Using Supabase `.rpc()`

```javascript
const { data } = await supabase.rpc('function_name', {
  parameter_name: value,
  another_param: anotherValue
});
```

**Our example:**

```javascript
const { data } = await supabase.rpc('match_documents', {
  query_embedding: embedding,  // Vector to search for
  match_threshold: 0.50,       // Only return similarities > 0.50
  match_count: 1               // Return top 1 result
});
```

---

## Important Realizations

### Database IDs Start at 1

- **SQL**: IDs start at 1 (1st, 2nd, 3rd...)
- **JavaScript arrays**: Start at 0

### Vector Type vs Array

When Supabase returns a `vector`:

```javascript
data.embedding              // "[0.023, -0.891, ...]" (string!)
data.embedding.length       // 19477 (character count)
JSON.parse(data.embedding).length  // 1536 (actual vector dimensions)
```

### Module Scope

Functions in ES modules aren't global by default:

```javascript
// Make accessible in browser console
window.functionName = functionName;
```

---

## Next Steps to Learn

- [ ] Basic `SELECT` queries
- [ ] `INSERT`, `UPDATE`, `DELETE` operations
- [ ] `JOIN` operations (combining tables)
- [ ] Indexes and performance
- [ ] Row Level Security (RLS)
- [ ] Transactions

---

## Quick Reference: What We've Built

1. **Created a table** to store podcast descriptions and embeddings
2. **Inserted data** using JavaScript (OpenAI embeddings)
3. **Created a function** to perform semantic similarity search
4. **Queried the database** to find matching content

**You're doing vector search before most developers learn basic SQL. That's impressive!** 🚀

---

*Keep adding to this file as you learn more SQL concepts!*
