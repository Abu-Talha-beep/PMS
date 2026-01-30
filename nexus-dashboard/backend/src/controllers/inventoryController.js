import { inventoryService } from '../services/inventoryService.js';

export const getInventory = async (req, res, next) => {
  try {
    const items = await inventoryService.getAllInventory(req.query);

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInventoryById = async (req, res, next) => {
  try {
    const item = await inventoryService.getInventoryById(req.params.id);

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const createInventory = async (req, res, next) => {
  try {
    const item = await inventoryService.createInventory(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInventory = async (req, res, next) => {
  try {
    const item = await inventoryService.updateInventory(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInventory = async (req, res, next) => {
  try {
    await inventoryService.deleteInventory(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Inventory item deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLowStockItems = async (req, res, next) => {
  try {
    const items = await inventoryService.getLowStockItems();

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInventoryStats = async (req, res, next) => {
  try {
    const stats = await inventoryService.getInventoryStats();

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
