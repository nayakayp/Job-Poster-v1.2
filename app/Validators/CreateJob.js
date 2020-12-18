"use strict";

class CreateJob {
  get rules() {
    return {
      position: "required",
      role: "required",
      level: "required",
      contract: "required",
      location: "required",
      languages: "required",
    };
  }
  get messages() {
    return {
      required: "Hold up, the {{ field }} is required.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = CreateJob;
