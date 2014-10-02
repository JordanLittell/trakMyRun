CREATE TABLE "users" ("id" serial primary key, "username" character varying(255) NOT NULL, "password_digest" character varying(255) NOT NULL, "session_token" character varying(255) NOT NULL, "created_at" timestamp, "updated_at" timestamp) ;
INSERT INTO schema_migrations (version) VALUES (20140923050355);
