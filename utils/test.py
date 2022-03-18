import sqlite3, time
from insideTH import main as getInside
from soilTH import main as getSoil


conn = sqlite3.connect('/home/pi/Desktop/Inz/inz.db')

c = conn.cursor()
insideValues = (None, None)
while(insideValues[0] == None and insideValues[1] == None):
    insideValues = getInside()

print(insideValues)


soilValues = (None, None)
while(soilValues[0] == None and soilValues[1] == None):
    soilValues = getSoil()

print(soilValues)
czas = time.time() * 1000

# c.execute("""CREATE TABLE inside (
#     temp_value text,
#     humid_value text,
#     data text)""")
# c.execute("""DROP TABLE soil""")
# c.execute("""CREATE TABLE soil (
#     temp_value text,
#     humid_value text,
#     data text,
#     podlanie text)""")

watered = None

c.execute("SELECT * FROM soil ORDER BY data DESC LIMIT 1;")
lastWatering = c.fetchone()[1]
print(lastWatering)
if(int(soilValues[1]) > int(lastWatering[1])):
    watered = "true"
else:
    watered = "false"

print(watered)

c.execute("INSERT INTO inside VALUES (?, ?, ?)", (str(insideValues[0]), str(insideValues[1]), czas))
conn.commit()
c.execute("INSERT INTO soil VALUES (?, ?, ?, ?)", (str(soilValues[0]), str(soilValues[1]), czas, watered))
conn.commit()

# c.execute("SELECT strftime('%H:%M:%S %Y/%m/%d')")

# c.execute("SELECT * FROM soil")
# c.execute("SELECT * FROM users WHERE username = Bartek")
# print(c.fetchall())

conn.close()