var upgradeMult = 1.25;
var gameState = {
    cookies: 0,
    cpc: 1,
    cps: 0,
    upgrade1Cost: 10,
    upgrade2Amount: 0,
    upgrade2Cost: 100,
    upgrade3Amount: 0,
    upgrade3Cost: 1000,
    upgrade4Amount: 0,
    upgrade4Cost: 15000,
    upgrade5Amount: 0,
    upgrade5Cost: 100000
}

function clickCookie() {
    gameState.cookies += gameState.cpc;
    document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
}

function upgrade1() {
    if (gameState.cookies >= gameState.upgrade1Cost) {
        gameState.cookies -= gameState.upgrade1Cost;
        gameState.cpc += 1;
        gameState.upgrade1Cost = Math.floor(gameState.upgrade1Cost * upgradeMult);
        document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost;
        document.getElementById("cookies").textContent = "Cookies: " + gameState.cookies;
        document.getElementById("cpc").textContent = "Cookies Per Click: " + gameState.cpc;
    }
}