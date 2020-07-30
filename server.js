import express from "express";
import cors from "cors";
import aws from "aws-sdk";

import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sms", async (request, response) => {
  const { cellphone } = request.body;

  if (!cellphone)
    return response
      .status(401)
      .json({ message: "Informe o telefone celular." });

  const sns = new aws.SNS();

  let params = {
    Message: "Hello world!",
    PhoneNumber: cellphone,
  };

  try {
    await sns.publish(params).promise();
  } catch (error) {
    return response.status(401).json({ message: error.stack });
  }

  return response.status(200).json({ message: "A mensagem foi enviada" });
});

app.listen(3000);
