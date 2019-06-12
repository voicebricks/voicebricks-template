# voicebricks-template
Get your voice app started with this template:

1. Install this repository locally
2. Run `npm install`
3. Set up your MongoDB database. You'll need two collections, `apps`, `users` and `messages`. Messages may not be required depending on if the code is left as-is or if it is modified.
4. Create a `.env` file in the root containing your `MONGO_DSN` connection string.
5. Set up a new Dialogflow agent and Google Project. Update service account role to Dialogflow API Admin. Create a new private key for the service account, download as json and save as `/credentials/google.json`. This will allow automatic upload to DialogFlow of the app intents and entities.
6. If required, set up a tunnel with a tool such as ngrok and make note of the public URL to use as fulfillmentURL in the following step.
7. Update `config/main.json`
8. Update the code as required.
9. In the console, run `npm run generate`. This will upload the intents and entity definitions and begin training the DialogFlow agent. 
10. Copy the contents of `exports/alexa/alexa.json` to the JSON editor in the Alexa skill builder and start the build manually.

If you don't remove all the usages of `session.messages` you will need to 
  * add a document to the `apps` collection with the following schema:
      name: string
      skillId: string (taken from the Alexa development console)
      googleProjectId: string (from the Actions on Google developer console)
  * add data to the `messages` collection with the following schema:
      appId: string (the `_id` of the app created in hte previous step)
      key: string (requires messages for the following keys - welcome, mission, specials, phone, website, location)
      message: string

11. Run `npm run dev` and start testing!
