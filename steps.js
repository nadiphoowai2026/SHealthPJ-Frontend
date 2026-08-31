// ========================================
// STEPS TRACKER
// ========================================

const API_URL = "https://smart-healthcare-backend-production-d51b.up.railway.app";

const DAILY_GOAL = 10000;

let currentSteps = 0;

let trackingStarted = false;

let lastMagnitude = 0;
let lastStepTime = 0;

let motionListenerActive = false;


// ========================================
// USER ID
// ========================================

const userId =
    sessionStorage.getItem("userId");


// ========================================
// ELEMENTS
// ========================================

const todayStepsElement =
    document.getElementById("todaySteps");

const percentElement =
    document.getElementById("percent");

const statusText =
    document.getElementById("statusText");

const progressCircle =
    document.querySelector(".circle");

const startTrackingBtn =
    document.getElementById("startTrackingBtn");

const sensorStatus =
    document.getElementById("sensorStatus");


// ========================================
// GET TODAY DATE
// ========================================

function getTodayDate() {

    const now = new Date();

    const myanmarDate =
        new Date(
            now.toLocaleString(
                "en-US",
                {
                    timeZone: "Asia/Yangon"
                }
            )
        );

    const year =
        myanmarDate.getFullYear();

    const month =
        String(
            myanmarDate.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            myanmarDate.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// ========================================
// UPDATE STATUS
// ========================================

function changeStatus() {

    if (!statusText) {
        return;
    }

    if (currentSteps === 0) {

        statusText.textContent =
            "Start tracking to begin counting your steps.";

    } else if (currentSteps < 5000) {

        statusText.textContent =
            "Your steps are a little low today. Try to move more.";

    } else if (currentSteps < DAILY_GOAL) {

        statusText.textContent =
            "Great job! Keep moving toward your daily goal.";

    } else {

        statusText.textContent =
            "Daily goal reached! Great job!";
    }
}


// ========================================
// UPDATE DISPLAY
// ========================================

function updateSteps() {

    if (todayStepsElement) {

        todayStepsElement.textContent =
            currentSteps.toLocaleString();
    }


    const percentage =
        Math.min(
            (currentSteps / DAILY_GOAL) * 100,
            100
        );


    if (percentElement) {

        percentElement.textContent =
            Math.round(percentage) + "%";
    }


    if (progressCircle) {

        const degree =
            percentage * 3.6;

        progressCircle.style.background =
            "conic-gradient(#eb9494 0deg " +
            degree +
            "deg, #e9edf2 " +
            degree +
            "deg 360deg)";
    }


    changeStatus();
}


// ========================================
// SAVE STEPS TO BACKEND
// ========================================

async function saveStepsToBackend() {

    if (!userId) {

        console.log(
            "No userId found."
        );

        return;
    }


    try {

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

                        userId:
                            Number(userId),

                        record_date:
                            getTodayDate(),

                        steps:
                            currentSteps

                    })
                }
            );


        const result =
            await response.json();
            console.log(
            "Steps saved:",
            result
        );

    } catch (error) {

        console.error(
            "Cannot save steps:",
            error
        );
    }
}


// ========================================
// HANDLE MOTION
// ========================================

function handleMotion(event) {

    // IMPORTANT:
    // Do nothing unless Start Tracking
    // was actually pressed.

    if (!trackingStarted) {
        return;
    }


    const acceleration =
        event.accelerationIncludingGravity;

    if (!acceleration) {
        return;
    }


    const x =
        acceleration.x || 0;

    const y =
        acceleration.y || 0;

    const z =
        acceleration.z || 0;


    const magnitude =
        Math.sqrt(
            x * x +
            y * y +
            z * z
        );


    const difference =
        Math.abs(
            magnitude -
            lastMagnitude
        );


    const now =
        Date.now();


    const stepThreshold =
        1.2;

    const stepDelay =
        400;


    if (
        difference > stepThreshold &&
        now - lastStepTime > stepDelay
    ) {

        currentSteps++;

        lastStepTime =
            now;


        updateSteps();


        if (sensorStatus) {

            sensorStatus.textContent =
                "👟 Tracking... Steps: " +
                currentSteps;
        }
    }


    lastMagnitude =
        magnitude;
}


// ========================================
// START TRACKING
// ========================================

async function startTracking() {

    // Already tracking
    if (trackingStarted) {
        return;
    }


    // iPhone / some browsers
    if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission ===
            "function"
    ) {

        try {

            const permission =
                await DeviceMotionEvent.requestPermission();


            if (permission !== "granted") {

                if (sensorStatus) {

                    sensorStatus.textContent =
                        "Motion permission was denied.";
                }

                return;
            }

        } catch (error) {

            console.error(
                "Permission error:",
                error
            );

            return;
        }
    }


    if (
        typeof DeviceMotionEvent ===
        "undefined"
    ) {

        if (sensorStatus) {

            sensorStatus.textContent =
                "Motion sensor is not supported.";
        }

        return;
    }


    // Reset sensor values

    lastMagnitude = 0;

    lastStepTime = 0;


    // NOW start tracking

    trackingStarted = true;


    window.addEventListener(
        "devicemotion",
        handleMotion
    );

    motionListenerActive = true;


    if (startTrackingBtn) {

        startTrackingBtn.textContent =
            "Stop Tracking";
    }


    if (sensorStatus) {

        sensorStatus.textContent =
            "Tracking started. Start walking...";
    }
}


// ========================================
// STOP TRACKING
// ========================================

async function stopTracking() {

    trackingStarted = false;


    if (motionListenerActive) {

        window.removeEventListener(
            "devicemotion",
            handleMotion
        );

        motionListenerActive = false;
    }


    if (startTrackingBtn) {

        startTrackingBtn.textContent =
            "Start Tracking";
    }


    if (sensorStatus) {

        sensorStatus.textContent =
            "Tracking stopped.";
    }


    // Save final steps

    await saveStepsToBackend();
}


// ========================================
// START / STOP BUTTON
// ========================================

if (startTrackingBtn) {

    startTrackingBtn.addEventListener(
        "click",
        async function () {

            if (trackingStarted) {

                await stopTracking();

            } else {

                await startTracking();

            }

        }
    );
}
// ========================================
// LOAD STEPS FROM BACKEND
// ========================================

async function loadStepsFromBackend() {

    if (!userId) {

        updateSteps();

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/health-data/${userId}`
            );


        const result =
            await response.json();


        if (
            result.success &&
            result.data
        ) {

            currentSteps =
                Number(
                    result.data.steps || 0
                );
        }


        updateSteps();

    } catch (error) {

        console.error(
            "Cannot load steps:",
            error
        );

        updateSteps();
    }
}


// ========================================
// INITIAL STATE
// ========================================

// IMPORTANT:
// Page starts STOPPED

trackingStarted = false;

motionListenerActive = false;

if (startTrackingBtn) {

    startTrackingBtn.textContent =
        "Start Tracking";
}


// Load saved steps only.
// Motion sensor does NOT start here.
currentSteps = 0;
updateSteps();
