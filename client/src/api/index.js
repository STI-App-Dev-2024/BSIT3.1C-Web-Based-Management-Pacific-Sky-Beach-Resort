import Users from "./users"
import Profile from "./profile"
import Rooms from "./rooms"
import BookRooms from "./booking/book-rooms"

const agent = {
  ...Users,
  ...Profile,
  ...Rooms,
  ...BookRooms
}

export default agent