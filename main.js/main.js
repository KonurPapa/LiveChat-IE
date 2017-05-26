/*{
    localStorage.setItem("LC+-chatName-LC+ 1.0", "6144052898,kaencrypted_361adc69ef50120c6261fdc7fd5e4203_3d29cbdf005bfdf45198715e6652942d5b756f5d578d2702058dab56e2b81be63b7a43fca1d6cda08556a967ca8dba7ea5458d5bb73ada889cd6bf019bc1344312ac5249bd4c57d1342e68279f003b955a2a21c2ed02b516def3605ecc0f50d4eb2f6a07ed2c2d71dcdf3f50bd6bb72e266190a4c9bb48835f1c08e0877961c3cb102e1ab4fb83d11b5b169a92cee91093066959e6c8f0f0c422f9aafddd4a10");
    if (localStorage.getItem("LC+-selectedChat") === null) {
        localStorage.setItem("LC+-selectedChat", "LC+ 1.0");
    }

    var currentChat = localStorage.getItem("LC+-chatName-" + localStorage.getItem("LC+-selectedChat"));
    var prgId = currentChat.substr(0, localStorage.getItem("LC+-chatName-" + localStorage.getItem("LC+-selectedChat")).indexOf(","));
    var postId = currentChat.substr(localStorage.getItem("LC+-chatName-" + localStorage.getItem("LC+-selectedChat")).indexOf(",") + 1, localStorage.getItem("LC+-chatName-" + localStorage.getItem("LC+-selectedChat")).length);

    document.getElementById("name").innerHTML = "<strong>" + localStorage.getItem("LC+-selectedChat") + "</strong>";
}*/

var comment = document.getElementById("comment");
comment.innerHTML = '<div style="margin: 2%; padding: 2%; background-color: #f5f5f5;">If you can read this, then your browser does not support the built-in posting feature. You still have access to the chat, but may have issues sending posts. For best results, please use the <a href="https://www.google.com/chrome/index.html">Google Chrome</a> browser.<br><br>Thanks for understanding, happy chatting.</div>';
comment.innerHTML = '<iframe id="postbox" style="width: 100%; height: 100%; box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 0 20px 0 rgba(0, 0, 0, 0.3);" frameborder="0" src="https://www.khanacademy.org/computer-programming/pjs/6144052898?editor=no">';

var postKey = "kaencrypted_361adc69ef50120c6261fdc7fd5e4203_3d29cbdf005bfdf45198715e6652942d5b756f5d578d2702058dab56e2b81be63b7a43fca1d6cda08556a967ca8dba7ea5458d5bb73ada889cd6bf019bc1344312ac5249bd4c57d1342e68279f003b955a2a21c2ed02b516def3605ecc0f50d4eb2f6a07ed2c2d71dcdf3f50bd6bb72e266190a4c9bb48835f1c08e0877961c3cb102e1ab4fb83d11b5b169a92cee91093066959e6c8f0f0c422f9aafddd4a10";

var apiUrl = "https://www.khanacademy.org/api/internal/discussions/scratchpad/6144052898/comments?casing=camel&sort=2";

var format = function(msg) {
    var boldCheck = /\*([\S\ ]+)\*/gi;
    var italicCheck = /\_([\S\ ]+)\_/gi;
    var inlineCodeCheck = /`([\S\ ]+)`/gi;
    var blockCodeCheck = /```([\S\ ]+)```/gi;
    var urlCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)\/?/gi;
    var imageCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]+)(.png|.jpg|.gif|.tif|.svg)$/gi;
    var newlineCheck = /[\r\n|\n]+/g;
    var emojiCheck = {
        smiley: /[^~]:\)/g,
        wink: /[^~];\)/g,
        tongue: /[^~]:[pP]/g,
        laugh: /[^~][xX]D/g,
        grin: /[^~]:D/g,
    };
    var onlineCheck = /~status (online)~/gi;
    var offlineCheck = /~status (offline)~/gi;
    var dndCheck = /~status (dnd)~/gi;
    var afkCheck = /~status (afk)~/gi;
    var noneCheck = /~status (none)~/gi;
    var statusString = "<span style=\"border: 3px solid rgb(31, 171, 84); border-radius: 3px; background-color: #f5f5f5;\"><em>&nbsp;Status set to <strong>$1</strong>&nbsp;</em></span>";

    msg = msg.replace(/\<[\S\s]+\>/g, "").replace(/\<\/[\S\s]+\>/g, "");
    msg = msg.replace(boldCheck, "<span class=\"bold\">$1</span>").replace(italicCheck, "<span class=\"italic\">$1</span>");
    msg = msg.replace(blockCodeCheck, "<div class=\"block-code\">$1</div>").replace(inlineCodeCheck, "<span class=\"inline-code\">$1</span>");
    if (imageCheck.test(msg)) {
        msg = msg.replace(imageCheck, " <a href=\"//$2.$3$4$5\" target=\"_blank\"><img src=\"//$2.$3$4$5\" style=\"max-width: 400px; max-height: 400px; margin: 0.5%; border: 1px solid #ddd;\"></a>");
    } else {
        msg = msg.replace(urlCheck, " <a href=\"//$2.$3$4\" target=\"_blank\">$2.$3$4</a>");
    }
    msg = msg.replace(emojiCheck.smiley, " <div class=\"emoji\">😊</div>").replace(emojiCheck.wink, " <div class=\"emoji\">😉</div>").replace(emojiCheck.tongue, " <div class=\"emoji\">😛</div>").replace(emojiCheck.laugh, " <div class=\"emoji\">😆</div>").replace(emojiCheck.grin, " <div class=\"emoji\">😃</div>");
    msg = msg.replace(onlineCheck, statusString).replace(offlineCheck, statusString).replace(dndCheck, statusString).replace(afkCheck, statusString).replace(noneCheck, statusString);
    msg = msg.replace(/~/gi, "");
    msg = msg.replace(newlineCheck, "<br>");

    return msg;
};
var date = function(date) {
    if (showDate) {
        date = " - posted on " + date;
        var differ = new Date().getTimezoneOffset() / 60;
        var hourEdit = Number(date.slice(24, 26)) - differ;
        var ampm = " AM";
        if (hourEdit > 12) {
            hourEdit = hourEdit - 12;
            ampm = " PM";
        }
        date = date.slice(0, 24) + hourEdit + date.slice(26, date.length) + ampm;
        date = date.replace(/T/g, " at ");
        date = date.replace(/Z/g, "");

        return "<em>" + date + "</em>";
    }
};
var img = "none";

var time = (load < 1) ? 1000 : load * 1000;

//window.setInterval(function() {
    $.getJSON(apiUrl + "&callback=?", function(data) {
        $("[data-area]").empty();
        var names = [], uniqueNames = [], imgs = [], uniqueImgs = [], ids = [], uniqueIds = [];

        var statusCheck = [];

        for (var i = 0, j = 0; i < data.feedback.length; i++, j++) {
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
                $("<div>").addClass("meta")
                .append(
                    $("<img src='" + uniqueImgs[j - 2] + "' width='9%' style='margin-right: 1%; margin-top: -2%;' class='" + uniqueNames[j - 2] + "'>")
                )
                .append(
                    $("<a href='https://www.khanacademy.org/profile/" + uniqueIds[j - 2] + "' target='_blank' class='" + uniqueNames[j - 2] + "'>").text(uniqueNames[j - 2])
                )
                .append(
                    $("<img src='" + img + "' width='12%' style='position: absolute; left: 87%; margin-top: -1%; border: 1px solid #e9e9e9; border-radius: 1px;' class='" + uniqueNames[j - 2] + "'>")
                )
                .append(
                    $("<hr class='" + uniqueNames[j - 2] + "'>").css("margin", "5%")
                )
            )
            $("img, hr").remove(".undefined");
            $("[data-area]").append(
                $("<div>")
                .append(
                    $("<a href='https://www.khanacademy.org" + data.feedback[i].permalink + "?qa_expand_key=" + data.feedback[i].expandKey + "' target='_blank'><small style='position: absolute; margin-top: -2.5%; right: 2%;'>view post</small></a>")
                )
                .append(
                    $("<p>").html(format(data.feedback[i].content))
                )
                .append(
                    $("<img src='" + data.feedback[i].authorAvatarSrc + "' width='2%' style='margin-right: 0.5%; margin-top: -0.5%;'>")
                )
                .append(
                    $("<a href='https://www.khanacademy.org/profile/" + data.feedback[i].authorKaid + "' target='_blank'>").text(data.feedback[i].authorNickname)
                )
                .append(
                    $("<small>").html(date(data.feedback[i].date))
                )
                .append(
                    $("<hr style='width: 98%;'>")
                )
            );
        }
    });
//}, time);
