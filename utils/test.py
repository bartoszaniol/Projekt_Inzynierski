import sqlite3, time

conn = sqlite3.connect('inz.db')

c = conn.cursor()

# c.execute("""CREATE TABLE inside (
#     temp_value text,
#     humid_value text,
#     data text,
#     podlanie INTEGER
# )""")
# c.execute("""DROP TABLE inside""")
# c.execute("""CREATE TABLE soil (
#     temp_value text,
#     humid_value text,
#     data text
# )""")
czas = time.time() * 1000
c.execute("INSERT INTO inside VALUES (?, ?, ?)", ('24', '65', czas))
c.execute("INSERT INTO soil VALUES (?, ?, ?)", ('24', '52', czas))
conn.commit()

# c.execute("SELECT strftime('%H:%M:%S %Y/%m/%d')")
# c.execute("SELECT datetime()")
# print(c.fetchone())

# c.execute("SELECT rowid, * FROM inside")
# print(c.fetchall())

conn.close()