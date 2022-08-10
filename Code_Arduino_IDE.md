```
// Code inspired from https://microcontrollerslab.com/esp32-esp8266-dht11-dht22-influxdb/ 

// Libraries
#include <Wire.h>
#include "DHT.h"
#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>
#include <WiFiMulti.h>

WiFiMulti wifiMulti; 

#define DEVICE "ESP32" // What device
#define DHTTYPE DHT11 // What sensor

uint8_t DHTPin = 32; // Uses GPI032 pin 
DHT dht(DHTPin, DHTTYPE);

float temperature;
float humidity;

#define WIFI_SSID ”…”
#define WIFI_PASSWORD ”…”
#define INFLUXDB_URL ”…” 
#define INFLUXDB_TOKEN ”…”
#define INFLUXDB_ORG ”…”
#define INFLUXDB_BUCKET ”…”

// Enter timezone to get correct time stamps in bucket
#define TZ_INFO "CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00"

InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN, InfluxDbCloud2CACert);

// Data points
Point sensor("measurements");

// Setup and connect to wifi
void setup() {
  Serial.begin(115200);
  pinMode(DHTPin, INPUT);
  dht.begin();
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to wifi");
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();

 // Add tags for device and ssid
  sensor.addTag("device", DEVICE);
  sensor.addTag("SSID", WiFi.SSID());
  
timeSync(TZ_INFO, "pool.ntp.org", "time.nis.gov");

  // Confirm connection to InfluxDB or show error
  if (client.validateConnection()) {
    Serial.print("Connected to InfluxDB: ");
    Serial.println(client.getServerUrl());
  } else {
    Serial.print("InfluxDB connection failed: ");
    Serial.println(client.getLastErrorMessage());
  }
}

void loop() {
  sensor.clearFields();

// Read and add the values from the sensor
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();

  sensor.addField("Temperature",temperature);
  sensor.addField("Humidity",humidity);

  Serial.print("Writing: ");
  Serial.println(client.pointToLineProtocol(sensor));

  // Check that there is a wifi signal
  
  if (wifiMulti.run() != WL_CONNECTED) {
    Serial.println(”No connection to wifi”);
  }

  if (!client.writePoint(sensor)) {
    Serial.print("Could not write to InfluxDB: ");
    Serial.println(client.getLastErrorMessage());
  }
  Serial.println("");
  Serial.println("Delay with 10 seconds");
  delay(10000); // Writes the point to the db every 10000 millisecond
}
```
