#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>

#define RSTPIN 9
#define SSPIN 10
MFRC522 rfid(SSPIN, RSTPIN);
SoftwareSerial EEBlue(5, 6);
String tagInProcess = "";
bool isProcessingTag = false;
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
      tone(3, 1760);
      Serial.println("Tag id is: " + tagId);
      tagInProcess = tagId;
      StaticJsonBuffer<512> jsonBuffer;
      JsonObject &root = jsonBuffer.createObject();
      root["tagId"] = tagId;
      root.printTo(EEBlue);
      EEBlue.println();
      root.prettyPrintTo(Serial);
      isProcessingTag = true;
      delay(350);
      noTone(3);
    }
  }
  else
  {
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
          tone(3, 2093);
          delay(200);
          noTone(3);
          tone(3, 2637);
          delay(200);
          noTone(3);
          Serial.println("Access Accepted");
        }
        else
        {
          tone(3, 740);
          delay(400);
          noTone(3);
          tone(3, 494);
          delay(300);
          noTone(3);
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
