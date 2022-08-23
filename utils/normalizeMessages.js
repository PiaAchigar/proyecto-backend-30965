const { schema, normalize } = require("normalizr");
const print = require("./print");

function normalizeMessages(messages) {
  const authorSchema = new schema.Entity("author");
  const messageSchema = new schema.Entity(
    "messages",
    {
      author: authorSchema,
    },
    { idAttribute: "time" }
  );

  const fileSchema = new schema.Entity("file", {
    messages: [messageSchema],
  });

  const normalizedData = normalize(messages, fileSchema);
  print(normalizedData);
  return normalizedData;
}

module.exports = normalizeMessages;
