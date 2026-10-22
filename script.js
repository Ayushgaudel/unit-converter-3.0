// Each unit = how many base units it equals (base: m, kg, m/s, L)

const units = {
  Length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 },
    Weight: { kg: 1, g : 0.001, mg: 1e-6, Lb: 0.45359237, oz: 0.028349523 },
    Speed: { "m/s": 1, "km/h": 1 / 3.6, mph: 0.44704, knot: 0.514444},
    Volume: { L: 1, mL: 0.001,  gal: 3.785411784, cup: 0.2365882365, "fl oz": 0.0295735296 },
     Temperature: { "°C": 0,  "°F": 0, K: 0}

};

const $ = id => document.getElementById(id);
let type = "Length";

const toC = (v, u) => u === "°F" ? (v - 32) * 5 / 9 : u === "K" ? v - 273.15 : v;
const fromC = (c, u) => u === "°F" ? c * 9 / 5 + 32 : u ===  "K" ? c + 273.15 : c;

function convert () {
    const v = parseFloat($("value").value);
    if (isNaN(v)) {$("result").textContent = "Enter a number"; return; }
    const f = $("from").value, t = $("to").value;
    const out = type === "Temperature" ? fromC(toC(v, f), t) : v * units[type][f] / units[type][t];
    $("result").textContent = +out.toPrecision(8);



}
    

function setType(name) {
    type = name;
    const opts = Object.keys(units[name]).map(u => "<option>" + u + "</option>").join("");
    $("from").innerHTML = opts;
    $("to").innerHTML = $("from").innerHTML;
    $("to").selectedIndex = 1;
    document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("active", b.textContent === name));
    convert();


   
}


Object.keys(units).forEach(n => {
    const b = document.createElement("button");
    b.textContent = n;
    b.onclick = () => setType(n)
    $("tabs").appendChild(b);

});


["value", "from", "to"].forEach(id => $(id).addEventListener("input", convert));
setType("Length");

/* ===== warning + jump scares ===== */

let scaresOn = false;
const scareSound = new Audio("scream.mp3");
const bgMusic = new Audio("halloween.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;
function jumpScare() {
    if (!scaresOn) return;
    $("scare").classList.add("on");
    scareSound.currentTime = 0;
    scareSound.play().catch(() => {});
    setTimeout(() => $("scare").classList.remove("on"), 800);
    

}

// 1 in 5 chance. Change 0.2 to 1 to test.
function maybeScare() {
    if (Math.random() < 0.2) jumpScare();

}

["value", "from", "to"].forEach(id => $(id).addEventListener("change", maybeScare));

$("swap").onclick = () => {
    const f = $("from").value;
    $("from").value = $("to").value;
    $("to").value = f;
    convert();
    maybeScare();

};



$("enter").onclick = () => {
    scaresOn = true;
    bgMusic.play().catch(() => {})

    $("scareToggle").textContent = "Jump scares: ON";
    $("warning").style.display = "none";

};

$("safe").onclick = () => {bgMusic.play().catch(() => {}); $("warning").style.display = "none"; };

$("scareToggle").onclick = () => {
    scaresOn = !scaresOn;
    $("scareToggle").textContent = "Jump scares: " + (scaresOn ? "ON" : "OFF");

};
