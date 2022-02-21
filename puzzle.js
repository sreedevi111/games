function rules() {
    alert('Rearrange the pieces so that you get a sample image. \nThe steps taken are counted');
}


$(document).ready(function () {

    var puzzle = $(".puzzle");
    var mainCanvas = $("#playArea");


    expected = ["1", "2", "3", "4"];

    puzzle.draggable({
        containment: mainCanvas,
        helper: "clone",
        // grid: [200, 200],
        start: function (event, ui) {
            console.log("start");
            $(this).css({
                opacity: 0
            });
            $(".puzzle").css("z-index", "0");
        },

        stop: function (event, ui) {
            $(this).css({
                opacity: 1
            });
            flag = true;
            setTimeout(function () {
                for (let i = 0; i < 4; i++) {
                    var togetArr = mainCanvas.children()[i]
                    console.log($(togetArr).attr("key"), i)
                    console.log(typeof ($(togetArr).attr("key")), typeof (i.toString()))
                    if ($(togetArr).attr("key") !== i.toString()) {
                        flag = false;
                        break;
                    }
                }
                if (flag == true) {
                    alert("atlast you won!!!!")
                }
            }, 800)
        }
    }
    );
    puzzle.droppable({
        accept: puzzle,
        drop: function (event, ui) {
            var draggable = ui.draggable;
            var droppable = $(this);
            var dragPos = draggable.position();
            var dropPos = droppable.position();

            draggable.css({
                left: dropPos.left + "px",
                top: dropPos.top + "px",
                "z-index": 20
            });
            var dragKeyAttr = draggable.attr("key");

            var dropKeyAttr = droppable.attr("key");

            draggable.attr("key", dropKeyAttr);
            droppable.attr("key", dragKeyAttr);

            droppable.css("z-index", 10).animate({
                left: dragPos.left,
                top: dragPos.top

            });
        }
    });
});

