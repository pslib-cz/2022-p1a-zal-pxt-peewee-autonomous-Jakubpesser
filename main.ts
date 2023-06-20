radio.setGroup(3)
radio.setFrequencyBand(7)
let data = []
let recentData = []
let whiteLine = 0
let btnA = false
let btnB = false
let btnLOGO = false
const pinC = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13
function carMotor(ul: number = 0, ur: number = 0, ll: number = 0, lr: number = 0) {
    ul = Math.map(ll, -100, 100, -255, 255)
    ur = Math.map(lr, -100, 100, -255, 255)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -ul)
    PCAmotor.MotorRun(PCAmotor.Motors.M1, ur)
}
pins.setPull(pinC, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)

basic.forever(function () {
    let c = (whiteLine ^ pins.digitalReadPin(pinC)) == 0 ? false : true
    let l = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let r = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    if (c === true && l === true && r === true || c === true && l === false && r === false) {
        carMotor(0, 0, -70, -70)
    } else if (r === false && c === true && l === true || c === false && r === false && l === true) {
        carMotor(0, 0, -70, 0)
    } else if (r === true && c === true && l === false || c === false && r === true && l === false) {
        carMotor(0, 0, 0, -70)
    }
    else {
        if (btnA == true) {
            carMotor(0, 0, -70, 70)
        }
        if (btnB == true) {
            carMotor(0, 0, 70, -70)
        }
        else {
            carMotor(0, 0, -70, -70)
        }
    }
})
radio.onReceivedValue(function (name: string, value: number) {
    if (name == "btnA") {
        btnA = (value == 1)
    }
    if (name == "btnB") {
        btnB = (value == 1)
    }
    if (name == "btnLOGO") {
        btnA == false
        btnB == false
    }
})