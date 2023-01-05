/***** VARIABLER *****/
const tekstFelt = document.querySelector("#tekst-felt");
const knapp = document.querySelector("#leggtil-knapp");
const liste = document.querySelector("#liste");

/***** FUNKSJONER *****/

/**
 * Sender tekst fra #tekst-felt til lagVare(), og fester elementet til liste.
 * @param {string} vareNavn Navnet på varen som skal festes til listen.
 * @return void
 */
function leggTilIListe(vareNavn) {
  const li = lagVare(vareNavn);

  liste.appendChild(li);
  tekstFelt.value = "";
  tekstFelt.focus();
  //Lagre listen når nye varer legges til.
  lagreListe();
}

/**
 * Skaper et li-element med varenavn og sletteknapp.
 * @param {string} vare Teksten som skal settes inn i li-elementet.
 * @return {HTMLElement} Et li-element med tekst og et P-element.
 */
function lagVare(vare) {
  //Lag nytt HTML-element
  const li = document.createElement("li");
  const slett = new Slett(li);
  //Legg data fra #tekst-felt inn i HTML-elementet
  li.innerHTML = vare;
  li.appendChild(slett.knapp);
  //Returner li-element.
  return li;
}

//Lag en sletteknapp
function Slett(li) {
  this.knapp = document.createElement("p");
  this.knapp.innerHTML = "X";
  this.knapp.classList.add("slett");

  //Legg til slett-funksjon på slett-knappen.
  this.knapp.addEventListener("click", function (event) {
    liste.removeChild(li);

    //Lagre listen når varer slettes.
    lagreListe();
  });
}

//Lagre listen.
function lagreListe() {
  const listeArray = document.querySelectorAll("li");
  const varer = [];
  for (let i = 0; i < listeArray.length; i++) {
    varer.push(listeArray[i].innerText.slice(0, -3));
  }
  localStorage.handleListeApp = varer.join("#¤%");
}

/***** PROGRAM *****/
knapp.addEventListener("click", function () {
  const VARE = tekstFelt.value.trim();
  if (VARE) {
    leggTilIListe(VARE);
  }
});

//Sjekk om det finnes en lagret liste.
if (localStorage.handleListeApp) {
  //Hvis det finnes: Hent inn i appen.
  const varer = localStorage.handleListeApp.split("#¤%");
  for (let i = 0; i < varer.length; i++) {
    leggTilIListe(varer[i]);
  }
}
