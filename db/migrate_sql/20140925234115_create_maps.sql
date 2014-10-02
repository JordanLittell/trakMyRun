CREATE TABLE "maps" ("id" serial primary key, "user_id" integer, "name" character varying(255), "path" text, "total_miles" character varying(255), "created_at" timestamp, "updated_at" timestamp) ;
CREATE  INDEX  "index_maps_on_user_id" ON "maps"  ("user_id");
INSERT INTO schema_migrations (version) VALUES (20140925234115);
