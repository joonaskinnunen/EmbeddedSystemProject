#!usr/bin/env python
import time
import serial
import datetime
import re

from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient('mongodb+srv://OuluWeather:PASSWORD@cluster0.oc61a.mongodb.net/sensorDB?retryWrites=true&w=majority')
db=client.OuluWeather
# Issue the serverStatus command and print the results
serverStatusResult=db.command("serverStatus")
pprint(serverStatusResult)

ser = serial.Serial(
    port='/dev/ttyACM0',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

while 1:
    x=ser.readline().decode()
    p = '[\d]+[.,\d]+|[\d]*[.][\d]+|[\d]+'
    print(x)
    
    arr = [0, 0, 0, 0, 0, 0]
    
    i = 0
    
    for catch in re.findall(p, x):
        arr[i] = catch
        i += 1
    result = db.data.insert_one({'time': datetime.datetime.now(), 'temperature': arr[5], 'humidity': arr[0], 'lightness': arr[2], 'pollution': arr[4], 'distance': arr[3]})
  #  print(x)
    print(result)
    print(arr)
    time.sleep(2)
