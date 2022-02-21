$(function () {

    var parent = $("#playArea");
    var child = $(".puzzle");

    child.draggable({
        grid: [200, 200],
        containment: parent,
        helper: "clone",
        // revert: false
        // // iframeFix: true,
        // opacity: 1

        startfunction

    })



