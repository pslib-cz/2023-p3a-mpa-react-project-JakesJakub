# Gwent

## Téma

Jedná se o karetní hru. Cílem hry je porazit protivníka ve dvou kolech pomocí své armády. Armáda je reprezentována kartami jednotek, které vycházejí ze světa Zaklínače. Hráč musí porazit protivníka tím, že součet útočné síly jejich karet převýší protivníka.
https://www.zatrolene-hry.cz/spolecenska-hra/gwint-5749/
https://www.playgwent.com/en/join

## Odkazy pro vývoj

[Odkaz na Figmu](https://www.figma.com/file/oPEZtZDGTHvjsQjZs6EM9u/Untitled?type=design&node-id=0-1&mode=design&t=cAoFRAVAZoIcedsY-0)

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
