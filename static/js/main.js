var form = new Map()
var nav = document.getElementById("nav")
var onmin = matchMedia("(min-width: 768px)")

function toggleMenu() {
    nav.classList.toggle("display-flex")
}

onmin.addListener((mq) => {
    if (mq.matches) {
        nav.classList.remove("display-flex")
    }
})

function submitMessage() {
    form.set("name", formObject(document.getElementById("fullname")))
    form.set("phone", formObject(document.getElementById("phone")))
    form.set("email", formObject(document.getElementById("email")))
    form.set("country", formObject(document.getElementById("country")))
    form.set("message", formObject(document.getElementById("contact-message")))

    var errors = 0
    form.forEach((obj, key) => {
        if (obj.value == "") {
            obj.error = "The " + key + " field can not be empty"
            insertFormError(obj.error, key)
        } else {
            ifVaild(obj.value, key, (match, error) => {
                if (!match) insertFormError(error, key)
            })
        }
        obj.error != "" ? errors++ : {}
    })

    if (errors == 0) {
        document.getElementById("contact-form").classList.add("display-none")
        document.getElementById("submitted").classList.replace("display-none", "display-flex")
    }
}

function ifVaild(value, key, cb) {
    var error = "Incorrect format used for " + key + " field"
    var expressions = {
        EMAIL: /^\S+@\S+\.\S+$/,
        NUMERIC: /^[0-9]\d{9}$/
    }
    switch (key) {
        case "email":
            cb(expressions.EMAIL.test(value), error)
            break;
        case "phone":
            cb(expressions.NUMERIC.test(value), value.length < 10 ? "Enter more numbers" : error)
            break;
    }
}

function insertFormError(error, key) {
    let tag = document.createElement("p")
    let group = document.getElementById(key + "-group")
    tag.innerHTML = `<p id="${key}-error" style="font-size: 12px; color:red;">${error}</p>`
    group.appendChild(tag)
    setTimeout(() => group.removeChild(tag), 3500)
}

function formObject(element) {
    return {
        error: "",
        value: element.value
    }
}