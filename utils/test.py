import sqlite3, time
from insideTH import main as getInside
from soilTH import main as getSoil


conn = sqlite3.connect('/home/pi/Desktop/Inz/inz.db')

c = conn.cursor()


insideValues = (None, None)
while(insideValues[0] == None and insideValues[1] == None and insideValues[1] <= 100):
    insideValues = getInside()

soilValues = (None, None)
while(soilValues[0] == None and soilValues[1] == None):
    soilValues = getSoil()

czas = int(time.time()*1000)
watered = None

c.execute("SELECT * FROM soil ORDER BY data DESC LIMIT 1;")
lastWatering = c.fetchone()[1]
if(int(soilValues[1]) > int(lastWatering)):
    watered = "true"
else:
    watered = "false"

# c.execute("INSERT INTO inside VALUES (?, ?, ?)", (str(insideValues[0]), str(insideValues[1]), czas))
c.execute("INSERT INTO inside VALUES (?, ?, ?)", (str(insideValues[0]), str(insideValues[1]), czas))
conn.commit()

# c.execute("INSERT INTO soil VALUES (?, ?, ?, ?)", (str(soilValues[0]), str(soilValues[1]), czas, watered))
c.execute("INSERT INTO soil VALUES (?, ?, ?, ?)", (str(soilValues[0]), str(soilValues[1]), czas, watered))
conn.commit()

conn.close()


# c.execute("""CREATE TABLE inside (
#     temp_value text,
#     humid_value text,
#     data int)""")
# c.execute("""CREATE TABLE soil (
#     temp_value text,
#     humid_value text,
#     data int,
#     podlanie text)""")

# c.execute("SELECT strftime('%H:%M:%S %Y/%m/%d')")

# c.execute("SELECT * FROM soil WHERE data < '50'")
# c.execute("SELECT * FROM test WHERE data < 50")
# print(c.fetchall())