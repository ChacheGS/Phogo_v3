#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <FS.h>
#include <string.h>
#include <Hash.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Arduino.h>

#include "Phogo.h"

#include "debug.h"

// const char* ssid = "LGk10";
// const char* password  = "lgk10ros";
// const char* ssid = "Low Signal";
// const char* password = "sierragador15";
const char* ssid = "Chache Hotspot";
const char* password = "wificarlos";
const char* mdns_hostname = "phogo";

//Globals
AsyncWebServer server(80);

bool WifiConnectTo(const char* ssid, const char* password, int timeout) {
    int connection_time = 0;
    int connection_start = millis();
    bool connection_success = true;
    WiFi.hostname(mdns_hostname);
    WiFi.mode(WIFI_STA);

    DEBUGGING("[WIFI]\tConnecting to '%s'\n", ssid);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED && connection_success) {
        connection_time = millis() - connection_start;
        if (connection_time > timeout) {
            // we leave the loop after the timeout
            connection_success = false;
        }
        delay(100);
    }
    if (connection_success) {
        DEBUGGING("[WIFI]\tConnected to '%s'. Local IP: ", ssid);
        DEBUGGINGL(WiFi.localIP());
        DEBUGGINGC("\n");
        return true;
    } else {
        DEBUGGING("[WIFI]\tConnection to '%s' timed out after ", ssid);
        DEBUGGINGL(connection_time / 1000.0);
        DEBUGGINGL(" s\n");
    }
    return false;
}

bool WifiStartAccessPoint() {
    bool connection_success = false;
    char APName[20] = {0};
    sprintf(APName, "Phogo%08X", ESP.getFlashChipId());
    DEBUGGING("[WIFI]\tStarting AP mode as '%s'\n", APName);
    WiFi.mode(WIFI_AP);
    // ap config
    IPAddress ip(10, 0, 0, 2);
    IPAddress gateway(10, 0, 0, 1);
    IPAddress subnet(255, 255, 255, 0);
    WiFi.softAPConfig(ip, gateway, subnet);
    
    connection_success = WiFi.softAP(APName, APName);
    delay(500);

    if (connection_success) {
        DEBUGGING("[WIFI]\tStarted AP mode as '%s' [password=%s] [ip=", APName, APName);
        DEBUGGINGL(WiFi.softAPIP());
        DEBUGGINGC("]\n");
        return true;
    } 

    DEBUGGING("[WIFI]\tAP mode failed\n");
    return false;
}

#define WIFI_CONNECTION_TIMEOUT 1000 * 20 // 20 s total
#define RECONNECTION_RETRIES 3
uint8_t consumed_retries = 0;
// Wifi Connection
bool isAP = false;
int WifiConnect() {
    
    if (isAP || WiFi.status() == WL_CONNECTED) {
        return 0;
    }

    if (WifiConnectTo(ssid, password, WIFI_CONNECTION_TIMEOUT)) {
        return 0;
    }

    // TODO: maybe retry connection?
    if (WifiStartAccessPoint()) {
        isAP = true;
        return 0;
    }

    return 1;    
}

void stop_forever() {
    DEBUGGING("[STOP]\tStopping forever\n");
    init_led();
    while (1) {
        ESP.wdtFeed();
        led(ON);
        delay(150);
        led(OFF);
        delay(150);
    }
}

// mDNS
void MDNSConnect(const char* localname) {
    if (!MDNS.begin(localname)) {
        DEBUGGING("[MDNS]\tSetup error\n");
        return;
    }
    MDNS.addService("http", "tcp", 80);
    DEBUGGING("[MDNS]\tStarted: 'http://%s.local/'\n", localname);
}

void setup() {
#ifdef DEBUG
    Serial.begin(115200);
    while (!Serial) {
        // wait for initialization
    }
#endif

    SPIFFS.begin();
    // server.begin();

    int connected = 0;
    while ((connected == 0) && (++consumed_retries <= RECONNECTION_RETRIES)) {
        if (WifiConnect() == 0) {
            connected = 1;
        }
    }
    if (!connected) {
        DEBUGGING("[WIFI]\tWiFi setup failed. Stopping forever.");
        stop_forever();
    }

    MDNSConnect(mdns_hostname);
    HTTPServerSetup();
    // phogo_setup();
}

void loop() {
    // if (WifiConnect() == 0) {
        // TODO: ensure_connection()
        // MDNSConnect(mdns_hostname);
    // }

    // delay(10);
    ESP.wdtFeed();
}
