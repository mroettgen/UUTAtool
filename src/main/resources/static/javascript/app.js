$(document).ready(function () {

    $('#pbar').hide();
    $('#sentim-buttons').hide();
    $('#finish-container').hide();

    $("#file-select").submit(function (e) {
            e.preventDefault();
            let thecsv = $('#csv-input').prop('files')[0];
            if (thecsv != undefined) {
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
            } else {
                alert("Du solltest noch die CSV-Datei auswählen...");
            }
        }
    );
});

function doComplete(results, file) {
    console.log("Parsing complete:", results, file);
    let data = shuffle(results.data);
    let numberOfTweets = $('#count').val();
    console.log(numberOfTweets);
    check(data, numberOfTweets);
}

function check(data, numberOfTweets = (Math.round(data.length / 3)), i = 0) {
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

    /* Wenn fertig, dann fertig */
    if (i >= numberOfTweets) {
        finish(data);
        return
    }

    let entry = data[i];

    /* undefined ist JS sei Dank == false */
    if(entry.evaluated) {
        Console.log("Tweet wurde bereits bewertet, überspringe...");
        check(data, ++numberOfTweets, ++i);
    }

    $('#user-handle').text(entry.user_handle);
    $('#user-name').text(entry.user_name);
    $('#tweet-date').text(entry.date);
    $('#tweet-text').text(entry.text);

    /* Doppelter Code, aber idc
     * https://i.redd.it/r9pw10m587v01.jpg */
    $('#sentim-pos-btn').click(function(e) {
        e.preventDefault();
        entry.sentim_self = 1;
        check(data, numberOfTweets, ++i);
    });
    $('#sentim-neg-btn').click(function(e) {
        e.preventDefault();
        entry.sentim_self = -1;
        check(data, numberOfTweets, ++i);
    });
    $('#sentim-equ-btn').click(function(e) {
        e.preventDefault();
        entry.sentim_self = 0;
        check(data, numberOfTweets, ++i);
    });

    /* Vermutlich geht das hier viel eleganter */
    document.onkeyup = function (e) {
        if (e.key == "ArrowRight") {
            entry.sentim_self = 1;
            check(data, numberOfTweets, ++i);
        } else if (e.key == "ArrowLeft") {
            entry.sentim_self = -1;
            check(data, numberOfTweets, ++i);
        } else if (e.key == "ArrowDown") {
            entry.sentim_self = 0;
            check(data, numberOfTweets, ++i);
        }
    }

}

function finish(data) {
    let csv = Papa.unparse(data);

    $('#finish-container').click(function(e) {
        e.preventDefault();
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'custom_sentiment.csv';
        hiddenElement.click();
    });
    $('#tweet').empty();
    $('#sentim-buttons').hide();
    $('#finish-container').show();
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