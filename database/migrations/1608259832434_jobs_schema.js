"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class JobsSchema extends Schema {
  up() {
    this.create("jobs", (table) => {
      table.increments();
      table.string("position");
      table.string("role");
      table.string("level");
      table.string("contract");
      table.string("location");
      table.string("languages");
      table.string("user_name");
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("jobs");
  }
}

module.exports = JobsSchema;
