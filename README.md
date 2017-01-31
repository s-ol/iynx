IYNX
====

IYNX consists of three parts for the three devices.

raspi
-----
an electron app built with react, to be run on a raspi (2 or 3).

Instructions:

    cd raspi/
    npm install
    npm start

expects `nano2` to be at `/dev/ttyUSB0`.

To start from SSH specify the `$DISPLAY` environment variable:

    DISPLAY=:0 npm start

nano1
-----
an arduino project that drives a mono character LCD display, a keypad
and a SIM800L module.

nano2
-----
a small arduino project that reads 8 analog values (for the sliders),
and a few digital pins.
Information is sent via ASCII UART:

    SECURITY WIRES SLIDER0 SLIDER1... SLIDER7 LED0 LED1... LED7\n

`SLIDER` values range between 0 and 1023, everything else is 0 or 1.
