var upgradeMult = 1.25;
var addCPS;
var notEnoughCookiesTimer;
var gameState = {
    cookieAmount: 0,
    upgrade1Cost: 50,
    upgrade2Amount: 0,
    upgrade2Cost: 500,
    upgrade3Amount: 0,
    upgrade3Cost: 2500,
    clickAmount: 1,
    cookiesPerSecond: 0
}

loadGameState();

function loadGameState() {
    var storedState = localStorage.getItem('gameState');
    if (storedState !== null) {
        gameState = JSON.parse(storedState);
    }
    document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
    document.getElementById("cookiesPerSecond").textContent = "Cookies per Second: " + gameState.cookiesPerSecond;
    document.getElementById("clickAmount").textContent = "Cookies per Click: " + gameState.clickAmount;
    document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost + "\u2003";
    document.getElementById("upgrade2Cost").textContent = "Cost: " + gameState.upgrade2Cost + "\u2003";
    document.getElementById("upgrade3Cost").textContent = "Cost: " + gameState.upgrade3Cost + "\u2003";
}

function clickCookie() {
    gameState.cookieAmount += gameState.clickAmount;
    document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
}

function calculateCookiesPerSecond() {
    clearInterval(addCPS);
    var upgrade2CPS = gameState.upgrade2Amount * 10;
    var upgrade3CPS = gameState.upgrade3Amount * 30;
    gameState.cookiesPerSecond = upgrade2CPS + upgrade3CPS;
    document.getElementById("cookiesPerSecond").textContent = "Cookies per Second: " + gameState.cookiesPerSecond;
    addCPS = setInterval(() => {
        gameState.cookieAmount += gameState.cookiesPerSecond;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
    }, 1000);
}

function upgrade1() {
    if (gameState.cookieAmount >= gameState.upgrade1Cost) {
        gameState.cookieAmount -= gameState.upgrade1Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
        gameState.clickAmount++;
        document.getElementById("clickAmount").textContent = "Cookies per Click: " + gameState.clickAmount;
        gameState.upgrade1Cost = Math.floor(gameState.upgrade1Cost * upgradeMult);
        document.getElementById("upgrade1Cost").textContent = "Cost: " + gameState.upgrade1Cost + "\u2003";
    } else {
        notEnoughCookies("upgrade1");
    }
}

function upgrade2() {
    if (gameState.cookieAmount >= gameState.upgrade2Cost) {
        gameState.upgrade2Amount++;
        gameState.cookieAmount -= gameState.upgrade2Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
        gameState.upgrade2Cost = Math.floor(gameState.upgrade2Cost * upgradeMult);
        document.getElementById("upgrade2Cost").textContent = "Cost: " + gameState.upgrade2Cost + "\u2003";
        calculateCookiesPerSecond();
    } else {
        notEnoughCookies("upgrade2");
    }
}

function upgrade3() {
    if (gameState.cookieAmount >= gameState.upgrade3Cost) {
        gameState.upgrade3Amount++;
        gameState.cookieAmount -= gameState.upgrade3Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + gameState.cookieAmount;
        gameState.upgrade3Cost = Math.floor(gameState.upgrade3Cost * upgradeMult);
        document.getElementById("upgrade3Cost").textContent = "Cost: " + gameState.upgrade3Cost + "\u2003";
        calculateCookiesPerSecond();
    } else {
        notEnoughCookies("upgrade3");
    }
}

function notEnoughCookies(id) {
    document.getElementById(id).style.backgroundColor = "rgba(236, 120, 120, 1)";
    notEnoughCookiesTimer = setTimeout(() => {
        document.getElementById(id).style.backgroundColor = "beige";
    }, 750);
}

function update() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    requestAnimationFrame(update);
}

update()