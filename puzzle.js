$(function () {
    $(".puzzle").draggable({
        grid: [200, 200],
        containment: "element",
        revert: false
        // iframeFix: true,
        // opacity: 1

    });

    $(function () {
        var
    })

























    // $(".puzzle").css({ opacity: 0 });

})
//--------------------------------------------
// $(document).ready(function () {

//     var puzzle = $(".puzzle");
//     var playArea = $("#playArea");

//     puzzle.draggable({
//         containment: playArea,
//         helper: "clone",

//         start: function () {
//             $(this).css({
//                 opacity: 0
//             });

//             $(".puzzle").css("z-index", "0");
//         },

//         stop: function () {
//             $(this).css({
//                 opacity: 1
//             });
//         }
//     });

//     puzzle.droppable({
//         accept: puzzle,

//         drop: function (event, ui) {
//             var draggable = ui.draggable;
//             var droppable = $(this);
//             var dragPos = draggable.position();
//             var dropPos = droppable.position();

//             draggable.css({
//                 left: dropPos.left + "px",
//                 top: dropPos.top + "px",
//                 "z-index": 20
//             });

//             droppable.css("z-index", 10).animate({
//                 left: dragPos.left,
//                 top: dragPos.top
//             });
//         }
//     });

// });