import $ from "jquery";
import "bootstrap";
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import Quill from "quill";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import "bootstrap/dist/css/bootstrap.css";
import { sayHello } from "./greeting.js";
import { sayHello1 } from "./greeting1.js";
import application from "CssFolder/application.scss";

sayHello();
sayHello1();

$("body").append(
    '<div style="background:green;padding:10px;">Hello jQuery MM</div>'
);

$("[data-toggle='tooltip']").tooltip();

$("#datepicker").datepicker();

var quill = new Quill("#editor", {
    theme: "snow",
});

if (document.getElementById("ckeditor")) {
    import ("@ckeditor/ckeditor5-build-classic").then(function(ClassicEditor) {
        ClassicEditor.default
            .create(document.querySelector("#ckeditor"))
            .then((editor) => {
                console.log(editor);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}

if (module.hot) {
    module.hot.accept(function(err) {
        console.log(err);
    });
}