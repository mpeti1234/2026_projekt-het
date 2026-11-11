
/* KVÍZ KÉRDÉSEK */

const questions = [

    {
        q: "Mi a mesterséges intelligencia egyik legfontosabb szerepe a programozásban?",

        a: [
            "Minden fejlesztő lecserélése",
            "A fejlesztési feladatok támogatása és automatizálása",
            "Az internet megszüntetése",
            "A számítógépek kikapcsolása"
        ],

        c: 1,

        info: "Az AI segíthet a kódírásban, tesztelésben és hibakeresésben."
    },

    {
        q: "Melyik készség válik különösen fontossá az AI által írt kód ellenőrzésénél?",

        a: [
            "Kritikus gondolkodás",
            "Gyors gépelés",
            "Rajzolás",
            "Gépírás"
        ],

        c: 0,

        info: "A fejlesztőnek fel kell ismernie a hibás, pontatlan vagy nem biztonságos AI-válaszokat."
    },

    {
        q: "Melyik programozási nyelv használható AI- és adatelemzési projektekhez?",

        a: [
            "HTML kizárólag",
            "Python",
            "CSS kizárólag",
            "SQL kizárólag"
        ],

        c: 1,

        info: "A Python népszerű nyelv a mesterséges intelligencia és az adatelemzés területén."
    },

    {
        q: "Mit jelent az ember–AI együttműködés?",

        a: [
            "Az AI önállóan dönt mindenről",
            "Az ember és az AI közösen dolgozik feladatokon",
            "Az ember nem használ technológiát",
            "Az AI megszünteti az összes munkakört"
        ],

        c: 1,

        info: "Az ember meghatározza a célokat és ellenőrzi az eredményt, az AI pedig támogatja a munkát."
    },

    {
        q: "Mi lehet a jövő fejlesztőjének egyik legfontosabb feladata?",

        a: [
            "Csak kód másolása",
            "AI-megoldások irányítása, ellenőrzése és rendszerek tervezése",
            "A tanulás teljes elhagyása",
            "A számítógép hardverének folyamatos cseréje"
        ],

        c: 1,

        info: "A fejlesztő szerepe a problémamegoldás, a tervezés és a minőségbiztosítás felé is bővülhet."
    }

];


/* VÁLTOZÓK */

let current = 0;

let score = 0;

let answered = false;


/* HTML ELEMEK */

const questionNumber =
    document.getElementById("question-number");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const next =
    document.getElementById("next");

const result =
    document.getElementById("result");


/* KÉRDÉS MEGJELENÍTÉSE */

function showQuestion() {

    answered = false;

    feedback.textContent = "";

    next.style.display = "none";

    result.innerHTML = "";

    questionNumber.textContent =
        "Kérdés " + (current + 1) + " / " + questions.length;

    question.textContent =
        questions[current].q;

    answers.innerHTML = "";


    questions[current].a.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "option";

        button.textContent =
            String.fromCharCode(65 + index) + ". " + answer;

        button.onclick = function () {

            checkAnswer(index);

        };

        answers.appendChild(button);

    });

}


/* VÁLASZ ELLENŐRZÉSE */

function checkAnswer(index) {

    if (answered) {
        return;
    }

    answered = true;

    const q = questions[current];


    /* HELYES VÁLASZ */

    if (index === q.c) {

        score++;

        feedback.style.color = "#42e3dc";

        feedback.textContent =
            "✓ Helyes válasz! " + q.info;

    }


    /* HELYTELEN VÁLASZ */

    else {

        feedback.style.color = "#ff9a9a";

        feedback.textContent =
            "✗ Nem egészen! Helyes válasz: " +
            q.a[q.c] + ". " + q.info;

    }


    /* GOMBOK LETILTÁSA */

    [...answers.children].forEach((button, i) => {

        button.disabled = true;

        if (i === q.c) {

            button.style.borderColor = "#42e3dc";

        }

        else if (i === index) {

            button.style.borderColor = "#ff7777";

        }

    });


    /* KÖVETKEZŐ GOMB */

    next.style.display = "inline-block";

    if (current === questions.length - 1) {

        next.textContent = "Eredmény megtekintése";

    }

    else {

        next.textContent = "Következő kérdés →";

    }

}


/* KÖVETKEZŐ KÉRDÉS */

next.onclick = function () {

    current++;

    if (current < questions.length) {

        showQuestion();

    }

    else {

        showResult();

    }

};


/* EREDMÉNY */

function showResult() {

    question.textContent = "Kvíz befejezve!";

    answers.innerHTML = "";

    feedback.textContent = "";

    next.style.display = "none";


    const percent = Math.round(
        score / questions.length * 100
    );


    questionNumber.textContent = "Az eredményed:";


    let message;


    if (percent === 100) {

        message = "Kiváló! Igazi AI-jövőszakértő vagy!";

    }

    else if (percent >= 60) {

        message = "Szép munka! Jó úton haladsz!";

    }

    else {

        message = "Érdemes még többet tanulnod a témáról!";

    }


    result.innerHTML =

        "<h2>" +
        score + " / " + questions.length +
        " pont (" + percent + "%)" +
        "</h2>" +

        "<p>" + message + "</p>" +

        "<button class='btn' id='restart'>" +
        "Újrapróbálom ↻" +
        "</button>";


    document.getElementById("restart").onclick =
        restart;

}


/* KVÍZ ÚJRAINDÍTÁSA */

function restart() {

    current = 0;

    score = 0;

    answered = false;

    showQuestion();

}


/* KVÍZ INDÍTÁSA */

showQuestion();
