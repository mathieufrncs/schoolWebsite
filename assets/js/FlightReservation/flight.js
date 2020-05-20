//==================================On Open==============================
document.getElementById("recap").innerHTML = "Voici un récapitulatif de votre dernière commande : " + localStorage.getItem("recapStore");
document.getElementById("paypal").href = "https://paypal.me/mathancois/" + localStorage.getItem("prix");
var date = new Date();
var day = date.getDate();
var dayReturn = date.getDate() + 1;
var month = date.getMonth() + 1;
var year = date.getFullYear();

var input1 = "";
var startDateEntered = "";
 
document.getElementById("depart").min = year + "-0" + month + "-" + day;
document.getElementById("retour").min = year + "-0" + month + "-" + dayReturn;

document.getElementById("depart").addEventListener("change", function () {
    input1 = this.value;
    startDateEntered = new Date(input1);
    dayReturn = startDateEntered.getDate() + 1;
    month = startDateEntered.getMonth() + 1;
    year = startDateEntered.getFullYear();

    document.getElementById("retour").min = year + "-0" + month + "-" + dayReturn;
});

//=======================================================================


//==============================On submit================================
function searchFlights(form) {
    var dateDepart = new Date(document.getElementById("depart").value);
    var dateRetour = new Date(document.getElementById("retour").value);
    var distance = parseInt(document.getElementById("distance").innerHTML);
    var cout;
    var airport1 = document.getElementById("autocomplete-airport-1");
    var airport2 = document.getElementById("autocomplete-airport-2");
    var classe;

    var dateComp = dateRetour.getTime() - dateDepart.getTime();


    if (airport1.value == airport2.value) {
        alert("Les aéroports doivent être différents");
        return false;
    } else {

        if (form.adulte.value == 1 && form.enfant.value > 3) {
            alert("Un adulte ne peut pas voyager seul avec plus de 3 enfants");
            return false;
        } else {
            if (dateRetour.getTime() < dateDepart.getTime() || dateDepart.getTime() < date.getTime()-60*60*24*1000) {
                alert("La date de retour ne peut pas être égale ou inférieure à la date de départ qui ne peut être inférieure à la date du jour");
                return false;
            } else {
                if (dateComp < 60 * 60 * 24 * 7 * 1000) {
                    if (distance < 3000) {
                        cout = form.adulte.value * 249 + form.enfant.value * 188;
                    } else {
                        cout = form.adulte.value * 350 + form.enfant.value * 270;
                    }
                } else {
                    if (distance < 3000) {
                        cout = form.adulte.value * 550 + form.enfant.value * 470;
                    } else {
                        cout = form.adulte.value * 680 + form.enfant.value * 600;
                    }
                }
                if (form.eco.checked) {
                    cout = cout;
                    classe = "classe éconimique";
                } else if (form.affaire.checked) {
                    cout = cout * 1.3;
                    classe = "classe affaire";
                } else {
                    cout = cout * 1.7;
                    classe = "première classe";
                }


                var recap = "\nUn vol aller-retour de " + airport1.value + " à " + airport2.value + " pour " + form.adulte.value + " adulte(s) et " + form.enfant.value + " enfant(s) en " + classe + "\nDu " + document.getElementById("depart").value + " au " + document.getElementById("retour").value + " \nPour un total de " + cout + " euros \n \nBon voyage !"
                var recapHTML = "Voici un récapitulatif de votre commande : <br>Un vol aller-retour de " + airport1.value + " à " + airport2.value + " pour " + form.adulte.value + " adulte(s) et " + form.enfant.value + " enfant(s) <br>Du " + document.getElementById("depart").value + " au " + document.getElementById("retour").value + " <br>Pour un total de " + cout + " euros <br> <br>Bon voyage !"
                alert("Voici un récapitulatif de votre commande : " + recap);
                document.getElementById("recap").innerHTML = "Voici un récapitulatif de votre commande : " + recap;
                localStorage.setItem("recapStore", recap);
                localStorage.setItem("prix", cout);
            }
        }

    }
}
//=======================================================================