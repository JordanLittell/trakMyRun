ALTER TABLE "users" ADD COLUMN "age" integer;
ALTER TABLE "users" ADD COLUMN "weight" integer;
ALTER TABLE "users" ADD COLUMN "height" integer;
ALTER TABLE "users" ADD COLUMN "gender" character varying(255);
INSERT INTO schema_migrations (version) VALUES (20140924200508);
