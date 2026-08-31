const loginForm = document.getElementById("loginForm");
const loginArea = document.getElementById("loginArea");
const userArea = document.getElementById("userArea");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const languageSelect = document.getElementById("languageSelect");

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const signupForm = document.getElementById("signupForm");
const showSignupBtn = document.getElementById("showSignupBtn");
const showLoginBtn = document.getElementById("showLoginBtn");


// ========================================
// LOGIN INFORMATION
// ========================================

let savedEmail = sessionStorage.getItem("savedEmail") || "";


// ========================================
// LANGUAGE TEXT
// ========================================

const languageText = {

    en: {

        siteTitle: "Smart Healthcare Tracking",

        pageTitle: "Smart Healthcare Tracking",

        bannerText:
            "Take care of your health every day. Track your activity, sleep, heart rate and water intake to build healthier habits.",

        steps: "👣 Steps",

        heart: "❤️ Heart Rate",

        water: "💧 Water",

        sleep: "😴 Sleep",

        loginToView: "Login to view",

        login: "Login",

        email: "Email",

        password: "Password",

        passwordInfo:
            "Password: first letter uppercase, with a number and a symbol.",

        welcome: "Welcome,",

        loggedIn:
            "Your health dashboard is ready.",

        dashboardDescription:
            "Track your daily health and stay on top of your wellness.",

        logout: "Logout",

        emailError:
            "Please enter a valid Gmail address.",

        passwordError:
            "Password must start with an uppercase letter and contain a number and a symbol.",

        confirmPasswordError:
            "Passwords do not match.",

        registerSuccess:
            "Account created successfully! Please login.",

        info1:
            "Track your daily health activities.",

        info2:
            "Monitor your sleep and recovery.",

        info3:
            "Keep your heart rate within a healthy range.",

        info4:
            "Drink enough water throughout the day.",

        info5:
            "Build healthier habits with Smart Healthcare Tracking."

    },

    mm: {

        siteTitle: "Smart Healthcare Tracking",

        pageTitle: "ကျန်းမာရေး စောင့်ကြည့်စနစ်",

        bannerText:
            "နေ့စဉ် မိမိကျန်းမာရေးကို ဂရုစိုက်ပါ။ လှုပ်ရှားမှု၊ အိပ်စက်မှု၊ နှလုံးခုန်နှုန်းနှင့် ရေသောက်သုံးမှုတိုကို စောင့်ကြည့်ပြီး ကျန်းမာသောအလေ့အကျင့်များ တည်ဆောက်ပါ။",

        steps: "👣 ခြေလှမ်း",

        heart: "❤️ နှလုံးခုန်နှုန်း",

        water: "💧 ရေသောက်သုံးမှု",

        sleep: "😴 အိပ်စက်ချိန်",

        loginToView: "ကြည့်ရှုရန် Login ဝင်ပါ",

        login: "ဝင်ရောက်ရန်",

        email: "Email",

        password: "စကားဝှက်",

        passwordInfo:
            "စကားဝှက်သည် အကြီးစာလုံးဖြင့်စပြီး ဂဏန်းနှင့် သင်္ကေတတစ်ခု ပါရမည်။",

        welcome: "ကြိုဆိုပါတယ်၊",

        loggedIn:
            "သင့်ကျန်းမာရေး Dashboard အဆင်သင့်ဖြစ်ပါပြီ။",

        dashboardDescription:
            "သင့်နေ့စဉ်ကျန်းမာရေးကို မှတ်တမ်းတင်ပြီး ကျန်းမာရေးအခြေအနေကို စောင့်ကြည့်ပါ။",

        logout: "ထွက်ရန်",

        emailError:
            "မှန်ကန်သော Gmail လိပ်စာကို ထည့်ပါ။",

        passwordError:
            "စကားဝှက်သည် အကြီးစာလုံးဖြင့်စပြီး ဂဏန်းနှင့် သင်္ကေတတစ်ခု ပါရမည်။",

        confirmPasswordError:
            "စကားဝှက်နှစ်ခု မတူပါ။",

        registerSuccess:
            "Account ဖွင့်ပြီးပါပြီ။ Login ဝင်ပါ။",

        info1:
            "နေ့စဉ်ကျန်းမာရေး လှုပ်ရှားမှုများကို စောင့်ကြည့်ပါ။",

        info2:
            "အိပ်စက်မှုနှင့် ခန္ဓာကိုယ်အနားယူမှုကို စစ်ဆေးပါ။",

        info3:
            "နှလုံးခုန်နှုန်းကို ကျန်းမာသောအတိုင်းအတာအတွင်း ထိန်းသိမ်းပါ။",

        info4:
            "တစ်နေ့တာအတွင်း ရေလုံလောက်စွာ သောက်ပါ။",
            info5:
            "Smart Healthcare Tracking ဖြင့် ကျန်းမာသောအလေ့အကျင့်များ တည်ဆောက်ပါ။"

    }

};


// ========================================
// CURRENT LANGUAGE
// ========================================

let currentLanguage =
    localStorage.getItem("language") || "en";

languageSelect.value = currentLanguage;


// ========================================
// CHANGE LANGUAGE
// ========================================

function changeLanguage(language) {

    const text = languageText[language];

    currentLanguage = language;

    localStorage.setItem("language", language);


    document.getElementById("siteTitle").textContent =
        text.siteTitle;

    document.getElementById("pageTitle").textContent =
        text.pageTitle;

    document.getElementById("bannerText").textContent =
        text.bannerText;

    document.getElementById("stepsTitle").textContent =
        text.steps;

    document.getElementById("heartTitle").textContent =
        text.heart;

    document.getElementById("waterTitle").textContent =
        text.water;

    document.getElementById("sleepTitle").textContent =
        text.sleep;

    document.getElementById("loginTitle").textContent =
        text.loginToView;

    document.getElementById("username").placeholder =
        text.email;

    document.getElementById("password").placeholder =
        text.password;

    document.getElementById("passwordInfo").textContent =
        text.passwordInfo;

    document.getElementById("loginBtn").textContent =
        text.login;

    document.getElementById("welcomeText").textContent =
        text.welcome;

    document.getElementById("loggedInText").textContent =
        text.loggedIn;

    document.getElementById("dashboardDescription").textContent =
        text.dashboardDescription;

    document.getElementById("logoutBtn").textContent =
        text.logout;

    document.getElementById("info1").textContent =
        text.info1;

    document.getElementById("info2").textContent =
        text.info2;

    document.getElementById("info3").textContent =
        text.info3;

    document.getElementById("info4").textContent =
        text.info4;

    document.getElementById("info5").textContent =
        text.info5;

    updateCards();
}


// ========================================
// UPDATE CARDS
// ========================================

function updateCards() {

    const text = languageText[currentLanguage];

    const stepsText = document.getElementById("stepsText");
    const sleepText = document.getElementById("sleepText");
    const heartText = document.getElementById("heartText");
    const waterText = document.getElementById("waterText");

    const stepsData = document.getElementById("stepsData");
    const sleepData = document.getElementById("sleepData");
    const heartData = document.getElementById("heartData");
    const waterData = document.getElementById("waterData");


    if (!savedEmail) {

        stepsText.style.display = "block";
        sleepText.style.display = "block";
        heartText.style.display = "block";
        waterText.style.display = "block";

        stepsText.textContent = text.loginToView;
        sleepText.textContent = text.loginToView;
        heartText.textContent = text.loginToView;
        waterText.textContent = text.loginToView;

        stepsData.style.display = "none";
        sleepData.style.display = "none";
        heartData.style.display = "none";
        waterData.style.display = "none";

        return;
    }


    // LOGGED IN

    stepsText.style.display = "none";
    sleepText.style.display = "none";
    heartText.style.display = "none";
    waterText.style.display = "none";

    stepsData.style.display = "block";
    sleepData.style.display = "flex";
    heartData.style.display = "flex";
    waterData.style.display = "block";
}

// ========================================
// LOAD HEALTH DATA FROM BACKEND
// ========================================

async function loadHealthData() {

    const userId =
        sessionStorage.getItem("userId");

    if (!userId) {
        console.log("No userId found");
        return;
    }

    try {

        const response =
            await fetch(
                "https://smart-healthcare-backend-production-d51b.up.railway.app/health-data/" + userId
            );

        const result =
            await response.json();

        console.log("HOME HEALTH DATA:", result);

        if (!result.success || !result.data) {
            console.log("No health data");
            return;
        }

        const data = result.data;


        // =========================
        // STEPS
        // =========================

        const stepElement =
            document.getElementById("stepVal");

        if (stepElement) {
            stepElement.textContent =
                data.steps ?? 0;
        }


        // =========================
        // HEART RATE
        // =========================

        const heartElement =
            document.getElementById("hrVal");

        if (heartElement) {
            heartElement.textContent =
                (data.heart_rate ?? 0) + " BPM";
        }


        // =========================
        // WATER
        // =========================

        const waterElement =
            document.getElementById("homeWaterValue");

        if (waterElement) {
            waterElement.textContent =
                data.water_ml ?? 0;
        }


        // =========================
        // SLEEP
        // =========================

        const sleepElement =
            document.getElementById("homeSleepValue");

        if (sleepElement) {

            const sleepHours =
                Number(data.sleep_hours ?? 0);

            const hours =
                Math.floor(sleepHours);

            const minutes =
                Math.round(
                    (sleepHours - hours) * 60
                );

            sleepElement.textContent =
                hours + "h " + minutes + "m";
        }


        // =========================
        // STEPS PROGRESS
        // =========================

        const steps =
            Number(data.steps ?? 0);

        const dailyGoal =
            10000;

        const stepsPercent =
            Math.min(
                (steps / dailyGoal) * 100,
                100
            );

        const percentElement =
            document.getElementById("stepsPercent");

        if (percentElement) {
            percentElement.textContent =
                Math.round(stepsPercent) + "%";
        }


        const stepsProgress =
            document.getElementById("stepsProgress");

        if (stepsProgress) {
            stepsProgress.style.width =
                stepsPercent + "%";
        }


        // =========================
        // WATER PROGRESS
        // =========================

        const water =
            Number(data.water_ml ?? 0);

        const waterGoal =
            2000;

        const waterPercent =
            Math.min(
                (water / waterGoal) * 100,
                100
            );

        const waterProgress =
            document.getElementById(
                "homeWaterProgress"
            );

        if (waterProgress) {
            waterProgress.style.width =
                waterPercent + "%";
        }

    } catch (error) {

        console.error(
            "HOME LOAD ERROR:",
            error
        );

    }
}
// ========================================
// LANGUAGE SELECT
// ========================================

languageSelect.addEventListener("change", function () {

    changeLanguage(this.value);

});
// ========================================
// LOGIN
// ========================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;


    const gmailPattern =
        /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (!gmailPattern.test(email)) {

        alert(
            languageText[currentLanguage].emailError
        );

        return;
    }


    const passwordPattern =
        /^[A-Z](?=.*\d)(?=.*[@#&$!]).+$/;

    if (!passwordPattern.test(password)) {

        alert(
            languageText[currentLanguage].passwordError
        );

        return;
    }


    try {

        const response = await fetch(
           "https://smart-healthcare-backend-production-d51b.up.railway.app/login" ,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }
        );


        const data = await response.json();

        console.log("LOGIN RESPONSE:", data);


        if (!data.success) {

            alert(data.message);

            return;
        }


        // ========================================
        // LOGIN SUCCESS
        // ========================================

        savedEmail = email;

        sessionStorage.setItem(
            "savedEmail",
            email
        );

        sessionStorage.setItem(
            "userId",
            data.userId
        );


        userName.textContent =
            email.split("@")[0];


        loginArea.style.display = "none";

        userArea.style.display = "block";


       updateCards();

await loadHealthData();

alert("Login successful!")


    } catch (error) {

        console.error("LOGIN ERROR:", error);

        alert(
            "Cannot connect to server!"
        );

    }

});


// ========================================
// SHOW SIGN UP
// ========================================

showSignupBtn.addEventListener("click", function () {

    loginBox.style.display = "none";

    signupBox.style.display = "block";

});


// ========================================
// SHOW LOGIN
// ========================================

showLoginBtn.addEventListener("click", function () {

    signupBox.style.display = "none";

    loginBox.style.display = "block";

});


// ========================================
// SIGN UP
// ========================================

signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Gmail check

    const gmailPattern =
        /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (!gmailPattern.test(email)) {

        alert(
            languageText[currentLanguage].emailError
        );

        return;
    }


    // Password check

    const passwordPattern =
        /^[A-Z](?=.*\d)(?=.*[@#&$!]).+$/;

    if (!passwordPattern.test(password)) {

        alert(
            languageText[currentLanguage].passwordError
        );

        return;
    }


    // Confirm password

    if (password !== confirmPassword) {

        alert(
            languageText[currentLanguage].confirmPasswordError
        );

        return;
    }


    try {

        const response = await fetch(
           "https://smart-healthcare-backend-production-d51b.up.railway.app/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }
        );
        const data = await response.json();


        console.log("REGISTER RESPONSE:", data);


        if (!data.success) {

            alert(data.message);

            return;
        }


        // ========================================
        // REGISTER SUCCESS
        // ========================================

        alert(
            languageText[currentLanguage].registerSuccess
        );


        signupForm.reset();


        // Go back to Login

        signupBox.style.display = "none";

        loginBox.style.display = "block";


        // Put registered email into login

        document.getElementById("username").value =
            email;

        document.getElementById("password").focus();

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        alert(
            "Cannot connect to server!"
        );

    }

});


// ========================================
// LOGOUT
// ========================================

logoutBtn.addEventListener("click", function () {

    savedEmail = "";

    sessionStorage.removeItem("savedEmail");

    sessionStorage.removeItem("userId");

    localStorage.removeItem("isLoggedIn");


    userArea.style.display = "none";

    loginArea.style.display = "flex";


    document.getElementById("username").value = "";

    document.getElementById("password").value = "";


    updateCards();

});


// ========================================
// CHECK LOGIN
// ========================================

function isUserLoggedIn() {

    return savedEmail !== "";

}


// ========================================
// GO TO STEPS
// ========================================

function goToSteps() {

    if (!isUserLoggedIn()) {

        loginArea.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }

    window.location.href = "steps.html";
}


// ========================================
// GO TO SLEEP
// ========================================

function goToSleep() {

    if (!isUserLoggedIn()) {

        loginArea.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }

    window.location.href = "sleep.html";
}


// ========================================
// GO TO HEART RATE
// ========================================

function goToHeartRate() {

    if (!isUserLoggedIn()) {

        loginArea.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }

    window.location.href = "heart-rate.html";
}


// ========================================
// GO TO WATER
// ========================================

function goToWater() {

    if (!isUserLoggedIn()) {

        loginArea.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }

    window.location.href = "water.html";
}


// ========================================
// INITIAL LANGUAGE
// ========================================

changeLanguage(currentLanguage);


// ========================================
// RESTORE LOGIN
// ========================================

if (savedEmail !== "") {

    userName.textContent =
        savedEmail.split("@")[0];

    loginArea.style.display = "none";

    userArea.style.display = "block";

    updateCards();

} else {

    loginArea.style.display = "flex";

    userArea.style.display = "none";

    updateCards();

}
// ========================================
// START
// ========================================

changeLanguage(currentLanguage);

updateCards();

if (savedEmail) {

    userName.textContent =
        savedEmail.split("@")[0];

    loginArea.style.display =
        "none";

    userArea.style.display =
        "block";

    loadHealthData();

}
