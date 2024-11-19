import { v4 as uuidv4 } from "uuid";
import conn from "../../config/db.js";
import undefinedValidator from '../../utils/undefinedValidator.js'

const pool = await conn();

const createPressRelease = async (req) => {
  const {
    title,
    content,
    author,
    authorPosition,
  } = req.body || {}

  const pressReleaseId = uuidv4()
  const thumbnail = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0].path : null;

  const pressReleaseQuery = `
  INSERT INTO press_release (pressReleaseId, title, thumbnail, content, author, authorPosition)
  VALUES (?, ?, ?, ?, ?, ?)
  `

  try {
    await pool.query(pressReleaseQuery, [pressReleaseId, title, thumbnail, content, author, authorPosition])
    return `[Press Release] successfully created.`
  } catch (error) {
    console.eror(`Error Occured: `, error?.message);
    throw new Error(error?.message)
  }

};

const getAllPressRelease = async () => {
  const pressReleaseQuery = `
    SELECT *  FROM press_release 
    `;

  try {
    const [pressReleases] = await pool.query(pressReleaseQuery);

    return pressReleases;
  } catch (error) {
    console.error('[Get All Press Releases Error]:', error.message);
    throw new Error('[Get All Press Releases] Failed to fetch press releases.');
  }
};

const getPressReleaseById = async (pressReleaseId) => {
  const pressReleaseQuery = `
    SELECT
      pressReleaseId,
      title,
      thumbnail,
      content,
      author,
      authorPosition
    FROM press_release
    WHERE pressReleaseId = ?
  `;

  try {
    const [pressRelease] = await pool.query(pressReleaseQuery, [pressReleaseId]);

    if (pressRelease.length === 0) {
      throw new Error('Press release not found.')
    }

    return pressRelease[0];
  } catch (error) {
    console.error('[Get Press Release by ID Error]:', error.message);
    throw new Error('[Get Press Release by ID] Failed to fetch the press release.');
  }
};

const deletePressRelease = async (pressReleaseId) => {
  const pressRelease = await getPressReleaseById(pressReleaseId);

  if (pressRelease === 'Press release not found.') {
    throw new Error('Press release not found. Cannot delete.');
  }

  const deleteQuery = `
    DELETE FROM press_release
    WHERE pressReleaseId = ?
  `;

  try {
    const [result] = await pool.query(deleteQuery, [pressReleaseId]);

    if (result.affectedRows === 0) {
      throw new Error('Failed to delete the press release.');
    }

    return `[Press Release] successfully deleted.`;
  } catch (error) {
    console.error('[Delete Press Release Error]:', error.message);
    throw new Error('[Delete Press Release] Failed to delete the press release.');
  }
};

const editPressRelease = async (pressReleaseId, req) => {
  const pressRelease = await getPressReleaseById(pressReleaseId);
  const payload = req.body;

  if (pressRelease === 'Press release not found.') {
    throw new Error('Press release not found. Cannot edit.');
  }

  const title = undefinedValidator(pressRelease.title, payload.title);
  const content = undefinedValidator(pressRelease.content, payload.content);
  const author = undefinedValidator(pressRelease.author, payload.author);
  const authorPosition = undefinedValidator(pressRelease.authorPosition, payload.authorPosition);

  let thumbnail = pressRelease.thumbnail;
  if (req.files && req.files['thumbnail']) {
    thumbnail = req.files['thumbnail'][0].path;
  }

  const updateQuery = `
    UPDATE press_release
    SET title = ?, content = ?, author = ?, authorPosition = ?, thumbnail = ?
    WHERE pressReleaseId = ?
  `;

  try {
    const [result] = await pool.query(updateQuery, [title, content, author, authorPosition, thumbnail, pressReleaseId]);

    if (result.affectedRows === 0) {
      throw new Error('Failed to update the press release.');
    }

    return `[Press Release] successfully updated.`;
  } catch (error) {
    console.error('[Edit Press Release Error]:', error.message);
    throw new Error('[Edit Press Release] Failed to edit the press release.');
  }
};

export default {
  createPressRelease,
  getAllPressRelease,
  getPressReleaseById,
  deletePressRelease,
  editPressRelease
}