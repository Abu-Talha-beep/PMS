import { purchaseBillService } from '../services/purchaseBillService.js';

export const getAllBills = async (req, res, next) => {
  try {
    const bills = await purchaseBillService.getAllBills(req.query);

    res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBillById = async (req, res, next) => {
  try {
    const bill = await purchaseBillService.getBillById(req.params.id);

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBill = async (req, res, next) => {
  try {
    const bill = await purchaseBillService.createBill(req.body);

    res.status(201).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBill = async (req, res, next) => {
  try {
    const bill = await purchaseBillService.updateBill(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    await purchaseBillService.deleteBill(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Purchase bill deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBillStats = async (req, res, next) => {
  try {
    const stats = await purchaseBillService.getBillStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
