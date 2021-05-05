# EmbeddedSystemProject

![React Native apps](/ReactNativeApps.png)

## Introduction
The aims of this project were to make an embedded system application. An application that measures temperature, humidity and the amount of light in the centre of Oulu  was created. In addition, the system counts the number of people passing through the door of an apartment building. The purpose was also to learn how to create embedded systems using a microcontroller and a Raspberry Pi mini-computer. 

## Objectives
The idea for the project was based on the consideration of how much the weather, light, or time of day affects how much people move outdoors. We wanted to create an app that could track this.
The system uses several different sensors and the goal is to learn how to calibrate and test them correctly according to physics. 
One object was also to learn how to transfer information between different hardware and software so that the end result is software in which the information obtained from the embedded system is presented as user-friendly a manner as possible. 

## Methods
The station is technically implemented with an Arduino microcontroller and connected sensors. The Arduino is connected to a Raspberry Pi, which sends the data collected from the sensors to a database. 
Mobile apps for Android and iOS were created with React Native to view information. In addition, a web application is created that can be accessed with any modern web browser. 
The project was implemented according to the Scrum model of agile development. The phasing and schedule of the project is documented in the taiga.io service.

## Results
The system worked as planned. Android, iOS and web apps work as expected.
The calibration of the light sensor was more difficult than we expected, but the calibration of the all sensors was successful and the system gives sufficiently accurate measurement results.

## References
Sensors used in the project:

HW5P-1 phototransistor. Datasheet: https://cdn-shop.adafruit.com/product-files/2831/HW5P-1_2015__1_.pdf 

HC-SR04 Ultrasonic Ranging Module. Datasheet: https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf 

DHT11 temperature-humidity sensor. Datasheet: https://www.mouser.com/datasheet/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf 

KY-028 temperature sensor module. Datasheet: https://datasheetspdf.com/pdf/1402039/Joy-IT/KY-028/1  
