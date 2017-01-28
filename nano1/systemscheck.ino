#include "lcdutils.h"

bool check_battery() {
  dot_dot_dot(3000);
  return true;
}

bool check_sound() {
  dot_dot_dot(3000);
  return false;
}

struct subsystem {
  char name[12];
  bool status;
  bool (*check)();
};

struct subsystem subsystems[3] = {
  { "battery:", -1, &check_battery },
  { "snd-drv:", -1, &check_sound },
  { "selftest:", -1, &check_battery },
};

void do_subsystems() {
  for (int i = 0; i < 3; i++) {
    struct subsystem *sub = &subsystems[i];
    if (i != 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      
      pad_print(subsystems[i - 1].name, 10);
      lcd.print(subsystems[i - 1].status ? "[OKAY]" : "[FAIL]");
    }
    
    lcd.setCursor(0, 1);
    fancy_slow_print(sub->name, 10);
    sub->status = sub->check();
    lcd.print(sub->status ? "[OKAY]" : "[FAIL]");
    delay(150);
  }
}
