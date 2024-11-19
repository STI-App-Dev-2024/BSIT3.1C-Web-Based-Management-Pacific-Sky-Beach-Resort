import expressAsync from "express-async-handler";
import pressReleaseService from "../../services/press-release/pressReleaseService.js";

const createPressRelease = expressAsync(async (req, res, next) => {
  try {
    const response = await pressReleaseService.createPressRelease(req);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPressRelease = expressAsync(async (req, res, next) => {
  try {
    const response = await pressReleaseService.getAllPressRelease();
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const getPressReleaseById = expressAsync(async (req, res, next) => {
  try {
    const response = await pressReleaseService.getPressReleaseById(req.params.pressReleaseId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePressRelease = expressAsync(async (req, res, next) => {
  try {
    const response = await pressReleaseService.deletePressRelease(req.params.pressReleaseId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const editPressRelease = expressAsync(async (req, res, next) => {
  try {
    const response = await pressReleaseService.editPressRelease(req.params.pressReleaseId, req);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  createPressRelease,
  getAllPressRelease,
  getPressReleaseById,
  deletePressRelease,
  editPressRelease
}