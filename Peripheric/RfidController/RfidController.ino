#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>

#define RSTPIN 9
#define SSPIN 10
#define PIEZOPIN 3
MFRC522 rfid(SSPIN, RSTPIN);

SoftwareSerial EEBlue(5, 6);
String tagInProcess = "";
bool isProcessingTag = false;

const long thresholdDelay = 5000;
unsigned long previousMillis = 0;

void setup()
{

  Serial.begin(9600);
  EEBlue.begin(9600);

  SPI.begin();
  rfid.PCD_Init();
  rfid.PCD_DumpVersionToSerial();
}

void loop()
{

  String tagId = getid();

  if (!isProcessingTag)
  {
    if (tagId != "")
    {
      tone(PIEZOPIN, 1760);
      Serial.println("Tag id is: " + tagId);
      tagInProcess = tagId;
      StaticJsonBuffer<512> jsonBuffer;
      JsonObject &root = jsonBuffer.createObject();
      root["tagId"] = tagId;
      root.printTo(EEBlue);
      EEBlue.println();

      //Start timing for response delay
      previousMillis = millis();

      root.prettyPrintTo(Serial);
      isProcessingTag = true;
      delay(350);
      noTone(PIEZOPIN);
    }
  }
  else
  {

    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= thresholdDelay)
    {
      
      isProcessingTag = false;
      tagInProcess = "";
      tone(PIEZOPIN, 494);
      delay(500);
      noTone(PIEZOPIN);
      tone(PIEZOPIN, 494);
      delay(500);
      tone(PIEZOPIN, 250);
      delay(300);
      noTone(PIEZOPIN);
      Serial.println("Request expired");
      Serial.println("Access Denied");
      return;
    }

    //Read to get response from bluetooth, flash a yellow light, if response, red if refused, green if approved
    if (EEBlue.available())
    {
      StaticJsonBuffer<512> jsonBuffer;
      JsonObject &receivedJson = jsonBuffer.parse(EEBlue);
      receivedJson.prettyPrintTo(Serial);
      String validatedTag = receivedJson["tagRead"];

      if (validatedTag == tagInProcess)
      {
        if (receivedJson["accepted"] == "true")
        {
          tone(PIEZOPIN, 2093);
          delay(200);
          noTone(PIEZOPIN);
          tone(PIEZOPIN, 2637);
          delay(200);
          noTone(PIEZOPIN);
          Serial.println("Access Accepted");
        }
        else
        {
          tone(PIEZOPIN, 740);
          delay(400);
          noTone(PIEZOPIN);
          tone(PIEZOPIN, 494);
          delay(300);
          noTone(PIEZOPIN);
          Serial.println("Access Denied");
        }
        isProcessingTag = false;
        tagInProcess = "";
      }
    }
    else
    {
      Serial.println("Waiting approval");
    }
    delay(500);
  }
}

//function to get the UID of the card
String getid()
{
  if (!rfid.PICC_IsNewCardPresent())
  {
    return "";
  }
  if (!rfid.PICC_ReadCardSerial())
  {
    return "";
  }

  String cardId = "";
  for (int i = 0; i < 4; i++)
  {
    cardId += String(rfid.uid.uidByte[i], HEX);
  }
  rfid.PICC_HaltA();

  return cardId;
}
