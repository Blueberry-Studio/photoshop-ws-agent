const { app, core } = require("photoshop");

export default (text: string) => {
  const kind = app.activeDocument.layers[0].kind;
  console.log(app.activeDocument.layers[0]);

  core.executeAsModal(
    () => {
      app.activeDocument.layers[0].textItem.contents = text;
      console.log("[WS Agent] Running modal command...");
    },
    { commandName: "TestModal" }
  );
};
