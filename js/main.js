var audio, audiostate;
var d = Math.random();
if (d < 0.50) {
    audiostate = "mix";
}
else {
    audiostate = "maobgm";
}
function audiosegm() {
    if (audiostate != "mix") {
        audio = new Audio('assets/music/main.mp3');
        audiostate = "mix";
    }
    else {
        audio = new Audio('assets/music/maobgm.mp3');
        audiostate = "maobgm";
    }
    audio.play();
    audio.onended = audiosegm;
}
function sef(filename) {
    new Audio("assets/music/" + filename + ".mp3").play();
}
$("#playBegin").click(function () {
    try {
        document.getElementsByTagName("html")[0].requestFullscreen();
    } catch(e){}
    audiosegm();
    $(this).fadeOut();
});
var data = {}, cQuestion = {}, indexeslist = [], indexesProgress = 0, total = 100;
$.getJSON("data.json", function (d) {
    data = d;
    total = d["initialScore"];
    $("#counter").html("Social credit score: " + total);
    for (var i = 0; i < d["questions"].length; i++) {
        indexeslist.push(i);
    }
    shuffle(indexeslist);
    displayQuestion();
});
function displayQuestion() {
    $("html, body").scrollTop(0);
    if (total < 1) {
        audio.pause();
        audio = new Audio('assets/music/anthem.mp3');
        audio.play();
        $("#loose").show();
    }
    else {
        var index = 0;
        if (indexesProgress < indexeslist.length) {
            index = indexeslist[indexesProgress];
            indexesProgress++;
        }
        else {
            shuffle(indexeslist);
            indexesProgress = 0;
            index = 0;
        }
        cQuestion = data["questions"][index];
        $("[data-ans=1]").html(data["questions"][index]["answers"][0]["text"]);
        $("[data-ans=2]").html(data["questions"][index]["answers"][1]["text"]);
        if (data["questions"][index]["answers"][2]) $("[data-ans=3]").html(data["questions"][index]["answers"][2]["text"]);
        else $("[data-ans=3]").html("");
        if (data["questions"][index]["answers"][3]) $("[data-ans=4]").html(data["questions"][index]["answers"][3]["text"]);
        else $("[data-ans=4]").html("");
        $("#questionTitle").html(data["questions"][index]["title"]);
    }
}
$(".ans").click(function () {
    var res = cQuestion["answers"][$(this).attr("data-ans") - 1]["effect"];
    total += res;
    $("#counter").html("Social credit score: " + total);
    var d = Math.random();
    if (d < 0.10) {
        d = Math.random();
        if (d < 0.30) {
            $("#mao").fadeIn();
            $("#mao").fadeOut();
            sef("mao");
        }
        else if (d < 0.60) {
            $("#xi").fadeIn();
            $("#xi").fadeOut();
        }
        else {
            $("#square").fadeIn();
            $("#square").fadeOut();
        }
    }
    if (res < 0) {
        $("#wrong").fadeIn();
        sef("wrong");
        if (res < -1000) {
            sef("boo");
        }
        $("#wrong").fadeOut();
    }
    else {
        sef("correct");
        $("#correct").fadeIn();
        if (res > 1000) {
            sef("applause");
        }
    }
    displayQuestion();
    $("#correct").fadeOut();
});
