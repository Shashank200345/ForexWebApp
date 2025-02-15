import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import SignalSubscription from '../models/SignalSubscription';

export const createSignalSubscription = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, phone, country, signalPackId, signalPackTitle, price } = req.body;

    // Create new signal subscription
    const subscription = new SignalSubscription({
      name,
      email,
      phone,
      country,
      signalPackId,
      signalPackTitle,
      price
    });

    // Save subscription to database
    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Signal pack subscription submitted successfully',
      data: subscription
    });
  } catch (error) {
    console.error('Error in createSignalSubscription:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting signal pack subscription',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getSignalSubscriptions = async (_req: Request, res: Response) => {
  try {
    const subscriptions = await SignalSubscription.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Error in getSignalSubscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching signal subscriptions',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}; 