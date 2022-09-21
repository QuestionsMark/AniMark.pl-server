<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://animark.pl">
    <img src="./readme/logo.jpg" alt="AniMark.pl Logo" width="200" height="200">
  </a>

<h1 align="center">AniMark.pl - API</h1>
  <p align="center">
    Rest Api dla platformy AniMark.pl.
    <br />
    <br />
  </p>
</div>

[![Express][express]][express-url]
[![Typescript][typescript]][typescript-url]
[![MongoDB][mongodb]][mongodb-url]
[![JsonWebToken][jsonwebtoken]][jsonwebtoken-url]

<details>
  <summary>Spis treści</summary>
  <ol>
    <li>
      <a href="#o-projekcie">O projekcie</a>
    </li>
    <li>
      <a href="#jak-zacząć">Jak zacząć</a>
    </li>
  </ol>
</details>

## O projekcie

RESTFul API dla platformy animark.pl oparte na expressJS i MongoDB. Aplikacja zawiera drobne elementy oparte na socket.io.

## Jak zacząć

1. Sklonuj repozytorium
   ```sh
   git clone https://github.com/QuestionsMark/AniMark.pl-server.git
   ```
2. Przejdź do katalogu projektu
   ```sh
   cd AniMark.pl-server
   ```
3. Zainstaluj wszystkie zależności
   ```sh
   npm install
   ```
4. Stworzyć plik konfiguracyjny `config/config.ts` na podstawie pliku `config/config.example.ts`

   ```js
   export const DB_CONNECTION =
     "mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"; // link połączenia do bazy danych MongoDB

   export const TOKEN_SECRET = "KOf@h73KEU&4JjKJk2!Lo"; // dowolny ciąg znaków, mozna zostawić tak jak jest

   export const HOST_ADDRESS = "http://localhost:3001"; // adres servera bez slasha na końcu!!!

   export const CORS_ORIGIN = ["http://localhost:3000"];
   ```

   <p align="right">(<a href="#top">back to top</a>)</p>

[animark-url]: https://animark.pl
[contributors-shield]: https://img.shields.io/github/contributors/QuestionsMark/AniMark.pl-client.svg?style=for-the-badge
[contributors-url]: https://github.com/QuestionsMark/AniMark.pl-client/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/s%C5%82awomir-dziurman-75464b205/
[typescript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178c6
[typescript-url]: https://www.typescriptlang.org/
[express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://www.npmjs.com/package/express
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[jsonwebtoken]: https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[jsonwebtoken-url]: https://www.npmjs.com/package/jsonwebtoken
