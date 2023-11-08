import sqlite3
from flask import Flask, request, jsonify

database_path = './backend/test.db'

def initialDatabase():
  connect = sqlite3.connect(database_path)
  cursor = connect.cursor()
  sql_query = '''CREATE TABLE IF NOT EXISTS Product(
                ID  INT PRIMARY KEY,
                name  TEXT,
                image TEXT,
                description TEXT,
                seller  TEXT,
                price INT,
                discount  INT,
                piece INT,
                salecount INT,
                rating  INT,
                ratingcount INT,
                category char(30)
              );'''
  cursor.execute(sql_query)
  data = connect.execute('''SELECT * from Product;''')
  data = list(data)
  print(data)
  connect.close() 

app = Flask(__name__)

# test active server
@app.route("/")
def index():
    return "Hello World, My Name is Konlawat. Nice to meet you!!"

# get all product
@app.route("/getallproduct", methods = ['GET'])
def selectAllProduct():
  connect = sqlite3.connect(database_path)
  data = connect.execute('SELECT * FROM Product ORDER BY price;')
  data = list(data)
  connect.close() 
  return jsonify(data)

# get data by id
@app.route("/getproduct", methods = ['GET'])
def selectProductwithID():
  id_ = request.args.get('id')
  
  connect = sqlite3.connect(database_path)
  data = connect.execute(
    'SELECT * FROM Product WHERE id = ?;', (id_,)
  )
  data = list(data)
  connect.close() 
  return jsonify(data)

# get data by category
@app.route("/getproductlist", methods = ['GET'])
def selectProductwithCategory():
  category = request.args.get('category')
  
  connect = sqlite3.connect(database_path)
  data = connect.execute(
    'SELECT * FROM Product WHERE category = ? ORDER BY price', (category,)
  )
  data = list(data)
  connect.close() 
  return jsonify(data)


# new product
@app.route("/newproduct", methods = ['POST'])
def insertProduct():
  connect = sqlite3.connect(database_path)
  cursor = connect.cursor()

  # check last id
  data = connect.execute('SELECT * FROM Product ORDER BY id DESC;')
  data = list(data)
  if(len(data) > 0):
    next_id = data[0][0] + 1
  else:
    next_id = 0

  # get data
  request_data = request.get_json()
  name = request_data['name']
  imageblob = request_data['image']
  description = request_data['description']
  seller = request_data['seller']
  price = request_data['price']
  discount = request_data['discount']
  piece = request_data['piece']
  category = request_data['category']

  sql_query = ''' 
                INSERT INTO Product(ID, name, image, description, seller, price, discount, piece, salecount, rating, ratingcount, category)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?);
              '''
  cursor.execute(sql_query, (next_id, name, imageblob, description, seller, price, discount, piece, category,))
  connect.commit()
  connect.close() 
  return "insert successful"


# update product data
@app.route("/updateproduct", methods = ['POST'])
def updateProduct():
  # get data from req
  request_data = request.get_json()
  id_ = request_data['id']
  name = request_data['name']
  imageblob = request_data['image']
  description = request_data['description']
  seller = request_data['seller']
  price = request_data['price']
  discount = request_data['discount']
  piece = request_data['piece']
  category = request_data['category']

  connect = sqlite3.connect(database_path)
  cursor = connect.cursor()
  sql_query = ''' 
                UPDATE Product
                SET name = ?, 
                    image = ?, 
                    description = ?, 
                    seller = ?, 
                    price = ?, 
                    discount = ?,
                    piece = ?,
                    category = ?
                WHERE ID = ?;
              '''

  cursor.execute(sql_query, (name, imageblob, description, seller, price, discount, piece, category, id_))
  connect.commit()
  connect.close() 
  return "update successful"


# update sellcount ขายได้มาใช้ตัวนี้
@app.route("/updatesellcount", methods = ['POST'])
def updateSellCount():
  connect = sqlite3.connect(database_path)
  cursor = connect.cursor()

  # get data from req
  request_data = request.get_json()
  id_ = request_data['id']
  salecount = request_data['salecount']
  rating = request_data['rating']

  # get data with id
  databyid = connect.execute(
    'SELECT piece, salecount, rating, ratingcount FROM Product WHERE id = ?;', (id_,)
  )
  productData = list(databyid)[0]

  # check product and update value
  if(productData[0] > 0 and productData[0] - salecount <= 0):
    new_piece = productData[0] - salecount
    new_salecount = productData[1] + salecount

    if(rating > 0):
      new_rating = ((productData[2] * productData[3]) + rating) / (productData[3] + 1)
      new_ratingcount = productData[3] + 1
    else:
      new_rating = productData[2]
      new_ratingcount = productData[3]

    sql_query = ''' 
                  UPDATE Product
                  SET piece = ?,
                      salecount = ?,
                      rating = ?, 
                      ratingcount = ?
                  WHERE ID = ?;
                '''

    cursor.execute(sql_query, (new_piece, new_salecount, new_rating, new_ratingcount, id_))
    connect.commit()
    connect.close() 
    return "sell successful"
  else:
    return "sell error"

# delete product by id
@app.route("/deleteproduct", methods = ['DELETE'])
def deleteProduct():
  # get id from req
  request_data = request.get_json()
  id_ = request_data['id']

  connect = sqlite3.connect(database_path)
  connect.execute("DELETE from Product WHERE ID = ?;", (id_,))
  connect.commit()
  connect.close() 
  return "delete sucessfully"


# DELETE TABLE
@app.route("/deletetable", methods = ['DELETE'])
def deleteTable():
  connect = sqlite3.connect(database_path)
  cursor = connect.cursor()
  cursor.execute("DROP TABLE Product;")
  connect.commit()
  connect.close()
  initialDatabase()
  return "delete and restart successful"

# sql_query = """SELECT name FROM sqlite_master  
#   WHERE type='table';"""
# cursor.execute(sql_query)
# print(cursor.fetchall())

# connect.close() 

if __name__ == '__main__':
  initialDatabase()
  app.run(debug = False)