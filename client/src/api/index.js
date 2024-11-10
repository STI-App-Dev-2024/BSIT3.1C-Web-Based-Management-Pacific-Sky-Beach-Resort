import Users from "./users"
import Profile from "./profile"
import Rooms from "./rooms"

const agent = {
  ...Users,
  ...Profile,
  ...Rooms
}

export default agent