const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'bunpanel.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }

  db.run(
    "UPDATE users SET role = 'admin' WHERE email = 'abubakarbinadnan1@gmail.com'",
    function(err) {
      if (err) {
        console.error('Error updating user:', err);
      } else {
        console.log(`Admin role granted to abubakarbinadnan1@gmail.com`);
      }
      db.close();
      process.exit(0);
    }
  );
});
