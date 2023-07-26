var oggButton = document.getElementById("ogg-button");
var mp3Button = document.getElementById("mp3-button");
var oggDownloadButton = document.getElementById("ogg-download-button");
var mp3DownloadButton = document.getElementById("mp3-download-button");

oggButton.addEventListener("click", function() {
    oggDownloadButton.style.display = "block";
    mp3DownloadButton.style.display = "none";
});

mp3Button.addEventListener("click", function() {
    oggDownloadButton.style.display = "none";
    mp3DownloadButton.style.display = "block";
});

oggDownloadButton.addEventListener("click", function() {
    var inputText = document.getElementById("texto-input").value;
    if (inputText.trim() !== "") {
        downloadAudio(inputText, "ogg");
    } else {
        alert("Por favor, ingresa la URL del video de YouTube.");
    }
});

mp3DownloadButton.addEventListener("click", function() {
    var inputText = document.getElementById("texto-input").value;
    if (inputText.trim() !== "") {
        downloadAudio(inputText, "mp3");
    } else {
        alert("Por favor, ingresa la URL del video de YouTube.");
    }
});

function downloadAudio(url, format) {
    var data = {
        url: url,
        format: format
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://axelpy2.pythonanywhere.com/download", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "blob";

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var downloadLink = document.createElement("a");
                var filename = getDownloadFilename(xhr.getResponseHeader('Content-Disposition'));
                downloadLink.href = URL.createObjectURL(xhr.response);
                downloadLink.download = filename;
                downloadLink.click();
            } else {
                console.error("Error en la respuesta del servidor:", xhr.status);
                alert("Hubo un error al descargar el audio.");
            }
        }
    };

    xhr.send(JSON.stringify(data));
}