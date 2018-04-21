#include <ArduinoJson.hpp>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>

#define RSTPIN 9
#define SSPIN 10
#define PIEZOPIN 3

#define REDLED 4
#define GREENLED 2

MFRC522 rfid(SSPIN, RSTPIN);

SoftwareSerial EEBlue(5, 6);
String tagInProcess = "";
bool isProcessingTag = false;
bool isLocked = true;

const long thresholdDelay = 8000;
unsigned long previousMillis = 0;

bool isInitialized = false;

void setup()
{

  Serial.begin(9600);
  EEBlue.begin(9600);

  pinMode(REDLED, OUTPUT);
  pinMode(GREENLED, OUTPUT);

  SPI.begin();
  rfid.PCD_Init();
  rfid.PCD_DumpVersionToSerial();

  StaticJsonBuffer<512> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["initialization_request"] = "setup";
  root.printTo(EEBlue);
  EEBlue.println();
}

void loop()
{

	if (millis() % 5000 == 0 && !isInitialized)
	{

		StaticJsonBuffer<512> jsonBuffer;
		JsonObject &root = jsonBuffer.createObject();
		root["initialization_request"] = "setup";
		root.printTo(EEBlue);
		EEBlue.println();
	}

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

  if (isProcessingTag)
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
  }

  if (EEBlue.available())
  {
    StaticJsonBuffer<512> jsonBuffer;
    JsonObject &receivedJson = jsonBuffer.parse(EEBlue);

    String messageType = receivedJson["messageType"];
    if (messageType == "update")
    {
      isLocked = (bool)receivedJson["updateValue"];
      digitalWrite(REDLED, isLocked);
      digitalWrite(GREENLED, !isLocked);
      isInitialized = true;
    }
    else if (isInitialized && messageType == "read")
    {
      JsonObject &root = jsonBuffer.createObject();
      root["isLocked"] = isLocked;
      root.printTo(EEBlue);
      EEBlue.println();
    }
    else if (messageType == "tagResponse")
    {

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

          isLocked = !isLocked;
          digitalWrite(REDLED, isLocked);
          digitalWrite(GREENLED, !isLocked);
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
  }
  else if (isProcessingTag)
  {
    Serial.println("Waiting approval");
    delay(100);
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
