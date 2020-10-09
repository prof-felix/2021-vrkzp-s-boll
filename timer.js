let counter = 0 // Counter, wird nach pro Zeitintervall um 1 erhoeht
const intervalMillis = 1000 // Intervall in Millisekunden, 1s = 1000ms
const minutesUntilTrainArrives = 1 // Wie viele Minuten soll es dauern bis der Timer aud 0 ist?

function startTimer(counter){
    var remainingMinutes = minutesUntilTrainArrives // noch verbleibende Minuten

    var textElement = document.getElementById("text-uhr") // a-entity holen
    
    let time = padNumber(minutesUntilTrainArrives) + ":00"; // Text setzten

    var textAttribute = textElement.getAttribute("text"); // Das Text-Attribut ist ein JS Objekt

    textAttribute.value = time // Im "text"-Objekt ist der eigentliche Text im Feld "value" hinterlegt
    
    textElement.setAttribute("text", textAttribute)
    
     remainingMinutes-- // verbleibende Minuten um 1 reduzieren, da im nächsten durchlauf mit 59 weiter gemacht wird

    window.setInterval(function(){
        
        time = countdown(remainingMinutes, counter); 
        
        remainingMinutes = time[0] // Verbleibende Minuten aktualisieren
        
        
        textAttribute.value = time[1] // Text setzen 
        
        textElement.setAttribute("text", textAttribute) 
        
        counter = (counter + 1) % 61; // Stellt sicher dass counter zw. 0 und 60 liegt
        // Etwas seltsam, muss aber sein, da bei Counter = 60 s von Hand auf 59 gesetzt wird
        // Daher gäbe es, wuerde man den counter nicht wieder erhöhen s = 59 zweimal 
        // einmal wegen 59 - 60 = -1, was man braucht um die Minuten runterzuzaehlen aber auch die Zeit mm:00 zuzulassen
        // andererseits wegen 59 - 0 = 59
        if (counter == 0){
            counter++
        }
         
    },intervalMillis)
}
// Für einstellige Zahlen eine fuehrende Null hinzufügen
function padNumber(number){
    let stringNumber = number+""
    if (stringNumber.length < 2){
        stringNumber = "0"+stringNumber
    }
    return stringNumber 
}
//Eingabe: Die verbleibenden Minuten, die vergangenen Sekunden
//Ausgabe: 0: Die verbleibenden Minuten, 1: Die verbleibende Zeit inkl. fuehrender Nullen falls einstellig
// Diese reduziert eine Zeitangabe in der Form mm:ss um eine Sekunde, bis 00:00 erreicht ist
function countdown(remainingMinutes, secondsPassed){
    let s = (59-secondsPassed) // verbleibende Sekunden
    if(s == -1){ // Wenn s jetzt -1 ist war es vorher 0 => wir brauchen 59
        s = 59
        remainingMinutes = remainingMinutes -1 // Verbleibende Minuten um eins reduzieren
        if(remainingMinutes == -1){ // Wenn es jetzt -1 ist war es vorher 0 => Zeit Abgelaufen und neu starten
            remainingMinutes = minutesUntilTrainArrives-1 // -1 weil, weil s = 59 und daher statt zb 05:00 wäre dann 05:59, also falsch und ich keine Lust habe das jetzt vernnuenftig zu machen :)
        }
    }

    return [remainingMinutes,padNumber(remainingMinutes) + ":" + padNumber(s)]

}