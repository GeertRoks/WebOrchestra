# WebOrchestra
#### By Bram Giesen, Geert Roks en Ward Slager

### Development notice Board
  - Om source files in bijvoorbeeld html bestanden toe te voegen moet je dit berekenen vanuit de public map. Zie de index.html van conductor_rhythm als voorbeeld. Mappen hoger dan public kunnen niet gezien worden.

  - Geen arbitraire map namen zoals `assets`. Beschrijf het liever. Ik heb bijvoorbeeld alle fonts die gebruikt worden in de map `fonts` gezet. De samples zijn verplaatst naar `soundLibrary` in de map `samples`. Bewaar alle geluiden en synthesizer patches dus in `soundLibrary`. Omdat de server dus altijd bij `public` begint zijn de samples dus overal te krijgen, ookal zit je een map lager.

  - Hoe test je de server:
    - installeer node met: `sudo apt install nodejs`
    - installeer npm met:  `sudo apt install npm`
    - ga naar de WebOrchestra map en type daar:  `npm install`. Dit alle alle gebruikte packages binnen.
    - In alle `sketch_<something>.js` bestanden staat de url `192.168.0.100:3000`. Voor development verander deze naar `localhost:3000` zodat je op je eigen laptop kan checken, maar als je gaat commiten **zorg dan dat je de standaard url weer terug zet!**.
    - run de server door in de `WebOrchestra` map te staan en type daar `node server.js`. Als alles goed is start deze om met de message: `Server listening at http://192.168.0.100:3000`. Ook kan je de lijst van verbonden clients zien. Als je dit niet kan zien dan ben je iets in stap 4 vergeten.


  - Voeg dingen toe aan de To Do, zodat iedereen weet van elkaar hoe ver ieder is en of er misschien geholpen kan worden.

### To Do

Network:
  - [x] Sync computers over their timestamp
  - [ ] Distribute notes over client computers with a mask

  *Optional:*
  - [ ] Server page
    - Amount and types of clients
    - Password?
    - Recall function for certain rooms
    - Placement of client computers


Algorithm:
  - [ ] Implement a rhythm part in the algorithm

  - [ ] Mapping conductor output to algorithm parameters
      - The following parameter methods will be used:
          - setTimbre()
          - setNoteDensity()


Client page:
  -

Conductor Rhythm:
  -

Conductor Melody:
  -

Conductor Drone:
  -


### Bugs:
  - Chrome 69 bug:
  ~~~
  Uncaught DOMException: Failed to set the 'buffer' property on 'ConvolverNode': Cannot set buffer to non-null after it has been already been set to a non-null buffer
  ~~~
  Found this open issue on it: https://github.com/Tonejs/Tone.js/issues/392
  Maybe its fixed in Chrome 70 (16 october 2018)?
