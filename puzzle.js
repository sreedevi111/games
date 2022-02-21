function rules() {
    alert('Rearrange the pieces so that you get a sample image. \nThe steps taken are counted');
}

a = [];
expected = ["p1", "p3", "p2", "p4"];


$(function () {

    var parent = $("#playArea");
    var child = $(".puzzle");

    child.draggable({
        grid: [200, 200],
        containment: parent,
        // helper: "clone"
        // revert: false
        // // iframeFix: true,
        // opacity: 1

        // start: function () {
        //     alert("listen")
        //     $(this).css({
        //         opacity: 1
        //     });
        //     $(".puzzle").css("z-index", 0)
        // },
        stop: function (event, ui) {

            $('#playArea .container').children().each(function (index) {
                a.push(this.className.split(' ')[1])
                if (JSON.stringify(a.slice(Math.max(a.length - 4, 1))) === JSON.stringify(expected)) {
                    alert("You Won!!!! Hurray!!!!");
                }

                console.log(a.slice(Math.max(a.length - 4, 1)), expected)
            })
        }


    });
    // $(".puzzle").sortable({
    //     start: function (event, ui) { }
    // })
    child.sortable();




});



