"use strict";
const axios = require("axios");
const crypto = require("crypto");
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

function addDialCode(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s+/g, '');
  
    const regex = /^\+91/;
    if (!regex.test(phoneNumber)) {
      phoneNumber = "+91" + phoneNumber;
    }
    return phoneNumber;
  }
function generateGoogleMapsLink(address) {
  const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
  
  const encodedAddress = encodeURIComponent(address);

  return `${baseUrl}${encodedAddress}`;
}

function renderProfileMissingHTML() {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://api.fontshare.com/css?f[]=author@400,700&display=swap" rel="stylesheet">
        <title></title>
        <style>
            html,
            body {
                margin: 0;
                padding: 0;
                font-family: 'Author', sans-serif;
            }
    
            .sticky {
                position: sticky;
                top: 0;
            }
    
            .container {
                max-width: 100%;
                margin-left: auto;
                margin-right: auto;
                padding-left: 24px;
                padding-right: 24px;
            }
    
            .custom-card {
                max-width: 28rem;
                margin: auto;
                padding: 1.5rem;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 0.375rem;
            }
    
            .logo img {
                width: 150px;
            }
    
            .font-semibold {
                font-weight: 600;
            }
    
            .text-2xl {
                font-size: 1.5rem;
                line-height: 2rem;
            }
    
            .sub-title {
                color: rgba(0, 0, 0, 0.45);
            }
            .p-4 {
                padding: 1rem/* 16px */;
            }
            .mt-4 {
                margin-top: 1rem/* 16px */;
            }
            .flex-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: column;
            }
            .pt-8 {
                padding-top: 2rem/* 32px */;
            }
            .text-center {
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <main class="main p-4">
            <div class="sticky mt-4">
                <div class="custom-card">
                    <div class="flex-box">
                        <div class="logo">
                            <img src='/scube-logo.svg' alt="Logo">
                        </div>
                        <h1 class="font-semibold text-2xl py-2">[ERROR_TITLE]</h1>
                        <p class="sub-title text-center py-4">[ERROR_MESSAGE]</p>
                    </div>
                    <p class="text-center">Scube Smart Business Card</p>
                </div>
            </div>
        </main>
    </body>
    
    </html>
    `;
}


function renderHTML(response, vCardFormattedText,nonce) {
  let meta = JSON.parse(JSON.stringify(response))
  let data = {
    image: response.image_base64 || '',
    name: `${meta.name}`,
    job: meta.designation,
    bio:'',
    title: meta.department,
    ...meta
  }
  let html   = `
  <!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <title> ${response.name} | ${data.job}</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet">
    <style>
        * {
            font-family: "Open Sans", sans-serif;
        }
        *,
        ::before,
        ::after {
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e5e7eb;
        }

        ::before,
        ::after {
            --tw-content: '';
        }
        html,
        :host {
            line-height: 1.5;
            -webkit-text-size-adjust: 100%;
            -moz-tab-size: 4;
            tab-size: 4;
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-feature-settings: normal;
            font-variation-settings: normal;
            -webkit-tap-highlight-color: transparent;
        }
        body {
            margin: 0;
            line-height: inherit;
        }
        hr {
            height: 0;
            color: inherit;
            border-top-width: 1px;
        }

        abbr:where([title]) {
            text-decoration: underline dotted;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-size: inherit;
            font-weight: inherit;
        }

        a {
            color: inherit;
            text-decoration: inherit;
        }

        b,
        strong {
            font-weight: bolder;
        }

        code,
        kbd,
        samp,
        pre {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-feature-settings: normal;
            font-variation-settings: normal;
            font-size: 1em;
        }

        small {
            font-size: 80%;
        }

        sub,
        sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline;
        }

        sub {
            bottom: -0.25em;
        }

        sup {
            top: -0.5em;
        }

        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
        }

        button,
        input,
        optgroup,
        select,
        textarea {
            font-family: inherit;
            font-feature-settings: inherit;
            font-variation-settings: inherit;
            font-size: 100%;
            font-weight: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            color: inherit;
            margin: 0;
            padding: 0;
        }

        button,
        select {
            text-transform: none;
        }

        button,
        input:where([type='button']),
        input:where([type='reset']),
        input:where([type='submit']) {
            -webkit-appearance: button;
            background-color: transparent;
            background-image: none;
        }

        :-moz-focusring {
            outline: auto;
        }

        :-moz-ui-invalid {
            box-shadow: none;
        }

        progress {
            vertical-align: baseline;
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            height: auto;
        }

        [type='search'] {
            -webkit-appearance: textfield;
            outline-offset: -2px;
        }

        ::-webkit-search-decoration {
            -webkit-appearance: none;
        }
        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit;
        }

        summary {
            display: list-item;
        }

        blockquote,
        dl,
        dd,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        figure,
        p,
        pre {
            margin: 0;
        }

        fieldset {
            margin: 0;
            padding: 0;
        }

        legend {
            padding: 0;
        }

        ol,
        ul,
        menu {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        dialog {
            padding: 0;
        }

        textarea {
            resize: vertical;
        }

        input::placeholder,
        textarea::placeholder {
            opacity: 1;
            color: #9ca3af;
        }

        button,
        [role="button"] {
            cursor: pointer;
        }

        :disabled {
            cursor: default;
        }

        img,
        svg,
        video,
        canvas,
        audio,
        iframe,
        embed,
        object {
            display: block;
            vertical-align: middle;
        }

        img,
        video {
            max-width: 100%;
            height: auto;
        }

        [hidden] {
            display: none;
        }

        *,
        ::before,
        ::after {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }

        ::backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgb(59 130 246 / 0.5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style: ;
        }

        .relative {
            position: relative;
        }

        .left-0 {
            left: 0px;
        }

        .top-0 {
            top: 0px;
        }

        .mx-auto {
            margin-left: auto;
            margin-right: auto;
        }

        .-mt-16 {
            margin-top: -4rem;
        }

        .mt-10 {
            margin-top: 2.5rem;
        }

        .mt-12 {
            margin-top: 3rem;
        }

        .mt-24 {
            margin-top: 6rem;
        }

        .mt-6 {
            margin-top: 1.5rem;
        }

        .mt-8 {
            margin-top: 2rem;
        }

        .flex {
            display: flex;
        }

        .grid {
            display: grid;
        }

        .h-12 {
            height: 3rem;
        }

        .h-28 {
            height: 7rem;
        }

        .h-48 {
            height: 12rem;
        }

        .h-5 {
            height: 1.25rem;
        }

        .h-6 {
            height: 1.5rem;
        }

        .h-8 {
            height: 2rem;
        }

        .w-12 {
            width: 3rem;
        }

        .w-28 {
            width: 7rem;
        }

        .w-5 {
            width: 1.25rem;
        }

        .w-6 {
            width: 1.5rem;
        }

        .w-8 {
            width: 2rem;
        }

        .w-96 {
            width: 24rem;
        }

        .w-full {
            width: 100%;
        }

        .-rotate-180 {
            --tw-rotate: -180deg;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        }

        .grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .flex-col {
            flex-direction: column;
        }

        .items-start {
            align-items: flex-start;
        }

        .items-center {
            align-items: center;
        }

        .justify-center {
            justify-content: center;
        }

        .gap-10 {
            gap: 2.5rem;
        }

        .gap-2 {
            gap: 0.5rem;
        }

        .gap-4 {
            gap: 1rem;
        }

        .gap-5 {
            gap: 1.25rem;
        }

        .rounded-2xl {
            border-radius: 1rem;
        }

        .rounded-lg {
            border-radius: 0.5rem;
        }

        .border {
            border-width: 1px;
        }

        .border-\\[\\#9A9A9A\\] {
            --tw-border-opacity: 1;
            border-color: rgb(154 154 154 / var(--tw-border-opacity));
        }

        .p-3 {
            padding: 0.75rem;
        }

        .px-0 {
            padding-left: 0px;
            padding-right: 0px;
        }

        .px-5 {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
        }

        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .py-5 {
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
        }

        .pt-4 {
            padding-top: 1rem;
        }

        .text-center {
            text-align: center;
        }

        .text-base {
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
        }

        .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }

        .font-medium {
            font-weight: 500;
        }

        .font-semibold {
            font-weight: 600;
        }

        .font-thin {
            font-weight: 100;
        }

        .text-white {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity));
        }

        @media (min-width: 1024px) {
            .lg\\:w-96 {
                width: 24rem;
            }

            .lg\\:px-0 {
                padding-left: 0px;
                padding-right: 0px;
            }
        }
        .image-border {
          border-radius: 10px;
          border:4px solid white;
        }
    </style>
</head>
<script type="text/javascript"  nonce='${nonce}'>
            function download() {
                let content = "${encodeURIComponent(vCardFormattedText)}";
                window.open("data:text/x-vcard;urlencoded," + content)
                setTimeout(() => {
                let e = document.getElementById ('success_msg')
                e.innerText = 'Contact have Been Downloaded Successfully !'
                },100)
            }
</script>
<body>
    <div class="flex flex-col lg:w-96 mx-auto w-full lg:px-0 px-5 py-5">

        <div class="flex flex-col items-center justify-center gap-5 w-full">
            <img src="/logo.svg" alt="logo" class="w-28" />
            <img src="/notch.svg" alt="notch" class="w-full" />
        </div>


        <div style="background: radial-gradient(312.58% 330.45% at -26.02% -180.66%, #D0113A 0%, #2F040D 100%)"
            class="w-full h-48  rounded-2xl relative mt-24">

            <div class="flex flex-col text-center items-center justify-center gap-2 abolute top-0 left-0">

                <img src="${data.image ? data.image :'/avatar.svg'}" alt="avatar" class="w-28 h-28 -mt-16 ${data.image ? 'image-border':''}" />

                <div class="flex flex-col items-center gap-2 pt-4">
                    <p class="text-xl font-medium text-white">${data.name}</p>
                    <p class="text-base text-white font-thin">${data.job || ''}</p>
                    <p class="text-base text-white font-thin">Knight Frank (India) Pvt. Ltd</p>
                </div>

            </div>
        </div>


        <div class="flex flex-col px-6 w-full mt-8">

            <button
             onclick="download()"
                class="w-full border border-[#9A9A9A] text-sm p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <img src="/download.svg" alt="download" class="w-6 h-6" />
                Download Contact
            </button>

            <p  id="success_msg" style="color:green;width:300px;margin:auto;padding-bottom:6px;"> </p>
            <div class="grid grid-cols-4 gap-10 mt-10">

                <div class="flex flex-col gap-2 items-center justify-center text-center">
                    <a  href="tel:${addDialCode(meta.phone)}">  
                    <img src="/call.svg" alt="call" class="w-12 h-12" />
                    </a>
                    <p class="text-sm font-semibold">Call</p>
                </div>
                <div class="flex flex-col gap-2 items-center justify-center text-center">
                   <a href="whatsapp://send?text=Hi There!&phone=${addDialCode(
                      data.phone
                    )}">
                    <img src="/whatsapp.svg" alt="whatsapp.svg" class="w-12 h-12" />
                      </a>
                    <p class="text-sm font-semibold">Whatsapp</p>
                 </div>

                <div class="flex flex-col gap-2 items-center justify-center text-center">
                    <a rel="nofollow" href="mailto:${data.email}">  
                    <img src="/email.svg" alt="email.svg" class="w-12 h-12" />
                    </a>
                    <p class="text-sm font-semibold"> Email </p>
                </div>

                <div class="flex flex-col gap-2 items-center justify-center text-center">
                     <a href="${generateGoogleMapsLink(data.work_location)}">
                    <img src="/locate.svg" alt="locate.svg" class="w-12 h-12" />
                    </a>
                    <p class="text-sm font-semibold">Locate</p>
                </div>

            </div>

            <div class="mt-12 flex flex-col">
                <div class="flex flex-col w-full gap-4">
                    <h2 class="text-base font-semibold">Contact Details</h2>
                    <div class="flex items-center gap-2">
                        <img src="/mail-outlined.svg" alt="mail" class="w-5 h-5" />
                        <p class="font-regular text-sm">
                        <a rel="nofollow" href="mailto:${data.email}">${data.email}</a>
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <img src="/phone-outlined.svg" alt="phone" class="w-5 h-5" />
                        <p class="font-regular text-sm">
                        <a href="tel:${addDialCode(meta.phone)}">${addDialCode(meta.phone)}</a>
                        </p>
                    </div>

                    <div class="flex items-center gap-2">
                        <img src="/url-outlined.svg" alt="url-outlined.svg" class="w-5 h-5" />
                        <p class="font-regular text-sm">
                          <a href="https://www.knightfrank.co.in" target="_blank">https://www.knightfrank.co.in </a>
                        </p>
                    </div>
                </div>

            </div>

            <div class="mt-12 flex flex-col">
                <div class="flex flex-col w-full gap-4">
                    <h2 class="text-base font-semibold">Address</h2>
                    <div class="flex items-start gap-2">
                        <img src="/address-outlined.svg" alt="address-outlined" class="w-5 h-5" />
                        <p class="font-regular text-sm">${data.work_location}</p>
                    </div>

                </div>
            </div>

        </div>

        <div class="mt-10 flex flex-col">
            <img src="/notch.svg" alt="notch" class="w-full -rotate-180" />
        </div>

        <div class="mt-6 flex items-center justify-center gap-4">
            <button>
              <a href="https://www.facebook.com/knightfrankind" target="_blank"> 
                  <img src="/facebook.svg" alt="facebook.svg" class="w-8 h-8" />
              </a>
            </button>
            <button>
              <a href="https://www.instagram.com/knightfrankindia" target="_blank"> 
                  <img src="/instagram.svg" alt="instagram.svg" class="w-8 h-8" />
              </a>
            </button>
            <button>
             <a href="https://www.linkedin.com/company/knight-frank-india" target="_blank"> 
                 <img src="/linkedin.svg" alt="linkedin.svg" class="w-8 h-8" />
              </a>
                
            </button>
            <button>
             <a href="https://twitter.com/KnightFrank_IN" target="_blank"> 
                 <img src="/twitter.svg" alt="twitter.svg" class="w-8 h-8" />
              </a>
            </button>
        </div>
    </div>

</body>
</html>`     
  return html
}

async function base64ToNode(buffer) {
  return buffer.toString("base64");
}

function createSignature(timestamp, secretKey) {
  const message = timestamp + secretKey;
  const signature = crypto.createHash("sha256").update(message).digest("hex");
  return signature;
}

async function getUserCardData(id) {
  const url = new URL(process.env.API_SERVER_URL + "/card-info/" + id);
  const config = {
    headers: {
      timestamp: Date.now(),
      "o-sign": createSignature(Date.now(), process.env.SHARED_SECRET_KEY),
    },
    httpsAgent: agent
  };
  let validate = await axios.get(url, config).then(
    (resp) => {
      return resp.data.data;
    },
    (error) => {
      console.error(error);
      return error.data;
    }
  );
  return validate;
}

async function cardActivityLogEvent(data) {
  const url = new URL(process.env.API_SERVER_URL + "/activity-log");

  const config = {
    headers: {
      timestamp: Date.now(),
      "o-sign": createSignature(Date.now(), process.env.SHARED_SECRET_KEY),
    },
    httpsAgent: agent 
  };
  let validate = await axios.post(url, data, config).then(
    (resp) => {
      return resp.data.data;
    },
    (error) => {
      console.error(error);
      return error.data;
    }
  );
  return validate;
}

function generateSignedUrl(route, request, expiresIn) {
  const signature = crypto
    .createHmac("sha256", process.env.APP_SECRET_KEY)
    .update(route)
    .update(";")
    .update(request.params.id)
    .update(";")
    .update(String(expiresIn))
    .update(process.env.APP_SECRET_SALT)
    .update(";")
    .update(getClientId(request))
    .digest("hex");
  return `/download/${request.params.id}?signature=${signature}&expires=${expiresIn}`;
}

function verifySignedUrl(pathname, signature, expiresIn, request) {
  const now = Date.now();
  if (Number(expiresIn) < now) {
    return false;
  }
  // Create a HMAC-SHA256 signature.
  const expectedSignature = crypto
    .createHmac("sha256", process.env.APP_SECRET_KEY)
    .update(pathname)
    .update(";")
    .update(request.params.id)
    .update(";")
    .update(String(expiresIn))
    .update(process.env.APP_SECRET_SALT)
    .update(";")
    .update(getClientId(request))
    .digest("hex");
  if (signature === expectedSignature) {
    return true;
  }

  return false;
}

function getClientId(req) {
  return crypto
    .createHash("sha256")
    .update(
      (req.headers["sourceip"] || req.ip) +
        (req.headers["useragentsource"] || req.headers["user-agent"])
    )
    .digest("hex");
}
function extractMimeType(base64String) {
    const match = base64String.match(/^data:(.*);base64,/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }
  
  function extractBase64Data(dataUrl) {
    const base64Data = dataUrl.split(';base64,')[1];
    if (base64Data) {
      return base64Data;
    } else {
      console.error("Invalid data URL format.");
      return null;
    }
  }

module.exports = {
  renderHTML,
  renderProfileMissingHTML,
  base64ToNode,
  getUserCardData,
  addDialCode,
  cardActivityLogEvent,
  generateSignedUrl,
  verifySignedUrl,
  extractMimeType,
  extractBase64Data
};
