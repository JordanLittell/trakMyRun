CREATE TABLE "comments" ("id" serial primary key, "user_id" integer NOT NULL, "content" text NOT NULL, "created_at" timestamp, "updated_at" timestamp) ;
CREATE  INDEX  "index_comments_on_user_id" ON "comments"  ("user_id");
INSERT INTO schema_migrations (version) VALUES (20140925005459);
