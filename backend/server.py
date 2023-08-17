from flask import Flask, send_file, request, jsonify
import sqlite3
import base64
import io


app = Flask(__name__)

@app.route("/send_data", methods=["POST"])
def send_data():
    month = request.form['month']
    day = request.form['day']
    entry = request.form['entry']
    image = request.files["file"]
    image_data = image.read()


    data_tuple = (month, day, entry, image_data) #NEED to add image data


    #Connect to a database
    conn = sqlite3.connect("entry_database.db")

    #Create a cursor object
    c = conn.cursor()



    #Create a journal_entries table if it doesn't already exist
    c.execute("""CREATE TABLE IF NOT EXISTS entries (
        month text,
        day text, 
        entry text,
        image blob
    )""")


    #input values into a given table
    c.execute("INSERT INTO entries VALUES (?, ?, ?, ?)", data_tuple)

    #Push the data to the database
    conn.commit()

    #Close connection to the database. Not technically necessary. 
    conn.close()

    
    return {'message': 'committed successfully'}
    # return {'month': items[0][0], 'day': items[0][1], 'entry': items[0][2], 'image': base64.b64encode(items[0][3]).decode('utf-8')}
    # return send_file(io.BytesIO(items[1][3]), mimetype="image/png")
    # return {'message': 'executed successfully'}



@app.route("/get_data", methods=["POST"])
def get_data():

    month = request.form['month']

    #Make sure the month is in the correct form
    month = month.split()
    final_month = month[0][0].upper() + month[0][1:] + " " + month[-1]
    print(final_month)


    #Connect to a database
    conn = sqlite3.connect("entry_database.db")

    #Create a cursor object
    c = conn.cursor()

    #exctract values from a table
    sql_script = "SELECT * FROM entries WHERE month = '{}'".format(final_month)

    c.execute(sql_script)
    items = c.fetchall()

    return_obj = [{'message': 'Entry retrieval successful'}]

    for i in range(len(items)):
        return_obj.append({'key': i, 'month': items[i][0], 'day': items[i][1], 'entry': items[i][2], 'image': base64.b64encode(items[i][3]).decode('utf-8')})


    #Close connection to the database. Not technically necessary. 
    conn.close()

    if len(return_obj) > 1:
        return return_obj
    else:
        return [{'message': 'Entry does not exist'}]





if __name__ == "__main__":
    app.run(debug=True)

