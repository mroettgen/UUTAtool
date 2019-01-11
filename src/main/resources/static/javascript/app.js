$(document).ready(function () {

    $('#pbar').hide();
    $('#sentim-buttons').hide();

    $("#file-select").submit(function (e) {
        e.preventDefault();
        let thecsv = $('#csv-input').prop('files')[0];
        console.log(thecsv);
        Papa.parse(thecsv, {
            delimiter: "", // auto-detect
            newline: "", // auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: true,
            transformHeader: undefined,
            dynamicTyping: false,
            preview: 0,
            encoding: "UTF-8",
            worker: false,
            comments: false,
            step: undefined,
            complete: doComplete,
            error: undefined,
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
            transform: undefined
        });

        $('#file-select').hide();
        $('#pbar').show();
        $('#sentim-buttons').show();
    });

});

function doComplete(results, file) {
    console.log("Parsing complete:", results, file);
    let data = shuffle(results.data);
    let numberOfTweets = $('#count').val();
    console.log(numberOfTweets);
    check(data, numberOfTweets, finish);
}

function check(data, numberOfTweets = (Math.round(data.length / 3)), callback = function () {
    return
}, i = 0) {
    console.log("Prüfe Tweet " + i + " von " + numberOfTweets + " Tweets...");
    let percentDone = Math.round((i / numberOfTweets) * 100);
    $('.progress-bar').css("width", percentDone + "%");
    $('.progress-bar').text(i + " von " + numberOfTweets + " Tweets")

    if (numberOfTweets > data.length) {
        console.warn("Ich kann nur so viele Tweets prüfen wie ich bekommen habe. Für dich Schuckelchen hab ich jetzt aber mal das Maximum ausgewählt. Es sind also jetzt " + numberOfTweets + " Tweets zu prüfen.")
        numberOfTweets = data.length;
    } else if (numberOfTweets < 0) {
        console.warn("Du Blödmann versuchst, eine negative Anzahl an Tweets zu prüfen. Ich geb dir mal zwischen 5 und 50. Überdenke deine Lebensentscheidungen.")
        numberOfTweets = Math.floor(Math.random() * 55) + 5;
        console.log("Viel Spaß mit deinen " + numberOfTweets + " Tweets.")
    }

    if (i >= numberOfTweets) {
        clean();
        return
    }

    let entry = data[i];
    if (entry == null) {
        clean();
        return
    }

    $('#user-handle').text(entry.user_handle);
    $('#user-name').text(entry.user_name);
    $('#tweet-date').text(entry.date);
    $('#tweet-text').text(entry.text);

    document.onkeyup = function (e) {
        if (e.key == "ArrowRight") {
            entry.sentiment_self = 1;
            check(data, numberOfTweets, callback, ++i);
        } else if (e.key == "ArrowLeft") {
            entry.sentiment_self = -1;
            check(data, numberOfTweets, callback, ++i);
        } else if (e.key == "ArrowDown") {
            entry.sentiment_self = 0;
            check(data, numberOfTweets, callback, ++i);
        }
    }

}

function clean() {
    $('#tweet').empty();
}

function finish() {
    //TODO: Cooles Zeug anzeigen und vor allem die Ergebnisse zurück in die CSV speichern.
}


/**
 * Shuffles array in place.
 *
 * @param {Array}
 *            a items An array containing the items.
 */
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}