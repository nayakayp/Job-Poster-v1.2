"use strict";

const Job = use("App/Models/Job");

class JobController {
  async home({ view }) {
    // Fetch a job
    const jobs = await Job.all();

    return view.render("index", { jobs: jobs.toJSON() });
  }
  async userIndex({ view, auth }) {
    // Fetch all user's jobs
    const jobs = await auth.user.jobs().fetch();

    return view.render("jobs", { jobs: jobs.toJSON() });
  }

  async create({ request, response, session, auth }) {
    const job = request.all();

    const posted = await auth.user.jobs().create({
      position: job.position,
      role: job.role,
      level: job.level,
      contract: job.contract,
      location: job.location,
      languages: job.languages,
      user_name: auth.user.$originalAttributes.username,
    });
    session.flash({ message: "Your job has been posted!" });
    return response.redirect("back");
  }

  async delete({ response, session, params }) {
    const job = await Job.find(params.id);

    await job.delete();
    session.flash({ message: "Your job has been removed" });
    return response.redirect("back");
  }

  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render("edit", { job: job });
  }

  async update({ response, request, session, params }) {
    const job = await Job.find(params.id);
    job.position = request.all().position;
    job.role = request.all().role;
    job.level = request.all().level;
    job.contract = request.all().contract;
    job.location = request.all().location;
    job.languages = request.all().languages;

    await job.save();

    session.flash({ message: "Your job has been updated. " });
    return response.redirect("/post-a-job");
  }
}

module.exports = JobController;
