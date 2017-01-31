#include <SoftwareSerial.h>
#include "lcdutils.h"
#include "keypad.h"

#define SIM_TXD 10
#define SIM_RXD 11

SoftwareSerial sim(SIM_TXD, SIM_RXD);

void setup_sim(char *pin) {
  sim.begin(9600);
  delay(1000);

  // enter pin
  sim.write("AT+CPIN=\"");
  sim.write(pin);
  sim.write("\"\r\n");
  delay(1000);
  
  // SMS encoding = ASCII
  sim.write("AT+CMGF=1\r\n");
  delay(1000);
}

void send_text(char *number, char *text) {
  // enter number
  sim.write("AT+CMGS=\"");
  sim.write(number);
  sim.write("\"\r\n");
  delay(1000);

  // enter text
  sim.write(text);
  delay(1000);

  // send ESC
  sim.write((char)26);
  delay(1000);
}

void do_bootmsg() {
  lcd.blink();
  fancy_slow_print("Initiating Boot");
  lcd.setCursor(0, 1);
  lcd.noBlink();
}

void draw_menu() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("DBG CTRL: press");
  lcd.setCursor(0, 1);
  lcd.print("1-RPT 2-CHK 3-SND");
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  lcd.begin(16, 2);
  lcd.clear();

/*
  setup_sim("");
  Serial.println("setup");
  Serial.println("sent");
*/

//  do_bootmsg();
//  do_subsystems();
//  do_pinentry();
  delay(2000);
  draw_menu();
}


void do_report() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("BUG REPORT");
  lcd.setCursor(0, 1);
  lcd.print("password is abcd");
  
  char key = kpd.waitForKey();
}

bool sound_status = false;
void do_sound() {
  Serial.println("calibstart");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SND CALIBRATION ");
  lcd.setCursor(3, 1);
  lcd.println(">        <   ");
  lcd.setCursor(4, 1);
  lcd.blink();

  char state = '1' - 1;
  while (true) {
    if (!Serial.available() > 0) {
      delay(50);
      continue;
    }
    char data = Serial.read();
   
    switch (data) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        for (int i = (data - state); i > 0; i--)
          lcd.print('#');
        state = max(state, data); 
        break;
      case '8':
        lcd.print('#');;
        lcd.noBlink();
        lcd.setCursor(0, 0);
        fancy_slow_print("SND Calibrated!");
        sound_status = true;
        delay(800);
        return;
    }
  }
}

void loop() {
  /*
   if (sim.available())
    Serial.write(sim.read());
  */

  switch (kpd.getKey()) {
    case '1':
      do_report();
      draw_menu();  
      break;
    case '2':
      lcd.clear();
      fancy_slow_print("Checking systems...");
      do_subsystems();
      delay(1000);
      draw_menu();
      break;
    case '3':
      do_sound();
      draw_menu();  
      break;
    default:
      if (Serial.available() > 0) {
        char data = Serial.read();
        //if (data == 0x13)
        //    send_text("");
      }
  }
  delay(100);
}
