let navbar = document.querySelector('.nav');
let nav_width = document.querySelector('#navbar .max-width');
let nav_btn = document.querySelector('.mobileBtn');


nav_btn.addEventListener('click', () => {
    nav_width.classList.toggle('nav-show')
    navbar.classList.toggle('mobile-nav')
})

function scrollNavbar() {
    if (document.body.scrollTop > 24 || document.documentElement.scrollTop > 24) {
        // console.log(document.documentElement.scrollTop)
        nav_width.classList.add('sticky');
    } else {
        nav_width.classList.remove('sticky');
    }
}


window.onscroll = () => scrollNavbar();
const blogUrl = `http://${window.location.host}/api/blogs`;
const testimoniesUrl = `http://${window.location.host}/api/testimonies`;
let img = 'assets/cc000117b757e5e8a90d5d3a3f342cda.webp';
const e = async () => {
    await $.get(blogUrl, (data, status) => {
        for (let i of data) {
            let date = new Date(i['time']);
            $('.ourblogContainer').append(`
 <div class="blogbox">
                <img alt="" src=${img}>
                <div class="sub-heading">${date.toDateString()}</div>
                <div class="main-heading">${i['title']}</div>
                <div class="third-heading">${i['article']}</div>
</div>`)
        }
    });
    await $.get(testimoniesUrl, (data, status) => {
        console.log(data)
        for (let i of data) {
            $('.blogContainer').append(`            <div class="card card1">
                <div class="sub-heading">
                    <span class="icon"></span>
                    ${i['review']}
                </div>
                <div class="bottom-carousel">
                    <img alt="" src="assets/sport.png">
                    <div class="bottom-container">
                        <div class="sub-heading">${i['username']}</div>
                    </div>
                </div>
            </div>`)
        }
    }).then(() => {
        $('.blogContainer,.ourblogContainer').owlCarousel({
            margin: 20,
            loop: true,
            items: 3,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                }, 700: {
                    items: 2,
                    nav: false,
                }, 1000: {
                    items: 3,
                    nav: false
                },
            }
        })

    });

}
e()