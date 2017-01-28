int SECURITY_PIN = 2;
int SLIDER_PINS[8] = { A0, A1, A2, A3, A4, A5, A6, A7 };

void setup() {
  Serial.begin(115200);
  pinMode(SECURITY_PIN, INPUT_PULLUP);
}

void loop() {
  Serial.print(digitalRead(SECURITY_PIN));
  Serial.print(" ");
  Serial.print(0);
  Serial.print(" ");
  for (int i = 0; i < 8; i++) {
    Serial.print(analogRead(SLIDER_PINS[i]));
    Serial.print(" ");
  }
  Serial.println("");
  delay(50);
}
