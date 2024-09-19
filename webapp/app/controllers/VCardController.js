"use strict";
const { validate: uuidValidate } = require("uuid");
const {
  renderProfileMissingHTML,
  renderHTML,
  renderHTML2,
  getUserCardData,
  addDialCode,
  cardActivityLogEvent,
  generateSignedUrl,
  verifySignedUrl,
} = require("../helpers/VCardGeneration");
const vCardJS = require("../VCard");
class VCardController {
  /**
   * Validate the Card URL
   *
   * @param object request
   * @param object response
   *
   * @return
   */
  static async validate(request, response) {
    try {
      if (!uuidValidate(request.params.id)) {
        let html = renderProfileMissingHTML();
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Profile seems missing or Provided link is invalid"
        );
        return response.send(html);
      }
      let employee = await getUserCardData(request.params.id);
      if (!employee) {
        let html = renderProfileMissingHTML();
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Profile seems missing or Provided link is invalid"
        );
        return response.send(html);
      }
      var now = new Date();
      const expiresIn = now.setMinutes(now.getMinutes() + 10); // 10 minutes

      const url = generateSignedUrl(
        "/download/" + request.params.id,
        request,
        expiresIn
      );
      return response.redirect(url);
    } catch (exception) {
      console.log(exception);
      let html = renderProfileMissingHTML();
      html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
      html = html.replace(
        "[ERROR_MESSAGE]",
        "Profile seems missing or Provided link is invalid"
      );
      return response.send(html);
    }
  }

  /**
   * Validate the Card URL
   *
   * @param object request
   * @param object response
   *
   * @return
   */
  static async download(request, response) {
    try {
      let html = renderProfileMissingHTML();
      if (!uuidValidate(request.params.id)) {
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Profile seems missing or Provided link is invalid"
        );
        return response.send(html);
      }

      if (
        !verifySignedUrl(
          request.path,
          request.query.signature,
          request.query.expires,
          request
        )
      ) {
        let html = renderProfileMissingHTML();
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Provided link is invalid or expired!."
        );
        return response.send(html);
      }

      let employee = await getUserCardData(request.params.id);
      if (!employee) {
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Profile seems missing or Provided link is invalid"
        );
        return response.send(html);
      }

      const vCard = vCardJS();
      const data = employee;
      vCard["firstName"] = data.name;
      vCard["organization"] = "Knight Frank (India) Pvt. Ltd";
      vCard["title"] = `${data.designation}  ${data.department}`;
      vCard["workEmail"] = [data.email];
      let phones = [addDialCode(data.phone)];
      vCard["workPhone"] = phones;
      vCard["url"] = ["https://www.knightfrank.co.in"];
      let addressObj = {
        label: "Work",
        street:  data.work_location,
        city: "",
        stateProvince: "",
        postalCode: "",
        countryRegion: "India",
      };
      vCard["workAddress"] = [addressObj];

        if (data.image_base64) {
          let url = extractBase64Data(data.image_base64)
          let type = extractMimeType(data.image_base64)
          vCard.photo.embedFromString(url, type);
        }

      html = renderHTML(data, vCard.getFormattedString(),response.locals.nonce)
      await cardActivityLogEvent({
        card_id: request.params.id,
        action: "CARD_SHARED",
        message: "Details shared on card tap",
      });
      return response.send(html);
    } catch (exception) {
      console.log(exception);
      let html = renderProfileMissingHTML();
      html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
      html = html.replace(
        "[ERROR_MESSAGE]",
        "Profile seems missing or provided link is invalid"
      );
      return response.send(html);
    }
  }

  /**
   * Download log event
   *
   * @param object request
   * @param object response
   *
   * @return
   */
  static async logEvent(request, response) {
    try {
      let html = renderProfileMissingHTML();
      if (!uuidValidate(request.params.id)) {
        html = html.replace("[ERROR_TITLE]", "Uh Ooh! sorry!");
        html = html.replace(
          "[ERROR_MESSAGE]",
          "Profile seems missing or Provided link is invalid"
        );
        return response.send(html);
      }
      await cardActivityLogEvent({
        card_id: request.params.id,
        action: "CONTACT_DOWNLOADED",
        message: "Contact details Download on save button clicked",
      });
      return response.send("OK");
    } catch (exception) {
      return response.send("OK");
    }
  }
}

module.exports = VCardController;
