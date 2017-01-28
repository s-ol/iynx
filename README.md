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
a simple digital value and is supposed to read the solution to another puzzle.
Information is sent via UART.
