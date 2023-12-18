import {radSaPreduzecima} from '../radSaPreduzecima.class.js';

// pri odlasku korak nazad, podrazumevano, stranica se ne osvezava is ostaje nam isti kod koji je bio u tom momentu u istoriji
if (performance.navigation.type == 2) {
  location.reload(true);
}

var prikaz = document.querySelector("#prikazPreduzeca");
var izabranoPreduzece;
var prikazBilansa = $("#prikazBilansa");
var prikazPreduzeca = document.querySelector("#prikazPreduzeca");
var proveraDatum = false;

// ispis preduzeca
radSaPreduzecima.prikaz = prikaz;
radSaPreduzecima.dostaviPreduzeca();

// provera datuma

$("input[type=date]").change(() => {
  var datum1 = new Date($("#pocetniDatum").val());
  var datum2 = new Date($("#krajnjiDatum").val());

  if (datum1 >= datum2) {
    proveraDatum = false;
    $("#datumAlert").attr("hidden", false);
  }
  else {
    proveraDatum = true;
    $("#datumAlert").attr("hidden", true);
  }
})

// close modal - reset date

$("#close-modal").click(() => {
  $("#pocetniDatum").val(new Date());
  $("#krajnjiDatum").val(new Date());
  prikazBilansa.html("");
})


$("#prikaziBilans").click((e) => {
  var datum1 = $("#pocetniDatum").val();
  var datum2 = $("#krajnjiDatum").val();
  console.log(izabranoPreduzece);
  e.preventDefault();
  if (proveraDatum) {
    radSaPreduzecima.prikaziBilans(parseInt(izabranoPreduzece), datum1, datum2, prikazBilansa);
    $(".alert-danger").attr("hidden", true);
  }
  else {
    $(".alert-danger").attr("hidden", false);
  }
})

$("#filtrirajPreduzeca ").click((e) => {
    e.preventDefault();
    let unos = document.querySelector("#unos").value;
    radSaPreduzecima.filtrirajPreduzeca(unos);
})

// pozivamo na kraju jer element koji trazimo jos nije prikazan
$(".prikaziBilans").click(function (e) {
    izabranoPreduzece = e.target.id;
    console.log(e.target);
    console.log(izabranoPreduzece);
})

// obrisi preduzece

$(".table").on('click','.obrisiPreduzece',function(e){
  izabranoPreduzece = e.target.id;
  radSaPreduzecima.obrisiPreduzece(parseInt(izabranoPreduzece));
})






