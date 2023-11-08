import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

connect = sqlite3.connect('./backend/test.db')
cursor = connect.cursor()
# CREATE TABLE
sql_query = '''CREATE TABLE IF NOT EXISTS Product(
              ID  INT PRIMARY KEY,
              name  TEXT,
              image TEXT,
              description TEXT,
              seller  TEXT,
              price INT,
              sales INT,
              rating  INT,
              discount  INT
            );'''
cursor.execute(sql_query)
data = connect.execute('''SELECT * from Product;''')
data = list(data)
print(data)
connect.close() 

@app.route("/")
def index():
    return "Hello World, My Name is Konlawat. Nice to meet you!!"


@app.route("/select", methods = ['GET'])
def select():
  connect = sqlite3.connect('./backend/test.db')
  cursor = connect.cursor()
  data = connect.execute('''SELECT * from Product;''')
  data = list(data)
  print(data)
  connect.close() 
  return jsonify(data)


@app.route("/insert", methods = ['POST'])
def insert():
  sql_query = ''' INSERT INTO Product(ID, name, image, description, seller, price, sales, rating, discount)
                  VALUES (1, "testproduct", "imagetest", "good test product", "tester man", 999, 1, 5, 0);
              '''
  cursor.execute(sql_query)
  connect.commit()


@app.route("/update", methods = ['POST'])
def update():
  sql_query = ''' UPDATE Product
                SET name = "test update product", image = "image update test"
                WHERE ID = 1;
            '''
  cursor.execute(sql_query)
  connect.commit()


@app.route("/delete", methods = ['POST'])
def delete():
  connect.execute("DELETE from Product WHERE ID=1;")
  connect.commit()


# DELETE TABLE
# cur.execute("DROP TABLE movie;")

# sql_query = """SELECT name FROM sqlite_master  
#   WHERE type='table';"""
# cursor.execute(sql_query)
# print(cursor.fetchall())

# connect.close() 

if __name__ == '__main__':
  app.run(debug=False)