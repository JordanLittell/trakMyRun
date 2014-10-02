CREATE UNIQUE INDEX  "index_users_on_username" ON "users"  ("username");
INSERT INTO schema_migrations (version) VALUES (20140925012759);
