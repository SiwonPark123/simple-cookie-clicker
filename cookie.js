var cookieAmount = 0;
var upgrade1Cost = 50;
var upgrade2Cost = 500;
var upgrade2Amount = 0;
var upgrade3Cost = 2500;
var upgrade3Amount = 0;
var upgradeMult = 1.25;
var clickAmount = 1;
var cookiesPerSecond = 0;
var addCPS;
var notEnoughCookiesTimer;

const gameState = {
    cookies: 0,
    upgrade1Amount: 0,
    upgrade2Amount: 0,
    upgrade3Amount: 0,
    upgrade1Cost: 50,
    upgrade2Cost: 500,
    upgrade3Cost: 2500,
    clickAmount: 1,
    cookiesPerSecond: 0
}

function clickCookie() {
    cookieAmount += clickAmount;
    document.getElementById("cookieAmount").textContent = "Cookie Amount: " + cookieAmount;
}

function calculateCookiesPerSecond() {
    clearInterval(addCPS);
    var upgrade2CPS = upgrade2Amount * 10;
    var upgrade3CPS = upgrade3Amount * 30;
    cookiesPerSecond = upgrade2CPS + upgrade3CPS;
    document.getElementById("cookiesPerSecond").textContent = "Cookies per Second: " + cookiesPerSecond;
    addCPS = setInterval(() => {
        cookieAmount += cookiesPerSecond;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + cookieAmount;
    }, 1000);
}

function upgrade1() {
    if (cookieAmount >= upgrade1Cost) {
        cookieAmount -= upgrade1Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + cookieAmount;
        clickAmount++;
        document.getElementById("clickAmount").textContent = "Cookies per Click: " + clickAmount;
        upgrade1Cost = Math.floor(upgrade1Cost * upgradeMult);
        document.getElementById("upgrade1Cost").textContent = "Cost: " + upgrade1Cost + "\u2003";
    } else {
        notEnoughCookies("upgrade1");
    }
}

function upgrade2() {
    if (cookieAmount >= upgrade2Cost) {
        upgrade2Amount++;
        cookieAmount -= upgrade2Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + cookieAmount;
        upgrade2Cost = Math.floor(upgrade2Cost * upgradeMult);
        document.getElementById("upgrade2Cost").textContent = "Cost: " + upgrade2Cost + "\u2003";
        calculateCookiesPerSecond();
    } else {
        notEnoughCookies("upgrade2");
    }
}

function upgrade3() {
    if (cookieAmount >= upgrade3Cost) {
        upgrade3Amount++;
        cookieAmount -= upgrade3Cost;
        document.getElementById("cookieAmount").textContent = "Cookie Amount: " + cookieAmount;
        upgrade3Cost = Math.floor(upgrade3Cost * upgradeMult);
        document.getElementById("upgrade3Cost").textContent = "Cost: " + upgrade3Cost + "\u2003";
        calculateCookiesPerSecond();
    } else {
        notEnoughCookies("upgrade3");
    }
}

function notEnoughCookies(id) {
    document.getElementById(id).style.borderColor = "red";
    notEnoughCookiesTimer = setTimeout(() => {
        document.getElementById(id).style.borderColor = "rgb(136, 136, 116)";
    }, 1500);
}