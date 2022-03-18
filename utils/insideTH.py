import Adafruit_DHT
import time
 
DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 26
 

def main():
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    return (temperature,humidity)

if __name__ == '__main__':
    main()