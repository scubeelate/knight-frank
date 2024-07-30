"use strict";
const axios = require("axios");
const crypto = require("crypto");

function addDialCode(phoneNumber) {
  const regex = /^\+91/;
  // Check if the phone number already has the dial code
  if (!regex.test(phoneNumber)) {
    // Add the dial code if not present
    phoneNumber = "+91" + phoneNumber;
  }
  return phoneNumber;
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
                            <img src='/images/logo.svg' alt="Logo">
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
    image: response.image || '',
    name: `${meta.name}`,
    job: meta.designation,
    bio:'',
    title: meta.department,
    ...meta
  }
  let html   = `
  <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> ${response.name} | ${response.designation}</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
    <style type="text/css">
    body {
        font-family: 'Open Sans', sans-serif;
        padding: 0;
        margin: 0;
    }

    .section-view {
        max-width: 350px;
        margin: 0 auto;
    }

    .logo-view {
        text-align: center;
        background-color: #000;
        color: #fff;
        padding: 4px;
    }

    .content-view {
        background-color: #000;
        color: #fff;
        padding: 10px;
        margin-top: 14px;
    }

    ul {
        list-style: none;
        color: #e2e2e2;
    }

    .name-font li {
        font-weight: 700;
        color: #fff;
    }

    .contact-view li:nth-child(1) {
        font-weight: 700;
        color: #fff;
    }

       .contact-view li:nth-child(2) {
        padding-top: 6px;
    }
    .font-md{
        font-size:1rem;
        line-height: 20px;
    }
    .font-lg{
        font-size: 1.25rem;
    }
    .font-sm{
        font-size:0.875rem;
        line-height: 20px;
    }
    .desination-view{
        line-height: 20px;
    }
    .button-view {
        margin: 38px 0;
    }

    .button-view li div {
        background-color: #d0103a;
        color: #fff;
        padding: 10px 30px;
    }
    .download-btn {
        cursor: pointer;
        text-align:center;
    }
     ul{
        padding: 0 30px;
        margin:14px 0;
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


    <header class="logo-view">
        <!--  <img style="width:200px" class="m-auto " src='/logo.svg' alt="Logo"> -->
        <strong> Knight Frank </strong>
    </header>
    <section class="section-view">
       
        <div class="content-view">
            <ul class="name-font font-lg">
                <li>${data.name}</li>
            </ul>
            <ul class="desination-view">
                <li class="font-md">${data.job || ''}</li>
                <li class="font-md">${data.title || ''}</li>
            </ul>
            <ul class="font-sm">
                <li>Mobile: ${ meta.phone}</li>
                <li>${ meta.email}</li>
                <li>www.knightfrank.com</li>
            </ul>
            <ul class="contact-view">
                <li class="font-lg">Knight Frank (India) Pvt. Ltd</li>`

                let address = data.work_location.split(',')
                for(let add of address){
                    html += ` <li>${add}</li>`
                }
                
           html+= `</ul>
            <ul class="button-view">
                <li><div onclick="download()" class="download-btn">Download Contact Card</div></li>
            </ul>
            <p  id="success_msg" style="color:green;width:300px;margin:auto;padding-bottom:6px;"> </p>
        </div>
    </section>
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
  return `/profile/download/${request.params.id}?signature=${signature}&expires=${expiresIn}`;
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

module.exports = {
  renderHTML,
  renderProfileMissingHTML,
  base64ToNode,
  getUserCardData,
  addDialCode,
  cardActivityLogEvent,
  generateSignedUrl,
  verifySignedUrl,
};
