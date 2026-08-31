// ========================================
// WATER TRACKER
// ========================================

const API_URL = "https://smart-healthcare-backend-production-d51b.up.railway.app";


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


function changeLanguage() {

    const language = getLanguage();

    document.documentElement.lang = language;

    const elements =
        document.querySelectorAll("[data-en]");

    elements.forEach(function (element) {

        if (language === "mm") {

            element.textContent =
                element.getAttribute("data-mm");

        } else {

            element.textContent =
                element.getAttribute("data-en");

        }

    });

    updateWaterStatus();

}


// ========================================
// USER ID
// ========================================

const userId =
    sessionStorage.getItem("userId");


// ========================================
// WATER SETTINGS
// ========================================

const DAILY_GOAL = 2000;

let waterAmount = 0;


// ========================================
// ELEMENTS
// ========================================

const waterInput =
    document.getElementById("waterInput");

const saveWaterBtn =
    document.getElementById("saveWaterBtn");

const waterAmountElement =
    document.getElementById("waterAmount");

const goalCurrent =
    document.getElementById("goalCurrent");

const progressFill =
    document.getElementById("progressFill");

const waterFill =
    document.getElementById("waterFill");

const waterStatus =
    document.getElementById("waterStatus");

const waterMessageTitle =
    document.getElementById("waterMessageTitle");

const waterMessage =
    document.getElementById("waterMessage");


// ========================================
// UPDATE DISPLAY
// ========================================

function updateWaterDisplay() {

    if (waterAmountElement) {

        waterAmountElement.textContent =
            waterAmount;

    }


    if (goalCurrent) {

        goalCurrent.textContent =
            waterAmount;

    }


    let percent =
        (waterAmount / DAILY_GOAL) * 100;


    if (percent > 100) {

        percent = 100;

    }


    if (percent < 0) {

        percent = 0;

    }


    if (progressFill) {

        progressFill.style.width =
            percent + "%";

    }


    if (waterFill) {

        waterFill.style.height =
            percent + "%";

    }


    updateWaterStatus();

}


// ========================================
// WATER STATUS
// ========================================

function updateWaterStatus() {

    if (!waterStatus) {
        return;
    }


    const language =
        getLanguage();


    // ====================================
    // NO DATA
    // ====================================

    if (waterAmount === 0) {

        if (language === "mm") {

            waterStatus.textContent =
                "ရေသောက်သုံးမှု မထည့်ရသေးပါ။";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "ရေဓာတ်ပြည့်ဝအောင် နေပါ 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "ယနေ့ သောက်ထားသော ရေပမာဏကို ထည့်ပေးပါ။";

            }

        } else {

            waterStatus.textContent =
                "No water intake recorded yet.";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "Stay Hydrated 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "Enter your water intake for today.";

            }

        }

        return;
    }


    // ====================================
    // LOW
    // ====================================

    if (waterAmount < 1000) {

        if (language === "mm") {
            waterStatus.textContent =
                "ရေပမာဏ နည်းနေပါတယ်။";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "ရေပိုသောက်သင့်ပါတယ် 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "ယနေ့ ရေသောက်သုံးမှု နည်းနေပါသေးတယ်။ တစ်နေ့တာအတွင်း ရေကို ပုံမှန်သောက်ပေးပါ။";

            }

        } else {

            waterStatus.textContent =
                "Your water intake is low.";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "Drink More Water 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "Your water intake is still low today. Try to drink water regularly throughout the day.";

            }

        }

        return;
    }


    // ====================================
    // MODERATE
    // ====================================

    if (waterAmount < DAILY_GOAL) {

        if (language === "mm") {

            waterStatus.textContent =
                "ရေသောက်သုံးမှု မလုံလောက်သေးပါ။";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "နည်းနည်းထပ်သောက်ပါ 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "နေ့စဉ် ရည်မှန်းချက်ပြည့်ရန် ရေကို နည်းနည်းထပ်သောက်ပေးပါ။";

            }

        } else {

            waterStatus.textContent =
                "Almost there!";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "Drink a Little More 💧";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "You are getting closer to your daily water goal. Drink a little more water.";

            }

        }

        return;
    }


    // ====================================
    // GOAL REACHED
    // ====================================

    if (waterAmount === DAILY_GOAL) {

        if (language === "mm") {

            waterStatus.textContent =
                "ရည်မှန်းချက် ပြည့်ပါပြီ ✅";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "ရေလုံလောက်စွာ သောက်ထားပါတယ် ✅";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "ယနေ့အတွက် သတ်မှတ်ထားသော ရည်မှန်းချက်ကို ပြည့်မီပါပြီ။";

            }

        } else {

            waterStatus.textContent =
                "Daily goal reached!";

            if (waterMessageTitle) {

                waterMessageTitle.textContent =
                    "Great Hydration! ✅";

            }

            if (waterMessage) {

                waterMessage.textContent =
                    "You have reached your daily water goal.";

            }

        }

        return;
    }


    // ====================================
    // ABOVE GOAL
    // ====================================

    if (language === "mm") {

        waterStatus.textContent =
            "ရည်မှန်းချက်ထက် ကျော်လွန်ပါပြီ ✅";

        if (waterMessageTitle) {

            waterMessageTitle.textContent =
                "ရေသောက်သုံးမှု ကောင်းမွန်ပါတယ် 💧";

        }

        if (waterMessage) {

            waterMessage.textContent =
                "ယနေ့ ရည်မှန်းချက်ထက် ရေပိုသောက်ထားပါတယ်။";

        }

    } else {

        waterStatus.textContent =
            "Above daily goal!";

        if (waterMessageTitle) {

            waterMessageTitle.textContent =
                "Great Job! 💧";

        }

        if (waterMessage) {

            waterMessage.textContent =
                "You have had more water than your daily goal.";

        }

    }

}


// ========================================
// GET TODAY DATE
// ========================================

function getTodayDate() {

    const today =
        new Date();

    const year =
        today.getFullYear();
        const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// ========================================
// LOAD USER WATER DATA
// ========================================

async function loadWaterData() {

    if (!userId) {

        console.warn(
            "No userId found."
        );

        waterAmount = 0;

        updateWaterDisplay();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/health-data/${userId}`
            );


        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );

        }


        const data =
            await response.json();


        if (
            data.success &&
            data.data
        ) {

            waterAmount =
                Number(
                    data.data.water_ml || 0
                );

        } else {

            waterAmount = 0;

        }


        updateWaterDisplay();

    } catch (error) {

        console.error(
            "Cannot load water data:",
            error
        );

        waterAmount = 0;

        updateWaterDisplay();

    }

}


// ========================================
// SAVE WATER DATA
// ========================================

if (saveWaterBtn) {

    saveWaterBtn.addEventListener(
        "click",
        async function () {

            const amount =
                Number(
                    waterInput.value
                );


            // ====================================
            // LOGIN CHECK
            // ====================================

            if (!userId) {

                alert(
                    getLanguage() === "mm"
                        ? "Login ဝင်ထားရန် လိုအပ်ပါတယ်။"
                        : "Please login first."
                );

                return;
            }


            // ====================================
            // INPUT CHECK
            // ====================================

            if (
                !Number.isFinite(amount) ||
                amount < 0
            ) {

                alert(
                    getLanguage() === "mm"
                        ? "မှန်ကန်သော ရေပမာဏကို ထည့်ပါ။"
                        : "Please enter a valid water amount."
                );

                return;
            }


            if (amount > 10000) {

                alert(
                    getLanguage() === "mm"
                        ? "ရေပမာဏ 10000 ml ထက် မပိုရပါ။"
                        : "Water amount cannot exceed 10000 ml."
                );

                return;
            }


            try {

                saveWaterBtn.disabled = true;


                // ====================================
                // GET EXISTING DATA FIRST
                // ====================================

                const getResponse =
                    await fetch(
                        `${API_URL}/health-data/${userId}`
                    );


                const existingData =
                    await getResponse.json();


                let steps = 0;
                let sleepHours = 0;
                let heartRate = 0;


                if (
                    existingData.success &&
                    existingData.data
                ) {

                    steps =
                        Number(
                            existingData.data.steps || 0
                        );

                    sleepHours =
                        Number(
                            existingData.data.sleep_hours || 0
                        );

                    heartRate =
                        Number(
                            existingData.data.heart_rate || 0
                        );

                }


                // ====================================
                // SAVE ALL DATA
                // ====================================
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

                                userId: userId,

                                record_date:
                                    getTodayDate(),

                                steps:
                                    steps,

                                sleep_hours:
                                    sleepHours,

                                heart_rate:
                                    heartRate,

                                water_ml:
                                    amount

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!data.success) {

                    alert(
                        data.message ||
                        "Could not save water data."
                    );

                    return;
                }


                // ====================================
                // UPDATE SCREEN
                // ====================================

                waterAmount =
                    amount;


                updateWaterDisplay();


                waterInput.value = "";


                alert(
                    getLanguage() === "mm"
                        ? "ရေပမာဏ သိမ်းပြီးပါပြီ။"
                        : "Water intake saved successfully."
                );


            } catch (error) {

                console.error(
                    "Save water error:",
                    error
                );

                alert(
                    getLanguage() === "mm"
                        ? "Server နှင့် ချိတ်ဆက်၍မရပါ။"
                        : "Cannot connect to server."
                );

            } finally {

                saveWaterBtn.disabled =
                    false;

            }

        }
    );

}


// ========================================
// ENTER KEY
// ========================================

if (waterInput && saveWaterBtn) {

    waterInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                saveWaterBtn.click();

            }

        }
    );

}


// ========================================
// LANGUAGE CHANGE
// ========================================

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key === "language" ||
            event.key === "selectedLanguage"
        ) {

            changeLanguage();

        }

    }
);


// ========================================
// START
// ========================================

changeLanguage();

loadWaterData();
