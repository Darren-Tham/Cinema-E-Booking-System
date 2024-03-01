import mysql.connector
from mysql.connector import errorcode
import pandas as pd

try:
    conn = mysql.connector.connect(
        user="swe", password="password", host="localhost", database="CINEMA"
    )
    print("Successfully connected to DB")
    cursor = conn.cursor()
    # Create the movies table
    create_table_query = """
    CREATE TABLE movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_name VARCHAR(255) NOT NULL,
        trailer_link VARCHAR(255),
        image_link VARCHAR(255),
        movie_desc TEXT,
        movie_rating_code ENUM('G', 'PG', 'PG-13', 'R', 'NC-17') COMMENT 'Assuming a predefined set of ratings',
        movie_producer VARCHAR(255),
        movie_category VARCHAR(255),
        movie_director VARCHAR(255),
        movie_cast TEXT,
        movie_times VARCHAR(255),
        movie_date DATE,
        review TEXT,
        synopsis TEXT
    );
    """
    cursor.execute(create_table_query)
    data = pd.read_csv("src/data/movies_data_updated.csv")
    for i, row in data.iterrows():
        cursor.execute(
            "INSERT INTO movies (movie_name, trailer_link, image_link, movie_desc, movie_rating_code, movie_producer,movie_category,movie_director,movie_cast,movie_times,movie_date, review, sypnosis)" + 
            "VALUES (%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s,%s)",
            (
                row["movie_name"],
                row["trailer_link"],
                row["image_link"],
                row["movie_desc"],
                row["movie_rating_code"],
                row["movie_producer"],
                row["movie_category"],
                row["movie_director"],
                row["movie_cast"],
                row["movie_times"],
                row["movie_date"],
                row["review"],
                row["sypnosis"]
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
