# Projekt beskrivelse:

Byg en dynamisk indkøbsliste hvor brugere kan tilføje og fjerne varer samt sortere dem
efter både pris og navn. Gem varerne i et array og udskriv den aktuelle liste på siden.
Beregn og vis også den samlede pris dynamisk.

Hvad kan mit program:

- Tilføje en vare til listen (navn og pris)
- Fjerne en vare fra listen
- Sortere listen efter navn (alfabetisk)
- Sortere listen efter pris (numerisk)
- Vise totalprisen på listen
- Skrive en besked i konsollen omkring den tilføjede vare
- Hvis værdierne ikke godtages modtager brugeren en fejlmedelelse
- Navnet på varene får korrekt formatering hvis det er lowercase eller aLtErNaTiNg CaPs

Hvad sker der så i koden?

- DOMContentLoaded og array
- Init
- Prevent default på Submit-input
- Første objekt laves i createNewObject
- updateShoppingList -> objektet pushes til shoppinglist-array og inputfelterne rydes
- printShoppingList -> DOM manipulation, knapper, totalpris
- hjælper functions -> sortName, sortPrice, removeItem, clearList, formatName

Hvad kunne være fedt at få med?

- Sort i omvendt rækkefølge
- Localstorage
- Tilføje supermarked hvor varen skal købes (Netto)
- Tilføje kategorier (frugt)
- Tilføje mængder af varer (10 æbler)
