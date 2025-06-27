# Simple notes app

A template to create a monorepo SST v3 project. [Learn more](https://sst.dev/docs/set-up-a-monorepo).

## Test it end to end

1. Run `npx sst dev` to start the app.
2. Copy output variables to the clipboard.
3. Run `./scripts/varsFromClipboard.sh` to set the environment variables.
4. Run `export username=email@domain.com` to set the username.
5. Run `export password=your.complex.password.123` to set the password.
6. Run `scripts/userLogin.sh` to log in.
7. Run `scripts/userSignup.sh` to sign up a new user.
8. Run `scripts/addNote.sh` to create a new note.
9. Run `scripts/listNotes.sh` to get all notes.

## Delete the app

Run `npx sst remove` to delete the app.
