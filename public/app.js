const form = document.querySelector("#shorten-form");
const input = document.querySelector("#url-input");
const message = document.querySelector("#form-message");
const resultCard = document.querySelector("#result-card");
const shortUrl = document.querySelector("#short-url");
const copyButton = document.querySelector("#copy-button");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    message.textContent = "";
    resultCard.hidden = true;
    const url = input.value.trim();
    const submitButton = form.querySelector("button");
    submitButton.disabled = true;
    submitButton.textContent = "Shortening...";

    try {
        const response = await fetch("/url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Could not shorten that link.");

        const link = `${window.location.origin}/${data.id}`;
        shortUrl.href = link;
        shortUrl.textContent = link;
        resultCard.hidden = false;
    } catch (error) {
        message.textContent = error.message;
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Shorten link <span aria-hidden="true">↗</span>';
    }
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(shortUrl.href);
    copyButton.textContent = "Copied";
    window.setTimeout(() => { copyButton.textContent = "Copy link"; }, 1600);
});