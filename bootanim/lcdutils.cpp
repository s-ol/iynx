#include <Arduino.h>
#include "lcdutils.h"

void pad_print( const char *str, int pad ) {
  lcd.print(str);

  for (int i = strlen(str); i < pad; i++) lcd.print(' ');
}

void fancy_slow_print( const char *str, int pad = 0 ) {
  int len = strlen(str);
  int i;
  for (i = 0; i < len; i++) {
    delay(200);
    lcd.print(str[i]);
  }

  for (; i < pad; i++) lcd.print(' ');
}

void dot_dot_dot( int amount ) {
  int i = 0;
  while (amount > 0) {
    delay(400);
    amount -= 400;
    i++;

    if (i == 4) {
      i = 0;
      lcd.rightToLeft();
      lcd.write("    ");
      lcd.leftToRight();
      lcd.write(' ');
    } else {
      lcd.write('.');
    }
  }
  
  lcd.rightToLeft();
  while ( i > 0 ) {
    i--;
    lcd.write(' ');
  }
  lcd.leftToRight();
}
