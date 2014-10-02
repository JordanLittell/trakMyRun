CREATE TABLE "posts" ("id" serial primary key, "user_id" integer, "type" character varying(255), "hours" integer, "minutes" integer, "seconds" integer, "calories" integer, "created_at" timestamp, "updated_at" timestamp) ;
CREATE  INDEX  "index_posts_on_user_id" ON "posts"  ("user_id");
INSERT INTO schema_migrations (version) VALUES (20140924055156);
