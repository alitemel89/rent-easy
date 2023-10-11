import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RentalModel } from "../models/Rental"; // Adjust the path as needed

// Create a new rental listing
export const createRental = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, price, bedrooms, bathrooms, location } =
      req.body;

    const rental = new RentalModel({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      location,
    });

    await rental.save();

    res.status(201).json(rental);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update a rental listing by ID
export const updateRental = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rental = await RentalModel.findById(id);

    if (!rental) {
      return res.status(404).json({ msg: "Rental listing not found" });
    }

    // Update rental properties as needed
    rental.title = req.body.title;
    rental.description = req.body.description;
    rental.price = req.body.price;
    rental.bedrooms = req.body.bedrooms;
    rental.bathrooms = req.body.bathrooms;
    rental.location = req.body.location;

    await rental.save();

    res.json(rental);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const deleteRental = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rental = await RentalModel.findById(id);

    if (!rental) {
      return res.status(404).json({ msg: "Rental listing not found" });
    }

    // Use .deleteOne() on the model to delete the document by ID
    await RentalModel.deleteOne({ _id: id });

    res.json({ msg: "Rental listing removed" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all rental listings
export const getRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await RentalModel.find(); // Use your model to fetch all rental listings

    res.json(rentals);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
