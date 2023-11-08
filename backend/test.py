import sqlite3

connect = sqlite3.connect(r'D:\Study\code\my-order-test\backend\test.db')
cursor = connect.cursor()

sql_query = ''' UPDATE Product
                SET name = "test update product", image = "image update test"
                WHERE ID = 1;
            '''
cursor.execute(sql_query)
connect.commit()

data = connect.execute('''SELECT * from Product;''')
data = list(data)
print(data)