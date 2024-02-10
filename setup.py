import psycopg2

# Establishing connection
conn = psycopg2.connect(database = "GroceryStore", user = "postgres", password = "abhi9")

# Cursor creation
cur = conn.cursor()

# List of roles and role ids
roles = [('MANAGER', 'manager'), ('USER', 'user'), ('ADMIN', 'admin')]

cur.executemany("INSERT INTO roles(role_id, role_name) VALUES (%s, %s)", roles)

conn.commit()

cur.close()
conn.close()