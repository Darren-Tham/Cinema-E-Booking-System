import mysql.connector
from mysql.connector import errorcode
import pandas as pd

try:
    conn = mysql.connector.connect(
        user="swe", password="password", host="localhost", database="CINEMA"
    )
    print("Successfully connected to DB")
    cursor = conn.cursor()
    data = pd.read_csv("src/data/movies_data.csv")
    for i, row in data.iterrows():
        cursor.execute(
            "INSERT INTO movies VALUES (%s, %s, %s, %s, %s)",
            (
                row["movie_id"],
                row["movie_name"],
                row["trailer_link"],
                row["image_link"],
                row["movie_desc"],
            ),
        )
    conn.commit()  # IMPORTANT! Always commit the transaction to update the values in the database
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("DB doesn't exist")
    else:
        print(err)
else:
    conn.close()
