function rules() {
    alert('Rearrange the pieces so that you get a sample image. \nThe steps taken are counted');
}




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
        //     $(this).css({
        //         opacity: 0
        //     });
        //     $(".puzzle").css("z-index", 0)
        // },
        // stop: function () {
        //     $(this).css({
        //         opacity: 1
        //     });
        // }


    });
    // $(".puzzle").sortable({
    //     start: function (event, ui) { }
    // })
    child.sortable();

});



