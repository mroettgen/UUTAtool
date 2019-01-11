# UUTAtool [![Build Status](https://travis-ci.org/mroettgen/UUTAtool.svg?branch=master)](https://travis-ci.org/mroettgen/UUTAtool)
Ein Webinterface für manuelle Sentimentanalyse im Seminar User Diversity, Usability und Technikakzeptanz

JAR-Executable zum [Download](https://drive.google.com/drive/folders/1xUWtCZVnosPq8WnczXe_jXOJ5-lXD-tb).

## Benutzung
Zum Ausführen wird [Java](https://java.com/de/download/) benötigt.

Das Tool kann mit dem Befehl `java -jar UUTAtool-<version>-SNAPSHOT.jar` gestartet werden. 
Der Platzhalter `<version>` ist hierbei selbstverständlich mit der passenden Version zu ersetzen.

Ist das Tool erfolgreich gestartet, kann es im Browser über die URL [localhost:8080](http://localhost:8080) aufgerufen werden. Dort auswählen, wie viele Tweets geprüft werden sollen und die CSV-Datei auswählen, auf den "Los"-Button drücken und schon gehts... Los.

Nach der Bearbeitung aller Tweets kann die CSV wieder heruntergeladen werden.

## Entwicklung
Es wird benötigt:  
* Java-8
* maven 3

Hilfreich sind zusätzlich:  
* Editor mit Support für Spring-Boot
* Zeit, Geduld & Kaffee

Dann ein herzhaftes `git clone https://github.com/mroettgen/UUTAtool.git` und ab geht's.

Gleich nach dem Clonen sollte sich das Programm mittels `mvn spring-boot:run` starten und ebenfalls unter [localhost:8080](http://localhost:8080) betrachten lassen.