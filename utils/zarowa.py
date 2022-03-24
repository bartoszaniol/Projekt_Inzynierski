import sys
from yeelight import discover_bulbs
from yeelight import Bulb
from PIL import ImageColor

colorValue = sys.argv[1]
bulbIP = discover_bulbs()[0]['ip']
bulb = Bulb(bulbIP)

RGBValue = ImageColor.getcolor(colorValue, "RGB")
bulb.set_rgb(RGBValue[0], RGBValue[1], RGBValue[2],)


# print("DONE")
# sys.stdout.flush()