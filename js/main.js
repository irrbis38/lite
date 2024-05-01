var initGetBtns = (interview, steps) => {
    var get_btn = document.querySelector(".scr_quiz__get_btn");

    if (!get_btn || !interview || steps.length < 1) return;

    get_btn.addEventListener("click", () => {
        interview.classList.add("active");
    });
};

var initCloseBtns = (interview, steps) => {
    var close_btns = Array.from(document.querySelectorAll(".quiz-close"));
    var confirm = document.querySelector(".scr_quiz__confirm");

    if (close_btns.length < 1) return;

    close_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            interview.classList.remove("active");
            steps.forEach((step) =>
                step.dataset.step === "1"
                    ? step.classList.add("active")
                    : step.classList.remove("active")
            );

            confirm.classList.remove("active");
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
};

var initRadioBtns = (interview, steps) => {
    var radio_btns = Array.from(
        document.querySelectorAll(".scr_quiz__label_radio input")
    );

    if (radio_btns.length < 1) return;

    const NEXT = "next";

    radio_btns.forEach((btn) => {
        btn.addEventListener("click", () => moveStep(btn, NEXT));
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
        btn.addEventListener("click", () => moveStep(btn, NEXT));
    });
};

var formSubmit = (steps) => {
    var form = document.querySelector(".scr_quiz__interview");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.reset();
        steps.forEach((step) => step.classList.remove("active"));
        var confirm = document.querySelector(".scr_quiz__confirm");
        confirm.classList.add("active");

        // form.classList.add("active");
    });
};

document.addEventListener("DOMContentLoaded", () => {
    var interview = document.querySelector(".scr_quiz__interview");
    var steps = Array.from(document.querySelectorAll(".scr_quiz__step"));

    initGetBtns(interview, steps);
    initCloseBtns(interview, steps);
    initRadioBtns(interview, steps);
    initBackwardBtns(interview, steps);
    initForwardBtns(interview, steps);
    formSubmit(steps);
});
