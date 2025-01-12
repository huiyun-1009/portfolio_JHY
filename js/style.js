$(function () {
    //top 버튼
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".top_btn").fadeIn();
        } else {
            $(".top_btn").fadeOut();
        }
    });

    $(".top_btn").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            500
        );
        return false;
    });

    // header, nav
    $("header li").on("mouseenter", function () {
        $(this).addClass("on");
    });
    $("header li").on("mouseleave", function () {
        $(this).removeClass("on");
    });
    $("header i").on("click", function () {
        $("nav").show(500);
    });
    $("nav i").on("click", function () {
        $("nav").hide();
        $("header i").removeClass("on");
    });
    $("nav li").on("click", function () {
        $("nav").hide();
    });
    $("nav li").on("mouseenter", function () {
        $(this).addClass("on");
    });
    $("nav li").on("mouseleave", function () {
        $(this).removeClass("on");
    });

    // visual text
    const targets = gsap.utils.toArray(".keyword");
    setTimeout(function () {
        targets.forEach((target) => {
            let SplitClient = new SplitType(target, {
                type: "chars",
            });
            let chars = SplitClient.chars;
            gsap.from(chars, {
                yPercent: 50,
                autoAlpha: 0,
                duration: 1,
                ease: "circ.out",
                stagger: {
                    amount: 1,
                    from: "random",
                },
            });
        });
    }, 2000);

    const text =
        "변화를 두려워 하지않고 끊임없이 도전하고 배우며 성장하는 정희윤 입니다."; // 타이핑할 문구
    let index = 0;
    let speed = 50; // 글자 타이핑 속도 (밀리초 단위)
    setTimeout(function () {
        function typeWriter() {
            if (index < text.length) {
                document.getElementById("text").textContent +=
                    text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }, 2500);

    // scroll
    let baseline = -200;

    function updatePositions() {
        con1 = $("#con1").offset().top + baseline;
        con2 = $("#con2").offset().top + baseline;
        con3 = $("#con3").offset().top;
        con4 = $("#con4").offset().top + baseline;
    }

    updatePositions();

    // 윈도우 리사이즈 시 위치 재계산
    $(window).on("resize", updatePositions);

    // GSAP 애니메이션 후 위치 재계산
    gsap.to("#con3", {
        scrollTrigger: {
            trigger: "#con3",
            start: "top center",
            onUpdate: updatePositions,
        },
    });

    // console.log(con1, con2, con3, con4);

    $(window).on("scroll", function () {
        let scroll = $(this).scrollTop();

        //header underbar
        if (scroll < con1) {
            $("#header_home").addClass("menu_active");
            $("#header_about, #header_design").removeClass("menu_active");
        } else if (con1 <= scroll && scroll < con2) {
            $("#header_about").addClass("menu_active");
            $("#header_home, #header_pofol").removeClass("menu_active");
        } else if (con2 <= scroll && scroll < con3) {
            $(
                "#header_home, #header_about, #header_design, #header_contact"
            ).removeClass("menu_active");
            $("#header_pofol").addClass("menu_active");
        } else if (con3 <= scroll && scroll < con4) {
            $(
                "#header_home, #header_about, #header_pofol, #header_contact"
            ).removeClass("menu_active");
            $("#header_design").addClass("menu_active");
        } else if (con4 <= scroll) {
            $(
                "#header_home, #header_about, #header_design, #header_pofol"
            ).removeClass("menu_active");
            $("#header_contact").addClass("menu_active");
        }

        //스크롤 위치별 클래스 추가,삭제
        if (scroll >= con1) {
            $("#con1 h2").addClass("on");
            $(".con1_wrap").addClass("on");
            $(".con1_wrap .idphoto").addClass("on");
            $(".about p").addClass("on");
            $(".about h4").addClass("on");
            $(".con1_wrap .skill img").addClass("on");
        } else {
            $("#header_home").addClass("menu_active");
            $("#header_about").removeClass("menu_active");
            $("#con1 h2").removeClass("on");
            $(".con1_wrap").removeClass("on");
            $(".con1_wrap .idphoto").removeClass("on");
            $(".about p").removeClass("on");
            $(".about h4").removeClass("on");
            $(".con1_wrap .skill img").removeClass("on");
        }

        if (con4 <= scroll) {
            $(".snsicon div").addClass("on");
        } else {
            $(".snsicon div").removeClass("on");
        }
    });
});

// 포트폴리오 인덱스
$(function () {
    $(document).ready(function () {
        // 스크롤 이벤트 처리
        $(window).scroll(function () {
            let pofolScroll = $(window).scrollTop();
            let pofolItem = $(".portfolio li");
            let menuItem = $(".index li");

            // 각 포트폴리오 항목을 순차적으로 확인
            pofolItem.each(function (index) {
                var pofolOffset = $(this).offset().top; // 각 포트폴리오 항목의 위치
                var pofolHeight = $(this).outerHeight(); // 각 포트폴리오 항목의 높이

                if (
                    pofolScroll >= pofolOffset - 250 &&
                    pofolScroll < pofolOffset + pofolHeight
                ) {
                    menuItem.removeClass("on");
                    menuItem.eq(index).addClass("on");
                }
            });
        });
    });

    $(".index li").on("click", function () {
        let pofolIdx = $(this).index();
        let target = $(".portfolio li").eq(pofolIdx);

        $(".index li").removeClass("on");
        $(this).addClass("on");

        $("html, body").animate({
            scrollTop: target.offset().top - 100,
        });
    });
});

// 일러스트 모달창
$(function () {
    let list = gsap.utils.toArray(".ilust li");

    gsap.to(list, {
        xPercent: -150 * (list.length - 2),
        scrollTrigger: {
            trigger: "#con3",
            pin: true,
            scrub: 3,
            start: "top top",
            end: "300%",
            markers: true,
        },
    });

    $(".ilust li").on("click", function () {
        let idx = $(this).index();
        // console.log(idx);
        // $("#con3 .modal li").removeClass("on");
        $("#con3 .modal li").eq(idx).addClass("on");
        $("header").slideUp(300);
    });

    $(".modal li i").on("click", function () {
        $("#con3 .modal li").removeClass("on");
        $("header").slideDown(300);
    });
});
