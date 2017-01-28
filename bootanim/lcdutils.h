#include <LiquidCrystal.h>

extern LiquidCrystal lcd;

void pad_print( const char *str, int pad );
void fancy_slow_print( const char *str, int pad = 0 );
void dot_dot_dot( int amount );
