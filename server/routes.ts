import type { Express } from "express";
import { db } from "../db";
import { contacts, insertContactSchema } from "../db/schema";

export function registerRoutes(app: Express) {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: result.error.issues.map(i => i.message)
        });
      }

      const contact = await db.insert(contacts).values(result.data).returning();
      
      return res.status(200).json({
        message: "Contact form submitted successfully",
        contact: contact[0]
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: "Failed to submit contact form"
      });
    }
  });
}
