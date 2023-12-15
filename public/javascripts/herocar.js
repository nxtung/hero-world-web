document.addEventListener("DOMContentLoaded", function (event) {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
    //

    jQuery(document).ready(function ($) {
        $('#btnVote').click(function (event) {
            event.preventDefault();
            clickToVote("#vote");
        });

        $('.btnMenuCar').each(function (index) {
            $(this).click(function (event) {
                getCar($(this).attr('value'));
            });

            // console.log($(this).attr('value'))            
        });

    })
});


function clickToVote(voteId) {

    //put
    const id = parseInt($('#btnVote').attr('value'))
    $.ajax({
        url: `http://localhost:3232/api/car/${id}`,
        error: function () {
            console.log('An error has occurred');
        },
        dataType: 'json',
        success: function (data) {
            const v = parseInt($(voteId).text())
            $(voteId).text(v + data.changes)
        },
        type: 'PUT'
    });
};

function getCar(id) {
    // get
    $.ajax({
        url: `http://localhost:3232/api/car/${id}`,
        data: {
            format: 'json'
        },
        error: function () {
            console.log('An error has occurred');
        },
        dataType: 'json',
        success: function (data) {
            $('div.divTableCell.divDetail > h4').text(data.name)
            $('#vote').text(data.vote)
            $('div.divTableCell.divDetail > img').attr('src', `http://localhost:3232/images/cars/${data.image}`)
            $('#btnVote').attr('value', data.id)

            $('.btnMenuCar').each(function (index) {
                if ($(this).attr('value') == data.id)
                    $(this).toggleClass('active');
                else $(this).removeClass('active');
            });
        },
        type: 'GET'
    });
}