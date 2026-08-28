-- A little starter content so the API returns data on a fresh database.
-- The admin panel (Phase 2) will manage rows from here on.

INSERT INTO messages (id, title, author, category, description, tags, cover_image, estimated_reading_time, published_at, content)
VALUES
  ('do-no-aggrieve', 'Do Not Aggrieve the Holy Spirit', 'Holy Archangel Sheila', 'Christian Living',
   'A prophetic word on silence and subordination, the Blood and the mercy of God, and the account each of us must give before the Government of Heaven.',
   '["holy spirit","prophecy","subordination","accountability"]', '/holy-spirit-cover.png', '10 min read', '2024-05-18',
   'If what you have to say is not of good and noble purpose, then keep silent.');

INSERT INTO messages (id, title, author, category, description, tags, cover_image, estimated_reading_time, published_at, chapters)
VALUES
  ('destiny-angels', 'Destiny Angels', 'Holy Archangel Sheila', 'Faith',
   'A prophetic word on the record-keeping angels of destiny, the war with Lucifer, and the coming Book of the Joyful Constellations.',
   '["angels","destiny","prophecy","obedience"]', '/destiny-angels-cover.png', '13 min read', '2024-05-12',
   '[{"id":"record-angels","title":"Destiny Angels Are Record Angels","content":"Your guardian Angel will never let go."}]');

INSERT INTO events (id, title, category, time, location, description, weekday)
VALUES
  ('weekly-prayer', 'Weekly Prayer Meeting', 'Prayer', '6:00 AM', 'New Jerusalem Prayer Hall, Enugu',
   'Our weekly gathering for prayer and intercession, held every Saturday morning.', 6);

INSERT INTO events (id, title, category, time, location, description, start_date, end_date)
VALUES
  ('november-novena', 'November Novena', 'Novena', '6:00 AM', 'New Jerusalem Prayer Hall, Enugu',
   'The biannual novena: nine days of prayer from the 1st to the 9th of November.', '2026-11-01', '2026-11-09');
