#!usr/bin/env python
import time
import serial
import datetime
import re
import numpy as np

from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient('mongodb+srv://OuluWeather:OuluWeather123@cluster0.oc61a.mongodb.net/sensorDB?retryWrites=true&w=majority')
db=client.OuluWeather
# Issue the serverStatus command and print the results
serverStatusResult=db.command("serverStatus")
pprint(serverStatusResult)

# Set up the serial monitor
ser = serial.Serial(
    port='/dev/ttyACM0',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)

# Initialize data array. Six columns, one for each sensor. 60 rows for each second of a minute
data = np.zeros((60,6))

# A flag variable for distance sensor
movement = None

# Infinite loop to pick up and handle data from serial. Inside the loop is another loop that collects 60 samples, one each second
while 1:
    k = 0
    while k < 60:

        x=ser.readline().decode()
        p = '[-?\d]+[.,\d]+|[\d]*[.][\d]+|[\d]+'
        
        i = 0
        
        for catch in re.findall(p, x):
            data[k,i] = float(catch)
            if i == 3:
                if data[k,i] < 270:
                    print('Alarm! Joku on ovella!')
                    print('Etaisyysanturin lukema: %d' % data[k,i])
                    movement = True
                    data[k,i] = 0
                elif data[k,i] >= 270 and movement == True:
                    data[k,i] = 1
                    movement = False
                else:
                    data[k,i] = 0
                    movement = False
            i += 1
        avgs = np.mean(data, axis=0)
        if k == 1 and avgs[0] == 0:
            k = 0 
        else:
            k += 1
        time.sleep(1)
    data[data == 0] = np.nan
    avgs = np.nanmean(data, axis=0)
    sums = np.nansum(data, axis=0)
    result = db.data.insert_one({'time': datetime.datetime.now(), 'temperature': avgs[5], 'humidity': avgs[0], 'lightness': avgs[2], 'pollution': avgs[4], 'activity': sums[3]})
    print(x)
    print(result)

