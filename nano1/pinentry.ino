#include "lcdutils.h"

char pass[4] = { '1', '3', '3', '7' };

void do_pinentry() {
  lcd.clear();
  
  fancy_slow_print("Access Denied.");
  
  char code[4];
  bool solved = false;
  while (!solved) {
reset:
    memset(code, 0, sizeof(code));
    lcd.setCursor(0, 1);
    lcd.print("____");
    lcd.setCursor(0, 1);

    lcd.blink();
    for (int digit = 0; digit < 4; digit++) {
      char key = kpd.waitForKey();
      switch (key) {
        case '*':
          code[digit - 1] = 0;
          lcd.rightToLeft();
          lcd.print('_');
          lcd.leftToRight();
          digit -= 2;
          break;
        case '#':
          goto reset;
        default:
          code[digit] = key;
          lcd.print('*');
          delay(200);
      }
    }

    lcd.noBlink();
    solved = memcmp(code, pass, sizeof(pass)) == 0;

    if (!solved) {
      for (int i = 0; i < 3; i++) {
        lcd.setCursor(0, 1);
        lcd.print("XXXX");
        delay(400);
        lcd.setCursor(0, 1);
        lcd.print("____");
        delay(200);
      }
    }
  }
}
