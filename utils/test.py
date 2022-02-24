import sqlite3

# conn = sqlite3.connect('dane.db')

# c = conn.cursor()

# c.execute("""CREATE TABLE dane (
#     imie text,
#     nazwisko text
# )""")

# c.execute("INSERT INTO dane VALUES ('Bartek', 'Aniol')")

# conn.commit()
# c.execute("SELECT strftime('%H:%M:%S %Y/%m/%d')")
# c.execute("SELECT datetime()")
# print(c.fetchone())

# c.execute("SELECT rowid, * FROM dane")
# print(c.fetchall())

# conn.close()