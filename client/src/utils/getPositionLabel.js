import { LABEL, POSITIONS } from "constants/constants";

export const getPositionLabel = (position) => {
  let label = '';

  switch (position) {
    case POSITIONS.POSITIONS_MASTER_ADMIN:
      label = LABEL.LABEL_MASTER_ADMIN
      break;
    case POSITIONS.POSITIONS_HUMAN_RESOURCE:
      label = LABEL.LABEL_HUMAN_RESOURCE
      break;
    case POSITIONS.POSITIONS_STAFF:
      label = LABEL.LABEL_STAFF
      break;
    default:
      label = LABEL.LABEL_STAFF
      break;
  }

  return label
}