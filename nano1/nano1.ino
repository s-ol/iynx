#include <LiquidCrystal.h>
#include "lcdutils.h"

LiquidCrystal lcd(2, 3, 6, 7, 8, 9);


void do_bootmsg() {
  lcd.blink();
  fancy_slow_print("Initiating Boot");
  lcd.setCursor(0, 1);
  lcd.noBlink();
}

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  lcd.clear();

  do_bootmsg();
  do_subsystems();
  do_pinentry();
}

void loop() {
  lcd.clear();
  lcd.setCursor(0,0);
  fancy_slow_print("YAAAAAY");
}
