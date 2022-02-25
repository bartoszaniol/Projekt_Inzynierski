import sqlite3

conn = sqlite3.connect('inz.db')

c = conn.cursor()

# c.execute("""CREATE TABLE inside (
#     temp_value text,
#     humid_value text,
#     data text
# )""")

# c.execute("""CREATE TABLE soil (
#     temp_value text,
#     humid_value text,
#     data text
# )""")

# c.execute("INSERT INTO inside VALUES ('21', '45', '25.02.2022 18:52')")

# conn.commit()
# c.execute("SELECT strftime('%H:%M:%S %Y/%m/%d')")
# c.execute("SELECT datetime()")
# print(c.fetchone())

# c.execute("SELECT rowid, * FROM inside")
# a = c.fetchall()

conn.close()