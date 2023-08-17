import sqlite3
import io

#Connect to a database
conn = sqlite3.connect("entry_database.db")

#Create a cursor object
c = conn.cursor()

#Receive table data
month = 'January 2023' #request.form['month'] in server
day = '1' #request.form['day']
entry = 'This is a test entry'
with open('/Users/josephbarrows/Desktop/journal-app/src/encoded_lord.png', 'rb') as file:
    image_data = file.read()

data_tuple = (month, day, entry, image_data)



# Create a table
c.execute("""CREATE TABLE IF NOT EXISTS journal_entries (
    month text,
    day text, 
    entry text,
    image blob
)""")



#input values into a given table
# c.execute("INSERT INTO journal_entries VALUES (?, ?, ?, ?)", data_tuple)



#exctract values from a table
c.execute("SELECT * FROM journal_entries")
items = c.fetchall()

for item in items:
    print(item[:3])


print("executed successfully")

#Push the table to the database
conn.commit()

#Close connection to the database. Not technically necessary. 
conn.close()