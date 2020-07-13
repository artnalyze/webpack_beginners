var sayHello = require("./greeting.js");
import { sayHello1 } from "./greeting1.js";
import application from "CssFolder/application.scss";
import $ from "jquery";

sayHello();
sayHello1();

$("body").append(
    '<div style="background:yellow;padding:10px;">Hello jQuery MM</div>'
);