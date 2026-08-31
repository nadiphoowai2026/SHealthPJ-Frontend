// ========================================
// SLEEP DASHBOARD
// ========================================

const API_URL = "https://smart-healthcare-backend-production-d51b.up.railway.app";


// ========================================
// LOGIN CHECK
// ========================================

const userId =
    sessionStorage.getItem("userId");

const savedEmail =
    sessionStorage.getItem("savedEmail");

if (!userId || !savedEmail) {

    alert("Please login first.");

    window.location.href = "home.html";

}


// ========================================
// SETTINGS
// ========================================

const sleepGoal = 8;

let sleepHours = 0;

let currentLanguage =
    localStorage.getItem("language") ||
    localStorage.getItem("selectedLanguage") ||
    "en";


// ========================================
// ELEMENTS
// ========================================

const bedtimeInput =
    document.getElementById("bedtimeInput");

const wakeUpInput =
    document.getElementById("wakeUpInput");

const calculateSleepBtn =
    document.getElementById("calculateSleepBtn");


// ========================================
// TRANSLATIONS
// ========================================

const translations = {

    en: {

        sleepDashboard: "Sleep Dashboard",

        weeklyAverage: "Weekly Average",

        todaySleep: "Today's Sleep",

        ofGoal: "of 8 hr goal",

        totalSleep: "Total Sleep Time",

        sleepGoal: "Sleep Goal",

        bedtime: "Bedtime",

        wakeUp: "Wake-up",

        sleepStages: "Sleep Stages",

        lightSleep: "Light Sleep",

        deepSleep: "Deep Sleep",

        remSleep: "REM Sleep",

        awakeTime: "Awake Time",

        sleepQuality: "Sleep Quality",

        sleepEfficiency: "Sleep Efficiency",

        sleepTipTitle: "Sleep Tip",

        sleepTip:
            "Try to keep a regular bedtime and wake-up time to support better sleep quality."
    },

    mm: {

        sleepDashboard:
            "အိပ်စက်မှု Dashboard",

        weeklyAverage:
            "တစ်ပတ်တာ ပျမ်းမျှအိပ်ချိန်",

        todaySleep:
            "ယနေ့အိပ်ချိန်",

        ofGoal:
            "၈ နာရီ ရည်မှန်းချက်၏",

        totalSleep:
            "စုစုပေါင်းအိပ်ချိန်",

        sleepGoal:
            "အိပ်ချိန်ရည်မှန်းချက်",

        bedtime:
            "အိပ်ရာဝင်ချိန်",

        wakeUp:
            "နိုးထချိန်",

        sleepStages:
            "အိပ်စက်မှုအဆင့်များ",

        lightSleep:
            "ပေါ့ပါးအိပ်စက်ချိန်",

        deepSleep:
            "နက်ရှိင်းအိပ်စက်ချိန်",

        remSleep:
            "REM အိပ်စက်ချိန်",

        awakeTime:
            "နိုးနေချိန်",

        sleepQuality:
            "အိပ်စက်မှုအရည်အသွေး",

        sleepEfficiency:
            "အိပ်စက်မှုထိရောက်မှု",

        sleepTipTitle:
            "အိပ်စက်မှုအကြံပြုချက်",

        sleepTip:
            "အိပ်စက်မှုအရည်အသွေးကောင်းမွန်စေရန် အိပ်ရာဝင်ချိန်နှင့် နိုးထချိန်ကို ပုံမှန်ထားရန် ကြိုးစားပါ။"
    }
};


// ========================================
// FORMAT SLEEP TIME
// ========================================

function formatSleepTime(hours) {

    if (!Number.isFinite(hours) || hours <= 0) {
        return "0h 0m";
    }

    const h =
        Math.floor(hours);

    const m =
        Math.round((hours - h) * 60);

    if (m === 60) {
        return (h + 1) + "h 0m";
    }

    return h + "h " + m + "m";
}


// ========================================
// FORMAT CLOCK TIME
// ========================================

function formatTime(time) {

    if (!time) {
        return "--";
    }

    const parts =
        time.split(":");

    const hour =
        Number(parts[0]);

    const minute =
        Number(parts[1]);

    const period =
        hour >= 12 ? "PM" : "AM";

    const displayHour =
        hour % 12 || 12;

    return (
        displayHour +
        ":" +
        String(minute).padStart(2, "0") +
        " " +
        period
    );
}


// ========================================
// LOAD USER SLEEP DATA
// ========================================

async function loadSleepData() {
    if (!userId) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/health-data/${userId}`
            );

        if (!response.ok) {
            throw new Error("Server error");
        }

        const result =
            await response.json();

        if (
            result.success &&
            result.data
        ) {

            const data =
                result.data;

            // ----------------------------
            // Load sleep hours
            // ----------------------------

            if (
                data.sleep_hours !== null &&
                data.sleep_hours !== undefined
            ) {

                sleepHours =
                    Number(data.sleep_hours);

            } else {

                sleepHours = 0;
            }


            // ----------------------------
            // Load bedtime
            // ----------------------------

            if (
                data.bedtime &&
                bedtimeInput
            ) {

                bedtimeInput.value =
                    data.bedtime;
            }


            // ----------------------------
            // Load wake-up
            // ----------------------------

            if (
                data.wake_up &&
                wakeUpInput
            ) {

                wakeUpInput.value =
                    data.wake_up;
            }

        }

        updateSleepDashboard();

    } catch (error) {

        console.error(
            "Cannot load sleep data:",
            error
        );

        updateSleepDashboard();
    }
}


// ========================================
// CALCULATE SLEEP
// ========================================

function calculateSleep() {

    if (!bedtimeInput || !wakeUpInput) {
        return;
    }

    const bedtime =
        bedtimeInput.value;

    const wakeUp =
        wakeUpInput.value;

    if (!bedtime || !wakeUp) {

        alert(
            currentLanguage === "mm"
                ? "အိပ်ရာဝင်ချိန်နှင့် နိုးထချိန်ကို ရွေးပေးပါ။"
                : "Please select bedtime and wake-up time."
        );

        return;
    }


    // ====================================
    // CONVERT TIME TO MINUTES
    // ====================================

    let [bedHour, bedMinute] =
        bedtime.split(":").map(Number);

    let [wakeHour, wakeMinute] =
        wakeUp.split(":").map(Number);


    let bedTotal =
        bedHour * 60 + bedMinute;

    let wakeTotal =
        wakeHour * 60 + wakeMinute;


    // Sleep passes midnight

    if (wakeTotal <= bedTotal) {

        wakeTotal += 24 * 60;
    }


    const totalMinutes =
        wakeTotal - bedTotal;


    sleepHours =
        totalMinutes / 60;


    // ====================================
    // SAVE TO DATABASE
    // ====================================

    saveSleepData(
        sleepHours,
        bedtime,
        wakeUp
    );
}


// ========================================
// SAVE USER SLEEP DATA
// ========================================

async function saveSleepData(
    hours,
    bedtime,
    wakeUp
) {

    if (!userId) {

        alert(
            currentLanguage === "mm"
                ? "Login ဝင်ထားရန် လိုအပ်ပါတယ်။"
                : "Please login first."
        );

        return;
    }


    try {

        calculateSleepBtn.disabled =
            true;


        const response =
            await fetch(
                `${API_URL}/health-data`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: Number(userId),

                       record_date:
    new Date(
        Date.now() + (6.5 * 60 * 60 * 1000)
    )
    .toISOString()
    .split("T")[0],
                        sleep_hours:
                            hours,
                            bedtime:
                            bedtime,

                        wake_up:
                            wakeUp
                    })
                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Could not save sleep data."
            );

            return;
        }


        updateSleepDashboard();


        alert(
            currentLanguage === "mm"
                ? "အိပ်စက်မှုအချက်အလက် သိမ်းပြီးပါပြီ။"
                : "Sleep data saved successfully."
        );


    } catch (error) {

        console.error(
            "Cannot save sleep data:",
            error
        );

        alert(
            currentLanguage === "mm"
                ? "Server နှင့် ချိတ်ဆက်၍မရပါ။"
                : "Cannot connect to server."
        );

    } finally {

        calculateSleepBtn.disabled =
            false;
    }
}


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateSleepDashboard() {

    const sleepText =
        formatSleepTime(sleepHours);


    // Today's Sleep

    const todaySleepValue =
        document.getElementById(
            "todaySleepValue"
        );

    if (todaySleepValue) {

        todaySleepValue.textContent =
            sleepText;
    }


    // Total Sleep

    const totalSleep =
        document.getElementById(
            "totalSleep"
        );

    if (totalSleep) {

        totalSleep.textContent =
            sleepText;
    }


    // Bedtime

    const bedtimeDisplay =
        document.getElementById(
            "bedtime"
        );

    if (
        bedtimeDisplay &&
        bedtimeInput &&
        bedtimeInput.value
    ) {

        bedtimeDisplay.textContent =
            formatTime(
                bedtimeInput.value
            );
    }


    // Wake-up

    const wakeUpDisplay =
        document.getElementById(
            "wakeUp"
        );

    if (
        wakeUpDisplay &&
        wakeUpInput &&
        wakeUpInput.value
    ) {

        wakeUpDisplay.textContent =
            formatTime(
                wakeUpInput.value
            );
    }


    updateSleepCircle();

    updateSleepMessages();

    updateSleepQuality();

    updateSleepEfficiency();

    updateSleepStages();
}


// ========================================
// SLEEP CIRCLE
// ========================================

function updateSleepCircle() {

    const circle =
        document.querySelector(
            ".sleep-circle"
        );

    if (!circle) {
        return;
    }


    let percentage =
        (sleepHours / sleepGoal) * 100;


    percentage =
        Math.max(
            0,
            Math.min(
                percentage,
                100
            )
        );


    const degree =
        percentage * 3.6;


    circle.style.background =
        `conic-gradient(
            #6c8cff 0deg ${degree}deg,
            #e8ecf5 ${degree}deg 360deg
        )`;
}


// ========================================
// SLEEP MESSAGES
// ========================================

function updateSleepMessages() {

    const message1 =
        document.getElementById(
            "sleepMessage1"
        );

    const message2 =
        document.getElementById(
            "sleepMessage2"
        );

    const message3 =
        document.getElementById(
            "sleepMessage3"
        );


    if (
        !message1 ||
        !message2 ||
        !message3
    ) {
        return;
    }


    if (currentLanguage === "mm") {

        if (sleepHours === 0) {

            message1.textContent =
                "🌙 ယနေ့အတွက် အိပ်စက်မှုအချက်အလက် မရှိသေးပါ။";

            message2.textContent =
                "အိပ်ရာဝင်ချိန်နှင့် နိုးထချိန်ကို ထည့်သွင်းပါ။";

            message3.textContent =
                "၈ နာရီအိပ်ချိန်ရည်မှန်းချက်ကို ကြိုးစားပါ။";

        }

        else if (sleepHours < 6) {
            message1.textContent =
                "⚠️ အိပ်ချိန် မလုံလောက်သေးပါ။";

            message2.textContent =
                "သင့်ခန္ဓာကိုယ်သည် အနားယူချိန်ပိုလိုအပ်နိုင်ပါသည်။";

            message3.textContent =
                "ယနေ့ညတွင် ၈ နာရီနှင့် နီးစပ်အောင် အိပ်ရန် ကြိုးစားပါ။";

        }

        else if (sleepHours < 8) {

            message1.textContent =
                "🌙 ၈ နာရီအိပ်ချိန် ရည်မှန်းချက် မပြည့်သေးပါ။";

            message2.textContent =
                "အနည်းငယ်ပိုအနားယူပါက ပိုကောင်းနိုင်ပါသည်။";

            message3.textContent =
                "ယနေ့ညတွင် အနည်းငယ်စောစော အိပ်ပါ။";

        }

        else if (sleepHours <= 9) {

            message1.textContent =
                "🌟 အရမ်းကောင်းပါတယ်။ ၈ နာရီအိပ်ချိန် ပြည့်မီပါပြီ။";

            message2.textContent =
                "သင့်အိပ်ချိန်သည် ကောင်းမွန်သောအတိုင်းအတာအတွင်း ရှိနေပါသည်။";

            message3.textContent =
                "ပုံမှန်အိပ်စက်ချိန်ကို ဆက်လက်ထိန်းသိမ်းပါ။";

        }

        else {

            message1.textContent =
                "💤 ၈ နာရီထက် ပိုမိုအိပ်စက်ထားပါသည်။";

            message2.textContent =
                "သင့်ခန္ဓာကိုယ်က အနားယူချိန်ပိုလိုအပ်ခဲ့နိုင်ပါသည်။";

            message3.textContent =
                "အိပ်စက်ချိန်ကို ပုံမှန်ဖြစ်အောင် ထိန်းသိမ်းပါ။";
        }

    }

    else {

        if (sleepHours === 0) {

            message1.textContent =
                "🌙 No sleep data recorded yet.";

            message2.textContent =
                "Enter your bedtime and wake-up time.";

            message3.textContent =
                "Try to reach your 8-hour sleep goal.";

        }

        else if (sleepHours < 6) {

            message1.textContent =
                "⚠️ You did not get enough sleep.";

            message2.textContent =
                "Your body may need more time to rest and recover.";

            message3.textContent =
                "Try to get closer to your 8-hour sleep goal tonight.";

        }

        else if (sleepHours < 8) {

            message1.textContent =
                "🌙 You did not reach your 8-hour sleep goal.";

            message2.textContent =
                "A little more rest could help you feel better.";

            message3.textContent =
                "Try to sleep a little earlier tonight.";

        }

        else if (sleepHours <= 9) {

            message1.textContent =
                "🌟 Great! You reached your 8-hour sleep goal.";

            message2.textContent =
                "Your sleep duration is within a good range.";

            message3.textContent =
                "Keep maintaining your regular sleep schedule.";

        }

        else {

            message1.textContent =
                "💤 You slept longer than your 8-hour goal.";

            message2.textContent =
                "Your body may have needed some extra rest.";

            message3.textContent =
                "Try to keep your sleep schedule consistent.";
        }
    }
}


// ========================================
// SLEEP QUALITY
// ========================================

function updateSleepQuality() {

    const quality =
        document.getElementById(
            "sleepQuality"
        );

    if (!quality) {
        return;
    }


    if (sleepHours === 0) {

        quality.textContent =
            currentLanguage === "mm"
                ? "အချက်အလက်မရှိ"
                : "No Data";

    }

    else if (
        sleepHours >= 7 &&
        sleepHours <= 9
    ) {

        quality.textContent =
            currentLanguage === "mm"
                ? "ကောင်း"
                : "Good";

    }

    else if (sleepHours >= 5) {

        quality.textContent =
            currentLanguage === "mm"
                ? "သင့်တင့်"
                : "Fair";

    }

    else {

        quality.textContent =
            currentLanguage === "mm"
                ? "မကောင်း"
                : "Poor";
    }
}


// ========================================
// SLEEP EFFICIENCY
// ========================================
function updateSleepEfficiency() {

    const element =
        document.getElementById(
            "sleepEfficiency"
        );

    if (!element) {
        return;
    }


    if (sleepHours === 0) {

        element.textContent =
            "--";

        return;
    }


    let efficiency;


    if (
        sleepHours >= 8 &&
        sleepHours <= 9
    ) {

        efficiency = 95;

    }

    else if (sleepHours >= 7) {

        efficiency = 92;

    }

    else if (sleepHours >= 5) {

        efficiency = 78;

    }

    else {

        efficiency = 60;
    }


    element.textContent =
        efficiency + "%";
}


// ========================================
// SLEEP STAGES
// ========================================

function updateSleepStages() {

    if (sleepHours <= 0) {
        return;
    }


    const awakeMinutes = 30;


    const availableMinutes =
        Math.max(
            sleepHours * 60 -
            awakeMinutes,
            0
        );


    const lightMinutes =
        Math.round(
            availableMinutes * 0.55
        );


    const deepMinutes =
        Math.round(
            availableMinutes * 0.25
        );


    const remMinutes =
        Math.max(
            availableMinutes -
            lightMinutes -
            deepMinutes,
            0
        );


    const lightSleep =
        document.getElementById(
            "lightSleep"
        );

    const deepSleep =
        document.getElementById(
            "deepSleep"
        );

    const remSleep =
        document.getElementById(
            "remSleep"
        );

    const awakeTime =
        document.getElementById(
            "awakeTime"
        );


    if (lightSleep) {

        lightSleep.textContent =
            formatMinutes(
                lightMinutes
            );
    }


    if (deepSleep) {

        deepSleep.textContent =
            formatMinutes(
                deepMinutes
            );
    }


    if (remSleep) {

        remSleep.textContent =
            formatMinutes(
                remMinutes
            );
    }


    if (awakeTime) {

        awakeTime.textContent =
            formatMinutes(
                awakeMinutes
            );
    }
}


// ========================================
// FORMAT MINUTES
// ========================================

function formatMinutes(minutes) {

    const hours =
        Math.floor(
            minutes / 60
        );

    const mins =
        minutes % 60;


    if (hours === 0) {
        return mins + "m";
    }


    return (
        hours +
        "h " +
        mins +
        "m"
    );
}


// ========================================
// APPLY LANGUAGE
// ========================================

function applyLanguage() {

    const elements =
        document.querySelectorAll(
            "[data-lang]"
        );


    elements.forEach(
        element => {

            const key =
                element.getAttribute(
                    "data-lang"
                );


            if (
                translations[currentLanguage] &&
                translations[currentLanguage][key]
            ) {

                element.textContent =
                    translations[
                        currentLanguage
                    ][key];
            }
        }
    );
}


// ========================================
// LANGUAGE CHANGE
// ========================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "language" ||
            event.key === "selectedLanguage"
        ) {

            currentLanguage =
                localStorage.getItem("language") ||
                localStorage.getItem("selectedLanguage") ||
                "en";

            applyLanguage();

            updateSleepMessages();

            updateSleepQuality();
        }
    }
);


// ========================================
// BUTTON
// ========================================

if (calculateSleepBtn) {

    calculateSleepBtn.addEventListener(
        "click",
        calculateSleep
    );
}
// ========================================
// START
// ========================================

applyLanguage();

loadSleepData();
