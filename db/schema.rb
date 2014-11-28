# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141128174844) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "activity", force: true do |t|
    t.integer  "user_id"
    t.string   "type"
    t.integer  "hours"
    t.integer  "minutes"
    t.integer  "seconds"
    t.integer  "calories"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activity", ["user_id"], name: "index_activity_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id",    null: false
    t.text     "content",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "post_id"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "delayed_jobs", force: true do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "maps", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.text     "path"
    t.string   "total_miles"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.hstore   "latLn"
    t.text     "elevations"
    t.text     "markers"
    t.decimal  "elevation_gain"
  end

  add_index "maps", ["user_id"], name: "index_maps_on_user_id", using: :btree

  create_table "posts", force: true do |t|
    t.integer  "user_id"
    t.string   "workout_type"
    t.integer  "minutes"
    t.integer  "calories"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "heart_rate"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "age"
    t.integer  "weight"
    t.integer  "height"
    t.string   "gender"
    t.string   "image_url"
    t.string   "state"
    t.string   "city"
    t.string   "zipcode"
    t.string   "phone_number"
    t.string   "email"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
