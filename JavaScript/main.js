function getChat(link) {
    popUp2.style.display = "none";
    if (link !== undefined && link.length > 9) {
        $.getJSON("https://www.khanacademy.org/api/labs/scratchpads/" + link + "?callback=?", function(data) {
            localStorage.setItem("LC-chatName-" + data.title, link + "," + data.kaid + "," + data.created);
        });
        popUp3.style.display = "block";
    } else {
        popUp4.style.display = "block";
    }
};
function theChat(link) {
    document.getElementById("comment").innerHTML = '<iframe id="postbox" style="width: 100%; height: 100%; box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 0 20px 0 rgba(0, 0, 0, 0.3);" frameborder="0" src="https://www.khanacademy.org/computer-programming/pjs/' + link + '"><div style="margin: 2%; padding: 2%; background-color: #f5f5f5;">If you can read this, then your browser does not support the built-in posting feature. You still have access to the chat, but may have to post manually on the page. For best results, please use the <a href="https://www.google.com/chrome/index.html" target="_blank">Google Chrome</a> browser.<br><br>Thanks for understanding, happy LiveChatting.</div></iframe>';

    var timeOut = 300000;
    window.onmousemove = function() {
        timeOut = 300000;
    };
    window.setTimeout(function() {
        alert("Ran outta time!")
    }, timeOut);

    function format(msg) {
        var boldCheck = /\*([\S\ ]+)\*/gi;
        var italicCheck = /\_([\S\ ]+)\_/gi;
        var inlineCodeCheck = /`([\S\ ]+)`/gi;
        var blockCodeCheck = /```([\S\ ]+)```/gi;
        var urlCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)\/?/gi;
        var imageCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)(.png|.jpg|.gif|.tif|.svg)$/gi;
        var newlineCheck = /[\r\n|\n]+/g;
        var emojiCheck = {
            smiley: /[^~]:-*\)/g,
            wink: /[^~];\)/g,
            tongue: /[^~]:[pP]/g,
            laugh: /[^~][xX]D/g,
            grin: /[^~]:D/g,
        };
        var blacklist = [
            / [\x61\x2D\x2A]\x73\x73 /gi,
            / [\x61\x2D\x2A]\x72\x73\x65 /gi,
            /\x62[\x61\x2D\x2A]\x64[\x61\x2D\x2A]\x73\x73/gi,
            /\x62[\x61\x2D\x2A]\x73\x74[\x61\x2D\x2A]\x72\x64/gi,
            /\x62[\x69\x2D\x2A]\x74\x63\x68/gi,
            /\x62[\x6F\x2D\x2A][\x6F\x2D\x2A]\x62 /gi,
            /\x62[\x75\x2D\x2A]\x6C\x6C\x73\x68[\x69\x2D\x2A]\x74/gi,
            /\x62[\x75\x2D\x2A]\x74\x74\x66[\x61\x2D\x2A]\x63[\x65\x2D\x2A]/gi,
            /\x62[\x75\x2D\x2A]\x74\x74\x68[\x6F\x2D\x2A]\x6C[\x65\x2D\x2A]/gi,
            /\x64[\x61\x2D\x2A]\x6D\x6E/gi,
            /\x66[\x75\x2D\x2A]\x63\x6B/gi,
            /\x68[\x61\x2D\x2A]\x6C\x66[\x61\x2D\x2A]\x73\x73/gi,
            /\x20\x68[\x65\x2D\x2A]\x6C\x6C\x20/gi,
            /\x6A[\x61\x2D\x2A]\x63\x6B[\x61\x2D\x2A]\x73\x73/gi,
            /\x6A[\x65\x2D\x2A]\x73[\x75\x2D\x2A]\x73/gi,
            /\x6D[\x6F\x2D\x2A]\x74\x68[\x65\x2D\x2A]\x72\x66[\x75\x2D\x2A]\x63\x6B/gi,
            /\x6E[\x69\x2D\x2A]\x67\x67[\x61\x2D\x2A]/gi,
            /\x6E[\x69\x2D\x2A]\x67\x67[\x65\x2D\x2A]\x72/gi,
            /\x70[\x65\x2D\x2A]\x6E[\x69\x2D\x2A]\x73/gi,
            /\x70[\x69\x2D\x2A]\x73\x73/gi,
            /\x73[\x68\x2D\x2A]\x69\x74/gi,
            /\x76[\x65\x2D\x2A]\x67[\x69\x2D\x2A]\x6E[\x61\x2D\x2A]/gi,
            /\x6F\x6D\x66\x67/gi,
            /\x77\x74\x66/gi,
            /\x77\x74\x68/gi
        ];
        var onlineCheck = /~status (online)~/gi;
        var offlineCheck = /~status (offline)~/gi;
        var dndCheck = /~status (dnd)~/gi;
        var afkCheck = /~status (afk)~/gi;
        var noneCheck = /~status (none)~/gi;
        var statusString = "<span style=\"margin: 3px; padding: 5px; border-left: 3px solid rgb(31, 171, 84); background-color: #f5f5f5;\"><em>Status set to <b>$1</b></em></span>";
        var blackString = "<div style=\"margin: 3px; padding: 5px; width: 100%; border-left: 3px solid red; background-color: #f5f5f5;\"><em><b>Warning!</b> Inappropriate language has been hidden from this post. Please click the <b>view post</b> button, then <b>flag</b> it for Guardian attention.</em></div>";

        msg = msg.replace(/\<[\S\s]+\>/g, "").replace(/\<\/[\S\s]+\>/g, "");
        msg = msg.replace(boldCheck, "<span class=\"bold\">$1</span>").replace(italicCheck, "<span class=\"italic\">$1</span>");
        msg = msg.replace(blockCodeCheck, "<div class=\"block-code\">$1</div>").replace(inlineCodeCheck, "<span class=\"inline-code\">$1</span>");
        if (imageCheck.test(msg)) msg = msg.replace(imageCheck, " <a href=\"//www.khanacademy.org/computer-programming/link_redirector?url=http://$2.$3$4$5\" target=\"_blank\"><img src=\"//$2.$3$4$5\" style=\"max-width: 400px; max-height: 400px; margin: 0.5%; border: 1px solid #ddd;\"></a>");
        else msg = msg.replace(urlCheck, " <a href=\"//www.khanacademy.org/computer-programming/link_redirector?url=http://$2.$3$4\" target=\"_blank\">$2.$3$4</a>");
        msg = msg.replace(emojiCheck.smiley, " <div class=\"emoji\" style=\"font-size: 2.8vw; margin: -0.5vw;\">☺</div>").replace(emojiCheck.wink, " <div class=\"emoji\">😉</div>").replace(emojiCheck.tongue, " <div class=\"emoji\">😛</div>").replace(emojiCheck.laugh, " <div class=\"emoji\">😆</div>").replace(emojiCheck.grin, " <div class=\"emoji\">😃</div>");
        for (var i = blacklist.length; i--;) {
            if (blacklist[i].test(msg)) msg = blackString + msg;
            msg = msg.replace(blacklist[i], "<b style='color: red;'>[...]</b>");
        }
        msg = msg.replace(onlineCheck, statusString).replace(offlineCheck, statusString).replace(dndCheck, statusString).replace(afkCheck, statusString).replace(noneCheck, statusString);
        msg = msg.replace(/~/gi, "");
        msg = msg.replace(newlineCheck, "<br>");

        return msg;
    };
    function date(date) {
        if (showDate) {
            date = new Date(date);
            date = date.getTime() - date.getTimezoneOffset() * 60000;
            date = new Date(date);
            date = date.toString().replace(/\w+-\d+/gi, "").replace(/ 0/gi, " ").replace(/:0/gi, ":");
            var check = date.search(/\d{4}/);
            var part1 = date.slice(0, check + 4);
            var part2 = date.slice(check + 4, date.length);
            date = part1 + " at " + part2;
            return "<em> – Posted " + date + "</em>";
        }
    };
    var img = "none", time = (load < 1) ? 1000 : load * 1000;

    if (localStorage.visitCount) localStorage.visitCount++;
    else localStorage.visitCount = 0;
    if (localStorage.visitCount == 0) localStorage.setItem("LC-postNum", "0");

    //window.setInterval(function() {
        $.getJSON("https://www.khanacademy.org/api/internal/discussions/scratchpad/" + link + "/comments?limit=1000&sort=2&callback=?", function(data) {
            $("[data-area]").empty();
            var names = [], uniqueNames = [], imgs = [], uniqueImgs = [], ids = [], uniqueIds = [];

            var statusCheck = [];

            if (data.feedback.length > localStorage.getItem("LC-postNum")) {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'https://www.khanacademy.org/sounds/question-correct.mp3');
                audioElement.load();
                audioElement.currentTime = 0.2;
                audioElement.play();
                localStorage.setItem("LC-postNum", data.feedback.length)
            }

            document.getElementById("the-title").textContent = data.focus.title;

            for (var i = 0; i < data.feedback.length; i++) {
                {
                    names.push(data.feedback[i].authorNickname);
                    $.each(names, function(i, el) {
                        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                    });
                    imgs.push(data.feedback[i].authorAvatarSrc);
                    $.each(imgs, function(i, el) {
                        if ($.inArray(el, uniqueImgs) === -1) uniqueImgs.push(el);
                    });
                    ids.push(data.feedback[i].authorKaid);
                    $.each(ids, function(i, el) {
                        if ($.inArray(el, uniqueIds) === -1) uniqueIds.push(el);
                    });
                }
                {
                    if (data.feedback[i].content.indexOf("~status online~") !== -1) statusCheck.unshift("online")
                    if (data.feedback[i].content.indexOf("~status offline~") !== -1) statusCheck.unshift("offline")
                    if (data.feedback[i].content.indexOf("~status dnd~") !== -1) statusCheck.unshift("dnd")
                    if (data.feedback[i].content.indexOf("~status afk~") !== -1) statusCheck.unshift("afk")
                    if (data.feedback[i].content.indexOf("~status online~") === -1) statusCheck.unshift("statusCheck[0]");
                    if (statusCheck[i] === "online") img = "https://www.kasandbox.org/programming-images/avatars/mr-pants-idle.gif"
                    console.log(statusCheck)
                    console.log(img)
                }
                $("[meta-area]").append(
                    $("<img src='" + data.feedback[i].authorAvatarSrc + "' width='9%' style='margin-right: 1%; margin-top: -2%;' class='" + uniqueNames[i] + "'>")
                ).append(
                    $("<a href='https://www.khanacademy.org/profile/" + uniqueIds[i] + "' target='_blank' class='" + uniqueNames[i] + "'>").text(uniqueNames[i])
                ).append(
                    $("<img src='" + img + "' width='12%' style='position: absolute; left: 87%; margin-top: -1%; border: 1px solid #e9e9e9; border-radius: 1px;' class='" + uniqueNames[i] + "'>")
                ).append(
                    $("<hr class='" + uniqueNames[i] + "'>").css("margin", "5%")
                )
                $("img, hr").remove(".undefined");
                $("[data-area]").append(
                    $("<a href='https://www.khanacademy.org" + data.feedback[i].permalink + "?qa_expand_key=" + data.feedback[i].expandKey + "' target='_blank'><small style='position: absolute; margin-top: -2.5%; right: 2%;'>view post</small></a>")
                ).append(
                    $("<p>").html(format(data.feedback[i].content))
                ).append(
                    $("<img src='" + data.feedback[i].authorAvatarSrc + "' width='3%' style='margin-right: 0.5%; margin-top: -0.5%;'>")
                ).append(
                    $("<a href='https://www.khanacademy.org/profile/" + data.feedback[i].authorKaid + "' target='_blank'>").text(data.feedback[i].authorNickname)
                ).append(
                    $("<small>").html(date(data.feedback[i].date))
                ).append(
                    $("<hr style='width: 98%;'>")
                )
            }
            if (data.feedback.length === 0) {
                $("[data-area]").append(
                    $("<img src='https://cdn.kastatic.org/images/email_sad_pants.png' width='100vw' style='position: absolute; top: 15vh; left: 10vw;'>"),
                    $("<div style='position: absolute; top: 15vh; left: 25vw; font-size: 2.4em; font-family: Ubuntu;'>No&nbsp;posts!</div>"),
                    $("<div style='position: absolute; top: 25vh; left: 25vw; font-size: 1.4em; font-family: Ubuntu;'>This&nbsp;chat&nbsp;is&nbsp;empty...</div>")
                );
            }
        });
    //}, load);
};
