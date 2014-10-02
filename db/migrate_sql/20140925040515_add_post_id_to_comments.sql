ALTER TABLE "comments" ADD COLUMN "post_id" integer;
CREATE  INDEX  "index_comments_on_post_id" ON "comments"  ("post_id");
INSERT INTO schema_migrations (version) VALUES (20140925040515);
