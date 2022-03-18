import w1thermsensor
import time
import board
from adafruit_seesaw.seesaw import Seesaw
 


def main():
    sensor = w1thermsensor.W1ThermSensor()
    i2c_bus = board.I2C()
    ss = Seesaw(i2c_bus, addr=0x36)

    touch = ss.moisture_read()
    temp = sensor.get_temperature()

    # print("temp: " + str(temp) + "  moisture: " + str(touch))
    return (temp, touch)

if __name__ == '__main__':
    main()