// ========================================
// LANGUAGE
// ========================================

function getLanguage() {

    return (
        localStorage.getItem("language") ||
        localStorage.getItem("selectedLanguage") ||
        "en"
    );

}


// ========================================
// LANGUAGE CHANGE
// ========================================

function changeLanguage() {

    const language = getLanguage();

    document.documentElement.lang = language;

    const elements =
        document.querySelectorAll("[data-en]");

    elements.forEach(function(element) {

        if (language === "mm") {

            element.textContent =
                element.getAttribute("data-mm");

        } else {

            element.textContent =
                element.getAttribute("data-en");

        }

    });

}


// ========================================
// GET USER ID
// ========================================

function getUserId() {

    return (
        sessionStorage.getItem("userId") ||
        "guest"
    );

}


// ========================================
// BACKEND URL
// ========================================

// IMPORTANT:
// Replace this IP only if your laptop's IP changes.

const API_URL =
    "https://smart-healthcare-backend-production-d51b.up.railway.app";

// ========================================
// STORAGE KEY
// ========================================

function getHeartKey() {

    return "heartRate_" + getUserId();

}


function getRestingKey() {

    return "restingHeartRate_" + getUserId();

}


// ========================================
// ELEMENTS
// ========================================

const heartInput =
    document.getElementById("heartRateInput");

const checkBtn =
    document.getElementById("checkHeartBtn");

const todayHeartRate =
    document.getElementById("todayHeartRate");

const currentRate =
    document.getElementById("currentRate");

const heartStatus =
    document.getElementById("heartStatus");

const currentStatus =
    document.getElementById("currentStatus");

const overallStatus =
    document.getElementById("overallStatus");

const heartMessage =
    document.getElementById("heartMessage");

const resultTitle =
    document.getElementById("resultTitle");

const messageIcon =
    document.getElementById("messageIcon");

const restingInput =
    document.getElementById("restingInput");

const restingSaveBtn =
    document.getElementById("restingSaveBtn");

const restingRate =
    document.getElementById("restingRate");


// ========================================
// SAVE HEART RATE TO BACKEND
// ========================================

async function saveHeartRateToBackend(value) {

    const userId =
        sessionStorage.getItem("userId");

    if (!userId) {

        console.log(
            "No logged-in user. Heart rate will only be saved locally."
        );

        return;

    }

    const now = new Date();

const myanmarTime = new Date(
    now.getTime() + (6.5 * 60 * 60 * 1000)
);

const today =
    myanmarTime.toISOString().split("T")[0];

    try {

        const response =
            await fetch(
                API_URL + "/health-data",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId: userId,

                        record_date: today,

                        heart_rate: value

                    })
                }
            );


        const result =
            await response.json();


        console.log(
            "Backend heart rate result:",
            result
        );


        if (!result.success) {

            console.error(
                "Heart rate was not saved:",
                result.message
            );

        }

    } catch (error) {

        console.error(
            "Backend connection error:",
            error
        );

    }

}


// ========================================
// CHECK HEART RATE
// ========================================

checkBtn.addEventListener(
    "click",
    async function() {
        const value =
            Number(heartInput.value);


        if (
            !value ||
            value < 30 ||
            value > 220
        ) {

            if (getLanguage() === "mm") {

                alert(
                    "ကျေးဇူးပြု၍ 30 မှ 220 BPM အတွင်း ထည့်ပါ။"
                );

            } else {

                alert(
                    "Please enter a heart rate between 30 and 220 BPM."
                );

            }

            return;

        }


        // ====================================
        // SAVE LOCALLY
        // ====================================

        localStorage.setItem(
            getHeartKey(),
            value
        );


        // ====================================
        // SAVE TO MYSQL THROUGH BACKEND
        // ====================================

        await saveHeartRateToBackend(
            value
        );


        // ====================================
        // UPDATE PAGE
        // ====================================

        updateHeartRate(
            value
        );

    }
);


// ========================================
// UPDATE HEART RATE
// ========================================

function updateHeartRate(value) {

    todayHeartRate.textContent =
        value;

    currentRate.textContent =
        value;


    let status;
    let message;
    let title;
    let icon;


    // ====================================
    // LOW
    // ====================================

    if (value < 60) {

        if (getLanguage() === "mm") {

            status = "နိမ့်နေသည်";

            title =
                "နှလုံးခုန်နှုန်း နိမ့်နေပါသည်";

            message =
                "နှလုံးခုန်နှုန်း 60 BPM အောက် ဖြစ်နေပါသည်။ အနားယူပြီး မူးဝေခြင်း၊ အားနည်းခြင်း သိုမဟုတ် မအီမသာဖြစ်ခြင်းရှိပါက ကျန်းမာရေးဝန်ထမ်းနှင့် တိုင်ပင်ပါ။";

        } else {

            status = "Low";

            title =
                "Heart Rate is Low";

            message =
                "Your reading is below 60 BPM. Rest calmly, and if you feel dizzy, weak, or unwell, consider contacting a healthcare professional.";

        }

        icon = "⚠️";

    }


    // ====================================
    // NORMAL
    // ====================================

    else if (value <= 100) {

        if (getLanguage() === "mm") {

            status = "ပုံမှန်";

            title =
                "နှလုံးခုန်နှုန်း ပုံမှန်ဖြစ်ပါသည်";

            message =
                "သင်ထည့်သွင်းထားသော နှလုံးခုန်နှုန်းသည် ယေဘုယျအားဖြင့် ပုံမှန်အတိုင်းအတာအတွင်း ရှိနေပါသည်။ ပုံမှန်လှုပ်ရှားမှုများကို ဆက်လက်လုပ်ဆောင်နိုင်ပါသည်။";

        } else {

            status = "Normal";

            title =
                "Heart Rate is Normal";

            message =
                "Your reading is within the general resting range. Continue your normal daily activities and healthy habits.";

        }

        icon = "💚";

    }


    // ====================================
    // HIGH
    // ====================================

    else {

        if (getLanguage() === "mm") {

            status = "မြင့်နေသည်";

            title =
                "နှလုံးခုန်နှုန်း မြင့်နေပါသည်";

            message =
                "နှလုံးခုန်နှုန်း 100 BPM ထက် မြင့်နေပါသည်။ အနားယူပြီး ခဏအကြာတွင် ပြန်တိုင်းတာပါ။ ဆက်လက်မြင့်နေခြင်း သိုမဟုတ် မအီမသာဖြစ်ပါက ကျန်းမာရေးဝန်ထမ်းနှင့် တိုင်ပင်ပါ။";

        } else {

            status = "High";

            title =
                "Heart Rate is High";

            message =
                "Your reading is above 100 BPM. Rest calmly and measure again after a few minutes. If it remains high or you feel unwell, consider contacting a healthcare professional.";

        }

        icon = "⚠️";

    }


    // ====================================
    // DISPLAY
    // ====================================

    heartStatus.textContent =
        status;

    currentStatus.textContent =
        status;

    overallStatus.textContent =
        status;

    resultTitle.textContent =
        title;
        heartMessage.textContent =
        message;

    messageIcon.textContent =
        icon;

}


// ========================================
// RESTING HEART RATE
// ========================================

restingSaveBtn.addEventListener(
    "click",
    function() {

        const value =
            Number(restingInput.value);


        if (
            !value ||
            value < 30 ||
            value > 150
        ) {

            if (getLanguage() === "mm") {

                alert(
                    "ကျေးဇူးပြု၍ 30 မှ 150 BPM အတွင်း ထည့်ပါ။"
                );

            } else {

                alert(
                    "Please enter a resting heart rate between 30 and 150 BPM."
                );

            }

            return;

        }


        localStorage.setItem(
            getRestingKey(),
            value
        );


        restingRate.textContent =
            value;


        restingInput.value = "";


        if (getLanguage() === "mm") {

            alert(
                "Resting Heart Rate သိမ်းပြီးပါပြီ။"
            );

        } else {

            alert(
                "Resting Heart Rate saved successfully."
            );

        }

    }
);


// ========================================
// LOAD SAVED DATA
// ========================================

function loadSavedData() {

    const savedHeart =
        localStorage.getItem(
            getHeartKey()
        );


    const savedResting =
        localStorage.getItem(
            getRestingKey()
        );


    if (savedHeart) {

        heartInput.value =
            savedHeart;

        updateHeartRate(
            Number(savedHeart)
        );

    }


    if (savedResting) {

        restingRate.textContent =
            savedResting;

    }

}


// ========================================
// LANGUAGE LISTENER
// ========================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "language" ||
            event.key === "selectedLanguage"
        ) {

            changeLanguage();


            const savedHeart =
                localStorage.getItem(
                    getHeartKey()
                );


            if (savedHeart) {

                updateHeartRate(
                    Number(savedHeart)
                );

            }

        }

    }
);


// ========================================
// START
// ========================================

changeLanguage();

loadSavedData();
