#include "lcdutils.h"
#include "keypad.h"


void do_bootmsg() {
  lcd.blink();
  fancy_slow_print("Initiating Boot");
  lcd.setCursor(0, 1);
  lcd.noBlink();
}


void do_report() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("BUG REPORT");
  lcd.setCursor(0, 1);
  lcd.print("password is RUN");
  
  char key = kpd.waitForKey();
}

bool sound_status = false;
void do_sound() {
  Serial.println("calibstart");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("move all min/max");
  lcd.setCursor(3, 1);
  lcd.println(">        <   ");

  char state = '1' - 1;
  while (true) {
    if (!Serial.available() > 0) {
      delay(50);
      continue;
    }
    char data = Serial.read();

    int index = 0;
    switch (data) {
      case '1':
        index++;
      case '2':
        index++;
      case '3':
        index++;
      case '4':
        index++;
      case '5':
        index++;
      case '6':
        index++;
      case '7':
        index++;
      case '8':
        index++;
        lcd.setCursor(3 + index, 1);
        lcd.print('#');
        break;
       case 'D':
        lcd.setCursor(0, 0);
        fancy_slow_print("SND Calibrated!");
        sound_status = true;
        delay(800);
        return;
    }
  }
}

void draw_menu() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("1-REPORT 2-CHECK");
  lcd.setCursor(0, 1);
  lcd.print("3-SOUND CALIB.");
}

void setup() {
  Serial.begin(115200);
  
  lcd.begin(16, 2);
  lcd.clear();
  
  do_bootmsg();
  do_subsystems();
//  do_pinentry();
  delay(2000);
  draw_menu();
}

void loop() {
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
