import { randomUUID } from "crypto";
import { PutCommand, QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../config/db.js";

export const createPrediction = async (req, res) => {
  console.log("IN");
  try {
    const { userId, modelType, input } = req.body;

    if (!userId || !modelType || !input) {
      return res.status(400).json({
        error: "userId, modelType, and input are required",
      });
    }

    const predictionId = randomUUID();
    const createdAt = Date.now();

    const gsi1pk = userId;
    const gsi1sk = `${modelType}#${createdAt}`;

    const output = "stubbed result string";

    await ddb.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
          userId,
          predictionId,
          modelType,
          createdAt,
          gsi1pk,
          gsi1sk,
          input,
          output,
        },
        ConditionExpression:
          "attribute_not_exists(userId) AND attribute_not_exists(predictionId)",
      })
    );

    // Success response
    res.status(201).json({
      userId,
      predictionId,
      output,
      createdAt,
    });
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return res.status(409).json({
        error: "Duplicate predictionId detected",
      });
    }
    console.error("Error creating prediction:", err);
    res.status(500).json({ error: "Failed to create prediction" });
  }
};


export const getPredictionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { modelType, limit = 20 } = req.query;

    let out;

    if (modelType) {
      out = await ddb.send(
        new QueryCommand({
          TableName: process.env.TABLE_NAME,
          IndexName: "GSI1",
          KeyConditionExpression: "gsi1pk = :u AND begins_with(gsi1sk, :m)",
          ExpressionAttributeValues: {
            ":u": userId,
            ":m": `${modelType}#`,
          },
          ScanIndexForward: false, // newest first
          Limit: Number(limit),
        })
      );
    } else {
      // Query directly by userId (PK)
      out = await ddb.send(
        new QueryCommand({
          TableName: process.env.TABLE_NAME,
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": userId,
          },
          ScanIndexForward: false,
          Limit: Number(limit),
        })
      );
    }

    return res.json(out.Items ?? []);
  } catch (err) {
    console.error("Error fetching predictions:", err);
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
};

// Fetch a single prediction by userId + predictionId
export const getPredictionById = async (req, res) => {
  try {
    const { userId, predictionId } = req.params;

    const out = await ddb.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { userId, predictionId },
      })
    );

    if (!out.Item) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(out.Item);
  } catch (err) {
    console.error("Error fetching prediction by ID:", err);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
};