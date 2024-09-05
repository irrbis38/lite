var steps = Array.from(document.querySelectorAll(".scr_quiz__step"));
var len = steps.length;
var progress = document.querySelector(".progress-line");

var moveProgressLine = () => {
    var active_step = steps.filter((item) =>
        item.classList.contains("active")
    )[0];

    progress.style.width = `${(active_step.dataset.step / len) * 100}%`;
};

var initGetBtns = (interview, steps) => {
    var get_btn = document.querySelector(".scr_quiz__get_btn");
    var header = document.querySelector(".scr_header");

    if (!get_btn || !interview || steps.length < 1) return;

    [get_btn].forEach((item) =>
        item.addEventListener("click", () => {
            interview.classList.add("active");
            header.classList.add("fixed");
            document.body.classList.add("lock");
            moveProgressLine();
        })
    );
};

var initCloseBtns = (interview, steps) => {
    var close_btns = Array.from(document.querySelectorAll(".quiz-close"));
    var confirm = document.querySelector(".scr_quiz__confirm");
    var header = document.querySelector(".scr_header");
    var get_btn = document.querySelector(".scr_quiz__get_btn");

    if (close_btns.length < 1) return;

    close_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            interview.style.display = "none";
            setTimeout(() => (interview.style.display = "block"), 500);
            get_btn.setAttribute("disabled", "disabled");
            interview.classList.remove("active");
            steps.forEach((step) =>
                step.dataset.step === "1"
                    ? step.classList.add("active")
                    : step.classList.remove("active")
            );

            confirm.classList.remove("active");
            header.classList.remove("fixed");
            document.body.classList.remove("lock");
            progress.style.display = "none";
            progress.style.width = `0%`;
            setTimeout(() => {
                progress.style.display = "block";
                get_btn.removeAttribute("disabled");
            }, 500);
        });
    });
};

var moveStep = (btn, dir) => {
    var current_step = btn.closest(".scr_quiz__step");
    var direction =
        dir === "next" ? "nextElementSibling" : "previousElementSibling";
    var next_step = current_step[direction];
    current_step.classList.remove("active");
    next_step.classList.add("active");
    moveProgressLine();
};

var initRadioBtns = (interview, steps) => {
    var radio_btns = Array.from(
        document.querySelectorAll(".scr_quiz__label_radio input")
    );

    if (radio_btns.length < 1) return;

    const NEXT = "next";

    radio_btns.forEach((btn) => {
        btn.addEventListener("click", () =>
            setTimeout(() => moveStep(btn, NEXT), 500)
        );
    });
};

var initBackwardBtns = () => {
    var backward_btns = Array.from(document.querySelectorAll(".quiz-backward"));

    if (backward_btns.length < 1) return;

    const PREV = "prev";

    backward_btns.forEach((btn) => {
        btn.addEventListener("click", () => moveStep(btn, PREV));
    });
};

var initForwardBtns = () => {
    var forward_btns = Array.from(document.querySelectorAll(".quiz-forward"));

    if (forward_btns.length < 1) return;

    const NEXT = "next";

    forward_btns.forEach((btn) => {
        btn.addEventListener("click", () =>
            setTimeout(() => moveStep(btn, NEXT), 500)
        );
    });
};

var formSubmit = (steps) => {
    var form = document.querySelector(".scr_quiz__interview");

    if (!form) return;

    var inputs = Array.from(form.elements);

    var required_inputs = inputs.filter((input) =>
        input.classList.contains("required")
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        required_inputs.forEach((input) => {
            if (!input.value) {
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
        });

        if (
            required_inputs.some((input) => input.classList.contains("error"))
        ) {
            return;
        }

        form.reset();
        steps.forEach((step) => step.classList.remove("active"));
        var confirm = document.querySelector(".scr_quiz__confirm");
        confirm.classList.add("active");
    });
};

// var initMagneticButtons = () => {
//     var area = document.querySelector(".scr_quiz__wrapper");
//     var btn = document.querySelector(".scr_quiz__get_btn");

//     if (!area || !btn) return;

//     var parallaxIt = (e, target, movement = 1) => {
//         var boundingRect = area.getBoundingClientRect();
//         var relX = e.pageX - boundingRect.left;
//         var relY = e.pageY - boundingRect.top;
//         var scrollTop =
//             window.pageYOffset || document.documentElement.scrollTop;

//         requestAnimationFrame(() => {
//             target.style.transform = `translate(${
//                 (relX - boundingRect.width / 2 + target.scrollWidth / 1.5) *
//                 movement
//             }px, ${
//                 (relY -
//                     boundingRect.height / 2 -
//                     scrollTop +
//                     target.scrollHeight / 1.5) *
//                 movement
//             }px)`;
//         });
//     };

//     var callParallax = (e) => {
//         btn.classList.add("active");
//         parallaxIt(e, btn);
//     };

//     var leaveHandler = () => {
//         btn.style.transform = `translate(0px, 0px)`;
//         btn.classList.remove("active");
//     };

//     if (window.innerWidth > 767) {
//         area.addEventListener("mousemove", callParallax);
//         area.addEventListener("mouseleave", leaveHandler);
//     }

//     // toggle header handlers by resize
//     var mqMin767 = window.matchMedia("(min-width: 767px)");

//     var handleMQ = (e) => {
//         if (e.matches) {
//             area.addEventListener("mousemove", callParallax);
//             area.addEventListener("mouseleave", leaveHandler);
//         } else {
//             area.removeEventListener("mousemove", callParallax);
//             area.removeEventListener("mouseleave", leaveHandler);
//         }
//     };

//     mqMin767.addEventListener("change", handleMQ);
// };

var initContacts = () => {
    var buttons = document.querySelectorAll(".contacts__copy");

    if (buttons.length < 1) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            var link = btn.previousElementSibling;
            if (!link) return;

            const value = link.textContent;
            navigator.clipboard.writeText(value);
        });
    });
};

var doCreateMapScript = (cb) => {
    setTimeout(function () {
        var script = document.createElement("script");
        script.async = false;
        script.src = "https://api-maps.yandex.ru/2.1/?apikey=key&lang=ru_RU";
        document.body.appendChild(script);
        script.onload = () => cb();
    }, 2000);
};

var initMap = () => {
    var init = () => {
        var coords = [45.054809, 38.970974];
        var mark_link = "images/mark.svg";

        if (ymaps) {
            var map = new ymaps.Map("map", {
                center: coords,
                zoom: 17,
            });

            var placemark = new ymaps.Placemark(
                coords,
                {},
                {
                    iconLayout: "default#image",
                    iconImageHref: mark_link,
                    iconImageSize: [100, 100],
                    iconImageOffset: [-60, -80],
                }
            );

            map.controls.remove("geolocationControl"); // удаляем геолокацию
            map.controls.remove("searchControl"); // удаляем поиск
            map.controls.remove("trafficControl"); // удаляем контроль трафика
            map.controls.remove("typeSelector"); // удаляем тип
            map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
            // map.controls.remove("zoomControl"); // удаляем контрол зуммирования
            map.controls.remove("rulerControl"); // удаляем контрол правил
            // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

            map.geoObjects.add(placemark);
        }
    };

    ymaps.ready(init);
};

// isMobile check

// var mobileCheck = () => {
//     let check = false;
//     (function (a) {
//         if (
//             /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
//                 a
//             ) ||
//             /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
//                 a.substr(0, 4)
//             )
//         )
//             check = true;
//     })(navigator.userAgent || navigator.vendor || window.opera);
//     return check;
// };

// var changeMapUrl = () => {
//     var link = document.getElementById("map-btn");

//     if (!link) return;

//     link.setAttribute(
//         "href",
//         "yandexmaps://maps.yandex.ru/?ll=45.05,38.97&z=12"
//     );
// };

document.addEventListener("DOMContentLoaded", () => {
    var interview = document.querySelector(".scr_quiz__interview");
    var steps = Array.from(document.querySelectorAll(".scr_quiz__step"));

    initGetBtns(interview, steps);
    initCloseBtns(interview, steps);
    initRadioBtns(interview, steps);
    initBackwardBtns(interview, steps);
    initForwardBtns(interview, steps);
    formSubmit(steps);
    initContacts();

    var map = document.getElementById("map");
    map && doCreateMapScript(initMap);

    // initMagneticButtons();

    // change href for yandex maps if mobile device
    // var isMobile = mobileCheck();
    // isMobile && changeMapUrl();
    // changeMapUrl();
});
