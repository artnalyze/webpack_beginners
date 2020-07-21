import $ from "jquery";

function sayHello() {
    $("body").append(
        '<div style="background:#EEE;">Does jQuery exists here?</div>'
    );
    console.log("Hello I am Webpack Other file");
}

export { sayHello };