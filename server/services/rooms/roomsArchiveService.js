import conn from "../../config/db.js";
import _ from "lodash";

const pool = await conn();

const getAllRoomsArchive = async () => {
    try {
        const roomsQuery = `
      SELECT r.roomId, r.roomName, r.userId, r.capacity, r.price, r.thumbnail, r.isOccupied
      FROM roomsArchive r
    `;
    
        const [rooms] = await pool.query(roomsQuery);
    
        const picturesQuery = `
      SELECT picture FROM roomsPicturesArchive WHERE roomId = ?
    `;
    
        const __rooms = await Promise.all(rooms.map(async (room) => {
          const [pictures] = await pool.query(picturesQuery, [room.roomId]);
    
          return {
            ...room,
            pictures: pictures.map(picture => picture.picture),
          };
        }));
    
        return __rooms;
      } catch (error) {
        throw new Error(error)
      }
}

const getSingleRoomArchiveById = async (roomId) => {
    try {
        const roomQuery = `
          SELECT *
          FROM roomsArchive
          WHERE roomId = ?
        `;
    
        const [room] = await pool.query(roomQuery, [roomId]);
    
        if (!room.length) {
          throw new Error('Room not found');
        }
    
        const bedQuery = `
          SELECT bedType, count FROM roombedArchive WHERE roomId = ?
        `;
    
        const [bedDetails] = await pool.query(bedQuery, [roomId]);
    
        const bathroomQuery = `
          SELECT bathRoomType, count FROM roomBathroomArchive WHERE roomId = ?
        `;
    
        const [bathroomDetails] = await pool.query(bathroomQuery, [roomId]);
    
        const picturesQuery = `
          SELECT picture FROM roomsPicturesArchive WHERE roomId = ?
        `;
    
        const [pictures] = await pool.query(picturesQuery, [roomId]);
    
        // Extract amenities from the room data
        const amenities = {
          hasWifi: !!room[0].hasWifi,
          hasKitchen: !!room[0].hasKitchen,
          hasTV: !!room[0].hasTV,
          hasShower: !!room[0].hasShower,
          hasAircon: !!room[0].hasAircon,
          hasGrill: !!room[0].hasGrill,
          hasRefrigerator: !!room[0].hasRefrigerator,
          hasHeater: !!room[0].hasHeater,
        };
    
        return {
          ...room[0],
          bedDetails,
          bathroomDetails,
          pictures: pictures.map(picture => picture.picture),
          amenities,
        };
      } catch (error) {
        throw new Error(error.message);
      }

}    

const deleteRoomArchive = async (roomId) => {
    try {
      await pool.query('START TRANSACTION');
  
      const deleteRoomBedQuery = `DELETE FROM roomBedArchive WHERE roomId = ?`;
      await pool.query(deleteRoomBedQuery, [roomId]);
  
      const deleteRoomBathroomQuery = `DELETE FROM roomBathroomArchive WHERE roomId = ?`;
      await pool.query(deleteRoomBathroomQuery, [roomId]);
  
      const deleteRoomPicturesQuery = `DELETE FROM roomsPicturesArchive WHERE roomId = ?`;
      await pool.query(deleteRoomPicturesQuery, [roomId]);
  
      const deleteRoomQuery = `DELETE FROM roomsArchive WHERE roomId = ?`;
      await pool.query(deleteRoomQuery, [roomId]);
  
      await pool.query('COMMIT');
  
      return 'Room deleted successfully'
    } catch (error) {
      await pool.query('ROLLBACK');
      throw new Error('Error deleting room:', error);
    }
};

const restoreRoom = async(roomId) => {
    try {
        await pool.query('START TRANSACTION');
        const room = await getSingleRoomArchiveById(roomId);
    
        const roomValues = [
          room.roomId,
          room.userId,
          room.roomName,
          room.capacity,
          room.roomType,
          room.price,
          room.thumbnail,
          room.isOccupied,
          room.description,
          room.hasWifi,
          room.hasKitchen,
          room.hasTV,
          room.hasShower,
          room.hasAircon,
          room.hasGrill,
          room.hasRefrigerator,
          room.hasHeater,
        ];
    
        const archiveRoomQuery = `
        INSERT INTO rooms(
            roomId, userId, roomName, capacity, roomType, price, thumbnail, isOccupied, description,
            hasWifi, hasKitchen, hasTV, hasShower, hasAircon, hasGrill, hasRefrigerator, hasHeater
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        await pool.query(archiveRoomQuery, roomValues);
    
        const bedQuery = `
          SELECT * FROM roombedArchive WHERE roomId = ?
        `;
    
        const [bedDetails] = await pool.query(bedQuery, [roomId]);
    
        const archiveBedQuery = `
          INSERT INTO roomBed(roomId, bedType, count) VALUES (?, ?, ?)
        `;
    
        for (const bed of bedDetails) {
          const {roomId, bedType, count} = bed;
          await pool.query(archiveBedQuery, [roomId, bedType, count]);
        }
        
        const bathroomQuery = `
        SELECT * FROM roomBathroomArchive WHERE roomId = ?
      `;
    
        const [bathroomDetails] = await pool.query(bathroomQuery, [roomId]);
    
        const archiveBathroomQuery = `
          INSERT INTO roomBathroom(roomId, bathRoomType, count) VALUES (?, ?, ?)
        `;
    
        for (const bathroom of bathroomDetails) {
          const {roomId, bathRoomType, count} = bathroom;
          await pool.query(archiveBathroomQuery, [roomId, bathRoomType, count]);
        }
    
        const picturesQuery = `
          SELECT picture FROM roomsPicturesArchive WHERE roomId = ?
        `;
    
        const [pictures] = await pool.query(picturesQuery, [roomId]);
    
        const archivePicturesQuery = `
          INSERT INTO roomsPictures(roomId, picture) VALUES (?, ?)
        `;
        
        for (const picture of pictures) {
          await pool.query(archivePicturesQuery, [roomId, picture.picture]);
        }
        
        await deleteRoomArchive(roomId);
    
        await pool.query('COMMIT');
    
        return 'Room restored successfully';
    
      } catch (error) {
        await pool.query('ROLLBACK');
        throw new Error(error.message);
      }
}

export default {
    getAllRoomsArchive,
    getSingleRoomArchiveById,
    deleteRoomArchive,
    restoreRoom
}