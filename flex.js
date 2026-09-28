var cpcMult = 1.3;
var upgradeMult = 1.2;
var addCPS;
var notEnoughCookiesTimer;
const defaultGameState = {
    cookies: 0,
    cpc: 1,
    cps: 0,
    upgrade1Cost: 50,
    upgrade2Amount: 0,
    upgrade2Cost: 1000,
    upgrade3Amount: 0,
    upgrade3Cost: 10000,
    upgrade4Amount: 0,
    upgrade4Cost: 100000,
    upgrade5Amount: 0,
    upgrade5Cost: 1000000
}
var gameState = defaultGameState;

loadGameState();

function loadGameState() {
    var storedState = localStorage.getItem('gamestate');
    if (storedState !== null) {
        gameState = JSON.parse(storedState);
    }
    document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    document.getElementById("cpc").textContent = "Cookies Per Click: " + gameState.cpc;
    document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost;
    document.getElementById("upgrade2Cost").textContent = "Cost: " + gameState.upgrade2Cost;
    document.getElementById("upgrade3Cost").textContent = "Cost: " + gameState.upgrade3Cost;
    document.getElementById("upgrade4Cost").textContent = "Cost: " + gameState.upgrade4Cost;
    document.getElementById("upgrade5Cost").textContent = "Cost: " + gameState.upgrade5Cost;
    calculateCPS();
}

function clickCookie() {
    gameState.cookies += gameState.cpc;
    document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    save();
}

function upgrade1() {
    if (gameState.cookies >= gameState.upgrade1Cost) {
        gameState.cookies -= gameState.upgrade1Cost;
        gameState.cpc += 1;
        gameState.upgrade1Cost = Math.floor(gameState.upgrade1Cost * cpcMult);
        save();
        document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
        document.getElementById("cpc").textContent = "Cookies Per Click: " + gameState.cpc;
    } else {
        notEnoughCookies("upgrade1");
    }
}

function upgrade2() {
    if (gameState.cookies >= gameState.upgrade2Cost) {
        gameState.cookies -= gameState.upgrade2Cost;
        gameState.upgrade2Amount += 1;
        gameState.upgrade2Cost = Math.floor(gameState.upgrade2Cost * upgradeMult);
        calculateCPS();
        save();
        document.getElementById("upgrade2Cost").textContent = "Cost: " + gameState.upgrade2Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    } else {
        notEnoughCookies("upgrade2");
    }
}

function upgrade3() {
    if (gameState.cookies >= gameState.upgrade3Cost) {
        gameState.cookies -= gameState.upgrade3Cost;
        gameState.upgrade3Amount += 1;
        gameState.upgrade3Cost = Math.floor(gameState.upgrade3Cost * upgradeMult);
        calculateCPS();
        save();
        document.getElementById("upgrade3Cost").textContent = "Cost: " + gameState.upgrade3Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    } else {
        notEnoughCookies("upgrade3");
    }
}

function upgrade4() {
    if (gameState.cookies >= gameState.upgrade4Cost) {
        gameState.cookies -= gameState.upgrade4Cost;
        gameState.upgrade4Amount += 1;
        gameState.upgrade4Cost = Math.floor(gameState.upgrade4Cost * upgradeMult);
        calculateCPS();
        save();
        document.getElementById("upgrade4Cost").textContent = "Cost: " + gameState.upgrade4Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    } else {
        notEnoughCookies("upgrade4");
    }
}

function upgrade5() {
    if (gameState.cookies >= gameState.upgrade5Cost) {
        gameState.cookies -= gameState.upgrade5Cost;
        gameState.upgrade5Amount += 1;
        gameState.upgrade5Cost = Math.floor(gameState.upgrade5Cost * upgradeMult);
        calculateCPS();
        save();
        document.getElementById("upgrade5Cost").textContent = "Cost: " + gameState.upgrade5Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    } else {
        notEnoughCookies("upgrade5");
    }
}

function calculateCPS() {
    clearInterval(addCPS);
    var upgrade2CPS = gameState.upgrade2Amount * 5
    var upgrade3CPS = gameState.upgrade3Amount * 50
    var upgrade4CPS = gameState.upgrade4Amount * 250
    var upgrade5CPS = gameState.upgrade5Amount * 1000
    gameState.cps = upgrade2CPS + upgrade3CPS + upgrade4CPS + upgrade5CPS;
    document.getElementById("cps").textContent = "Cookies Per Sec: " + gameState.cps;
    addCPS = setInterval(() => {
        gameState.cookies += gameState.cps;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    }, 1000)
}

function save() {
    localStorage.setItem('gamestate', JSON.stringify(gameState));
}

function resetCheck() {
    document.getElementById("resetConfirm").style.display = "initial";
}

function fullReset() {
    document.getElementById("resetConfirm").style.display = "none";
    gameState = defaultGameState;
    save();
    document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
    document.getElementById("cpc").textContent = "Cookies Per Click: " + gameState.cpc;
    document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost;
    document.getElementById("upgrade2Cost").textContent = "Cost: " + gameState.upgrade2Cost;
    document.getElementById("upgrade3Cost").textContent = "Cost: " + gameState.upgrade3Cost;
    document.getElementById("upgrade4Cost").textContent = "Cost: " + gameState.upgrade4Cost;
    document.getElementById("upgrade5Cost").textContent = "Cost: " + gameState.upgrade5Cost;
    calculateCPS();
}

function notEnoughCookies(id) {
    document.getElementById(id).style.backgroundColor = "rgba(220, 80, 80, 1)";
    notEnoughCookiesTimer = setTimeout(() => {
        document.getElementById(id).style.backgroundColor = "rgb(229, 211, 188)";
    }, 750);
}