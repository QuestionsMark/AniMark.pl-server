<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://animark.pl">
    <img src="./readme/logo.jpg" alt="AniMark.pl Logo" width="200" height="200">
  </a>

<h1 align="center">AniMark.pl</h1>
  <p align="center">
    Fascynujesz się japońską kulturą i lubisz obejrzeć dobrą animację? AniMark jest stworzony właśnie dla Ciebie! Tak naprawdę to wieje nudą na tej witrynie, ale jak jednak już na nią zajrzysz to możesz założyć konto, skonfikurować swój profil, podzielić się wrażeniami po oglądniętej chińskiej bajce, albo spróbowac swoich sił w muzycznym quizie.
    <br />
    Stronka raczej pełni funkcję mojego portfolio na którym uczę się nowych technologii i dzielę się swoimi pozostałymi projektami.
    <br />
    <br />
  </p>
</div>

[![React][react.js]][react-url]
[![Typescript][typescript]][typescript-url]
[![Sass][sass]][sass-url]
[![Reactrouter][reactrouter]][reactrouter-url]
[![Axios][axios]][axios-url]
[![Dropzone][dropzone]][dropzone-url]
[![Reactpopup][reactpopup]][reactpopup-url]
[![ExpressJS][express]][reactpopup-url]

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

### Strona startowa

![home]

Na stronie startowej znajduje się wybierane przez uzytkowników platformy "Anime Tygodnia", najnowsze wiadomości ze świata anime, sekcja z rekomendowanymi profilami oraz lista innych moich projektów.

### Lista anime

![anime]

Lista anime z możliwością filtrowania i sortowania.

### Nowości

![news]

Lista interesujących mnie newsów ze świata anime.

### Lista użytkowników

![users]

Lista użytkowników połączłona z rankingiem po ilości zebranych punktów (AP - Ayaya Points).

### Galeria

![galery]

Galeria grafik.

### Profil uzytkownika

![profile]

Profil użytkownika skłąda się z 5 podstron. Na głównej stronie profilu znajdują się wszystkie statystyki związane z kontem, avatar profilu oraz opis. Na kolejnych podstronach znajdują się kolejno: subiektywna topka użytkownika, lista jego osiągnięć, możliwość edycji profilu oraz ustawienia prywatności.

### Osiągnięcia

![achievements]

Lista osiągnięć z opisami możliwe do zdobycia za aktywność na stronie.

### Moje inne projekty

![projects]

Lista innych moich projektów ze stakiem technologicznym i krótkim opisem.

## Jak zacząć

1. Sklonuj repozytorium
   ```sh
   git clone https://github.com/QuestionsMark/AniMark.pl-client.git
   ```
2. Przejdź do katalogu projektu
   ```sh
   cd AniMark.pl-client
   ```
3. Zainstaluj wszystkie zależności
   ```sh
   npm install
   ```
4. Uzupełnij plik konfiguracyjny `src/config.ts`
   ```js
   export const HOST_ADDRESS = "http://localhost:3001";
   export const LOCAL_STORAGE_PREFIX = "animark-";
   ```

## Do zobaczenia na stronie!

[animark.pl][animark-url]

<p align="right">(<a href="#top">back to top</a>)</p>

[animark-url]: https://animark.pl
[contributors-shield]: https://img.shields.io/github/contributors/QuestionsMark/AniMark.pl-client.svg?style=for-the-badge
[contributors-url]: https://github.com/QuestionsMark/AniMark.pl-client/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/s%C5%82awomir-dziurman-75464b205/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[sass]: https://img.shields.io/badge/sass-20232A?style=for-the-badge&logo=sass&logoColor=d5699f
[sass-url]: https://sass-lang.com/
[axios]: https://img.shields.io/badge/axios-20232A?style=for-the-badge&logo=axios&logoColor=1D80AB
[axios-url]: https://axios-http.com/docs/intro
[dropzone]: https://img.shields.io/badge/react%20dropzone-20232A?style=for-the-badge&logo=reactdropzone&logoColor=1D80AB
[dropzone-url]: https://react-dropzone.js.org/
[typescript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178c6
[typescript-url]: https://www.typescriptlang.org/
[reactrouter]: https://img.shields.io/badge/React%20Router-20232A?style=for-the-badge&logo=reactrouter&logoColor=fff
[reactrouter-url]: https://reactrouter.com/
[reactpopup]: https://img.shields.io/badge/reactjs%20popup-20232A?style=for-the-badge&logo=reactjs-popup&logoColor=fff
[reactpopup-url]: https://react-popup.elazizi.com/
[home]: readme/home.PNG
[anime]: readme/anime.PNG
[news]: readme/news.PNG
[users]: readme/users.PNG
[galery]: readme/galery.PNG
[profile]: readme/profile.PNG
[projects]: readme/projects.PNG
[achievements]: readme/achievements.PNG
[adding]: readme/adding.PNG
[express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
