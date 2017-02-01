int SECURITY_PIN = 12;
int SLIDER_PINS[8] = { A0, A1, A2, A3, A4, A5, A6, A7 };
//int LED_PINS[8] = { 2, 3, 4, 5, 6, 7, 8, 9 };
int LED_PINS[8] = { 3, 4, 5, 6, 7, 8, 9, 10 };

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < 8; i++) {
    pinMode(LED_PINS[i], INPUT_PULLUP);
  }
}

void loop() {
  Serial.print(!digitalRead(SECURITY_PIN));
  Serial.print(" ");
  Serial.print(0);
  Serial.print(" ");
  for (int i = 0; i < 8; i++) {
    Serial.print(analogRead(SLIDER_PINS[i]));
    Serial.print(" ");
  }
  for (int i = 0; i < 8; i++) {
    Serial.print(!digitalRead(LED_PINS[i]));
    Serial.print(" ");
  }
  Serial.println("");
  delay(50);
}
